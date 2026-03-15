import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Date Difference Calculator - Days Between Dates" description="Free date difference calculator. Find the exact number of days, weeks, months, and years between any two dates." faqs={[{ q: 'Does the date difference calculator handle leap years?', a: 'Yes. Because the tool uses JavaScript\'s built-in Date object, it inherently accounts for leap years. A span from February 28, 2024 to March 1, 2024 correctly returns 2 days (since 2024 is a leap year with a February 29), whereas the same span in 2023 returns 1 day. You never need to worry about manual leap year adjustments.' }, { q: 'Can I use this to calculate someone\'s exact age?', a: 'Absolutely. Enter the person\'s birth date as the start date and today\'s date (or any other target date) as the end date. The result will show their age in years, months, and days. For a newborn born on June 10, 2023, entering that date and December 25, 2025 shows 2 years, 6 months, and 15 days. This is useful for medical records, school enrollment cutoffs, or milestone celebrations.' }, { q: 'Why do the total months and the year-month breakdown sometimes look different?', a: 'The "years, months, days" breakdown uses calendar logic, so it accounts for months of different lengths (28, 29, 30, or 31 days). The "total months" figure multiplies full years by 12 and adds the remaining months, discarding the leftover days. Both representations are correct but serve different purposes: the breakdown is more human-readable, while total months is useful for billing cycles or lease durations where you need a single month count.' }]} />
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
        <h2>How to Use the Date Difference Calculator</h2>
        <p>Finding the exact time between two dates takes just three steps. First, select a start date using the date picker or type it directly. Second, select an end date. Third, click "Calculate Difference." The tool instantly displays the gap broken down into years, months, and days, plus total months, total weeks, total days, and total hours. The order of the dates does not matter -- if you accidentally enter the later date first, the calculator simply swaps them and still returns a positive result.</p>
        <p>For example, entering January 1, 2020 and March 15, 2025 returns 5 years, 2 months, and 14 days. You also see that the span equals 62 total months, 271 total weeks, 1,900 total days, and 45,600 total hours. This multi-format breakdown is handy for project managers tracking milestones, parents calculating a child's exact age on a certain date, or anyone who needs a precise duration for legal, financial, or personal purposes.</p>

        <h2>How the Calculator Works</h2>
        <p>The calculator determines the earlier and later dates, then computes the difference in years, months, and remaining days by comparing their calendar components. It handles varying month lengths by borrowing days from the previous month when the end day is smaller than the start day, ensuring results like "February 28 to March 1" correctly show 1 day rather than an incorrect negative value. Total days are derived from the absolute millisecond difference divided by the number of milliseconds in a day, and total hours simply multiply that day count by 24. Total weeks are the whole-number quotient of dividing total days by 7.</p>

        <h3>Does the date difference calculator handle leap years?</h3>
        <p>Yes. Because the tool uses JavaScript's built-in Date object, it inherently accounts for leap years. A span from February 28, 2024 to March 1, 2024 correctly returns 2 days (since 2024 is a leap year with a February 29), whereas the same span in 2023 returns 1 day. You never need to worry about manual leap year adjustments.</p>

        <h3>Can I use this to calculate someone's exact age?</h3>
        <p>Absolutely. Enter the person's birth date as the start date and today's date (or any other target date) as the end date. The result will show their age in years, months, and days. For a newborn born on June 10, 2023, entering that date and December 25, 2025 shows 2 years, 6 months, and 15 days. This is useful for medical records, school enrollment cutoffs, or milestone celebrations.</p>

        <h3>Why do the total months and the year-month breakdown sometimes look different?</h3>
        <p>The "years, months, days" breakdown uses calendar logic, so it accounts for months of different lengths (28, 29, 30, or 31 days). The "total months" figure multiplies full years by 12 and adds the remaining months, discarding the leftover days. Both representations are correct but serve different purposes: the breakdown is more human-readable, while total months is useful for billing cycles or lease durations where you need a single month count.</p>
      </section>
      <RelatedTools current="/date-difference-calculator" />
    </div>
  );
}

export default DateDifference;
