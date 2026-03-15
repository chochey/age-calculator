import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const timezones = [
  { label: 'UTC (Coordinated Universal Time)', value: 'UTC', offset: 0 },
  { label: 'GMT (Greenwich Mean Time)', value: 'GMT', offset: 0 },
  { label: 'EST (Eastern Standard Time)', value: 'EST', offset: -5 },
  { label: 'EDT (Eastern Daylight Time)', value: 'EDT', offset: -4 },
  { label: 'CST (Central Standard Time)', value: 'CST', offset: -6 },
  { label: 'CDT (Central Daylight Time)', value: 'CDT', offset: -5 },
  { label: 'MST (Mountain Standard Time)', value: 'MST', offset: -7 },
  { label: 'MDT (Mountain Daylight Time)', value: 'MDT', offset: -6 },
  { label: 'PST (Pacific Standard Time)', value: 'PST', offset: -8 },
  { label: 'PDT (Pacific Daylight Time)', value: 'PDT', offset: -7 },
  { label: 'HST (Hawaii Standard Time)', value: 'HST', offset: -10 },
  { label: 'AKST (Alaska Standard Time)', value: 'AKST', offset: -9 },
  { label: 'CET (Central European Time)', value: 'CET', offset: 1 },
  { label: 'EET (Eastern European Time)', value: 'EET', offset: 2 },
  { label: 'IST (India Standard Time)', value: 'IST', offset: 5.5 },
  { label: 'JST (Japan Standard Time)', value: 'JST', offset: 9 },
  { label: 'AEST (Australian Eastern Standard Time)', value: 'AEST', offset: 10 },
  { label: 'NZST (New Zealand Standard Time)', value: 'NZST', offset: 12 },
];

function getOffsetByValue(val) {
  const tz = timezones.find((t) => t.value === val);
  return tz ? tz.offset : 0;
}

