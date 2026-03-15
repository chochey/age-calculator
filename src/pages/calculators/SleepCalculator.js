import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'Why do I feel tired after sleeping 8 hours?', a: 'Eight hours does not divide evenly into 90-minute cycles. Five cycles total 7.5 hours and six cycles total 9 hours, but 8 hours lands in the middle of a cycle during deep sleep. Waking from deep sleep triggers sleep inertia -- the heavy, foggy feeling that can last 15 to 30 minutes. By aligning your sleep time with complete cycles (for example, 7.5 or 9 hours plus the time to fall asleep), you are far more likely to wake during light sleep and feel refreshed.' }, { q: 'How much sleep do adults actually need?', a: 'The National Sleep Foundation recommends 7 to 9 hours per night for adults aged 18 to 64, and 7 to 8 hours for those 65 and older. That translates to five or six full 90-minute cycles. Individual needs vary based on genetics, activity level, and overall health, but consistently sleeping fewer than six hours is associated with increased risks of obesity, heart disease, and impaired cognitive performance.' }, { q: 'Does the 15-minute fall-asleep estimate apply to everyone?', a: 'Fifteen minutes is a well-established clinical average for healthy adults, but your actual time may differ. If you regularly fall asleep in under five minutes, it could be a sign of sleep deprivation. If it takes 30 minutes or more, consider adjusting the calculation mentally or improving your sleep hygiene -- keeping the room dark and cool, avoiding screens before bed, and following a consistent wind-down routine all help reduce the time it takes to drift off.' }]}
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
        <h2>How to Use the Sleep Calculator</h2>
        <p>
          Choose one of two modes using the toggle at the top. In "I want to wake up at..." mode, enter your desired alarm time and the calculator works backward to suggest ideal bedtimes. In "I want to go to bed at..." mode, enter the time you plan to fall asleep and it shows optimal wake-up times. Select the hour, minute, and AM/PM, then click "Calculate Sleep Times." You will see four options ranging from three to six complete sleep cycles, with five and six cycles marked as recommended for adults.
        </p>

        <h2>The 90-Minute Sleep Cycle Method</h2>
        <p>
          During a normal night, your brain cycles through four distinct stages -- two stages of light sleep, one stage of deep restorative sleep, and one stage of REM (dream) sleep -- in roughly 90-minute intervals. The calculator also adds 15 minutes to account for the average time it takes to fall asleep, giving you a realistic target rather than an idealized one.
        </p>
        <p>
          <strong>Worked example:</strong> If you need to wake up at 7:00 AM, the calculator subtracts 15 minutes (falling asleep) plus multiples of 90 minutes. Six cycles: 7:00 AM minus 9 hours 15 minutes = <strong>9:45 PM</strong>. Five cycles: 7:00 AM minus 7 hours 45 minutes = <strong>11:15 PM</strong>. Waking at the end of a complete cycle -- during light sleep rather than deep sleep -- is what makes you feel alert instead of groggy, even if the total sleep time is slightly shorter.
        </p>

        <h3>Why do I feel tired after sleeping 8 hours?</h3>
        <p>
          Eight hours does not divide evenly into 90-minute cycles. Five cycles total 7.5 hours and six cycles total 9 hours, but 8 hours lands in the middle of a cycle during deep sleep. Waking from deep sleep triggers sleep inertia -- the heavy, foggy feeling that can last 15 to 30 minutes. By aligning your sleep time with complete cycles (for example, 7.5 or 9 hours plus the time to fall asleep), you are far more likely to wake during light sleep and feel refreshed.
        </p>

        <h3>How much sleep do adults actually need?</h3>
        <p>
          The National Sleep Foundation recommends 7 to 9 hours per night for adults aged 18 to 64, and 7 to 8 hours for those 65 and older. That translates to five or six full 90-minute cycles. Individual needs vary based on genetics, activity level, and overall health, but consistently sleeping fewer than six hours is associated with increased risks of obesity, heart disease, and impaired cognitive performance.
        </p>

        <h3>Does the 15-minute fall-asleep estimate apply to everyone?</h3>
        <p>
          Fifteen minutes is a well-established clinical average for healthy adults, but your actual time may differ. If you regularly fall asleep in under five minutes, it could be a sign of sleep deprivation. If it takes 30 minutes or more, consider adjusting the calculation mentally or improving your sleep hygiene -- keeping the room dark and cool, avoiding screens before bed, and following a consistent wind-down routine all help reduce the time it takes to drift off.
        </p>
      </section>

      <RelatedTools current="/sleep-calculator" />
    </div>
  );
}

export default SleepCalculator;
