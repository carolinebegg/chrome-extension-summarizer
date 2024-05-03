// Listen for the extension's installation or update event to create the context menu
chrome.runtime.onInstalled.addListener(function() {
  // Create a context menu for text selection
  chrome.contextMenus.create({
      id: "summarizeText",
      title: "Summarize this text",
      contexts: ["selection"]
  });
});

// Event listener for clicking on the context menu item
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "summarizeText" && info.selectionText) {
      // Store the selected text in chrome.storage.local for access by the popup
      chrome.storage.local.set({textSelected: info.selectionText});
  }
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Handle API key verification
  if (request.action === "verifyAPIKey") {
      verifyAPIKey(request.key, sendResponse);
      return true; // Indicate asynchronous response
  }
  // Handle text summarization requests
  else if (request.action === "summarizeText") {
      if (request.apiKey) {
          summarizeText(request.text, request.apiKey, sendResponse);
      } else {
          sendResponse({ error: 'API Key not set' });
      }
      return true; // Indicate asynchronous response
  }
});

// Function to verify the API key
function verifyAPIKey(apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/engines', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${apiKey}`}
  }).then(response => {
      if (response.ok) {
          sendResponse({ verified: true });
      } else {
          throw new Error('API key validation failed');
      }
  }).catch(error => {
      sendResponse({ verified: false, error: error.message });
  });
}

// Function to summarize text using the OpenAI API
async function summarizeText(text, apiKey, sendResponse) {
  const data = {
      prompt: "Summarize the following text: " + text,
      max_tokens: 300
  };
  const response = await(fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  }))
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch the API');
      }
      return response.json();
  })
  .then(data => {
      if (data.choices && data.choices.length > 0) {
          sendResponse({ summary: data.choices[0].text });
      } else {
          throw new Error('Failed to generate summary');
      }
  })
  .catch(error => {
      sendResponse({ error: 'Error: ' + error.message });
  });
}