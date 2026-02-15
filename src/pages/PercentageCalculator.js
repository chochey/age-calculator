import { useState } from 'react';
import Seo from '../components/Seo';

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
        <h2>How to Calculate Percentages</h2>
        <p>A percentage is a number expressed as a fraction of 100. To find X% of Y, multiply Y by X/100. For example, 25% of 200 = 200 × 0.25 = 50. Use the calculators above for quick results without manual math.</p>

        <h2>Common Percentage Uses</h2>
        <ul>
          <li>Calculate tips at restaurants</li>
          <li>Figure out discounts and sale prices</li>
          <li>Determine tax amounts</li>
          <li>Track investment gains or losses</li>
          <li>Calculate grade percentages</li>
        </ul>
      </section>
    </div>
  );
}

export default PercentageCalculator;
