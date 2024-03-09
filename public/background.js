chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'captureSnippet',
      title: 'Capture Snippet',
      contexts: ['selection'],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'captureSnippet') {
      const selectedText = info.selectionText;
      chrome.storage.local.get({ snippets: [] }, (result) => {
        const snippets = result.snippets;
        const newSnippet = {
          id: Date.now(),
          text: selectedText,
        };
        snippets.push(newSnippet);
        chrome.storage.local.set({ snippets }, () => {
          console.log('Snippet saved');
        });
      });
    }
  });