chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        // Now safe to send the message
        chrome.tabs.sendMessage(tabId, {action: "performAction"}, function(response) {
            console.log(response);
        });
    }
});

document.getElementById('logOutButton').addEventListener('click', function() {
    alert("loggin out")
});

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('alertTextButton');
    if (button) {
        button.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                alert("Alerting text");
                chrome.tabs.sendMessage(tabs[0].id, {action: "alertHighlightedText"});
            });
        });
    } else {
        console.error('Button not found!');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var logOutButton = document.getElementById('logOutButton');
    logOutButton.addEventListener('click', function() {
        // Clear the stored API key
        chrome.storage.local.remove('apiKey', function() {
            alert("API Key has been cleared.");
            window.location.href = 'home.html';
        });
    });
});

