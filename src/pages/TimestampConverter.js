import { useState } from 'react';
import Seo from '../components/Seo';

function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState('toDate');

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(String(ts));
    convertToDate(ts);
  };

  const convertToDate = (ts) => {
    const num = Number(ts || timestamp);
    if (isNaN(num)) { setResult(null); return; }
    const ms = num > 1e12 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setResult(null); return; }
    setResult({
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      iso: d.toISOString(),
      unix: Math.floor(ms / 1000),
      unixMs: ms,
    });
  };

  const convertToTimestamp = () => {
    if (!dateStr) { setResult(null); return; }
    const d = new Date(`${dateStr}T${timeStr || '00:00'}`);
    if (isNaN(d.getTime())) { setResult(null); return; }
    const ms = d.getTime();
    setResult({
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      iso: d.toISOString(),
      unix: Math.floor(ms / 1000),
      unixMs: ms,
    });
  };

  const handle = () => {
    if (mode === 'toDate') convertToDate();
    else convertToTimestamp();
  };

  return (
    <div>
      <Seo title="Unix Timestamp Converter" description="Free Unix timestamp converter. Convert Unix timestamps to human-readable dates and dates back to Unix timestamps. Supports seconds and milliseconds." />
      <h1>Timestamp Converter</h1>
      <p className="subtitle">Convert between Unix timestamps and human-readable dates.</p>

      <div className="unit-toggle">
        <button className={mode === 'toDate' ? 'active' : ''} onClick={() => { setMode('toDate'); setResult(null); }}>Timestamp → Date</button>
        <button className={mode === 'toTimestamp' ? 'active' : ''} onClick={() => { setMode('toTimestamp'); setResult(null); }}>Date → Timestamp</button>
      </div>

      <div className="form">
        {mode === 'toDate' ? (
          <div className="input-group">
            <label>Unix Timestamp</label>
            <div className="input-row">
              <input type="number" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="1700000000" style={{ flex: 1 }} />
              <button onClick={now} className="form-btn" style={{ whiteSpace: 'nowrap' }}>Now</button>
            </div>
          </div>
        ) : (
          <div className="input-row">
            <div className="input-group">
              <label>Date</label>
              <input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Time (optional)</label>
              <input type="time" value={timeStr} onChange={(e) => setTimeStr(e.target.value)} />
            </div>
          </div>
        )}
        <button onClick={handle} className="form-btn">Convert</button>
      </div>

      {result && (
        <div className="detail-grid" style={{ marginTop: '1rem' }}>
          <div className="detail-card">
            <span className="detail-value">{result.unix}</span>
            <span className="detail-label">Unix (seconds)</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{result.unixMs}</span>
            <span className="detail-label">Unix (milliseconds)</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.95rem' }}>{result.local}</span>
            <span className="detail-label">Local Time</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.95rem' }}>{result.utc}</span>
            <span className="detail-label">UTC</span>
          </div>
          <div className="detail-card highlight" style={{ gridColumn: 'span 2' }}>
            <span className="detail-value" style={{ fontSize: '0.95rem' }}>{result.iso}</span>
            <span className="detail-label">ISO 8601</span>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>What is a Unix Timestamp?</h2>
        <p>A Unix timestamp is the number of seconds since January 1, 1970 (UTC), known as the Unix Epoch. It's used by most programming languages and databases to represent dates and times as a single number.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Storing dates in databases</li>
          <li>API responses and request timestamps</li>
          <li>Debugging time-related bugs</li>
          <li>Comparing dates across time zones</li>
        </ul>
      </section>
    </div>
  );
}

export default TimestampConverter;
