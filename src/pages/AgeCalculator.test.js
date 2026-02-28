import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import AgeCalculator from './AgeCalculator';

describe('AgeCalculator', () => {
  test('renders heading and form', () => {
    render(<AgeCalculator />);
    expect(screen.getByRole('heading', { level: 1, name: /age calculator/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/enter your date of birth/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate age/i })).toBeInTheDocument();
  });

  test('does not show results initially', () => {
    render(<AgeCalculator />);
    expect(screen.queryByText('Total Months')).toBeNull();
  });

  test('calculates and displays age when form is submitted', async () => {
    const user = userEvent.setup();
    render(<AgeCalculator />);

    const input = screen.getByLabelText(/enter your date of birth/i);
    const button = screen.getByRole('button', { name: /calculate age/i });

    await user.type(input, '2000-01-01');
    await user.click(button);

    expect(screen.getByText('Total Months')).toBeInTheDocument();
    expect(screen.getByText('Total Weeks')).toBeInTheDocument();
    expect(screen.getByText('Total Days')).toBeInTheDocument();
    expect(screen.getByText('Total Hours')).toBeInTheDocument();
    expect(screen.getByText('Total Minutes')).toBeInTheDocument();
    expect(screen.getByText('Days Until Next Birthday')).toBeInTheDocument();
  });

  test('displays years/months/days labels in results', async () => {
    const user = userEvent.setup();
    render(<AgeCalculator />);

    const input = screen.getByLabelText(/enter your date of birth/i);
    const button = screen.getByRole('button', { name: /calculate age/i });

    await user.type(input, '2000-01-01');
    await user.click(button);

    expect(screen.getByText('years')).toBeInTheDocument();
    expect(screen.getByText('months')).toBeInTheDocument();
    expect(screen.getByText('days')).toBeInTheDocument();
  });

  test('renders info section', () => {
    render(<AgeCalculator />);
    expect(screen.getByText(/how to use the age calculator/i)).toBeInTheDocument();
  });

  test('renders related tools', () => {
    render(<AgeCalculator />);
    expect(screen.getByText(/related tools/i)).toBeInTheDocument();
  });
});
