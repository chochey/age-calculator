import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import Layout from './Layout';

test('renders header with QuickCalcs logo', () => {
  render(<Layout />);
  expect(screen.getByText('QuickCalcs')).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<Layout />);
  expect(screen.getByText('Calculators')).toBeInTheDocument();
  expect(screen.getByText('Converters')).toBeInTheDocument();
  expect(screen.getByText('Generators')).toBeInTheDocument();
  expect(screen.getByText('Dev Tools')).toBeInTheDocument();
});

test('renders footer with copyright and links', () => {
  render(<Layout />);
  expect(screen.getByText(/quickcalcs\. free online tools/i)).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Service')).toBeInTheDocument();
});
