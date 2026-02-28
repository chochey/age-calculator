import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function InflationCalculator() {
  const [amount, setAmount] = useState('');
  const [startYear, setStartYear] = useState('2000');
  const [endYear, setEndYear] = useState('2026');
  const [rate, setRate] = useState('3');
  const [customRate, setCustomRate] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const presetRates = [2, 3, 5, 7];

  const calculate = (e) => {
    e.preventDefault();
    setError('');

    const amt = parseFloat(amount);
    const sy = parseInt(startYear, 10);
    const ey = parseInt(endYear, 10);
    const inflationRate = useCustom ? parseFloat(customRate) : parseFloat(rate);

    if (!amt || amt <= 0) { setError('Please enter a valid amount.'); setResult(null); return; }
    if (isNaN(inflationRate) || inflationRate < 0) { setError('Please enter a valid inflation rate.'); setResult(null); return; }
    if (ey <= sy) { setError('End year must be greater than start year.'); setResult(null); return; }

    const years = ey - sy;
    const multiplier = Math.pow(1 + inflationRate / 100, years);
    const adjustedValue = amt * multiplier;
    const purchasingPower = amt / multiplier;
    const totalInflation = (multiplier - 1) * 100;

    // Year-by-year breakdown
    const schedule = [];
    for (let i = 0; i <= years; i++) {
      const year = sy + i;
      const yearMultiplier = Math.pow(1 + inflationRate / 100, i);
      const value = amt * yearMultiplier;
      const power = amt / yearMultiplier;
      schedule.push({
        year,
        value,
        purchasingPower: power,
        cumulativeInflation: (yearMultiplier - 1) * 100,
      });
    }

    setResult({
      adjustedValue,
      purchasingPower,
      totalInflation,
      multiplier,
      years,
      schedule,
    });
  };

  const fmt = (n) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <Seo
        title="Inflation Calculator - Money Value Over Time"
        description="Free inflation calculator. See how inflation changes the value of money over time. Calculate purchasing power, adjusted value, and view year-by-year breakdowns."
      />
      <h1>Inflation Calculator</h1>
      <p className="subtitle">See how the value of money changes over time due to inflation.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Amount ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Start Year</label>
            <input
              type="number"
              min="1900"
              max="2026"
              step="1"
              placeholder="2000"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>End Year</label>
            <input
              type="number"
              min="1900"
              max="2050"
              step="1"
              placeholder="2026"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Annual Inflation Rate</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {presetRates.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setRate(String(r)); setUseCustom(false); }}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: !useCustom && rate === String(r) ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                    background: !useCustom && rate === String(r) ? '#eef2ff' : '#fff',
                    color: !useCustom && rate === String(r) ? '#4f46e5' : '#475569',
                    fontWeight: !useCustom && rate === String(r) ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  {r}%
                </button>
              ))}
              <button
                type="button"
                onClick={() => setUseCustom(true)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: useCustom ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                  background: useCustom ? '#eef2ff' : '#fff',
                  color: useCustom ? '#4f46e5' : '#475569',
                  fontWeight: useCustom ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Custom
              </button>
            </div>
          </div>
          {useCustom && (
            <div className="input-group">
              <label>Custom Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="any"
                placeholder="3.5"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        {error && <p style={{ color: '#dc2626', margin: '0.5rem 0 0', fontWeight: 500 }}>{error}</p>}
        <button type="submit">Calculate Inflation</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(result.adjustedValue)}</span>
            <span className="age-label">equivalent value in {endYear}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{fmt(result.purchasingPower)}</span>
              <span className="detail-label">Purchasing Power of {fmt(parseFloat(amount))} in {endYear}</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.totalInflation.toFixed(2)}%</span>
              <span className="detail-label">Total Inflation ({result.years} years)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.multiplier.toFixed(4)}x</span>
              <span className="detail-label">Cumulative Multiplier</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{useCustom ? customRate : rate}%</span>
              <span className="detail-label">Annual Rate Used</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem', color: '#0f172a' }}>Year-by-Year Breakdown</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Year</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Equivalent Value</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Purchasing Power</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Cumulative Inflation</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.year}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#dc2626' }}>{fmt(row.value)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#16a34a' }}>{fmt(row.purchasingPower)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#475569' }}>{row.cumulativeInflation.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>What Is Inflation?</h2>
        <p>
          Inflation is the rate at which the general level of prices for goods and services rises over time,
          eroding the purchasing power of money. When inflation rises, every dollar you have buys a smaller
          percentage of a good or service. Central banks attempt to limit inflation and avoid deflation to keep
          the economy running smoothly.
        </p>

        <h2>Understanding the Consumer Price Index (CPI)</h2>
        <p>
          The Consumer Price Index (CPI) is the most widely used measure of inflation. It tracks the average
          change in prices paid by consumers for a basket of goods and services over time, including food,
          housing, transportation, medical care, and education. The U.S. Bureau of Labor Statistics publishes
          the CPI monthly. Historically, U.S. inflation has averaged around 3% per year, though it can vary
          significantly from year to year.
        </p>

        <h2>How Inflation Affects Purchasing Power</h2>
        <p>
          Purchasing power refers to the quantity of goods or services that one unit of money can buy. As
          inflation increases, purchasing power decreases. For example, if inflation averages 3% per year,
          something that costs $100 today would cost about $134.39 in 10 years. Conversely, $100 in 10 years
          would only have the buying power of about $74.41 in today's dollars. This is why it is crucial to
          invest and grow your savings at a rate that outpaces inflation.
        </p>

        <h2>Key Formulas</h2>
        <ul>
          <li><strong>Adjusted Value:</strong> Future Value = Present Value x (1 + r)^n, where r is the annual inflation rate and n is the number of years</li>
          <li><strong>Purchasing Power:</strong> Real Value = Nominal Value / (1 + r)^n</li>
          <li><strong>Rule of 72:</strong> Divide 72 by the inflation rate to estimate how many years it takes for prices to double</li>
        </ul>

        <h2>Tips for Protecting Against Inflation</h2>
        <ul>
          <li><strong>Invest in equities</strong> -- stocks have historically outpaced inflation over long periods</li>
          <li><strong>Consider TIPS</strong> -- Treasury Inflation-Protected Securities adjust their principal based on CPI changes</li>
          <li><strong>Diversify assets</strong> -- real estate, commodities, and international investments can provide inflation hedges</li>
          <li><strong>Avoid holding too much cash</strong> -- money in low-interest savings accounts loses value to inflation over time</li>
          <li><strong>Negotiate salary increases</strong> -- ensure your income keeps pace with or exceeds inflation each year</li>
        </ul>
      </section>
      <RelatedTools current="/inflation-calculator" />
    </div>
  );
}

export default InflationCalculator;
