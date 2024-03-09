import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockEvent } from 'mockzilla-webextension';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockBrowser.flush();
  });

  test('renders Snippet Collector header', async () => {
    // Mock the chrome.storage.local.get method to return an empty snippets array
    mockBrowser.storage.local.get.expect({ snippets: [] }).andResolve({ snippets: [] });

    render(<App />);
    const headerElement = await screen.findByText(/Snippet Collector/i);
    expect(headerElement).toBeInTheDocument();

    // Expect the chrome.storage.local.get method to have been called
    expect(mockBrowser.storage.local.get).toHaveBeenCalledWith({ snippets: [] });
  });
});