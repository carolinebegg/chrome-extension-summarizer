import React from 'react';
import SnippetItem from './SnippetItem';

interface Snippet {
  id: number;
  text: string;
}

interface SnippetListProps {
  snippets: Snippet[];
  onEditSnippet: (id: number, newSnippet: string) => void;
  onDeleteSnippet: (id: number) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  onEditSnippet,
  onDeleteSnippet,
}) => {
  return (
    <ul className="snippet-list">
      {snippets.map((snippet) => (
        <SnippetItem
          key={snippet.id}
          snippet={snippet}
          onEdit={(newSnippet) => onEditSnippet(snippet.id, newSnippet)}
          onDelete={() => onDeleteSnippet(snippet.id)}
        />
      ))}
    </ul>
  );
};

export default SnippetList;