import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import WordCounter from './WordCounter';

describe('WordCounter', () => {
  test('renders heading and textarea', () => {
    render(<WordCounter />);
    expect(screen.getByRole('heading', { level: 1, name: /word counter/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste or type your text here...')).toBeInTheDocument();
  });

  test('shows zero counts initially', () => {
    render(<WordCounter />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(4);
  });

  test('counts words in real time', async () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText('Paste or type your text here...');
    await userEvent.type(textarea, 'Hello world foo bar');
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('counts characters with and without spaces', async () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText('Paste or type your text here...');
    await userEvent.type(textarea, 'Hi there');
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('counts sentences', async () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText('Paste or type your text here...');
    await userEvent.type(textarea, 'Hello. World!');
    const sentencesLabel = screen.getByText('Sentences');
    const sentencesValue = sentencesLabel.parentElement.querySelector('.detail-value');
    expect(sentencesValue).toHaveTextContent('2');
  });

  test('displays reading time', async () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText('Paste or type your text here...');
    await userEvent.type(textarea, 'Hello world foo bar');
    expect(screen.getByText(/sec/)).toBeInTheDocument();
  });
});
