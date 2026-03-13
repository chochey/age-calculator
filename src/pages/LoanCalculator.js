import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use This Loan Calculator</h2>
        <p>Enter three pieces of information to calculate your loan payments: the total loan amount in dollars, the annual interest rate as a percentage, and the loan term in years. Click "Calculate" to see your fixed monthly payment, the total interest you will pay over the life of the loan, the total cost (principal plus interest), and the interest-to-principal ratio. This ratio is especially useful for understanding how much extra you pay beyond the borrowed amount. Try adjusting the interest rate or term to compare different scenarios and find the most affordable option.</p>

        <h2>Understanding the Amortization Formula</h2>
        <p>This calculator uses the standard amortization formula: <strong>M = P[r(1+r)^n] / [(1+r)^n - 1]</strong>, where M is the monthly payment, P is the principal (loan amount), r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments (years times 12). For example, a $20,000 auto loan at 6% interest for 5 years gives a monthly rate of 0.005 and 60 total payments, resulting in a monthly payment of approximately $386.66. Over the life of that loan, you would pay $3,199 in interest, making the total cost $23,199.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Estimating monthly payments on a car loan before visiting the dealership so you know your budget</li>
          <li>Comparing personal loan offers from different lenders by entering each one's rate and term</li>
          <li>Planning student loan repayment by seeing how much interest accumulates over 10, 15, or 25 years</li>
          <li>Determining whether a shorter loan term with higher monthly payments saves enough interest to be worthwhile</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>How does the loan term affect total interest paid?</h3>
        <p>A longer loan term means lower monthly payments but significantly more total interest. For example, a $25,000 loan at 7% costs about $11,207 in interest over 10 years versus $5,579 over 5 years. The shorter term has higher monthly payments ($495 vs. $290), but you save over $5,600 in interest. Always weigh monthly affordability against total cost.</p>

        <h3>What is the difference between interest rate and APR?</h3>
        <p>The interest rate is the base cost of borrowing money, while APR (Annual Percentage Rate) includes the interest rate plus additional fees such as origination fees, closing costs, and discount points. APR gives you a more complete picture of the true cost of a loan. This calculator uses the interest rate; check your lender's APR disclosure for the full cost comparison.</p>

        <h3>Should I pay off my loan early?</h3>
        <p>Paying off a loan early can save you a substantial amount in interest, since interest accrues on the remaining balance. However, some lenders charge prepayment penalties, so check your loan agreement first. If there is no penalty, making extra payments toward the principal -- even small ones -- can shorten your loan term and reduce total interest significantly.</p>
      </section>
      <RelatedTools current="/loan-calculator" />
    </div>
  );
}

export default LoanCalculator;
