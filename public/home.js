

document.addEventListener('DOMContentLoaded', function() {
    // Check if an API key is already stored
    chrome.storage.local.get('apiKey', function(data) {
        if (data.apiKey) {
            // Verify the stored API key
            verifyAPIKey(data.apiKey, true);
        }
    });

    // Add event listener to save button
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission which refreshes the page
        const apiKey = document.getElementById('apiKeyInput').value;
        chrome.storage.local.set({apiKey: apiKey}, function() {
            console.log('API key saved!');
            verifyAPIKey(apiKey, false);
        });
    });
});

function verifyAPIKey(apiKey, isInitialCheck) {
    console.log('Verifying API key...');
    fetch('https://api.openai.com/v1/engines', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Proceed with the response if it's successful
        } else {
            throw new Error('API key validation failed: ' + response.statusText);
        }
    })
    .then(data => {
        console.log('API key is valid. Engines available:', data);
        window.location.href = 'summary.html'; // Navigate to the summary page if the key is valid
    })
    .catch(error => {
        console.error('Error verifying API key:', error);
        alert('Failed to verify API key. Please check and try again.\n' + error);
        if (isInitialCheck) {  // Clear the stored invalid key if checking on load
            chrome.storage.local.remove('apiKey', function() {
                console.log('Invalid API key removed from storage.');
            });
        }
    });
}
