import { useState, useEffect, useRef } from 'react';
import Seo from '../components/Seo';

function CountdownTimer() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('00:00');
  const [label, setLabel] = useState('');
  const [diff, setDiff] = useState(null);
  const intervalRef = useRef(null);

  const start = () => {
    if (!targetDate) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    const tick = () => {
      const target = new Date(`${targetDate}T${targetTime || '00:00'}`);
      const now = new Date();
      const ms = target - now;
      if (ms <= 0) {
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
        clearInterval(intervalRef.current);
        return;
      }
      const seconds = Math.floor(ms / 1000) % 60;
      const minutes = Math.floor(ms / 60000) % 60;
      const hours = Math.floor(ms / 3600000) % 24;
      const days = Math.floor(ms / 86400000);
      setDiff({ days, hours, minutes, seconds, done: false });
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div>
      <Seo title="Countdown Timer - Days Until Any Date" description="Free online countdown timer. Count down to any date and time. See days, hours, minutes, and seconds remaining until your event." />
      <h1>Countdown Timer</h1>
      <p className="subtitle">Count down to any date and time.</p>

      <div className="form">
        <div className="input-group">
          <label>Event Name (optional)</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="My Birthday" />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Target Date</label>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Time (optional)</label>
            <input type="time" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
          </div>
        </div>
        <button onClick={start} className="form-btn">Start Countdown</button>
      </div>

      {diff && (
        <div className="results">
          {label && <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>{label}</p>}
          {diff.done ? (
            <div className="primary-result">
              <span className="age-number">Time's up!</span>
            </div>
          ) : (
            <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="detail-card">
                <span className="detail-value">{diff.days}</span>
                <span className="detail-label">Days</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{diff.hours}</span>
                <span className="detail-label">Hours</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{diff.minutes}</span>
                <span className="detail-label">Minutes</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{diff.seconds}</span>
                <span className="detail-label">Seconds</span>
              </div>
            </div>
          )}
        </div>
      )}

      <section className="info-section">
        <h2>How It Works</h2>
        <p>Enter a target date and optional time, then hit start. The countdown updates every second, showing the exact days, hours, minutes, and seconds remaining until your event.</p>

        <h2>Popular Countdowns</h2>
        <ul>
          <li>Birthdays and anniversaries</li>
          <li>Holidays (New Year, Christmas, etc.)</li>
          <li>Product launches and deadlines</li>
          <li>Vacation and travel dates</li>
        </ul>
      </section>
    </div>
  );
}

export default CountdownTimer;
