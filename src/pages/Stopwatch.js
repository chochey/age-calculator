import { useState, useRef, useCallback } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
      <Seo title="Online Stopwatch - Free Timer with Laps" description="Free online stopwatch with lap timing. Start, stop, and reset with millisecond precision. Track lap times and splits for workouts, cooking, and more." />
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
        <h2>How to Use</h2>
        <p>Click Start to begin timing. Use the Lap button to record split times while the stopwatch keeps running. Stop to pause, Resume to continue, or Reset to start over.</p>

        <h2>Features</h2>
        <ul>
          <li>Centisecond (1/100s) precision</li>
          <li>Unlimited lap recording with split times</li>
          <li>Best lap highlighted in green, worst in red</li>
          <li>Pause and resume without losing time</li>
        </ul>
      </section>
      <RelatedTools current="/stopwatch" />
    </div>
  );
}

export default Stopwatch;
