import { useState, useEffect, useRef } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Countdown Timer - Days Until Any Date" description="Free online countdown timer. Count down to any date and time. See days, hours, minutes, and seconds remaining until your event." faqs={[{ q: 'Can I count down to a specific time of day, not just a date?', a: 'Yes. The time field lets you pick any hour and minute combination. For instance, if a webinar starts at 3:30 PM on April 10, set the date to April 10 and the time to 15:30. The countdown will tick all the way down to that exact minute and second. If you leave the time field at the default 00:00, the countdown targets midnight at the start of the selected day.' }, { q: 'Does the countdown keep running if I leave the page?', a: 'The timer interval stops if you navigate away or close the tab, since it runs inside your browser session. However, if you return to the page and restart the countdown with the same target date, it will recalculate from the current moment and display the correct remaining time. For long-term countdowns like a holiday or birthday months away, simply revisit the page and re-enter your target date to see an up-to-date countdown.' }, { q: 'What are some popular events people count down to?', a: 'Common countdowns include New Year\'s Eve, birthdays, wedding dates, graduations, vacation departures, product launches, Black Friday sales, and project deadlines. Teachers use countdowns for the last day of school, expectant parents count down to a due date, and event planners track days until a conference or concert. Any future moment that matters to you is a great candidate for a countdown timer.' }]} />
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
        <h2>How to Use the Countdown Timer</h2>
        <p>Setting up a countdown takes just a few seconds. Start by entering an optional event name -- for example, "Summer Vacation" or "Product Launch" -- so you can remember what you are counting down to. Next, pick a target date from the date picker. If you need precision down to the minute, set a target time as well (the default is midnight). Finally, click "Start Countdown." The timer immediately begins ticking, displaying the remaining days, hours, minutes, and seconds in real time. When the clock hits zero, the display switches to "Time's up!" so you know the moment has arrived.</p>

        <h2>How the Countdown Timer Works</h2>
        <p>Once you press "Start Countdown," the tool combines your chosen date and time into a single target timestamp. Every second, it calculates the difference between that target and the current moment in milliseconds, then breaks that difference into days, hours, minutes, and seconds for a clean, human-readable display. The timer runs entirely in your browser using a JavaScript interval, so it works even without an internet connection after the page loads. If the target date and time have already passed when you click start, the timer immediately shows "Time's up!" rather than displaying negative values.</p>

        <h3>Can I count down to a specific time of day, not just a date?</h3>
        <p>Yes. The time field lets you pick any hour and minute combination. For instance, if a webinar starts at 3:30 PM on April 10, set the date to April 10 and the time to 15:30. The countdown will tick all the way down to that exact minute and second. If you leave the time field at the default 00:00, the countdown targets midnight at the start of the selected day.</p>

        <h3>Does the countdown keep running if I leave the page?</h3>
        <p>The timer interval stops if you navigate away or close the tab, since it runs inside your browser session. However, if you return to the page and restart the countdown with the same target date, it will recalculate from the current moment and display the correct remaining time. For long-term countdowns like a holiday or birthday months away, simply revisit the page and re-enter your target date to see an up-to-date countdown.</p>

        <h3>What are some popular events people count down to?</h3>
        <p>Common countdowns include New Year's Eve, birthdays, wedding dates, graduations, vacation departures, product launches, Black Friday sales, and project deadlines. Teachers use countdowns for the last day of school, expectant parents count down to a due date, and event planners track days until a conference or concert. Any future moment that matters to you is a great candidate for a countdown timer.</p>
      </section>
      <RelatedTools current="/countdown-timer" />
    </div>
  );
}

export default CountdownTimer;
