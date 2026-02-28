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
        <h2>About the Date Calculator</h2>
        <p>This date calculator lets you add or subtract any number of days from a given date, or find the exact number of days between two dates. It provides both calendar days and business days (excluding weekends) to help with project planning and scheduling.</p>

        <h2>Business Days vs. Calendar Days</h2>
        <p>Calendar days include every day between two dates, while business days exclude Saturdays and Sundays. Business day calculations are essential for project deadlines, shipping estimates, and work scheduling. Note that this calculator does not account for public holidays, which vary by country and region.</p>

        <h2>Common Use Cases</h2>
        <ul>
          <li>Find a deadline date by adding days to a start date</li>
          <li>Calculate delivery dates for shipping and logistics</li>
          <li>Determine due dates for projects and assignments</li>
          <li>Count working days for payroll and scheduling</li>
          <li>Plan events by finding dates a specific number of days in the future</li>
          <li>Calculate contract expiration or renewal dates</li>
        </ul>
      </section>
      <RelatedTools current="/date-calculator" />
    </div>
  );
}

export default DateCalculator;
