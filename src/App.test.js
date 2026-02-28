import { render, screen } from '@testing-library/react';
import App from './App';

// App includes its own BrowserRouter, so we mock it to use MemoryRouter in tests
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <actual.MemoryRouter>{children}</actual.MemoryRouter>,
  };
});

test('renders the app with QuickCalcs header', () => {
  render(<App />);
  expect(screen.getByText('QuickCalcs')).toBeInTheDocument();
});

test('renders the homepage by default', () => {
  render(<App />);
  expect(screen.getByText(/free online tools/i)).toBeInTheDocument();
});
