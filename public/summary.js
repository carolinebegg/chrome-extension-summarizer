console.log("[Popup] Summary script loaded");

// Function to send a text summary request to the background script
function requestTextSummary(text) {
  chrome.storage.local.get('apiKey', function (data) {
    if (data.apiKey) {
      chrome.runtime.sendMessage(
        {
          action: 'generateText',
          prompt: text,
          apiKey: data.apiKey
        },
        (response) => {
          if (response && response.error) {
            console.error('Error:', response.error);
            alert(`Failed to generate summary: ${response.error}`);
          } else if (response && response.result) {
            console.log('Summary:', response.result);
            document.getElementById('text-summary').value = response.result;
          } else {
            console.error('Unexpected response:', response);
            alert('Failed to generate summary: Unexpected response structure');
          }
        }
      );
    } else {
      alert('API Key is missing!');
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  const summarizeButton = document.getElementById('alertTextButton');
  if (summarizeButton) {
    summarizeButton.addEventListener('click', function () {
      chrome.storage.local.get('textSelected', function (data) {
        if (data.textSelected) {
          requestTextSummary(data.textSelected);
        } else {
          alert('No text selected to summarize!');
        }
      });
    });
  }

  // Log out button functionality
  const logOutButton = document.getElementById('logOutButton');
  if (logOutButton) {
    logOutButton.addEventListener('click', function () {
      chrome.storage.local.remove('apiKey', function () {
        alert('API Key has been cleared.');
        window.location.href = 'home.html';
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'newTextSelected') {
    const textArea = document.getElementById('text-summary');
    if (textArea) {
      textArea.value = message.text;
    }
  }
});