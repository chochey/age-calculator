import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function calculateAge(birthDate) {
  const now = new Date();
  const birth = new Date(birthDate);

  if (isNaN(birth.getTime()) || birth > now) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24 + now.getHours() - birth.getHours();
  const totalMinutes = totalHours * 60 + now.getMinutes() - birth.getMinutes();

  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, daysUntilBirthday };
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setResult(calculateAge(birthDate));
  };

  return (
    <div>
      <Seo title="Age Calculator - Calculate Your Exact Age" description="Free online age calculator. Find your exact age in years, months, days, hours, and minutes from your date of birth." />
      <h1>Age Calculator</h1>
      <p className="subtitle">Calculate your exact age in years, months, days, and more.</p>

      <form onSubmit={handleCalculate} className="form">
        <label htmlFor="birthdate">Enter your date of birth</label>
        <input
          type="date"
          id="birthdate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          required
        />
        <button type="submit">Calculate Age</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.years}</span>
            <span className="age-label">years</span>
            <span className="age-number">{result.months}</span>
            <span className="age-label">months</span>
            <span className="age-number">{result.days}</span>
            <span className="age-label">days</span>
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
            <div className="detail-card">
              <span className="detail-value">{result.totalDays.toLocaleString()}</span>
              <span className="detail-label">Total Days</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.totalHours.toLocaleString()}</span>
              <span className="detail-label">Total Hours</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.totalMinutes.toLocaleString()}</span>
              <span className="detail-label">Total Minutes</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.daysUntilBirthday}</span>
              <span className="detail-label">Days Until Next Birthday</span>
            </div>
          </div>
        </div>
      )}

      {result === null && birthDate && (
        <p className="error">Please enter a valid date of birth in the past.</p>
      )}

      <section className="info-section">
        <h2>How to Use This Age Calculator</h2>
        <p>Using this calculator is straightforward. First, click the date input field and select your date of birth using the calendar picker, or type it in directly. Then click the "Calculate Age" button. The tool instantly displays your exact age in years, months, and days, along with detailed breakdowns including total months, total weeks, total days, total hours, and total minutes you have been alive. It also shows how many days remain until your next birthday, which is a fun detail for countdown planning.</p>

        <h2>Understanding the Calculation Method</h2>
        <p>The calculator works by comparing your date of birth to today's date. It subtracts the birth year from the current year and then adjusts for whether you have already passed your birthday this year. For example, if you were born on July 15, 1990, and today is March 13, 2026, the calculator determines you are 35 years, 7 months, and 26 days old. The total days figure is computed by finding the difference in milliseconds between the two dates and dividing by the number of milliseconds in a day (86,400,000). Hours and minutes are derived from the total days multiplied by 24 and 1,440 respectively, with further adjustments for the current time of day.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Filling out government forms, visa applications, and legal documents that require your exact age in years and months</li>
          <li>Verifying age eligibility for insurance policies, retirement benefits, or age-restricted activities</li>
          <li>Calculating the precise age difference between two family members, such as siblings or twins born on different days</li>
          <li>Planning birthday countdowns and milestone celebrations like turning 10,000 days old</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>Does the age calculator account for leap years?</h3>
        <p>Yes. The calculator uses JavaScript's built-in Date object, which correctly handles leap years. February 29 birthdays are fully supported, and the total days count includes all leap days that have occurred between your birth date and today.</p>

        <h3>Why does my age in months not exactly match years times twelve?</h3>
        <p>Total months includes any partial month you have completed. If you are 35 years and 7 months old, your total months will be 427, which equals 35 times 12 plus 7. The remaining days within the current partial month are shown separately in the days field.</p>

        <h3>Can I use this calculator to find someone else's age?</h3>
        <p>Absolutely. Simply enter any person's date of birth and the calculator will determine their current age. This is useful for verifying ages on official paperwork, calculating a child's age for school enrollment cutoffs, or settling friendly debates about who is older.</p>
      </section>
      <RelatedTools current="/age-calculator" />
    </div>
  );
}

export default AgeCalculator;
