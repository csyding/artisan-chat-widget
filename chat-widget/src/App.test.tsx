import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Mock fetch with a default implementation
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders message input and send button', async () => {
    render(<App />);
    
    // Wait for elements to be present
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a message')).toBeInTheDocument();
      expect(screen.getByText('Send')).toBeInTheDocument();
    });
  });

  test('sends message when clicking send button', async () => {
    const mockResponse = [
      { id: 1, content: 'Test message', sender: 'user' },
      { id: 2, content: 'Bot response', sender: 'chatbot' }
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    );

    render(<App />);
    
    const input = screen.getByPlaceholderText('Type a message');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/messages',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: expect.any(String)
        })
      );
    });
  });
}); 