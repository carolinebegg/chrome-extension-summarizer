// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "alertHighlightedText") {
            alert("Highlighted text");
            const selectedText = window.getSelection().toString();
            if (selectedText.length > 0) {
                alert(`Highlighted text: ${selectedText}`);
            } else {
                alert("No text is highlighted.");
            }
        }
    }
);
