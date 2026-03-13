import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the Timestamp Converter</h2>
        <p>Choose a direction using the toggle at the top. In "Timestamp to Date" mode, enter a Unix timestamp (in seconds or milliseconds) and click "Convert" to see the corresponding date in local time, UTC, and ISO 8601 format. Click the "Now" button to instantly populate the field with the current Unix timestamp. In "Date to Timestamp" mode, pick a date and optional time from the calendar and time pickers, then click "Convert" to get the Unix timestamp in both seconds and milliseconds. All results update in a clear card layout so you can quickly compare formats.</p>

        <h2>Understanding Unix Timestamps</h2>
        <p>A Unix timestamp (also called Epoch time or POSIX time) counts the number of seconds that have elapsed since midnight UTC on January 1, 1970, a reference point known as the Unix Epoch. For example, the timestamp <code>1700000000</code> corresponds to November 14, 2023, at 22:13:20 UTC. Most programming languages, databases, and operating systems use this format internally because a single integer is easy to store, sort, and compare. JavaScript's <code>Date.now()</code> returns the time in milliseconds, while Python's <code>time.time()</code> returns seconds with decimal precision.</p>
        <p>This converter automatically detects whether you entered seconds or milliseconds by checking the magnitude of the number. Values greater than one trillion are treated as milliseconds, and smaller values are treated as seconds. This saves you from having to remember which scale your source system uses.</p>

        <h3>What is the Unix Epoch and why does it start on January 1, 1970?</h3>
        <p>The Unix Epoch is the fixed reference point from which Unix timestamps are measured. It was chosen by the designers of the original Unix operating system at Bell Labs in the early 1970s. January 1, 1970, was a convenient recent date at the time. Because the timestamp is simply a count of seconds from that fixed point, it is timezone-agnostic: the same integer represents the same absolute moment everywhere in the world. Time zone differences are applied only when converting the timestamp to a human-readable local date.</p>

        <h3>What is the difference between seconds and milliseconds timestamps?</h3>
        <p>A seconds-based timestamp like <code>1700000000</code> has 10 digits and is the traditional Unix format used by C, Python, PHP, and most databases. A milliseconds-based timestamp like <code>1700000000000</code> has 13 digits and is common in JavaScript (<code>Date.now()</code>), Java (<code>System.currentTimeMillis()</code>), and many REST APIs. The only difference is precision: milliseconds provide finer granularity for performance measurements and event ordering. To convert between the two, multiply seconds by 1000 or divide milliseconds by 1000.</p>

        <h3>How do I handle timestamps across different time zones?</h3>
        <p>Unix timestamps are inherently UTC-based, which makes them ideal for storing and transmitting time data across systems in different time zones. When displaying a timestamp to a user, convert it to their local time zone using your language's date library. In JavaScript, <code>new Date(timestamp * 1000).toLocaleString()</code> automatically renders the date in the browser's local time zone. For server-side applications, libraries like <code>moment-timezone</code>, Python's <code>pytz</code>, or Java's <code>ZonedDateTime</code> let you convert to any specific time zone. Storing raw UTC timestamps in your database and converting to local time only at the display layer is a widely recommended best practice that avoids daylight saving time ambiguities.</p>
      </section>
      <RelatedTools current="/timestamp-converter" />
    </div>
  );
}

export default TimestampConverter;
