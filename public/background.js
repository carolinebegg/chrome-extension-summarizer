chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "verifyAPIKey") {
    verifyAPIKey(request.apiKey, sendResponse);
    return true;
  } else if (request.action === "generateText") {
    generateTextSummary(request.prompt, request.apiKey, sendResponse);
    return true;
  }
  sendResponse({ response: "Message received" });
});

// Function to verify API key
function verifyAPIKey(apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/engines', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => {
    if (response.ok) {
      sendResponse({ valid: true });
    } else {
      sendResponse({ valid: false });
    }
  })
  .catch(error => {
    sendResponse({ valid: false, error: error.message });
  });
}

// Function to generate a summary
function generateTextSummary(prompt, apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Summarize the following article:\n\n${prompt}`,
      max_tokens: 150
    })
  })
  .then(response => response.json())
  .then(data => {
    sendResponse({ text: data.choices[0].text });
  })
  .catch(error => {
    sendResponse({ error: error.message });
  });
}