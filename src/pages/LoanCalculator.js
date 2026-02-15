import { useState } from 'react';
import Seo from '../components/Seo';

function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) { setResult(null); return; }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - p;

    setResult({ monthly, totalPayment, totalInterest, principal: p });
  };

  return (
    <div>
      <Seo title="Loan Calculator - Monthly Payment & Interest" description="Free loan calculator. Calculate monthly payments, total interest, and total cost for mortgages, auto loans, and personal loans." />
      <h1>Loan Calculator</h1>
      <p className="subtitle">Calculate monthly payments, total interest, and loan costs.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input type="number" min="0" step="any" placeholder="250000" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input type="number" min="0" max="100" step="any" placeholder="6.5" value={rate} onChange={(e) => setRate(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Loan Term (years)</label>
            <input type="number" min="1" max="50" step="1" placeholder="30" value={years} onChange={(e) => setYears(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">${result.monthly.toFixed(2)}</span>
            <span className="age-label">/ month</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">${result.principal.toLocaleString()}</span>
              <span className="detail-label">Principal</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="detail-label">Total Interest</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="detail-label">Total Cost</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{((result.totalInterest / result.principal) * 100).toFixed(1)}%</span>
              <span className="detail-label">Interest to Principal</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How Loan Payments Are Calculated</h2>
        <p>This calculator uses the standard amortization formula to determine your monthly payment. Enter your loan amount, annual interest rate, and loan term to see your monthly payment, total interest paid, and the total cost of the loan over its lifetime.</p>

        <h2>Common Loan Types</h2>
        <ul>
          <li><strong>Mortgage</strong> — Typically 15 or 30 years at 5-8%</li>
          <li><strong>Auto Loan</strong> — Typically 3-7 years at 4-10%</li>
          <li><strong>Personal Loan</strong> — Typically 1-5 years at 6-36%</li>
          <li><strong>Student Loan</strong> — Typically 10-25 years at 3-8%</li>
        </ul>
      </section>
    </div>
  );
}

export default LoanCalculator;
