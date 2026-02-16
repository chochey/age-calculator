import { useState, useMemo } from 'react';
import Seo from '../components/Seo';

const fields = [
  { label: 'Minute', range: '0-59', options: Array.from({ length: 60 }, (_, i) => i) },
  { label: 'Hour', range: '0-23', options: Array.from({ length: 24 }, (_, i) => i) },
  { label: 'Day of Month', range: '1-31', options: Array.from({ length: 31 }, (_, i) => i + 1) },
  { label: 'Month', range: '1-12', options: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((m, i) => ({ val: i + 1, label: m })) },
  { label: 'Day of Week', range: '0-6', options: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => ({ val: i, label: d })) },
];

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every Monday at 9am', cron: '0 9 * * 1' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every day at noon', cron: '0 12 * * *' },
  { label: 'First of month at midnight', cron: '0 0 1 * *' },
  { label: 'Weekdays at 8am', cron: '0 8 * * 1-5' },
];

function describeCron(parts) {
  if (parts.length !== 5) return 'Invalid expression';
  const [min, hour, dom, month, dow] = parts;

  let desc = '';

  if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every minute';
  if (min.startsWith('*/')) return `Every ${min.slice(2)} minutes`;
  if (hour === '*' && min !== '*') return `Every hour at minute ${min}`;

  if (min !== '*') desc += `At minute ${min}`;
  if (hour !== '*') desc += `${desc ? ' past' : 'At'} hour ${hour}`;
  if (dom !== '*') desc += `, on day ${dom} of the month`;
  if (month !== '*') desc += `, in month ${month}`;
  if (dow !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mapped = dow.split(',').map((d) => {
      if (d.includes('-')) {
        const [a, b] = d.split('-').map(Number);
        return `${days[a] || d} through ${days[b] || d}`;
      }
      return days[Number(d)] || d;
    }).join(', ');
    desc += `, on ${mapped}`;
  }

  return desc || 'Custom schedule';
}

function CronBuilder() {
  const [values, setValues] = useState(['*', '*', '*', '*', '*']);
  const [copied, setCopied] = useState(false);

  const expression = values.join(' ');

  const description = useMemo(() => describeCron(values), [values]);

  const update = (i, val) => {
    const next = [...values];
    next[i] = val;
    setValues(next);
  };

  const applyPreset = (cron) => setValues(cron.split(' '));

  const copy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Cron Expression Builder - Visual Cron Schedule Generator" description="Free visual cron expression builder. Create and understand cron schedules with a point-and-click interface. Human-readable descriptions for any cron expression." />
      <h1>Cron Expression Builder</h1>
      <p className="subtitle">Build cron schedules visually with human-readable descriptions.</p>

      <div className="results" style={{ marginBottom: '1.25rem' }}>
        <div className="primary-result" style={{ flexDirection: 'column', gap: '0.25rem' }}>
          <span className="age-number" style={{ fontFamily: 'Consolas, monospace' }}>{expression}</span>
          <span className="age-label" style={{ opacity: 1, fontSize: '0.9rem' }}>{description}</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy Expression'}</button>
        </div>
      </div>

      <div className="cron-fields">
        {fields.map((field, i) => (
          <div key={field.label} className="cron-field">
            <label className="cron-field-label">{field.label} <span className="cron-field-range">({field.range})</span></label>
            <input
              type="text"
              value={values[i]}
              onChange={(e) => update(i, e.target.value)}
              className="cron-field-input"
              spellCheck={false}
            />
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '0.95rem', margin: '1.25rem 0 0.5rem' }}>Quick Presets</h3>
      <div className="case-buttons">
        {presets.map((p) => (
          <button key={p.cron} onClick={() => applyPreset(p.cron)} className={expression === p.cron ? 'active-case' : ''}>{p.label}</button>
        ))}
      </div>

      <section className="info-section">
        <h2>Cron Expression Format</h2>
        <p>A cron expression has 5 fields separated by spaces:</p>
        <code className="gradient-code" style={{ display: 'block', marginBottom: '1rem' }}>minute hour day-of-month month day-of-week</code>

        <h2>Special Characters</h2>
        <ul>
          <li><strong>*</strong> — any value</li>
          <li><strong>,</strong> — list separator (e.g., 1,3,5)</li>
          <li><strong>-</strong> — range (e.g., 1-5 for Mon-Fri)</li>
          <li><strong>/</strong> — step (e.g., */5 for every 5 minutes)</li>
        </ul>
      </section>
    </div>
  );
}

export default CronBuilder;
