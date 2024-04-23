console.log("[Popup] this is popup script");

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

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === "newTextSelected") {
//       // Assume there's an element with ID 'text-summary' in your popup's HTML
//       var textArea = document.getElementById('text-summary');
//       alert("hey" + message.text);
//       if (textArea) {
//         textArea.value = message.text;  // Display the selected text in the textarea
//       }
//     }
//   });

  
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



