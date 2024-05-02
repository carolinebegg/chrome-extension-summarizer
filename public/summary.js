// console.log("[Popup] this is popup script");

async function injectScript() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id, allFrames: true},
    files: ["contentScript.js"],
  }).then(injectionResults => {
    console.log("[Popup] done");
  });
}

injectScript();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        // Now safe to send the message
        chrome.tabs.sendMessage(tabId, {action: "performAction"}, function(response) {
            console.log(response);
        });
    }
});


// Modified: Added event listeners and handling for the text summarization process
document.addEventListener('DOMContentLoaded', function() {
  var summarizeButton = document.getElementById('alertTextButton');
  summarizeButton.addEventListener('click', async function() {
      chrome.storage.local.get('textSelected', async function(data) {
          if (data.textSelected) {
              const promptText = "Summarize this text: " + data.textSelected; // Custom prompt to process the text
              const response = await fetchSummary(promptText);
              if (response) {
                  var textArea = document.getElementById('text-summary');
                  if (textArea) {
                      textArea.value = response; // Display the summary in the textarea
                  }
              }
          }
      });
  });

  var logOutButton = document.getElementById('logOutButton');
  logOutButton.addEventListener('click', function() {
      chrome.storage.local.remove('apiKey', function() {
          alert("API Key has been cleared.");
          window.location.href = 'home.html'; // Redirect to home page after logging out
      });
  });
});

// New function: Fetches the text summary from OpenAI API
async function fetchSummary(text) {
  const apiKey = await getStoredApiKey(); // Retrieve the stored API key
  try {
      const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              model: "text-davinci-002", // Change to the appropriate model
              prompt: text,
              max_tokens: 150
          })
      });
      const data = await response.json();
      return data.choices[0].text.trim(); // Return the summarized text
  } catch (error) {
      console.error('Error fetching summary:', error);
      return "Error fetching summary. Please try again.";
  }
}

// New function: Retrieves the stored API key from local storage
async function getStoredApiKey() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get('apiKey', function(data) {
          if (data.apiKey) {
              resolve(data.apiKey);
          } else {
              reject('No API key found');
          }
      });
  });
}




document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('alertTextButton');
    if (button) {
        button.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                alert("Alerting text");
                chrome.tabs.sendMessage(tabs[0].id, {action: "alertHighlightedText"}, function(response) {
                    
                    if (response) {
                        alert("response" + response + response.selectedText);
                      }
                });
            });
        });
    } else {
        console.error('Button not found!');
    }
// check selected text
    chrome.storage.local.get('textSelected', function(data) {
        if (data.textSelected) {
            // If an API key is found, redirect to the second page
            var textArea = document.getElementById('text-summary');
            if (textArea) {
                textArea.value = data.textSelected;  // Display the selected text in the textarea
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "newTextSelected") {
      // Assume there's an element with ID 'text-summary' in your popup's HTML
      var textArea = document.getElementById('text-summary');
    //   alert("hey" + message.text);
      if (textArea) {
        textArea.value = message.text;  // Display the selected text in the textarea
      }
    }
  });

  // display selected text
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "newTextSelected") {
      if (textArea) {
        textArea.value = message.text; // Update the textarea with the selected text
      }
    }
  });

  
document.addEventListener('DOMContentLoaded', function() {
    var logOutButton = document.getElementById('logOutButton');
    logOutButton.addEventListener('click', function() {
        // Clear the stored API key
        chrome.storage.local.remove('apiKey', function() {
            alert("API Key has been cleared.");
            window.location.href = 'home.html';
        });
    });
});



