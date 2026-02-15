import { useState } from 'react';
import Seo from '../components/Seo';

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
        <h2>How to Use the Age Calculator</h2>
        <p>Simply enter your date of birth and click "Calculate Age" to instantly see your exact age broken down into years, months, and days. You'll also see your age expressed in total months, weeks, days, hours, and minutes, plus how many days until your next birthday.</p>

        <h2>Why Use an Age Calculator?</h2>
        <ul>
          <li>Determine exact age for legal documents and forms</li>
          <li>Calculate age differences between people</li>
          <li>Find out how many days until your next birthday</li>
          <li>See fun statistics about your life in hours and minutes</li>
        </ul>
      </section>
    </div>
  );
}

export default AgeCalculator;
