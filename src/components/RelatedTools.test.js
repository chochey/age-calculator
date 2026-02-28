import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import RelatedTools from './RelatedTools';

test('renders related tools section', () => {
  render(<RelatedTools current="/age-calculator" />);
  expect(screen.getByText(/related tools/i)).toBeInTheDocument();
});

test('does not show the current tool in related links', () => {
  render(<RelatedTools current="/age-calculator" />);
  const links = screen.getAllByRole('link');
  const hrefs = links.map(l => l.getAttribute('href'));
  expect(hrefs).not.toContain('/age-calculator');
});
