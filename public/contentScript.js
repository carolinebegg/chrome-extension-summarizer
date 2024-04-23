// // This function is called when the user releases the mouse button (mouseup event)
// document.addEventListener('mouseup', function (e) {
//     // Get the selected text and remove any leading/trailing whitespace
//     const selectedText = window.getSelection().toString().trim();
  
//     // Check if any text is selected
//     if (selectedText.length > 0) {
//       // Send a message to the background script with the selected text
//       chrome.runtime.sendMessage(
//         { action: 'saveSnippet', data: selectedText },
//         (response) => {
//           // Log the response status from the background script
//           // console.log(response.status);
//         }
//       );
//     }
//   });


//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === "showAlert") {
//       alert(request.message);
//     }
//   });
  
var selectedText = "";  // Declare selectedText once at the top

document.addEventListener("mouseup", function(event) {
  var selection = window.getSelection();
  var selectionText = selection.toString().trim();
  
  console.log("[Content] selection: " + selection);
  selectedText = selectionText;  // Assign new value without redeclaring
  if (selectionText) {
    // Send the selected text to the background or popup script
    // chrome.runtime.sendMessage({action: "newTextSelected", text: selectionText});
    chrome.storage.local.set({textSelected: selectionText}, function() {
      // alert('API key saved!' + '\n' + selectionText);
      // After saving, navigate to the second page
  });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "alertHighlightedText") {
    console.log("alertHighlightedText received" + selectedText);
    sendResponse({selectedText: selectedText});  // Use the updated selectedText
  }
});
