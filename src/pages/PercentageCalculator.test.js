import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import PercentageCalculator from './PercentageCalculator';

describe('PercentageCalculator', () => {
  test('renders heading and all four calculator sections', () => {
    render(<PercentageCalculator />);
    expect(screen.getByRole('heading', { name: /percentage calculator/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what is x% of y\?/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /x is what % of y\?/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /percentage change/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /increase \/ decrease by %/i })).toBeInTheDocument();
  });

  test('calculates X% of Y', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const buttons = screen.getAllByRole('button', { name: /calculate/i });

    await user.type(inputs[0], '25');
    await user.type(inputs[1], '200');
    await user.click(buttons[0]);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('calculates X is what % of Y', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const buttons = screen.getAllByRole('button', { name: /calculate/i });

    await user.type(inputs[2], '50');
    await user.type(inputs[3], '200');
    await user.click(buttons[1]);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('calculates percentage change', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const buttons = screen.getAllByRole('button', { name: /calculate/i });

    await user.type(inputs[4], '100');
    await user.type(inputs[5], '150');
    await user.click(buttons[2]);

    expect(screen.getByText('+50%')).toBeInTheDocument();
  });

  test('calculates increase/decrease by percent', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const buttons = screen.getAllByRole('button', { name: /calculate/i });

    await user.type(inputs[6], '100');
    await user.type(inputs[7], '10');
    await user.click(buttons[3]);

    expect(screen.getByText(/110/)).toBeInTheDocument();
    expect(screen.getByText(/90/)).toBeInTheDocument();
  });
});
