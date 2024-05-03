// This function is designed to handle text selection on the webpage.
function debounceSelection() {
  // Clear the existing timeout to ensure only the last selection within the timeout period triggers the action.
  clearTimeout(window.debounceTimer);
  window.debounceTimer = setTimeout(() => {
      let selectedText = window.getSelection().toString().trim();
      // Only send a message if there is actual text selected to minimize unnecessary messaging.
      if (selectedText.length > 0) {
          chrome.runtime.sendMessage({action: "textSelected", text: selectedText});
      }
  }, 250); // 250 ms debounce time to prevent excessive messages on rapid selections.
}

// Listen for mouseup events which indicate the end of a text selection.
document.addEventListener('mouseup', function() {
  debounceSelection();
});

// Listener for messages from background or popup, to handle actions that might be required from the content script.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "performAction") {
      // Perform actions based on the request, such as updating the DOM based on received data.
      sendResponse({status: "Action performed successfully"});
  }
});