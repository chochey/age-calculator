import { render } from '../test-utils';
import Seo from './Seo';

test('updates document title', () => {
  render(<Seo title="Test Title" description="Test desc" />);
  expect(document.title).toBe('Test Title | QuickCalc');
});

test('updates meta description', () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'description');
  document.head.appendChild(meta);

  render(<Seo title="Title" description="My description" />);
  expect(document.querySelector('meta[name="description"]').getAttribute('content')).toBe('My description');

  document.head.removeChild(meta);
});