function formatTime12(hours24, minutes) {
  const h = ((hours24 % 12) || 12);
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  return `${h}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

function formatTime24(hours24, minutes) {
  return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function getCurrentTimeInZone(offsetHours) {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const zoneMs = utcMs + offsetHours * 3600000;
  const zoneDate = new Date(zoneMs);
  const h = zoneDate.getHours();
  const m = zoneDate.getMinutes();
  const s = zoneDate.getSeconds();
  return {
    time12: formatTime12(h, m) + ':' + String(s).padStart(2, '0'),
    time24: formatTime24(h, m) + ':' + String(s).padStart(2, '0'),
    date: zoneDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
  };
}

function TimeZoneConverter() {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('PM');
  const [sourceZone, setSourceZone] = useState('EST');
  const [targetZone, setTargetZone] = useState('PST');
  const [result, setResult] = useState(null);

  const convert = () => {
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);

    if (isNaN(h) || isNaN(m) || h < 1 || h > 12 || m < 0 || m > 59) {
      setResult(null);
      return;
    }

    // Convert to 24-hour format
    if (ampm === 'AM') {
      h = h === 12 ? 0 : h;
    } else {
      h = h === 12 ? 12 : h + 12;
    }

    const sourceOffset = getOffsetByValue(sourceZone);
    const targetOffset = getOffsetByValue(targetZone);
    const diff = targetOffset - sourceOffset;

    // Convert to minutes for easier math
    const totalSourceMinutes = h * 60 + m;
    const diffMinutes = diff * 60;
    let totalTargetMinutes = totalSourceMinutes + diffMinutes;

    let dayShift = 0;
    if (totalTargetMinutes < 0) {
      totalTargetMinutes += 1440;
      dayShift = -1;
    } else if (totalTargetMinutes >= 1440) {
      totalTargetMinutes -= 1440;
      dayShift = 1;
    }

    const targetH24 = Math.floor(totalTargetMinutes / 60);
    const targetM = Math.round(totalTargetMinutes % 60);

    const dayLabel = dayShift === -1 ? ' (previous day)' : dayShift === 1 ? ' (next day)' : '';

    // Format offset difference
    const diffSign = diff >= 0 ? '+' : '';
    const diffStr = Number.isInteger(diff) ? `${diffSign}${diff}h` : `${diffSign}${diff}h`;

    setResult({
      converted12: formatTime12(targetH24, targetM),
      converted24: formatTime24(targetH24, targetM),
      dayShift: dayLabel,
      offsetDiff: diffStr,
      sourceLabel: sourceZone,
      targetLabel: targetZone,
    });
  };

  const setNow = () => {
    const sourceOffset = getOffsetByValue(sourceZone);
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const zoneMs = utcMs + sourceOffset * 3600000;
    const zoneDate = new Date(zoneMs);
    const h = zoneDate.getHours();
    const m = zoneDate.getMinutes();
    const ampmVal = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    setHour(String(h12));
    setMinute(String(m).padStart(2, '0'));
    setAmpm(ampmVal);
  };

  const sourceNow = getCurrentTimeInZone(getOffsetByValue(sourceZone));
  const targetNow = getCurrentTimeInZone(getOffsetByValue(targetZone));

  return (
    <div>
      <Seo title="Time Zone Converter - World Time Conversion" description="Free time zone converter. Convert times between any time zones worldwide. Includes all major time zones with daylight saving support." faqs={[{ q: 'How do I convert a meeting from EST to IST?', a: 'Set your source zone to EST and target zone to IST, then enter the meeting time. For example, a 10:00 AM EST meeting converts to 8:30 PM IST the same day, because India Standard Time is 10.5 hours ahead of Eastern Standard Time. If daylight saving is in effect on the US side, switch to EDT and the meeting would show as 7:30 PM IST instead.' }, { q: 'Why does the result sometimes say "next day" or "previous day"?', a: 'When the offset difference pushes the converted time past midnight or before midnight, the calendar date changes. For instance, 11:00 PM in New York (EST) is 1:00 PM the next day in Auckland (NZST), because NZST is 17 hours ahead of EST. The "next day" label alerts you to schedule accordingly so you do not accidentally book a meeting on the wrong date.' }, { q: 'Does this tool handle half-hour time zone offsets?', a: 'Yes. India Standard Time (IST) has a UTC+5:30 offset, and the converter fully supports fractional-hour offsets. The math is performed in minutes internally, so conversions involving IST and other half-hour zones are just as accurate as whole-hour conversions. The tool currently covers 18 major time zones spanning UTC-10 through UTC+12, including both standard and daylight variants for US zones.' }]} />
      <h1>Time Zone Converter</h1>
      <p className="subtitle">Convert times between any time zones worldwide.</p>

      <div className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Hour</label>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h} value={String(h)}>{h}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Minute</label>
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <option key={m} value={String(m).padStart(2, '0')}>{String(m).padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>AM/PM</label>
            <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group" style={{ flex: 1 }}>
            <label>From Time Zone</label>
            <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)}>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group" style={{ flex: 1 }}>
            <label>To Time Zone</label>
            <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)}>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row" style={{ gap: '0.5rem' }}>
          <button onClick={convert} className="form-btn">Convert</button>
          <button onClick={setNow} className="form-btn" style={{ whiteSpace: 'nowrap' }}>Now</button>
        </div>
      </div>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.converted12}</span>
            <span className="age-label">{result.targetLabel}{result.dayShift}</span>
          </div>
          <div className="detail-grid" style={{ marginTop: '1rem' }}>
            <div className="detail-card">
              <span className="detail-value">{result.converted12}</span>
              <span className="detail-label">12-Hour Format</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.converted24}</span>
              <span className="detail-label">24-Hour Format</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.offsetDiff}</span>
              <span className="detail-label">Time Difference</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ fontSize: '0.95rem' }}>{result.dayShift || 'Same day'}</span>
              <span className="detail-label">Day Change</span>
            </div>
          </div>
        </div>
      )}

      <div className="detail-grid" style={{ marginTop: '1.5rem' }}>
        <div className="detail-card">
          <span className="detail-value" style={{ fontSize: '1rem' }}>{sourceNow.time12}</span>
          <span className="detail-label">Current Time in {sourceZone}</span>
          <span className="detail-label" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{sourceNow.date}</span>
        </div>
        <div className="detail-card">
          <span className="detail-value" style={{ fontSize: '1rem' }}>{targetNow.time12}</span>
          <span className="detail-label">Current Time in {targetZone}</span>
          <span className="detail-label" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{targetNow.date}</span>
        </div>
      </div>

      <section className="info-section">
        <h2>How to Use the Time Zone Converter</h2>
        <p>Converting a time between zones takes just a few steps. First, set the hour, minute, and AM/PM using the dropdown menus. Next, choose the time zone you are converting from (for example, EST if you are on the US East Coast). Then pick the target time zone you want to convert to (for example, JST if you are scheduling a call with Tokyo). Click "Convert" to instantly see the equivalent time in both 12-hour and 24-hour formats, along with the UTC offset difference and whether the result falls on the same day, the previous day, or the next day. If you want to convert the current moment, press the "Now" button to auto-fill the time fields with the live clock in your source zone.</p>

        <h2>How the Converter Works</h2>
        <p>Each time zone in the tool carries a fixed UTC offset measured in hours (or half-hours for zones like IST at UTC+5:30). When you click "Convert," the tool takes your input time, calculates the offset difference between the source and target zones in minutes, and shifts the time accordingly. If the shifted time goes below 0:00 or above 23:59, the tool wraps it around and flags the result as "previous day" or "next day" so you always know the correct calendar date. The converter also displays the live current time in both the source and target zones beneath the form, updated each time the page loads.</p>

        <h2>Daylight Saving Time</h2>
        <p>Many regions observe daylight saving time (DST), shifting clocks forward by one hour during warmer months. This converter includes both standard and daylight saving variants -- for instance, EST (UTC-5) and EDT (UTC-4) -- so you can select the correct offset for the time of year. If you are unsure which variant is active, check whether your region is currently observing standard or daylight time and choose accordingly.</p>

        <h3>How do I convert a meeting from EST to IST?</h3>
        <p>Set your source zone to EST and target zone to IST, then enter the meeting time. For example, a 10:00 AM EST meeting converts to 8:30 PM IST the same day, because India Standard Time is 10.5 hours ahead of Eastern Standard Time. If daylight saving is in effect on the US side, switch to EDT and the meeting would show as 7:30 PM IST instead.</p>

        <h3>Why does the result sometimes say "next day" or "previous day"?</h3>
        <p>When the offset difference pushes the converted time past midnight or before midnight, the calendar date changes. For instance, 11:00 PM in New York (EST) is 1:00 PM the next day in Auckland (NZST), because NZST is 17 hours ahead of EST. The "next day" label alerts you to schedule accordingly so you do not accidentally book a meeting on the wrong date.</p>

        <h3>Does this tool handle half-hour time zone offsets?</h3>
        <p>Yes. India Standard Time (IST) has a UTC+5:30 offset, and the converter fully supports fractional-hour offsets. The math is performed in minutes internally, so conversions involving IST and other half-hour zones are just as accurate as whole-hour conversions. The tool currently covers 18 major time zones spanning UTC-10 through UTC+12, including both standard and daylight variants for US zones.</p>
      </section>
      <RelatedTools current="/time-zone-converter" />
    </div>
  );
}

export default TimeZoneConverter;
