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
    // print button clicked
    console.log("A1: Summarize button clicked");
   
      chrome.storage.local.get('textSelected', async function(data) {
          if (data.textSelected) {
              const promptText = "You are a research assistant tasked with summarizing web articles. Exclude irrelevant content such as advertisements, promotional links, navigational elements, and legal disclaimers. Focus on the core article content and structure your summary as follows:1. **Overview**: Start with a clear, concise sentence capturing the type and essence of the article, such as 'This is a news article discussing..' 2. **Detailed Breakdown**: Organize the content into 2-4 subtopics, each with a bolded headline. Provide 1-2 bullet points per subtopic, succinctly covering key details.The summary must be moderately concise, strictly between 50 - 200 words; Target the summary towards average readers with some understanding of the topic, capable of grasping moderate technical details $$$" + data.textSelected + "$$$"; // Custom prompt to process the text
              // print this is prompt text + prompt text
              console.log("A2: This is prompt text" + promptText);

              const response = await fetchSummary(promptText);
              console.log("A3: This is response from fetch" + response);
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


async function fetchSummary(text) {
  const apiKey = await getStoredApiKey();
  console.log("B1: This is API key: " + apiKey);
  if (!apiKey) {
      console.error('API Key is not set');
      return "API Key is not available. Please set your API Key.";
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": text}],
      }),
    });
    console.log("B2: This is response: " + response);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(" B3 API Response Data: ", JSON.stringify(data)); // This will help to inspect what the actual response is.
    // if (!data.choices || data.choices.length === 0 || !data.choices[0].text) {
    //     throw new Error("No response or missing 'text' in the response from API");
    // }
    console.log(" B4 API message content : ", data.choices[0].message.content); // This
    return data.choices[0].message.content; // Return the summarized text
  } catch (error) {
    console.error('Error fetching summary:', error);
    return `Error fetching summary: ${error.message}`;
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



