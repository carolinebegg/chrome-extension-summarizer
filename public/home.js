// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveButton = document.getElementById('saveButton');
    const summarySection = document.getElementById('summarySection');
    const apiKeySection = document.getElementById('apiKeySection');
    const newSummaryButton = document.getElementById('newSummaryButton');
    const logOutButton = document.getElementById('logOutButton');
    const textSummaryArea = document.getElementById('text-summary');
    const summaryOutputArea = document.getElementById('summary-output');

    // Check if an API key or selected text is already stored
    chrome.storage.local.get(['apiKey', 'textSelected'], function (data) {
        if (data.apiKey) {
            apiKeySection.style.display = 'none';
            summarySection.style.display = 'block';
        }
        if (data.textSelected) {
            textSummaryArea.value = data.textSelected;
        }
    });

    // Save and verify the API key when the save button is clicked
    saveButton.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            chrome.runtime.sendMessage({ action: "verifyAPIKey", key: apiKey }, function (response) {
                if (response.verified) {
                    apiKeySection.style.display = 'none';
                    summarySection.style.display = 'block';
                    chrome.storage.local.set({ 'apiKey': apiKey });
                } else {
                    alert('Failed to verify API Key. Please check and try again.');
                }
            });
        } else {
            alert('Please enter an API key.');
        }
    });

    // Summarize the text when the summarize button is clicked
    newSummaryButton.addEventListener('click', function () {
        const textToSummarize = textSummaryArea.value;
        chrome.storage.local.get('apiKey', function (data) {
            if (data.apiKey && textToSummarize) {
                chrome.runtime.sendMessage({ action: "summarizeText", text: textToSummarize, apiKey: data.apiKey }, function (response) {
                    if (response.summary) {
                        summaryOutputArea.value = response.summary;
                    } else {
                        alert('Error summarizing text: ' + response.error);
                    }
                });
            } else {
                alert('API Key not set or no text to summarize.');
            }
        });
    });

    // Clear the API key and reset the UI when the logout button is clicked
    logOutButton.addEventListener('click', function () {
        chrome.storage.local.remove('apiKey', function () {
            alert('API Key has been cleared.');
            apiKeySection.style.display = 'block';
            summarySection.style.display = 'none';
            textSummaryArea.value = '';
            summaryOutputArea.value = '';
        });
    });
});
