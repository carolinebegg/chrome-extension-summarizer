chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request, sender);
      // Handle the message here
      sendResponse({response: "Message received"});
    }
  );
// This function is called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  // See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create
  chrome.contextMenus.create({
    id: 'captureSnippet', // Unique identifier for the context menu item
    title: 'AI Summary', // Text to be displayed in the context menu
    contexts: ['selection'], // Show the context menu item only when text is selected
  });
});

// This function is called when a context menu item is clicked
// See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#event-onClicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Check if the clicked menu item is 'captureSnippet'
  console.log("clicked", info.menuItemId);
  if (info.menuItemId === 'captureSnippet') {
    const selectedText = info.selectionText; // Get the selected text
    
    // Retrieve the existing snippets from chrome.storage.local
    chrome.storage.local.get('textSelected', function(data) {
        if (data.textSelected) {
            // If an API key is found, redirect to the second page
            var textArea = document.getElementById('text-summary');
            if (textArea) {
                textArea.value = data.textSelected;  // Display the selected text in the textarea
            }
        }
    });
  }
});
