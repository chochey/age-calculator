import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import BmiCalculator from './BmiCalculator';

describe('BmiCalculator', () => {
  test('renders heading and imperial mode by default', () => {
    render(<BmiCalculator />);
    expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /imperial \(lb\/ft\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /metric \(kg\/cm\)/i })).toBeInTheDocument();
  });

  test('shows imperial inputs by default', () => {
    render(<BmiCalculator />);
    expect(screen.getByText('Height (ft)')).toBeInTheDocument();
    expect(screen.getByText('Weight (lb)')).toBeInTheDocument();
  });

  test('switches to metric inputs', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.click(screen.getByRole('button', { name: /metric \(kg\/cm\)/i }));

    expect(screen.getByText('Height (cm)')).toBeInTheDocument();
    expect(screen.getByText('Weight (kg)')).toBeInTheDocument();
  });

  test('calculates BMI in imperial mode', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.type(screen.getByPlaceholderText('5'), '5');
    await user.type(screen.getByPlaceholderText('10'), '10');
    await user.type(screen.getByPlaceholderText('160'), '160');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText('23.0')).toBeInTheDocument();
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('calculates BMI in metric mode', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.click(screen.getByRole('button', { name: /metric \(kg\/cm\)/i }));

    await user.type(screen.getByPlaceholderText('178'), '178');
    await user.type(screen.getByPlaceholderText('73'), '73');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText('23.0')).toBeInTheDocument();
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('shows BMI scale after calculation', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.type(screen.getByPlaceholderText('5'), '5');
    await user.type(screen.getByPlaceholderText('10'), '10');
    await user.type(screen.getByPlaceholderText('160'), '160');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText(/<18.5 Underweight/)).toBeInTheDocument();
    expect(screen.getByText(/18.5-24.9 Normal/)).toBeInTheDocument();
    expect(screen.getByText(/25-29.9 Overweight/)).toBeInTheDocument();
    expect(screen.getByText(/30\+ Obese/)).toBeInTheDocument();
  });

  test('does not show results initially', () => {
    render(<BmiCalculator />);
    expect(screen.queryByText('Normal weight')).toBeNull();
  });
});
