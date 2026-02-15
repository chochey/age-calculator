import { useState } from 'react';
import Seo from '../components/Seo';

function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) { setResult(null); return; }

    const earlier = start < end ? start : end;
    const later = start < end ? end : start;

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(Math.abs(later - earlier) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    setResult({ years, months, days, totalDays, totalWeeks, remainingDays, totalMonths, totalHours });
  };

  return (
    <div>
      <Seo title="Date Difference Calculator - Days Between Dates" description="Free date difference calculator. Find the exact number of days, weeks, months, and years between any two dates." />
      <h1>Date Difference Calculator</h1>
      <p className="subtitle">Find the exact time between any two dates.</p>

      <form onSubmit={handleCalculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Calculate Difference</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            {result.years > 0 && (<><span className="age-number">{result.years}</span><span className="age-label">{result.years === 1 ? 'year' : 'years'}</span></>)}
            {result.months > 0 && (<><span className="age-number">{result.months}</span><span className="age-label">{result.months === 1 ? 'month' : 'months'}</span></>)}
            <span className="age-number">{result.days}</span>
            <span className="age-label">{result.days === 1 ? 'day' : 'days'}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.totalMonths.toLocaleString()}</span>
              <span className="detail-label">Total Months</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.totalWeeks.toLocaleString()}</span>
              <span className="detail-label">Total Weeks</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.totalDays.toLocaleString()}</span>
              <span className="detail-label">Total Days</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.totalHours.toLocaleString()}</span>
              <span className="detail-label">Total Hours</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Calculate Days Between Dates</h2>
        <p>Enter a start date and end date to find the exact difference in years, months, and days. The calculator also shows total weeks, total days, and total hours between the two dates. The order doesn't matter — it will always show a positive result.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Calculate days until a deadline or event</li>
          <li>Find the duration between two events</li>
          <li>Calculate project timelines</li>
          <li>Determine age at a specific date</li>
        </ul>
      </section>
    </div>
  );
}

export default DateDifference;
