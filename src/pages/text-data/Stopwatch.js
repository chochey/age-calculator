import { useState, useRef, useCallback } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  const hStr = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
  return `${hStr}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    startTimeRef.current = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 10);
  }, [running, elapsed]);

  const stop = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setElapsed(0);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    if (!running) return;
    const prevTotal = laps.length > 0 ? laps.reduce((s, l) => s + l.split, 0) : 0;
    setLaps([...laps, { time: elapsed, split: elapsed - prevTotal }]);
  }, [running, elapsed, laps]);

  const bestLap = laps.length > 1 ? Math.min(...laps.map((l) => l.split)) : null;
  const worstLap = laps.length > 1 ? Math.max(...laps.map((l) => l.split)) : null;

  return (
    <div>
      <Seo title="Online Stopwatch - Free Timer with Laps" description="Free online stopwatch with lap timing. Start, stop, and reset with millisecond precision. Track lap times and splits for workouts, cooking, and more." faqs={[{ q: 'How accurate is this online stopwatch?', a: 'The stopwatch displays centisecond precision (1/100th of a second) and uses timestamp-based calculation rather than simple interval counting. This makes it accurate to within a few milliseconds on modern browsers and devices. While it is not a replacement for professional sports timing equipment with hardware triggers, it is more than sufficient for workouts, cooking, classroom activities, and everyday timing tasks.' }, { q: 'Can I record multiple laps and compare them?', a: 'Yes. You can record as many laps as you need by pressing the "Lap" button while the stopwatch is running. Each lap entry shows both the individual split time (the duration of that single lap) and the cumulative total time. When you have recorded at least two laps, the fastest split is highlighted in green and the slowest in red, so you can instantly see which interval was your strongest and which needs improvement.' }, { q: 'What happens if I accidentally close the browser tab?', a: 'Because the stopwatch runs entirely within your browser session, closing the tab or navigating away will lose the current timer and lap data. If you need to preserve your results, take a screenshot or manually note your times before leaving the page. For timed sessions that must survive page reloads, consider using the Countdown Timer or Pomodoro Timer tools instead, which are designed for longer duration tracking.' }]} />
      <h1>Stopwatch</h1>
      <p className="subtitle">Precise stopwatch with lap timing.</p>

      <div className="stopwatch-display">
        <div className="stopwatch-time">{formatTime(elapsed)}</div>
        <div className="stopwatch-buttons">
          {!running ? (
            <button onClick={start} className="form-btn" style={{ background: '#16a34a' }}>
              {elapsed > 0 ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button onClick={stop} className="form-btn" style={{ background: '#dc2626' }}>Stop</button>
          )}
          {running && <button onClick={lap} className="form-btn secondary">Lap</button>}
          {!running && elapsed > 0 && <button onClick={reset} className="form-btn secondary">Reset</button>}
        </div>
      </div>

      {laps.length > 0 && (
        <div className="lap-list">
          <div className="lap-header">
            <span>Lap</span>
            <span>Split</span>
            <span>Total</span>
          </div>
          {laps.map((l, i) => (
            <div key={i} className={`lap-row ${l.split === bestLap ? 'lap-best' : ''} ${l.split === worstLap ? 'lap-worst' : ''}`}>
              <span>Lap {i + 1}</span>
              <span>{formatTime(l.split)}</span>
              <span>{formatTime(l.time)}</span>
            </div>
          ))}
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Online Stopwatch</h2>
        <p>Click the green "Start" button to begin timing. The display updates in real time, showing minutes, seconds, and centiseconds (hundredths of a second). While the stopwatch is running, press "Lap" to record a split time without stopping the clock -- the lap list appears below with each lap's split duration and cumulative total. Press "Stop" to pause the timer at any point; the button then changes to "Resume" so you can continue from exactly where you left off. When you are finished, press "Reset" to clear the elapsed time and all recorded laps.</p>
        <p>As an example, a runner doing 400-meter repeats on a track could start the stopwatch at the beginning of the first interval, tap "Lap" each time they cross the finish line, and review all split times afterward. The tool highlights the fastest lap in green and the slowest lap in red, making it easy to identify your best and worst efforts at a glance.</p>

        <h2>How the Stopwatch Works</h2>
        <p>The stopwatch records the starting timestamp using JavaScript's Date.now() and runs a high-frequency interval that calculates elapsed milliseconds by subtracting the start time from the current time. This approach ensures accuracy even if the browser briefly pauses the interval, because the elapsed time is always derived from real clock differences rather than accumulated tick counts. When you pause and resume, the tool adjusts the reference timestamp so that paused time is excluded. Lap splits are calculated by subtracting the cumulative time of all previous laps from the current elapsed total.</p>

        <h3>How accurate is this online stopwatch?</h3>
        <p>The stopwatch displays centisecond precision (1/100th of a second) and uses timestamp-based calculation rather than simple interval counting. This makes it accurate to within a few milliseconds on modern browsers and devices. While it is not a replacement for professional sports timing equipment with hardware triggers, it is more than sufficient for workouts, cooking, classroom activities, and everyday timing tasks.</p>

        <h3>Can I record multiple laps and compare them?</h3>
        <p>Yes. You can record as many laps as you need by pressing the "Lap" button while the stopwatch is running. Each lap entry shows both the individual split time (the duration of that single lap) and the cumulative total time. When you have recorded at least two laps, the fastest split is highlighted in green and the slowest in red, so you can instantly see which interval was your strongest and which needs improvement.</p>

        <h3>What happens if I accidentally close the browser tab?</h3>
        <p>Because the stopwatch runs entirely within your browser session, closing the tab or navigating away will lose the current timer and lap data. If you need to preserve your results, take a screenshot or manually note your times before leaving the page. For timed sessions that must survive page reloads, consider using the Countdown Timer or Pomodoro Timer tools instead, which are designed for longer duration tracking.</p>
      </section>
      <RelatedTools current="/stopwatch" />
    </div>
  );
}

export default Stopwatch;
