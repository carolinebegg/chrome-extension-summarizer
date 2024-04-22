document.addEventListener('DOMContentLoaded', function() {
    // Check if an API key is already stored
    chrome.storage.local.get('apiKey', function(data) {
        if (data.apiKey) {
            // If an API key is found, redirect to the second page
            window.location.href = 'summary.html';
        }
        // Otherwise, stay on the first page and let the user enter an API key
    });

    // Add event listener to save button
    document.getElementById('saveButton').addEventListener('click', function() {
        const apiKey = document.getElementById('apiKeyInput').value;
        chrome.storage.local.set({apiKey: apiKey}, function() {
            alert('API key saved!' + '\n' + apiKey);
            // After saving, navigate to the second page
            window.location.href = 'summary.html';
        });
    });
});
