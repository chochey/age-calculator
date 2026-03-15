import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function SavingsGoalCalc() {
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [annualRate, setAnnualRate] = useState('');
  const [result, setResult] = useState(null);
  const [viewMode, setViewMode] = useState('yearly');

  const calculate = (e) => {
    e.preventDefault();

    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings) || 0;
    const rate = parseFloat(annualRate) || 0;
    const time = parseFloat(timeFrame);

    if (!goal || goal <= 0 || !time || time <= 0) {
      setResult(null);
      return;
    }

    const totalMonths = timeUnit === 'years' ? Math.round(time * 12) : Math.round(time);
    const totalYears = totalMonths / 12;

    if (totalMonths <= 0) { setResult(null); return; }

    const remaining = goal - current;
    if (remaining <= 0) {
      setResult({
        monthlySavings: 0,
        totalContributions: 0,
        totalInterest: 0,
        finalAmount: current,
        alreadyMet: true,
        schedule: [],
      });
      return;
    }

    let monthlySavings;
    const monthlyRate = rate / 100 / 12;

    if (rate === 0) {
      // No interest: simple division
      monthlySavings = remaining / totalMonths;
    } else {
      // Future value of current savings after totalMonths
      const fvCurrent = current * Math.pow(1 + monthlyRate, totalMonths);
      // Amount still needed from contributions
      const amountNeeded = goal - fvCurrent;

      if (amountNeeded <= 0) {
        // Current savings with interest already reach the goal
        setResult({
          monthlySavings: 0,
          totalContributions: 0,
          totalInterest: goal - current,
          finalAmount: goal,
          alreadyMet: true,
          schedule: [],
        });
        return;
      }

      // Future value of annuity formula solved for PMT:
      // FV = PMT * [((1 + r)^n - 1) / r]
      // PMT = amountNeeded / [((1 + r)^n - 1) / r]
      const annuityFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      monthlySavings = amountNeeded / annuityFactor;
    }

    // Build schedule month-by-month, then aggregate
    const monthlySchedule = [];
    let balance = current;
    let cumulativeContributions = current;

    for (let m = 1; m <= totalMonths; m++) {
      const startBalance = balance;
      const contribution = monthlySavings;
      balance += contribution;
      const interestEarned = balance * monthlyRate;
      balance += interestEarned;
      cumulativeContributions += contribution;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startBalance,
        contribution,
        interestEarned,
        endBalance: balance,
        cumulativeContributions,
        cumulativeInterest: balance - cumulativeContributions,
      });
    }

    // Aggregate into yearly schedule
    const yearlySchedule = [];
    const numYears = Math.ceil(totalMonths / 12);

    for (let y = 1; y <= numYears; y++) {
      const yearMonths = monthlySchedule.filter((m) => m.year === y);
      if (yearMonths.length === 0) continue;

      const startBalance = yearMonths[0].startBalance;
      const endBalance = yearMonths[yearMonths.length - 1].endBalance;
      const contributions = yearMonths.reduce((sum, m) => sum + m.contribution, 0);
      const interest = yearMonths.reduce((sum, m) => sum + m.interestEarned, 0);

      yearlySchedule.push({
        year: y,
        startBalance,
        contributions,
        interestEarned: interest,
        endBalance,
      });
    }

    const totalContributions = monthlySavings * totalMonths;
    const totalInterest = balance - current - totalContributions;

    setResult({
      monthlySavings,
      totalContributions,
      totalInterest,
      finalAmount: balance,
      totalMonths,
      totalYears,
      alreadyMet: false,
      monthlySchedule,
      yearlySchedule,
    });
  };

  const fmt = (n) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtRound = (n) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const thStyle = { padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' };
  const tdStyle = { padding: '0.5rem 0.75rem', textAlign: 'right', color: '#475569' };

  return (
    <div>
      <Seo
        title="Savings Goal Calculator - QuickCalcs"
        description="Free savings goal calculator. Find out how much to save each month to reach your financial goal. Factor in interest and current savings."
        faqs={[{ q: 'What interest rate should I use?', a: 'For a standard high-yield savings account, rates typically range from 4% to 5% APY. If you plan to invest in a diversified index fund, historical average returns are around 7-10% annually, though returns are not guaranteed and can fluctuate. For conservative planning, use a rate at the lower end of your expected range. If your money is in a regular checking account earning near 0%, enter 0% to see the pure savings required.' }, { q: 'Does this calculator account for taxes on interest?', a: 'This tool shows gross interest earned before taxes. Interest income from savings accounts is generally taxable as ordinary income. If you are in the 22% federal tax bracket, for instance, $500 in annual interest would net you about $390 after taxes. For tax-advantaged savings, consider using a Roth IRA or 529 plan where earnings can grow tax-free for qualifying purposes.' }, { q: 'What if I miss a monthly contribution?', a: 'Missing a payment means you will need to increase future contributions to stay on track, or extend your timeline. The sooner you make up a missed deposit, the less impact it has because you lose less compounding time. Revisit this calculator periodically to adjust your plan if your income or expenses change.' }]}
      />
      <h1>Savings Goal Calculator</h1>
      <p className="subtitle">Plan how much to save each month to reach your goal.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Savings Goal ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="50000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Current Savings ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="5000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Time Frame</label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <input
                type="number"
                min="1"
                step="any"
                placeholder={timeUnit === 'years' ? '5' : '60'}
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                style={{ flex: 1 }}
                required
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="select-input"
                style={{ flex: '0 0 90px', padding: '0.5rem' }}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label>Expected Annual Interest Rate (%)</label>
            <input
              type="number"
              min="0"
              max="50"
              step="any"
              placeholder="5"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Calculate Savings Plan</button>
      </form>

      {result && (
        <div className="results">
          {result.alreadyMet ? (
            <div className="primary-result">
              <span className="age-number">Goal Already Met!</span>
              <span className="age-label">Your current savings{parseFloat(annualRate) > 0 ? ' plus interest' : ''} will reach your goal.</span>
            </div>
          ) : (
            <>
              <div className="primary-result">
                <span className="age-number">{fmt(result.monthlySavings)}</span>
                <span className="age-label">/ month needed</span>
              </div>

              <div className="detail-grid">
                <div className="detail-card">
                  <span className="detail-value">{fmtRound(parseFloat(goalAmount))}</span>
                  <span className="detail-label">Savings Goal</span>
                </div>
                <div className="detail-card">
                  <span className="detail-value">{fmtRound(parseFloat(currentSavings) || 0)}</span>
                  <span className="detail-label">Current Savings</span>
                </div>
                <div className="detail-card">
                  <span className="detail-value">{fmtRound(result.totalContributions)}</span>
                  <span className="detail-label">Total Contributions</span>
                </div>
                <div className="detail-card highlight">
                  <span className="detail-value">{fmtRound(result.totalInterest)}</span>
                  <span className="detail-label">Total Interest Earned</span>
                </div>
              </div>

              {/* View toggle and schedule table */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.5rem 0 0.75rem' }}>
                <h3 style={{ fontSize: '1rem', margin: 0, color: '#0f172a' }}>Balance Growth</h3>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('monthly')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px 0 0 6px',
                      cursor: 'pointer',
                      background: viewMode === 'monthly' ? '#4f46e5' : '#fff',
                      color: viewMode === 'monthly' ? '#fff' : '#475569',
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('yearly')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0',
                      borderRadius: '0 6px 6px 0',
                      cursor: 'pointer',
                      background: viewMode === 'yearly' ? '#4f46e5' : '#fff',
                      color: viewMode === 'yearly' ? '#fff' : '#475569',
                    }}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ ...thStyle, textAlign: 'left' }}>{viewMode === 'yearly' ? 'Year' : 'Month'}</th>
                      <th style={thStyle}>Start Balance</th>
                      <th style={thStyle}>Contributions</th>
                      <th style={thStyle}>Interest Earned</th>
                      <th style={thStyle}>End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewMode === 'yearly'
                      ? result.yearlySchedule.map((row) => (
                          <tr key={row.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.year}</td>
                            <td style={tdStyle}>{fmtRound(row.startBalance)}</td>
                            <td style={{ ...tdStyle, color: '#4f46e5' }}>{fmtRound(row.contributions)}</td>
                            <td style={{ ...tdStyle, color: '#16a34a' }}>{fmtRound(row.interestEarned)}</td>
                            <td style={{ ...tdStyle, fontWeight: 600, color: '#0f172a' }}>{fmtRound(row.endBalance)}</td>
                          </tr>
                        ))
                      : result.monthlySchedule.map((row) => (
                          <tr key={row.month} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.month}</td>
                            <td style={tdStyle}>{fmtRound(row.startBalance)}</td>
                            <td style={{ ...tdStyle, color: '#4f46e5' }}>{fmtRound(row.contribution)}</td>
                            <td style={{ ...tdStyle, color: '#16a34a' }}>{fmtRound(row.interestEarned)}</td>
                            <td style={{ ...tdStyle, fontWeight: 600, color: '#0f172a' }}>{fmtRound(row.endBalance)}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      <RelatedTools current="/savings-goal-calculator" />

      <section className="info-section">
        <h2>How to Use This Savings Goal Calculator</h2>
        <p>
          Enter your target savings goal, any money you have already saved, and the time frame you are working with
          (in years or months). Optionally, add an expected annual interest rate if your savings will earn returns in
          a high-yield account or investment. Click "Calculate Savings Plan" to see exactly how much you need to save
          each month, plus a detailed breakdown of contributions and interest earned over time. You can toggle between
          monthly and yearly views to see how your balance grows.
        </p>

        <h2>The Savings Formula with a Worked Example</h2>
        <p>
          This calculator uses the future value of an annuity formula:
          <strong> PMT = (Goal - FV of Current Savings) / [((1 + r)^n - 1) / r]</strong>, where r is the monthly
          interest rate and n is the total number of months. For example, say you want to save $20,000 for a car down
          payment in 3 years. You already have $2,000 saved and expect 5% annual interest. The monthly rate is 0.05/12 =
          0.004167. Your $2,000 grows to $2,000 x (1.004167)^36 = <strong>$2,323.23</strong> over 36 months. The remaining
          gap is $20,000 - $2,323.23 = $17,676.77. The annuity factor is ((1.004167)^36 - 1) / 0.004167 = 38.75.
          So PMT = $17,676.77 / 38.75 = <strong>$456.17 per month</strong>. Over 3 years you contribute $16,422.12 and
          earn $1,577.88 in interest to reach your $20,000 goal.
        </p>

        <h2>Tips for Reaching Your Goal Faster</h2>
        <ul>
          <li><strong>Automate transfers</strong> -- set up automatic deposits on payday so you save before you spend.</li>
          <li><strong>Use a high-yield account</strong> -- even a few extra percentage points of interest compound meaningfully over time.</li>
          <li><strong>Increase contributions</strong> -- redirect raises, bonuses, or tax refunds toward your goal.</li>
          <li><strong>Cut recurring costs</strong> -- canceling unused subscriptions can free up $50-100+ per month.</li>
        </ul>

        <h3>What interest rate should I use?</h3>
        <p>
          For a standard high-yield savings account, rates typically range from 4% to 5% APY. If you plan to invest in
          a diversified index fund, historical average returns are around 7-10% annually, though returns are not
          guaranteed and can fluctuate. For conservative planning, use a rate at the lower end of your expected range.
          If your money is in a regular checking account earning near 0%, enter 0% to see the pure savings required.
        </p>

        <h3>Does this calculator account for taxes on interest?</h3>
        <p>
          This tool shows gross interest earned before taxes. Interest income from savings accounts is generally taxable
          as ordinary income. If you are in the 22% federal tax bracket, for instance, $500 in annual interest would net
          you about $390 after taxes. For tax-advantaged savings, consider using a Roth IRA or 529 plan where earnings
          can grow tax-free for qualifying purposes.
        </p>

        <h3>What if I miss a monthly contribution?</h3>
        <p>
          Missing a payment means you will need to increase future contributions to stay on track, or extend your
          timeline. The sooner you make up a missed deposit, the less impact it has because you lose less compounding
          time. Revisit this calculator periodically to adjust your plan if your income or expenses change.
        </p>
      </section>
    </div>
  );
}

export default SavingsGoalCalc;
