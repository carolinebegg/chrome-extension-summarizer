chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender);
    if (request.action === "verifyAPIKey") {
        // Verify the API key
        verifyAPIKey(request.apiKey, sendResponse);
        return true; // Indicate that you wish to send a response asynchronously
    } else if (request.action === "generateText") {
        // Generate text using OpenAI's API
        generateText(request.prompt, sendResponse);
        return true; // Indicate that you wish to send a response asynchronously
    }
    // other message handling
    sendResponse({response: "Message received"});
  }
);

// ... [Rest of your code] ...

// Function to verify API key
function verifyAPIKey(apiKey, sendResponse) {
  // ... [Your existing code for verifyAPIKey] ...
}

// Function to generate text using OpenAI's API
function generateText(prompt, sendResponse) {
  chrome.storage.local.get('apiKey', function(data) {
    if (data.apiKey) {
      // Call OpenAI's API using the stored API key
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${data.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 150
        })
      })
      .then(response => response.json())
      .then(data => sendResponse({ text: data.choices[0].text }))
      .catch(error => sendResponse({ error: error.message }));
    } else {
      sendResponse({ error: "API key is not set." });
    }
  });
  return true; // Keep the message channel open for the async response
}

// ... [Rest of your code] ...
