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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.response) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: function(response) {
          document.getElementById('response').innerText = response;
        },
        args: [request.response]
      });
    });
  }
});


// Function to summarize text using the OpenAI API
function summarizeText(text, apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "system",
            "content": "You are a research assistant tasked with summarizing web articles. Exclude irrelevant content such as advertisements, promotional links, navigational elements, and legal disclaimers. Focus on the core article content and structure your summary as follows: 1. Overview (Start with a clear, concise sentence capturing the type and essence of the article, such as 'This is a news article discussing...'), 2. Detailed Breakdown (Organize the content into 2-4 subtopics, each with a bolded headline. Provide 1-2 bullet points per subtopic, succinctly covering key details.)"
        }, {
            "role": "user",
            "content": text
        }],
        "max_tokens": 250,
        "temperature": 0,
    }),
})
.then(response => {
    if (!response.ok) {
        return response.json().then(errorResponse => {
            const errorMessage = errorResponse.error && errorResponse.error.message ?
                errorResponse.error.message : JSON.stringify(errorResponse, null, 2);
            console.error('API Error:', errorMessage);
            throw new Error('API Error: ' + errorMessage);
        }).catch(error => {
            throw new Error('Failed to parse error response: ' + error.message);
        });
    }
    return response.json();
})
.then(data => {
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        sendResponse({ summary: data.choices[0].message.content });
    } else {
        throw new Error('Failed to generate summary');
    }
})
.catch(error => {
    sendResponse({ error: 'Error: ' + error.message });
});

}