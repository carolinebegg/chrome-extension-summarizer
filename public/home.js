// document.addEventListener('DOMContentLoaded', function() {
//     // Check if an API key is already stored
//     chrome.storage.local.get('apiKey', function(data) {
//         if (data.apiKey) {
//             // If an API key is found, redirect to the second page
//             window.location.href = 'summary.html';
//         }
//     });

//     // Add event listener to save button
//     document.getElementById('saveButton').addEventListener('click', function() {
//         const apiKey = document.getElementById('apiKeyInput').value;
//         chrome.storage.local.set({apiKey: apiKey}, function() {
//             alert('API key saved!' + '\n' + apiKey);
//             // After saving, navigate to the second page
//             window.location.href = 'summary.html';
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    // Check if an API key is already stored
    chrome.storage.local.get('apiKey', function(data) {
        if (data.apiKey) {
            // If an API key is found, redirect to the second page
            // verifyAPIKey(data.apiKey, true);
            window.location.href ='summary.html';
        }
    });

    // Add event listener to save button
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission which refreshes the page
        const apiKey = document.getElementById('apiKeyInput').value;
        chrome.storage.local.set({apiKey: apiKey}, function() {
            console.log('API key saved!');
            // Verify API key before navigating
            verifyAPIKey(apiKey, false);
            // After saving, navigate to the second page
            window.location.href ='summary.html';
        });
    });
});

function verifyAPIKey(apiKey, isInitialCheck) {
    console.log('Verifying API key...');
    // Simulate an API call
    fetch('https://api.example.com/verify?key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log(data);a
            if (data.isValid) {
                window.location.href = 'summary.html';
            } else {
                alert('Invalid API key. Please check and try again.');
                if (isInitialCheck) {  // Clear the stored invalid key if checking on load
                    chrome.storage.local.remove('apiKey');
                }
            }
        })
        .catch(error => {
            console.error('Error verifying API key:', error);
            alert('Failed to verify API key. Please try again later.' + '\n' + error);
        });
}
