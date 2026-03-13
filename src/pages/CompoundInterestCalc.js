import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [compounding, setCompounding] = useState('monthly');
  const [result, setResult] = useState(null);

  const getCompoundingFrequency = (type) => {
    switch (type) {
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'annually': return 1;
      default: return 12;
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const rAnnual = parseFloat(annualRate);
    const t = parseFloat(years);
    const n = getCompoundingFrequency(compounding);

    if (rAnnual === undefined || isNaN(rAnnual) || rAnnual < 0 || !t || t <= 0) {
      setResult(null);
      return;
    }

    if (P <= 0 && PMT <= 0) { setResult(null); return; }

    const r = rAnnual / 100;
    const rPeriod = r / n;

    // Build year-by-year growth table
    const schedule = [];
    let balance = P;
    let totalContributions = P;

    for (let year = 1; year <= t; year++) {
      let yearStartBalance = balance;
      let yearContributions = 0;

      for (let period = 0; period < n; period++) {
        // Add monthly contributions proportionally within each compounding period
        // Monthly contributions added at a rate of (12/n) contributions per compounding period
        const contributionsThisPeriod = PMT * (12 / n);
        balance += contributionsThisPeriod;
        yearContributions += contributionsThisPeriod;

        // Apply interest for this compounding period
        balance *= (1 + rPeriod);
      }

      totalContributions += yearContributions;
      const totalInterestEarned = balance - totalContributions;

      schedule.push({
        year,
        startBalance: yearStartBalance,
        contributions: yearContributions,
        interestEarned: balance - yearStartBalance - yearContributions,
        endBalance: balance,
        totalContributions,
        totalInterest: totalInterestEarned,
      });
    }

    const futureValue = balance;
    const totalContributionsFinal = totalContributions;
    const totalInterest = futureValue - totalContributionsFinal;

    setResult({
      futureValue,
      totalContributions: totalContributionsFinal,
      totalInterest,
      schedule,
    });
  };

  const fmt = (n) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtRound = (n) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div>
      <Seo
        title="Compound Interest Calculator - Investment Growth"
        description="Free compound interest calculator. See how your savings and investments grow over time with compound interest. Includes monthly contributions."
      />
      <h1>Compound Interest Calculator</h1>
      <p className="subtitle">See how your money grows over time with the power of compound interest.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Initial Principal ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Monthly Contribution ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="7"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Time Period (years)</label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              placeholder="20"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Compounding</label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="select-input"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>

        <button type="submit">Calculate Growth</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(result.futureValue)}</span>
            <span className="age-label">future value</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.totalContributions)}</span>
              <span className="detail-label">Total Contributions</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{fmtRound(result.totalInterest)}</span>
              <span className="detail-label">Total Interest Earned</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.totalContributions > 0 ? ((result.totalInterest / result.totalContributions) * 100).toFixed(1) + '%' : '0%'}</span>
              <span className="detail-label">Interest / Contributions</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmtRound(result.futureValue)}</span>
              <span className="detail-label">Final Balance</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem', color: '#0f172a' }}>Year-by-Year Growth</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Year</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Start Balance</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Contributions</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Interest Earned</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>End Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.year}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#475569' }}>{fmtRound(row.startBalance)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#4f46e5' }}>{fmtRound(row.contributions)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#16a34a' }}>{fmtRound(row.interestEarned)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>{fmtRound(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Compound Interest Calculator</h2>
        <p>Enter your initial principal amount (the money you start with), an optional monthly contribution, the annual interest rate, the number of years you plan to invest, and select how frequently interest compounds (monthly, quarterly, or annually). Click "Calculate Growth" to see your projected future value, total contributions, total interest earned, and a detailed year-by-year growth table. Experiment with different values to see how changing your monthly contribution or extending the time period dramatically affects your results. Even small adjustments reveal the power of compounding over time.</p>

        <h2>Understanding the Compound Interest Formula</h2>
        <p>The core formula for compound interest is: <strong>FV = P(1 + r/n)^(nt)</strong>, where P is the initial principal, r is the annual interest rate as a decimal, n is the number of times interest compounds per year, and t is the number of years. For contributions, each monthly deposit earns its own compounding growth from the point it is added. For example, investing $10,000 at 7% compounded monthly for 20 years (with no additional contributions) yields approximately $40,387. Adding $500 per month to that same scenario grows the total to roughly $310,000 -- demonstrating how regular contributions amplify the compounding effect.</p>

        <h2>How Compounding Frequency Affects Growth</h2>
        <p>The more frequently interest compounds, the faster your money grows. Monthly compounding produces slightly more than quarterly, which produces more than annual compounding. For most savings accounts and investments, interest compounds either daily or monthly. The difference between frequencies becomes more pronounced with higher interest rates and longer time horizons. On a $100,000 investment at 10% for 30 years, monthly compounding yields about $1,983 more than annual compounding.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Planning for retirement by projecting how much your 401(k) or IRA will grow over 20, 30, or 40 years of contributions</li>
          <li>Setting savings goals for a house down payment, college fund, or emergency fund with a target amount and timeline</li>
          <li>Comparing savings account and CD offers by entering different interest rates and compounding frequencies</li>
          <li>Understanding the long-term cost of debt -- compound interest works against you on credit card balances and unpaid loans</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>What is the Rule of 72?</h3>
        <p>The Rule of 72 is a quick mental math shortcut for estimating how long it takes your money to double. Divide 72 by your annual return rate. At 7% annual growth, your investment doubles in approximately 72 / 7 = 10.3 years. At 10%, it doubles in about 7.2 years. This rule is an approximation that works best for rates between 2% and 15%.</p>

        <h3>Does this calculator account for inflation?</h3>
        <p>This calculator shows nominal growth, meaning it does not subtract inflation. To estimate real (inflation-adjusted) returns, subtract the expected inflation rate from your annual interest rate before entering it. For example, if you expect 8% returns and 3% inflation, enter 5% to see your approximate purchasing power growth. Historical long-term inflation in the United States averages about 3% per year.</p>

        <h3>How much should I be saving each month for retirement?</h3>
        <p>A common guideline is to save 15% of your pre-tax income for retirement, including any employer match. However, the right amount depends on your age, current savings, desired retirement lifestyle, and expected retirement age. Use this calculator to test different monthly contribution amounts and see what future balance they produce over your remaining working years. Starting early makes a massive difference -- someone who begins at 25 needs to save far less per month than someone starting at 40 to reach the same goal.</p>
      </section>
      <RelatedTools current="/compound-interest-calculator" />
    </div>
  );
}

export default CompoundInterestCalc;
