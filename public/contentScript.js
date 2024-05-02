// contentScript.js

// Variable to hold the selected text
var selectedText = "";

// Listen for mouseup event to capture selected text
document.addEventListener("mouseup", function() {
    // Get the selected text from the page
    var selection = window.getSelection();
    selectedText = selection.toString().trim(); // Update the selectedText variable

    // If there is selected text, store it in chrome.storage.local
    if (selectedText) {
        chrome.storage.local.set({textSelected: selectedText}, function() {
            console.log('Selected text saved:', selectedText);
        });
    }
});

// Listener for messages from the popup or background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Check if the received message is to alert highlighted text
    if (request.action === "alertHighlightedText") {
        // Respond with the selected text
        sendResponse({selectedText: selectedText});
    }
    return true; // Indicate that you wish to send a response asynchronously
});
