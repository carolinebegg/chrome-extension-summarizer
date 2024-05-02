chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender);
    if (request.action === "verifyAPIKey") {
        verifyAPIKey(request.apiKey, sendResponse);
        return true; // indicate that you wish to send a response asynchronously
    }
    // other message handling
    sendResponse({response: "Message received"});
  }
);

// This function is called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
// Create a context menu item
chrome.contextMenus.create({
  id: 'captureSnippet',
  title: 'AI Summary',
  contexts: ['selection'],
});
});

// This function is called when a context menu item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
if (info.menuItemId === 'captureSnippet') {
  // Process the selected text
  processSelectedText(info.selectionText, tab);
}
});

// Function to verify API key
function verifyAPIKey(apiKey, sendResponse) {
  console.log('Verifying API key in background...');
  fetch('https://api.openai.com/v1/engines', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${apiKey}`
      }
  })
  .then(response => {
      if (response.ok) {
          response.json().then(data => {
              console.log('API key is valid in background. Engines available:', data);
              sendResponse({valid: true});
          });
      } else {
          response.json().then(data => {
              console.error('API key validation failed in background:', data);
              sendResponse({valid: false});
          });
      }
  })
  .catch(error => {
      console.error('Error verifying API key in background:', error);
      sendResponse({valid: false, error: error.message});
  });
}

// Function to process the selected text
function processSelectedText(selectedText, tab) {
  // Example: Here you could use the selectedText to make an API call
  // using the user's API key stored in chrome.storage.local
  // and then do something with it, like sending it back to the content script
  if (selectedText) {
      chrome.storage.local.get('apiKey', function(data) {
          if (data.apiKey) {
              // Make the API call here
              console.log('Make an API call with the stored API key.');
          }
      });
      chrome.runtime.sendMessage({
          action: "newTextSelected",
          text: selectedText
      });
  }
}
``

// check check check
