import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 15;

function formatTime12(hours, minutes) {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`;
}

function addMinutes(baseHour, baseMinute, minutesToAdd) {
  const totalMinutes = baseHour * 60 + baseMinute + minutesToAdd;
  const h = ((totalMinutes % 1440) + 1440) % 1440;
  return { hour: Math.floor(h / 60), minute: h % 60 };
}

function subtractMinutes(baseHour, baseMinute, minutesToSubtract) {
  return addMinutes(baseHour, baseMinute, -minutesToSubtract);
}

function SleepCalculator() {
  const [mode, setMode] = useState('wake');
  const [hour, setHour] = useState('7');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (isNaN(h) || isNaN(m) || h < 1 || h > 12 || m < 0 || m > 59) {
      setResults(null);
      return;
    }

    let hour24 = h % 12;
    if (period === 'PM') hour24 += 12;

    const cycles = [6, 5, 4, 3];
    const options = cycles.map((numCycles) => {
      const sleepMinutes = numCycles * CYCLE_MINUTES;
      const totalMinutes = sleepMinutes + FALL_ASLEEP_MINUTES;

      let time;
      if (mode === 'wake') {
        time = subtractMinutes(hour24, m, totalMinutes);
      } else {
        time = addMinutes(hour24, m, totalMinutes);
      }

      return {
        cycles: numCycles,
        sleepHours: (sleepMinutes / 60).toFixed(1),
        totalHours: (totalMinutes / 60).toFixed(1),
        timeLabel: formatTime12(time.hour, time.minute),
        recommended: numCycles >= 5,
      };
    });

    setResults(options);
  };

  return (
    <div>
      <Seo
        title="Sleep Calculator - Find Your Ideal Bedtime & Wake Time"
        description="Free sleep cycle calculator based on 90-minute sleep cycles. Find the best time to go to bed or wake up to feel refreshed. Accounts for 15 minutes to fall asleep."
      />
      <h1>Sleep Calculator</h1>
      <p className="subtitle">Calculate the best times to sleep and wake up based on 90-minute sleep cycles.</p>

      <div className="unit-toggle">
        <button
          className={mode === 'wake' ? 'active' : ''}
          onClick={() => { setMode('wake'); setResults(null); }}
        >
          I want to wake up at...
        </button>
        <button
          className={mode === 'sleep' ? 'active' : ''}
          onClick={() => { setMode('sleep'); setResults(null); }}
        >
          I want to go to bed at...
        </button>
      </div>

      <form onSubmit={handleCalculate} className="form">
        <label style={{ fontWeight: 600, fontSize: '0.95rem', color: '#475569' }}>
          {mode === 'wake' ? 'What time do you want to wake up?' : 'What time do you want to go to bed?'}
        </label>
        <div className="input-row">
          <div className="input-group">
            <label>Hour</label>
            <select
              className="select-input"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Minute</label>
            <select
              className="select-input"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                <option key={m} value={String(m).padStart(2, '0')}>{String(m).padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>AM/PM</label>
            <select
              className="select-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <button type="submit">Calculate Sleep Times</button>
      </form>

      {results && (
        <div className="results">
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.75rem', color: '#0f172a' }}>
            {mode === 'wake'
              ? 'You should go to bed at one of these times:'
              : 'You should wake up at one of these times:'}
          </h3>
          <div className="detail-grid">
            {results.map((option) => (
              <div
                className={`detail-card${option.recommended ? ' highlight' : ''}`}
                key={option.cycles}
              >
                <span className="detail-value" style={{ fontSize: '1.5rem' }}>
                  {option.timeLabel}
                </span>
                <span className="detail-label">
                  {option.cycles} cycles &middot; {option.sleepHours} hrs of sleep
                </span>
                {option.recommended && (
                  <span style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#16a34a',
                    background: '#f0fdf4',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                  }}>
                    Recommended
                  </span>
                )}
              </div>
            ))}
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '1rem',
            marginTop: '0.75rem',
            fontSize: '0.85rem',
            color: '#64748b',
          }}>
            <strong style={{ color: '#475569' }}>Note:</strong> These times account for an average
            of {FALL_ASLEEP_MINUTES} minutes to fall asleep. Each sleep cycle lasts approximately {CYCLE_MINUTES} minutes.
            Waking up at the end of a complete cycle helps you feel more refreshed and alert.
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How Sleep Cycles Work</h2>
        <p>
          Sleep is not a single, uniform state. Throughout the night, your body cycles through distinct
          stages of sleep in roughly 90-minute intervals. Each complete cycle includes both NREM
          (Non-Rapid Eye Movement) and REM (Rapid Eye Movement) sleep. Waking up at the end of a
          complete cycle -- rather than in the middle of one -- helps you feel more rested and alert,
          even if your total sleep time is slightly less.
        </p>

        <h2>The Stages of Sleep</h2>
        <ul>
          <li>
            <strong>Stage 1 (NREM - Light Sleep):</strong> The transition from wakefulness to sleep.
            This stage lasts only a few minutes. Your muscles relax, and your heart rate and breathing
            begin to slow.
          </li>
          <li>
            <strong>Stage 2 (NREM - Light Sleep):</strong> Your body temperature drops and brain waves
            slow down with occasional bursts of activity called sleep spindles. This stage makes up about
            50% of total sleep time.
          </li>
          <li>
            <strong>Stage 3 (NREM - Deep Sleep):</strong> Also called slow-wave sleep, this is the most
            restorative stage. Your body repairs tissues, builds bone and muscle, and strengthens the immune
            system. It is very difficult to wake someone from this stage, and doing so often results in
            grogginess.
          </li>
          <li>
            <strong>REM Sleep:</strong> This stage is when most dreaming occurs. Your brain is highly
            active, processing memories and emotions. Your eyes move rapidly, but your muscles are
            temporarily paralyzed. REM periods get longer as the night progresses, with the longest
            occurring in the final cycles.
          </li>
        </ul>

        <h2>Why 90 Minutes?</h2>
        <p>
          A complete sleep cycle -- progressing through all NREM stages and one REM period -- takes
          approximately 90 minutes. The exact duration varies between individuals (typically 80 to 120
          minutes), but 90 minutes is a well-established average used in sleep science. By timing your
          sleep in multiples of 90 minutes plus about 15 minutes to fall asleep, you increase the
          chance of waking during light sleep rather than deep sleep.
        </p>

        <h2>Recommended Sleep by Age</h2>
        <ul>
          <li><strong>Newborns (0-3 months):</strong> 14-17 hours</li>
          <li><strong>Infants (4-11 months):</strong> 12-15 hours</li>
          <li><strong>Toddlers (1-2 years):</strong> 11-14 hours</li>
          <li><strong>Preschoolers (3-5 years):</strong> 10-13 hours</li>
          <li><strong>School-age children (6-13 years):</strong> 9-11 hours</li>
          <li><strong>Teenagers (14-17 years):</strong> 8-10 hours</li>
          <li><strong>Young adults (18-25 years):</strong> 7-9 hours</li>
          <li><strong>Adults (26-64 years):</strong> 7-9 hours</li>
          <li><strong>Older adults (65+ years):</strong> 7-8 hours</li>
        </ul>

        <h2>Tips for Better Sleep</h2>
        <ul>
          <li><strong>Consistent schedule:</strong> Go to bed and wake up at the same time every day, including weekends.</li>
          <li><strong>Limit blue light:</strong> Avoid screens for at least 30-60 minutes before bedtime, as blue light suppresses melatonin production.</li>
          <li><strong>Cool environment:</strong> Keep your bedroom between 60-67 degrees Fahrenheit (15-19 degrees Celsius) for optimal sleep.</li>
          <li><strong>Avoid caffeine late in the day:</strong> Caffeine has a half-life of about 5-6 hours and can significantly disrupt sleep quality.</li>
          <li><strong>Wind-down routine:</strong> Develop a relaxing pre-sleep routine such as reading, stretching, or meditation.</li>
          <li><strong>Limit naps:</strong> If you must nap, keep it under 20-30 minutes and avoid napping after 3 PM.</li>
        </ul>
      </section>

      <RelatedTools current="/sleep-calculator" />
    </div>
  );
}

export default SleepCalculator;
