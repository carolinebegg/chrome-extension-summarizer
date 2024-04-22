function callOpenAI(text) {
  chrome.storage.local.get('apiKey', function(data) {
      const apiKey = data.apiKey;
      if (!apiKey) {
          alert('API Key is not set.');
          return;
      }

      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              prompt: text,
              max_tokens: 150
          })
      };

      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
          .then(response => response.json())
          .then(data => handleResponse(data))
          .catch(error => console.error('Error:', error));
  });
}

function handleResponse(data) {
  if (data.choices && data.choices.length > 0) {
      const summary = data.choices[0].text.trim();
      console.log('Summary:', summary);
      alert(summary); // Or update UI element with summary
  } else {
      alert('Failed to get a valid response from OpenAI.');
  }
}
