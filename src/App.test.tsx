import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as sinon from 'sinon';
import * as chrome from 'sinon-chrome';
import 'jest-sinon';
import App from './App';

(global as any).chrome = chrome;

describe('App', () => {
  afterEach(() => {
    chrome.flush();
  });

  test('renders Snippet Collector header', async () => {
    chrome.storage.local.get.withArgs('snippets').yields({ snippets: [] });

    render(<App />);
    const headerElement = await screen.findByText(/Snippet Collector/i);
    expect(headerElement).toBeInTheDocument();

    expect(chrome.storage.local.get).toHaveBeenCalledWith('snippets');
  });

  test('renders sample snippet when snippets are undefined in chrome storage', async () => {
    chrome.storage.local.get.withArgs('snippets').yields({ snippets: undefined });

    render(<App />);
    const snippetElements = await screen.findAllByRole('listitem');
    expect(snippetElements).toHaveLength(1);
    expect(snippetElements[0]).toHaveTextContent('Sample snippet');
  });

  test('renders snippets from chrome storage', async () => {
    const mockSnippets = [
      { id: 1, text: 'Snippet 1' },
      { id: 2, text: 'Snippet 2' },
    ];
    chrome.storage.local.get.withArgs('snippets').yields({ snippets: mockSnippets });

    render(<App />);
    const snippetElements = await screen.findAllByRole('listitem');
    expect(snippetElements).toHaveLength(2);
    expect(snippetElements[0]).toHaveTextContent('Snippet 1');
    expect(snippetElements[1]).toHaveTextContent('Snippet 2');
  });

  test('updates snippet in chrome storage when edited', async () => {
    const mockSnippets = [{ id: 1, text: 'Sample snippet' }];
    chrome.storage.local.get.withArgs('snippets').yields({ snippets: mockSnippets });

    render(<App />);
    const editButton = await screen.findByText('Edit');
    fireEvent.click(editButton);

    const textArea = await screen.findByDisplayValue('Sample snippet');
    fireEvent.change(textArea, { target: { value: 'Updated snippet' } });

    const saveButton = await screen.findByText('Save');
    fireEvent.click(saveButton);

    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      snippets: [{ id: 1, text: 'Updated snippet' }],
    });
  });

  test('removes snippet from chrome storage when deleted', async () => {
    const mockSnippets = [{ id: 1, text: 'Snippet to delete' }];
    chrome.storage.local.get.withArgs('snippets').yields({ snippets: mockSnippets });

    render(<App />);
    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ snippets: [] });
  });
});