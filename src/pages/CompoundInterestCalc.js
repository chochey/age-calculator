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
        <h2>What Is Compound Interest?</h2>
        <p>
          Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods.
          Unlike simple interest (which is calculated only on the principal), compound interest allows your money to grow exponentially
          over time. This is often called the "eighth wonder of the world" and is the key mechanism behind long-term wealth building.
        </p>

        <h2>How Compounding Frequency Affects Growth</h2>
        <p>
          The more frequently interest compounds, the faster your money grows. Monthly compounding produces slightly more than quarterly
          compounding, which in turn produces more than annual compounding. For most savings accounts and investments, interest
          compounds either daily or monthly. The difference between compounding frequencies becomes more significant with higher
          interest rates and longer time periods.
        </p>

        <h2>The Power of Regular Contributions</h2>
        <p>
          Adding regular monthly contributions dramatically increases your final balance. Even small monthly amounts can compound
          into substantial sums over decades. For example, investing $500 per month at 7% annual return for 30 years results in
          over $600,000 -- even though your total contributions were only $180,000. The rest is earned interest.
        </p>

        <h2>Key Formulas</h2>
        <ul>
          <li><strong>Future value of principal:</strong> FV = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency, t is years</li>
          <li><strong>Future value of annuity (contributions):</strong> FV = PMT x [((1 + r/n)^(nt) - 1) / (r/n)]</li>
          <li><strong>Rule of 72:</strong> Divide 72 by your annual return rate to estimate how many years it takes to double your money</li>
        </ul>

        <h2>Investment Tips</h2>
        <ul>
          <li>Start investing as early as possible -- time in the market matters more than timing the market</li>
          <li>Take advantage of employer 401(k) matching for an instant 100% return on those contributions</li>
          <li>Index funds historically return about 7-10% annually after inflation adjustments</li>
          <li>Increasing contributions by even 1% per year can make a huge difference over decades</li>
        </ul>
      </section>
      <RelatedTools current="/compound-interest-calculator" />
    </div>
  );
}

export default CompoundInterestCalc;
