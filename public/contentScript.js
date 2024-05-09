// This function handles text selection on the webpage
function debounceSelection() {
    clearTimeout(window.debounceTimer);
    window.debounceTimer = setTimeout(() => {
        let selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 0) {
            chrome.runtime.sendMessage({ action: "textSelected", text: selectedText });
        }
    }, 250); // 250 ms debounce
}

// Listen for mouseup events indicating the end of text selection
document.addEventListener('mouseup', function () {
    debounceSelection();
});

// Listener for messages from background or popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "performAction") {
        sendResponse({ status: "Action performed successfully" });
    }
});
