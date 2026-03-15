import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function SalaryCalculator() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const hrs = parseFloat(hoursPerWeek) || 40;
  const wks = parseFloat(weeksPerYear) || 52;
  const val = parseFloat(amount) || 0;

  let hourly, daily, weekly, biweekly, monthly, annual;

  if (type === 'annual') {
    annual = val;
    hourly = val / (hrs * wks);
  } else if (type === 'monthly') {
    annual = val * 12;
    hourly = annual / (hrs * wks);
  } else if (type === 'biweekly') {
    annual = val * (wks / 2);
    hourly = annual / (hrs * wks);
  } else if (type === 'weekly') {
    annual = val * wks;
    hourly = annual / (hrs * wks);
  } else if (type === 'daily') {
    annual = val * (hrs / (hrs / 5)) * wks; // assuming 5-day week
    hourly = val / (hrs / 5);
    annual = hourly * hrs * wks;
  } else {
    hourly = val;
    annual = val * hrs * wks;
  }

  daily = hourly * (hrs / 5);
  weekly = hourly * hrs;
  biweekly = weekly * 2;
  monthly = annual / 12;

  const fmt = (n) => n > 0 ? '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '$0.00';

  return (
    <div>
      <Seo title="Salary Calculator - Annual to Hourly Pay Converter" description="Free salary calculator. Convert between annual salary, monthly, biweekly, weekly, daily, and hourly pay. Customize hours per week and weeks per year." faqs={[{ q: 'Does this calculator account for taxes?', a: 'This tool shows gross pay conversions before any deductions. Your take-home pay will be lower after federal income tax, state income tax, Social Security, Medicare, and any other withholdings. For a rough estimate, most full-time employees in the U.S. take home roughly 70-80% of their gross salary, though the exact percentage depends on your tax bracket and deductions.' }, { q: 'How does changing hours per week affect the result?', a: 'If you work part-time or overtime, adjusting the hours field changes every conversion proportionally. For instance, someone earning $50,000 per year working 40 hours per week makes $24.04/hour. The same salary at 50 hours per week works out to only $19.23/hour, because the same annual pay is spread across more hours.' }, { q: 'What if I only work part of the year?', a: 'Reduce the weeks per year field to match the number of weeks you actually work. Teachers, seasonal workers, and contractors often work fewer than 52 weeks. A teacher earning $48,000 over 40 weeks, for example, effectively earns $30.00 per hour rather than the $23.08 they would earn if that salary were spread across a full 52-week year.' }]} />
      <h1>Salary Calculator</h1>
      <p className="subtitle">Convert between annual, monthly, weekly, and hourly pay.</p>

      <div className="form">
        <div className="input-row">
          <div className="input-group" style={{ flex: 2 }}>
            <label>Amount ($)</label>
            <input type="number" min="0" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50000" />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Pay Period</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="select-input">
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Biweekly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Hours / Week</label>
            <input type="number" min="1" max="168" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Weeks / Year</label>
            <input type="number" min="1" max="52" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
          </div>
        </div>
      </div>

      {val > 0 && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(annual)}</span>
            <span className="age-label">per year</span>
          </div>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card highlight">
              <span className="detail-value">{fmt(hourly)}</span>
              <span className="detail-label">Hourly</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(daily)}</span>
              <span className="detail-label">Daily</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(weekly)}</span>
              <span className="detail-label">Weekly</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(biweekly)}</span>
              <span className="detail-label">Biweekly</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(monthly)}</span>
              <span className="detail-label">Monthly</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(annual)}</span>
              <span className="detail-label">Annual</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Salary Calculator</h2>
        <p>
          Start by entering any pay amount you know -- whether it is an annual salary, a monthly paycheck, or an hourly
          wage. Select the matching pay period from the dropdown menu. Then adjust the hours per week and weeks per year
          fields to reflect your actual work schedule (the defaults are 40 hours and 52 weeks). The calculator instantly
          converts your pay into every other period: hourly, daily, weekly, biweekly, monthly, and annual. This is
          useful when comparing job offers quoted in different pay periods.
        </p>

        <h2>The Conversion Formula with a Worked Example</h2>
        <p>
          The foundation of salary conversion is: <strong>Annual Salary = Hourly Rate x Hours per Week x Weeks per Year</strong>.
          All other periods are derived from the annual figure. For example, suppose you earn $22.50 per hour and work 40 hours
          a week for 52 weeks. Your annual salary is $22.50 x 40 x 52 = <strong>$46,800.00</strong>. From that annual total,
          your monthly pay is $46,800 / 12 = <strong>$3,900.00</strong>, your biweekly paycheck is $46,800 / 26 =
          <strong> $1,800.00</strong>, and your daily rate is $22.50 x 8 = <strong>$180.00</strong> (assuming a 5-day work week).
          If you take two weeks of unpaid vacation, change weeks per year to 50 and the annual total drops to $45,000.
        </p>

        <h2>Common Salary Conversions</h2>
        <ul>
          <li><strong>$15/hour</strong> -- $31,200/year, $2,600/month (40 hrs, 52 wks)</li>
          <li><strong>$50,000/year</strong> -- $24.04/hour, $4,166.67/month</li>
          <li><strong>$75,000/year</strong> -- $36.06/hour, $6,250.00/month</li>
          <li><strong>$100,000/year</strong> -- $48.08/hour, $8,333.33/month</li>
        </ul>

        <h3>Does this calculator account for taxes?</h3>
        <p>
          This tool shows gross pay conversions before any deductions. Your take-home pay will be lower after federal
          income tax, state income tax, Social Security, Medicare, and any other withholdings. For a rough estimate,
          most full-time employees in the U.S. take home roughly 70-80% of their gross salary, though the exact
          percentage depends on your tax bracket and deductions.
        </p>

        <h3>How does changing hours per week affect the result?</h3>
        <p>
          If you work part-time or overtime, adjusting the hours field changes every conversion proportionally. For
          instance, someone earning $50,000 per year working 40 hours per week makes $24.04/hour. The same salary
          at 50 hours per week works out to only $19.23/hour, because the same annual pay is spread across more hours.
        </p>

        <h3>What if I only work part of the year?</h3>
        <p>
          Reduce the weeks per year field to match the number of weeks you actually work. Teachers, seasonal workers,
          and contractors often work fewer than 52 weeks. A teacher earning $48,000 over 40 weeks, for example, effectively
          earns $30.00 per hour rather than the $23.08 they would earn if that salary were spread across a full 52-week year.
        </p>
      </section>
      <RelatedTools current="/salary-calculator" />
    </div>
  );
}

export default SalaryCalculator;
