chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateText') {
    fetchSummary(request.prompt, request.apiKey, sendResponse);
    return true; // Keeps the messaging channel open for async response
  } else if (request.action === 'verifyAPIKey') {
    verifyAPIKey(request.apiKey, sendResponse);
    return true;
  }

  sendResponse({ error: 'Unknown action' });
});

function fetchSummary(prompt, apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Summarize the following text: ${prompt}`,
      max_tokens: 100
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.choices && data.choices[0].text) {
        sendResponse({ result: data.choices[0].text });
      } else {
        sendResponse({ error: 'Failed to generate summary' });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      sendResponse({ error: 'API request failed: ' + error.message });
    });
}

function verifyAPIKey(apiKey, sendResponse) {
  fetch('https://api.openai.com/v1/engines', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API key validation failed');
      }
    })
    .then((data) => {
      sendResponse({ valid: true });
    })
    .catch((error) => {
      console.error('Error verifying API key:', error);
      sendResponse({ valid: false, error: error.message });
    });
}
