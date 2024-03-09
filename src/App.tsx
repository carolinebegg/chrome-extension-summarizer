import React, { useState, useEffect } from 'react';
import './App.css';
import SnippetList from './components/SnippetList';

interface Snippet {
  id: number;
  text: string;
}

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([
    { id: 1, text: 'Sample snippet' },
  ]);

  useEffect(() => {
    chrome.storage.local.get({ snippets: [] }, (result) => {
      setSnippets(result.snippets || []);
    });
  }, []);

  const handleEditSnippet = (id: number, newText: string) => {
    const updatedSnippets = snippets.map((snippet) =>
      snippet.id === id ? { ...snippet, text: newText } : snippet
    );
    setSnippets(updatedSnippets);
    chrome.storage.local.set({ snippets: updatedSnippets });
  };

  const handleDeleteSnippet = (id: number) => {
    const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
    setSnippets(updatedSnippets);
    chrome.storage.local.set({ snippets: updatedSnippets });
  };

  return (
    <div className="App">
      <h1>Snippet Collector</h1>
      <SnippetList
        snippets={snippets}
        onEditSnippet={handleEditSnippet}
        onDeleteSnippet={handleDeleteSnippet}
      />
    </div>
  );
}

export default App;