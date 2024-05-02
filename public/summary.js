console.log("[Popup] Summary script loaded");

// Function to send a text summary request to the background script
function requestTextSummary(text) {
  chrome.storage.local.get('apiKey', function(data) {
    if (data.apiKey) {
      chrome.runtime.sendMessage({
        action: "generateText",
        prompt: text,
        apiKey: data.apiKey
      }, response => {
        if (response.error) {
          console.error('Error:', response.error);
          alert('Failed to generate summary: ' + response.error);
        } else {
          console.log('Generated summary:', response.text);
          document.getElementById('summary-output').textContent = response.text;
        }
      });
    } else {
      alert('API key is not set. Please enter your API key in the options page.');
    }
  });
}

// Event listener for the summarize button
document.addEventListener('DOMContentLoaded', function() {
  // Check selected text
  chrome.storage.local.get('textSelected', function(data) {
    if (data.textSelected) {
      const textArea = document.getElementById('text-summary');
      if (textArea) {
        textArea.value = data.textSelected; // Display the selected text in the textarea
      }
    }
  });

  // Handle summarize button click
  const summarizeButton = document.getElementById('summarizeButton');
  if (summarizeButton) {
    summarizeButton.addEventListener('click', function() {
      const text = document.getElementById('text-summary').value;
      requestTextSummary(text); // Send text to summarize
    });
  } else {
    console.error('Summarize button not found!');
  }

  // Logout button event listener
  const logOutButton = document.getElementById('logOutButton');
  if (logOutButton) {
    logOutButton.addEventListener('click', function() {
      // Clear the stored API key
      chrome.storage.local.remove('apiKey', function() {
        alert("API Key has been cleared.");
        window.location.href = 'home.html'; // Redirect to home for a new key
      });
    });
  } else {
    console.error('Logout button not found!');
  }
});
