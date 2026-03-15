import { useState, useMemo } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Cron Expression Builder - Visual Cron Schedule Generator" description="Free visual cron expression builder. Create and understand cron schedules with a point-and-click interface. Human-readable descriptions for any cron expression." faqs={[{ q: 'What is a cron job and where are cron expressions used?', a: 'A cron job is a time-based task scheduler found in Unix and Linux operating systems. The cron daemon reads a configuration file called the crontab, which lists commands paired with cron expressions that define their schedules. Beyond traditional Linux servers, cron expressions are now used in cloud platforms such as AWS EventBridge, Google Cloud Scheduler, and Azure Functions, as well as in CI/CD tools like GitHub Actions and Jenkins. Any system that needs to run recurring tasks on a predictable schedule typically relies on cron syntax.' }, { q: 'What does the asterisk (*) mean in a cron expression?', a: 'The asterisk is a wildcard that matches every possible value for a given field. If you place * in the hour field, the job will run during every hour. Combined with specific values in other fields, the asterisk lets you control exactly which dimensions of time are constrained and which are open. For instance, 0 * * * * runs at minute zero of every hour, every day.' }, { q: 'How do I schedule a cron job to run every 5 minutes?', a: 'Use the step syntax in the minute field: */5 * * * *. The */5 tells the scheduler to trigger at every fifth minute (0, 5, 10, 15, and so on). You can apply the same pattern to other fields as well. For example, 0 */2 * * * runs at the top of every second hour, and 0 0 */3 * * runs at midnight every three days.' }]} />
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
        <h2>How to Use the Cron Expression Builder</h2>
        <p>Building a cron schedule with this tool takes just a few steps. First, either type values directly into the five cron fields (minute, hour, day of month, month, and day of week) or choose one of the quick presets like "Every 5 minutes" or "Weekdays at 8am." As you adjust each field, the full cron expression updates at the top of the page along with a plain-English description of what it means. When you are satisfied with your schedule, click "Copy Expression" to copy the cron string to your clipboard, ready to paste into your crontab, CI/CD pipeline, or task scheduler configuration.</p>

        <h2>Understanding Cron Expression Syntax</h2>
        <p>A standard cron expression consists of five space-separated fields that define when a job should run:</p>
        <code className="gradient-code" style={{ display: 'block', marginBottom: '1rem' }}>minute(0-59) hour(0-23) day-of-month(1-31) month(1-12) day-of-week(0-6)</code>
        <p>Each field accepts specific values, ranges, and special characters. The asterisk (<strong>*</strong>) matches any value, meaning the job runs for every possible value in that position. A comma (<strong>,</strong>) creates a list, such as <code>1,15</code> in the day-of-month field to run on the 1st and 15th. A hyphen (<strong>-</strong>) defines a range, like <code>1-5</code> in the day-of-week field for Monday through Friday. The slash (<strong>/</strong>) sets a step interval, so <code>*/10</code> in the minute field triggers every 10 minutes.</p>
        <p>For example, <code>30 9 * * 1-5</code> means "at 9:30 AM, Monday through Friday." The expression <code>0 0 1 * *</code> runs a job at midnight on the first day of every month. These patterns are used across Linux crontabs, cloud schedulers like AWS CloudWatch Events, GitHub Actions, and Kubernetes CronJobs.</p>

        <h3>What is a cron job and where are cron expressions used?</h3>
        <p>A cron job is a time-based task scheduler found in Unix and Linux operating systems. The cron daemon reads a configuration file called the crontab, which lists commands paired with cron expressions that define their schedules. Beyond traditional Linux servers, cron expressions are now used in cloud platforms such as AWS EventBridge, Google Cloud Scheduler, and Azure Functions, as well as in CI/CD tools like GitHub Actions and Jenkins. Any system that needs to run recurring tasks on a predictable schedule typically relies on cron syntax.</p>

        <h3>What does the asterisk (*) mean in a cron expression?</h3>
        <p>The asterisk is a wildcard that matches every possible value for a given field. If you place <code>*</code> in the hour field, the job will run during every hour. Combined with specific values in other fields, the asterisk lets you control exactly which dimensions of time are constrained and which are open. For instance, <code>0 * * * *</code> runs at minute zero of every hour, every day.</p>

        <h3>How do I schedule a cron job to run every 5 minutes?</h3>
        <p>Use the step syntax in the minute field: <code>*/5 * * * *</code>. The <code>*/5</code> tells the scheduler to trigger at every fifth minute (0, 5, 10, 15, and so on). You can apply the same pattern to other fields as well. For example, <code>0 */2 * * *</code> runs at the top of every second hour, and <code>0 0 */3 * *</code> runs at midnight every three days.</p>
      </section>
      <RelatedTools current="/cron-expression-builder" />
    </div>
  );
}

export default CronBuilder;
