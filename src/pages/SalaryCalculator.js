import { useState } from 'react';
import Seo from '../components/Seo';

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
      <Seo title="Salary Calculator - Annual to Hourly Pay Converter" description="Free salary calculator. Convert between annual salary, monthly, biweekly, weekly, daily, and hourly pay. Customize hours per week and weeks per year." />
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
        <h2>How to Use</h2>
        <p>Enter your pay amount, select the pay period, and the calculator instantly converts to all other periods. Adjust hours per week and weeks per year to match your actual schedule (default is 40 hours, 52 weeks).</p>

        <h2>Common Conversions</h2>
        <ul>
          <li><strong>$50,000/year</strong> = $24.04/hour (40 hrs/week)</li>
          <li><strong>$25/hour</strong> = $52,000/year (40 hrs/week)</li>
          <li><strong>$75,000/year</strong> = $6,250/month</li>
          <li><strong>$100,000/year</strong> = $48.08/hour (40 hrs/week)</li>
        </ul>
      </section>
    </div>
  );
}

export default SalaryCalculator;
