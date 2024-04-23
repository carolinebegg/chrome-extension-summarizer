chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request, sender);
      // Handle the message here
      sendResponse({response: "Message received"});
    }
  );

