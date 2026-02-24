import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [downPaymentAmt, setDownPaymentAmt] = useState('');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [downPaymentMode, setDownPaymentMode] = useState('percent');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState(null);

  const syncDownPayment = (price, mode, value) => {
    const p = parseFloat(price) || 0;
    if (mode === 'percent') {
      const pct = parseFloat(value) || 0;
      setDownPaymentPct(value);
      setDownPaymentAmt(p > 0 ? String(Math.round(p * pct / 100)) : '');
    } else {
      const amt = parseFloat(value) || 0;
      setDownPaymentAmt(value);
      setDownPaymentPct(p > 0 ? String(((amt / p) * 100).toFixed(2)) : '');
    }
  };

  const handleHomePriceChange = (val) => {
    setHomePrice(val);
    const p = parseFloat(val) || 0;
    if (downPaymentMode === 'percent') {
      const pct = parseFloat(downPaymentPct) || 0;
      setDownPaymentAmt(p > 0 ? String(Math.round(p * pct / 100)) : '');
    } else {
      const amt = parseFloat(downPaymentAmt) || 0;
      setDownPaymentPct(p > 0 ? String(((amt / p) * 100).toFixed(2)) : '');
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    const price = parseFloat(homePrice);
    const down = parseFloat(downPaymentAmt) || 0;
    const rate = parseFloat(interestRate);
    const years = parseInt(loanTerm);

    if (!price || price <= 0 || rate === undefined || isNaN(rate) || rate < 0 || !years) {
      setResult(null);
      return;
    }

    const principal = price - down;
    if (principal <= 0) { setResult(null); return; }

    const n = years * 12;
    let monthly;

    if (rate === 0) {
      monthly = principal / n;
    } else {
      const r = rate / 100 / 12;
      monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = monthly * n;
    const totalInterest = totalPayment - principal;

    // Build amortization schedule (yearly summary)
    const amortization = [];
    let balance = principal;
    const monthlyRate = rate / 100 / 12;

    for (let year = 1; year <= years; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthly - interestPayment;
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        balance -= principalPayment;
      }

      amortization.push({
        year,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        totalPaid: yearPrincipal + yearInterest,
        remainingBalance: Math.max(0, balance),
      });
    }

    setResult({
      monthly,
      totalPayment,
      totalInterest,
      principal,
      downPayment: down,
      homePrice: price,
      amortization,
    });
  };

  const fmt = (n) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtRound = (n) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div>
      <Seo
        title="Mortgage Calculator - Monthly Payment & Amortization"
        description="Free mortgage calculator. Calculate monthly payments, total interest, and see amortization schedule. Compare 15, 20, and 30 year terms."
      />
      <h1>Mortgage Calculator</h1>
      <p className="subtitle">Calculate your monthly mortgage payment, total interest, and view a yearly amortization breakdown.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group" style={{ flex: 2 }}>
            <label>Home Price ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="350000"
              value={homePrice}
              onChange={(e) => handleHomePriceChange(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Down Payment ({downPaymentMode === 'percent' ? '%' : '$'})</label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <input
                type="number"
                min="0"
                step="any"
                placeholder={downPaymentMode === 'percent' ? '20' : '70000'}
                value={downPaymentMode === 'percent' ? downPaymentPct : downPaymentAmt}
                onChange={(e) => syncDownPayment(homePrice, downPaymentMode, e.target.value)}
                style={{ flex: 1 }}
              />
              <select
                value={downPaymentMode}
                onChange={(e) => setDownPaymentMode(e.target.value)}
                className="select-input"
                style={{ flex: '0 0 55px', padding: '0.5rem' }}
              >
                <option value="percent">%</option>
                <option value="dollar">$</option>
              </select>
            </div>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Loan Term</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="select-input"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              min="0"
              max="30"
              step="any"
              placeholder="6.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit">Calculate Mortgage</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(result.monthly)}</span>
            <span className="age-label">/ month (P&I)</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.homePrice)}</span>
              <span className="detail-label">Home Price</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.downPayment)}</span>
              <span className="detail-label">Down Payment</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.principal)}</span>
              <span className="detail-label">Loan Amount</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.totalInterest)}</span>
              <span className="detail-label">Total Interest</span>
            </div>
            <div className="detail-card highlight" style={{ gridColumn: 'span 2' }}>
              <span className="detail-value">{fmtRound(result.totalPayment)}</span>
              <span className="detail-label">Total Cost (Principal + Interest)</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem', color: '#0f172a' }}>Amortization Schedule (Yearly)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Year</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Principal Paid</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Interest Paid</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Total Paid</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.amortization.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.year}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#16a34a' }}>{fmtRound(row.principalPaid)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#dc2626' }}>{fmtRound(row.interestPaid)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#475569' }}>{fmtRound(row.totalPaid)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>{fmtRound(row.remainingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How Mortgage Payments Are Calculated</h2>
        <p>
          This calculator uses the standard amortization formula: <strong>M = P[r(1+r)^n] / [(1+r)^n - 1]</strong>, where M is the monthly payment,
          P is the loan principal (home price minus down payment), r is the monthly interest rate (annual rate divided by 12), and n is the total
          number of monthly payments. The result gives you the fixed monthly principal and interest (P&I) payment.
        </p>

        <h2>Understanding Your Amortization Schedule</h2>
        <p>
          An amortization schedule shows how each payment is split between principal and interest over the life of the loan. In the early years,
          most of your payment goes toward interest. As the loan matures, a larger portion goes toward reducing the principal balance.
          The yearly breakdown table above summarizes this progression so you can see exactly how your equity builds over time.
        </p>

        <h2>Comparing Loan Terms: 15 vs 20 vs 30 Years</h2>
        <ul>
          <li><strong>30-year mortgage</strong> — Lowest monthly payment but the most total interest paid over the life of the loan. Most popular option for first-time buyers.</li>
          <li><strong>20-year mortgage</strong> — A middle ground with moderately higher payments and significant interest savings compared to 30 years.</li>
          <li><strong>15-year mortgage</strong> — Highest monthly payment but dramatically less total interest. Great for those who can afford the higher payment and want to build equity faster.</li>
        </ul>

        <h2>Tips for Getting the Best Mortgage Rate</h2>
        <ul>
          <li>Maintain a credit score above 740 for the best rates</li>
          <li>Make a down payment of at least 20% to avoid PMI (Private Mortgage Insurance)</li>
          <li>Compare offers from multiple lenders, including banks, credit unions, and online lenders</li>
          <li>Consider buying discount points to lower your rate if you plan to stay long-term</li>
          <li>Lock in your rate when you find a favorable offer, as rates can change daily</li>
        </ul>
      </section>
      <RelatedTools current="/mortgage-calculator" />
    </div>
  );
}

export default MortgageCalculator;
