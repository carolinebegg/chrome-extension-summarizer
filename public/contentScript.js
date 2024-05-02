var selectedText = "";  // Declare selectedText once at the top

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "alertHighlightedText") {
    console.log("alertHighlightedText received" + selectedText);
    sendResponse({selectedText: selectedText});  // Use the updated selectedText
  }
});
