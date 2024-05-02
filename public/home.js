document.addEventListener('DOMContentLoaded', function() {
    // Check if an API key is already stored when the DOM is fully loaded
    chrome.storage.local.get('apiKey', function(data) {
        if (data.apiKey) {
            // If an API key is found, verify it
            verifyAPIKey(data.apiKey, true, function(isValid) {
                if (isValid) {
                    // Proceed only if the API key is valid
                    window.location.href = 'summary.html';
                } else {
                    // Optionally, clear the API key or notify the user
                }
            });
        }
    });

    // Update the save button event listener as follows:
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission which refreshes the page
        const apiKey = document.getElementById('apiKeyInput').value;
        verifyAPIKey(apiKey, false, function(isValid) {
            if (isValid) {
                chrome.storage.local.set({apiKey: apiKey}, function() {
                    console.log('API key saved!');
                    window.location.href = 'summary.html';
                });
            } else {
                alert('API key is invalid. Please check and try again.');
            }
        });
    });
});

function verifyAPIKey(apiKey, isInitialCheck, callback) {
    console.log('Verifying API key...');
    chrome.runtime.sendMessage({action: "verifyAPIKey", apiKey: apiKey}, function(response) {
        if (response.valid) {
            console.log('API key is valid.');
            callback(true);
        } else {
            console.error('API key is invalid.', response.error);
            callback(false);
            if (isInitialCheck) {
                chrome.storage.local.remove('apiKey', function() {
                    console.log('Invalid API key removed from storage.');
                });
            }
        }
    });
}
