import React from 'react';
import { render, screen } from '@testing-library/react';
import * as chrome from 'sinon-chrome';
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
    expect(chrome.storage.local.get.withArgs({ snippets: [] }).calledOnce).toBe(true);
  });
});