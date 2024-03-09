import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as sinon from 'sinon';
import * as chrome from 'sinon-chrome';
import 'jest-sinon';
import App from './App';

(global as any).chrome = chrome;

describe('App', () => {
  afterEach(() => {
    // Reset the chrome stub after each test
    chrome.flush();
  });

  test('renders Snippet Collector header', async () => {
    // Mock the chrome.storage.local.get method to return an empty snippets array
    chrome.storage.local.get.withArgs({ snippets: [] }).yields({ snippets: [] });

    render(<App />);
    const headerElement = await screen.findByText(/Snippet Collector/i);
    expect(headerElement).toBeInTheDocument();

    // Expect the chrome.storage.local.get method to have been called
    // without jest-sinon, you would have to use the following:
    //expect(chrome.storage.local.get.withArgs({ snippets: [] }).calledOnce).toBe(true);
    expect(chrome.storage.local.get).toHaveBeenCalledWith({ snippets: [] });
  });

  test('renders snippets from chrome storage', async () => {
    const mockSnippets = [
      { id: 1, text: 'Snippet 1' },
      { id: 2, text: 'Snippet 2' },
    ];
    chrome.storage.local.get.withArgs({ snippets: [] }).yields({ snippets: mockSnippets });

    render(<App />);
    const snippetElements = await screen.findAllByRole('listitem');
    expect(snippetElements).toHaveLength(2);
    expect(snippetElements[0]).toHaveTextContent('Snippet 1');
    expect(snippetElements[1]).toHaveTextContent('Snippet 2');
  });

  test('updates snippet in chrome storage when edited', async () => {
    const mockSnippets = [{ id: 1, text: 'Original snippet' }];
    chrome.storage.local.get.withArgs({ snippets: [] }).yields({ snippets: mockSnippets });

    render(<App />);
    const editButton = await screen.findByText('Edit');
    fireEvent.click(editButton);

    const textArea = await screen.findByDisplayValue('Original snippet');
    fireEvent.change(textArea, { target: { value: 'Updated snippet' } });

    const saveButton = await screen.findByText('Save');
    fireEvent.click(saveButton);

    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      snippets: [{ id: 1, text: 'Updated snippet' }],
    });
  });

  test('removes snippet from chrome storage when deleted', async () => {
    const mockSnippets = [{ id: 1, text: 'Snippet to delete' }];
    chrome.storage.local.get.withArgs({ snippets: [] }).yields({ snippets: mockSnippets });

    render(<App />);
    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ snippets: [] });
  });
});