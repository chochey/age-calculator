import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function PercentageCalculator() {
  const [calc1, setCalc1] = useState({ percent: '', of: '', result: '' });
  const [calc2, setCalc2] = useState({ is: '', of: '', result: '' });
  const [calc3, setCalc3] = useState({ from: '', to: '', result: '' });
  const [calc4, setCalc4] = useState({ value: '', percent: '', result: '' });

  const doCalc1 = (e) => {
    e.preventDefault();
    const r = (parseFloat(calc1.percent) / 100) * parseFloat(calc1.of);
    setCalc1({ ...calc1, result: isNaN(r) ? 'Invalid input' : r.toLocaleString(undefined, { maximumFractionDigits: 4 }) });
  };

  const doCalc2 = (e) => {
    e.preventDefault();
    const r = (parseFloat(calc2.is) / parseFloat(calc2.of)) * 100;
    setCalc2({ ...calc2, result: isNaN(r) || !isFinite(r) ? 'Invalid input' : r.toLocaleString(undefined, { maximumFractionDigits: 4 }) + '%' });
  };

  const doCalc3 = (e) => {
    e.preventDefault();
    const from = parseFloat(calc3.from);
    const to = parseFloat(calc3.to);
    const r = ((to - from) / Math.abs(from)) * 100;
    setCalc3({ ...calc3, result: isNaN(r) || !isFinite(r) ? 'Invalid input' : (r >= 0 ? '+' : '') + r.toLocaleString(undefined, { maximumFractionDigits: 4 }) + '%' });
  };

  const doCalc4 = (e) => {
    e.preventDefault();
    const val = parseFloat(calc4.value);
    const pct = parseFloat(calc4.percent);
    const increase = val + (val * pct / 100);
    const decrease = val - (val * pct / 100);
    setCalc4({ ...calc4, result: isNaN(increase) ? 'Invalid input' : `+${pct}% = ${increase.toLocaleString(undefined, { maximumFractionDigits: 4 })}  |  -${pct}% = ${decrease.toLocaleString(undefined, { maximumFractionDigits: 4 })}` });
  };

  return (
    <div>
      <Seo title="Percentage Calculator" description="Free online percentage calculator. Calculate percentages, percentage increases, decreases, and differences between numbers." />
      <h1>Percentage Calculator</h1>
      <p className="subtitle">Calculate percentages, increases, decreases, and differences.</p>

      <div className="calc-section">
        <h2>What is X% of Y?</h2>
        <form onSubmit={doCalc1} className="form inline-form">
          <span>What is</span>
          <input type="number" step="any" placeholder="X" value={calc1.percent} onChange={(e) => setCalc1({ ...calc1, percent: e.target.value })} required />
          <span>% of</span>
          <input type="number" step="any" placeholder="Y" value={calc1.of} onChange={(e) => setCalc1({ ...calc1, of: e.target.value })} required />
          <span>?</span>
          <button type="submit">Calculate</button>
        </form>
        {calc1.result && <div className="calc-result">{calc1.result}</div>}
      </div>

      <div className="calc-section">
        <h2>X is what % of Y?</h2>
        <form onSubmit={doCalc2} className="form inline-form">
          <input type="number" step="any" placeholder="X" value={calc2.is} onChange={(e) => setCalc2({ ...calc2, is: e.target.value })} required />
          <span>is what % of</span>
          <input type="number" step="any" placeholder="Y" value={calc2.of} onChange={(e) => setCalc2({ ...calc2, of: e.target.value })} required />
          <span>?</span>
          <button type="submit">Calculate</button>
        </form>
        {calc2.result && <div className="calc-result">{calc2.result}</div>}
      </div>

      <div className="calc-section">
        <h2>Percentage Change</h2>
        <form onSubmit={doCalc3} className="form inline-form">
          <span>From</span>
          <input type="number" step="any" placeholder="old value" value={calc3.from} onChange={(e) => setCalc3({ ...calc3, from: e.target.value })} required />
          <span>to</span>
          <input type="number" step="any" placeholder="new value" value={calc3.to} onChange={(e) => setCalc3({ ...calc3, to: e.target.value })} required />
          <button type="submit">Calculate</button>
        </form>
        {calc3.result && <div className="calc-result">{calc3.result}</div>}
      </div>

      <div className="calc-section">
        <h2>Increase / Decrease by %</h2>
        <form onSubmit={doCalc4} className="form inline-form">
          <input type="number" step="any" placeholder="value" value={calc4.value} onChange={(e) => setCalc4({ ...calc4, value: e.target.value })} required />
          <span>&plusmn;</span>
          <input type="number" step="any" placeholder="%" value={calc4.percent} onChange={(e) => setCalc4({ ...calc4, percent: e.target.value })} required />
          <span>%</span>
          <button type="submit">Calculate</button>
        </form>
        {calc4.result && <div className="calc-result">{calc4.result}</div>}
      </div>

      <section className="info-section">
        <h2>How to Use This Percentage Calculator</h2>
        <p>This page provides four different percentage calculators to cover the most common scenarios. To find what a percentage of a number is, use the first calculator by entering the percentage and the base number. To find what percentage one number is of another, use the second calculator. The third calculator determines the percentage change between two values, which is useful for tracking price changes or performance metrics. The fourth calculator shows the result of increasing or decreasing a number by a given percentage. Simply fill in the fields for the calculation you need and click "Calculate" to get your answer instantly.</p>

        <h2>Understanding the Formulas</h2>
        <p>Each calculator uses a slightly different formula. <strong>X% of Y</strong> is computed as Y multiplied by (X / 100). For example, 15% of 200 equals 200 x 0.15 = 30. To find <strong>what percent X is of Y</strong>, divide X by Y and multiply by 100. So 45 out of 200 equals (45 / 200) x 100 = 22.5%. <strong>Percentage change</strong> uses the formula ((new value - old value) / |old value|) x 100. If a stock goes from $50 to $65, the change is ((65 - 50) / 50) x 100 = +30%. For <strong>increase/decrease</strong>, the formula is value +/- (value x percent / 100).</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Calculating a restaurant tip -- find 18% or 20% of your bill total in seconds</li>
          <li>Determining sale prices -- if an item is 35% off, quickly see what you will actually pay</li>
          <li>Figuring out tax amounts on purchases before checkout</li>
          <li>Tracking investment portfolio gains or losses over specific time periods</li>
          <li>Computing grade percentages from raw scores on tests and assignments</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>How do I calculate a percentage increase between two numbers?</h3>
        <p>Use the "Percentage Change" calculator on this page. Enter the original value in the "From" field and the new value in the "To" field, then click Calculate. The formula is ((new - old) / |old|) x 100. A positive result means an increase, and a negative result means a decrease.</p>

        <h3>What is the difference between percentage and percentage points?</h3>
        <p>A percentage describes a ratio out of 100, while percentage points measure the arithmetic difference between two percentages. If an interest rate moves from 3% to 5%, that is a 2 percentage point increase, but it represents a 66.7% increase in relative terms. This distinction matters in finance, statistics, and reporting.</p>

        <h3>Can I use this calculator for compound percentage changes?</h3>
        <p>Each calculation on this page handles a single percentage operation. If you need to apply multiple successive percentage changes (such as two consecutive years of 10% growth), you would calculate each step individually. For compound growth over many periods, consider using our Compound Interest Calculator, which is specifically designed for that purpose.</p>
      </section>
      <RelatedTools current="/percentage-calculator" />
    </div>
  );
}

export default PercentageCalculator;
