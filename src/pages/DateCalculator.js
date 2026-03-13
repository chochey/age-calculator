import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function DateCalculator() {
  const [mode, setMode] = useState('add-subtract');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState('');
  const [operation, setOperation] = useState('add');
  const [dateA, setDateA] = useState('');
  const [dateB, setDateB] = useState('');
  const [result, setResult] = useState(null);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDayOfWeek = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeekOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
    return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
  };

  const countBusinessDays = (from, to) => {
    let count = 0;
    const current = new Date(from);
    const end = new Date(to);
    if (current > end) {
      const temp = new Date(current);
      current.setTime(end.getTime());
      end.setTime(temp.getTime());
    }
    const d = new Date(current);
    while (d <= end) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) count++;
      d.setDate(d.getDate() + 1);
    }
    return count;
  };

  const countWeekendDays = (from, to) => {
    let count = 0;
    const current = new Date(from < to ? from : to);
    const end = new Date(from < to ? to : from);
    const d = new Date(current);
    while (d <= end) {
      const day = d.getDay();
      if (day === 0 || day === 6) count++;
      d.setDate(d.getDate() + 1);
    }
    return count;
  };

  const handleAddSubtract = (e) => {
    e.preventDefault();
    const base = new Date(startDate + 'T00:00:00');
    const numDays = parseInt(days);
    if (isNaN(base.getTime()) || isNaN(numDays)) { setResult(null); return; }

    const resultDate = new Date(base);
    if (operation === 'add') {
      resultDate.setDate(resultDate.getDate() + numDays);
    } else {
      resultDate.setDate(resultDate.getDate() - numDays);
    }

    const businessDays = countBusinessDays(base, resultDate);

    setResult({
      type: 'add-subtract',
      resultDate,
      formatted: formatDate(resultDate),
      dayOfWeek: getDayOfWeek(resultDate),
      weekOfYear: getWeekOfYear(resultDate),
      businessDays,
      totalDays: numDays,
      operation
    });
  };

  const handleDaysBetween = (e) => {
    e.preventDefault();
    const a = new Date(dateA + 'T00:00:00');
    const b = new Date(dateB + 'T00:00:00');
    if (isNaN(a.getTime()) || isNaN(b.getTime())) { setResult(null); return; }

    const earlier = a < b ? a : b;
    const later = a < b ? b : a;
    const totalDays = Math.round(Math.abs(later - earlier) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysFromWeeks = totalDays % 7;

    let months = (later.getFullYear() - earlier.getFullYear()) * 12 + (later.getMonth() - earlier.getMonth());
    let remDays = later.getDate() - earlier.getDate();
    if (remDays < 0) {
      months--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      remDays += prevMonth.getDate();
    }

    const businessDays = countBusinessDays(earlier, later);
    const weekendDays = countWeekendDays(earlier, later);

    setResult({
      type: 'days-between',
      totalDays,
      totalWeeks,
      remainingDaysFromWeeks,
      months,
      remainingDaysFromMonths: remDays,
      businessDays,
      weekendDays
    });
  };

  const applyQuickDays = (numDays) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    setStartDate(todayStr);
    setDays(String(numDays));
    setOperation('add');

    const resultDate = new Date(today);
    resultDate.setDate(resultDate.getDate() + numDays);
    const businessDays = countBusinessDays(today, resultDate);

    setResult({
      type: 'add-subtract',
      resultDate,
      formatted: formatDate(resultDate),
      dayOfWeek: getDayOfWeek(resultDate),
      weekOfYear: getWeekOfYear(resultDate),
      businessDays,
      totalDays: numDays,
      operation: 'add'
    });
  };

  return (
    <div>
      <Seo title="Date Calculator - Add or Subtract Days from a Date" description="Free date calculator to add or subtract days from any date. Find future and past dates, count business days, and calculate days between two dates." />
      <h1>Date Calculator</h1>
      <p className="subtitle">Add or subtract days from a date, or find the number of days between two dates.</p>

      <div className="unit-toggle">
        <button className={mode === 'add-subtract' ? 'active' : ''} onClick={() => { setMode('add-subtract'); setResult(null); }}>Add / Subtract Days</button>
        <button className={mode === 'days-between' ? 'active' : ''} onClick={() => { setMode('days-between'); setResult(null); }}>Days Between Dates</button>
      </div>

      {mode === 'add-subtract' && (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button type="button" onClick={() => applyQuickDays(7)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>+7 days</button>
            <button type="button" onClick={() => applyQuickDays(30)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>+30 days</button>
            <button type="button" onClick={() => applyQuickDays(90)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>+90 days</button>
            <button type="button" onClick={() => applyQuickDays(365)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>+365 days</button>
          </div>

          <form onSubmit={handleAddSubtract} className="form">
            <div className="input-row">
              <div className="input-group">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Number of Days</label>
                <input type="number" min="0" step="1" placeholder="30" value={days} onChange={(e) => setDays(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Operation</label>
                <div className="unit-toggle" style={{ marginTop: '0.25rem' }}>
                  <button type="button" className={operation === 'add' ? 'active' : ''} onClick={() => setOperation('add')}>Add</button>
                  <button type="button" className={operation === 'subtract' ? 'active' : ''} onClick={() => setOperation('subtract')}>Subtract</button>
                </div>
              </div>
            </div>
            <button type="submit">Calculate Date</button>
          </form>
        </>
      )}

      {mode === 'days-between' && (
        <form onSubmit={handleDaysBetween} className="form">
          <div className="input-row">
            <div className="input-group">
              <label>Start Date</label>
              <input type="date" value={dateA} onChange={(e) => setDateA(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input type="date" value={dateB} onChange={(e) => setDateB(e.target.value)} required />
            </div>
          </div>
          <button type="submit">Calculate Difference</button>
        </form>
      )}

      {result && result.type === 'add-subtract' && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.formatted}</span>
            <span className="age-label">{result.operation === 'add' ? '+' : '-'}{result.totalDays} days from start date</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{result.dayOfWeek}</span>
              <span className="detail-label">Day of the Week</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">Week {result.weekOfYear}</span>
              <span className="detail-label">Week of the Year</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.businessDays.toLocaleString()}</span>
              <span className="detail-label">Business Days in Range</span>
            </div>
          </div>
        </div>
      )}

      {result && result.type === 'days-between' && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.totalDays.toLocaleString()}</span>
            <span className="age-label">{result.totalDays === 1 ? 'day' : 'days'}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.totalWeeks} week{result.totalWeeks !== 1 ? 's' : ''}, {result.remainingDaysFromWeeks} day{result.remainingDaysFromWeeks !== 1 ? 's' : ''}</span>
              <span className="detail-label">Weeks + Days</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.months} month{result.months !== 1 ? 's' : ''}, {result.remainingDaysFromMonths} day{result.remainingDaysFromMonths !== 1 ? 's' : ''}</span>
              <span className="detail-label">Months + Days</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.businessDays.toLocaleString()}</span>
              <span className="detail-label">Business Days</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.weekendDays.toLocaleString()}</span>
              <span className="detail-label">Weekend Days</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Date Calculator</h2>
        <p>This tool offers two modes to handle all your date arithmetic needs. To add or subtract days from a date, select the "Add / Subtract Days" tab, pick a start date, enter the number of days, choose whether to add or subtract, and click "Calculate Date." For example, if you need to know what date falls 90 days after January 15, simply enter that start date, type 90, select "Add," and the calculator instantly returns the result along with the day of the week and business day count. You can also use the quick-select buttons (+7, +30, +90, +365) to jump ahead from today with a single click.</p>
        <p>To find the gap between two dates, switch to the "Days Between Dates" tab. Enter any two dates and the calculator shows the total calendar days, weeks and remaining days, months and remaining days, business days (Monday through Friday), and weekend days. This is especially useful for tracking project timelines or figuring out how many working days fall within a given period.</p>

        <h2>How the Date Calculator Works</h2>
        <p>The add/subtract mode starts with your chosen date and shifts it forward or backward by the specified number of calendar days. It then determines the resulting day of the week, the ISO week number within that year, and counts every Monday-through-Friday day in the range to give you a business day total. The days-between mode calculates the absolute difference in milliseconds, converts that to days, and separately walks through each day to tally business days and weekend days. Both modes automatically handle month-length differences and leap years, so results like "February 28 + 3 days" correctly land on March 3 in a non-leap year or March 2 in a leap year.</p>

        <h3>Can I calculate business days between two dates?</h3>
        <p>Yes. When you use the "Days Between Dates" mode, the results include a dedicated business days count that excludes Saturdays and Sundays, along with a separate weekend day count. Keep in mind that public holidays are not factored in because they vary by country and region, so you may need to subtract those manually for precise payroll or legal deadline calculations.</p>

        <h3>Does the calculator account for leap years?</h3>
        <p>Absolutely. The calculator relies on JavaScript's native Date object, which correctly handles leap years. Adding 365 days from March 1, 2024 lands on March 1, 2025, while adding 366 days lands on March 2, 2025, because 2024 is a leap year with an extra February 29.</p>

        <h3>What is the difference between calendar days and business days?</h3>
        <p>Calendar days include every single day in a range, weekends and holidays alike. Business days include only Monday through Friday, which is the standard workweek in most countries. For example, a span of 14 calendar days typically contains 10 business days. Business day counts are critical for shipping estimates, legal filing deadlines, payroll periods, and project scheduling where work only happens on weekdays.</p>
      </section>
      <RelatedTools current="/date-calculator" />
    </div>
  );
}

export default DateCalculator;
