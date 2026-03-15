import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function parseNumbers(input) {
  if (!input.trim()) return [];
  return input
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== '' && !isNaN(s))
    .map(Number);
}

function calcMean(nums) {
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

function calcMedian(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calcMode(nums) {
  const freq = {};
  nums.forEach((n) => {
    freq[n] = (freq[n] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(freq));
  if (maxFreq === 1) return null; // all unique — no mode
  const modes = Object.keys(freq)
    .filter((k) => freq[k] === maxFreq)
    .map(Number);
  return modes;
}

function formatNum(n) {
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

function AverageCalculator() {
  const [input, setInput] = useState('');
  const [showSorted, setShowSorted] = useState(false);

  const numbers = parseNumbers(input);
  const hasNumbers = numbers.length > 0;

  const mean = hasNumbers ? calcMean(numbers) : null;
  const median = hasNumbers ? calcMedian(numbers) : null;
  const mode = hasNumbers ? calcMode(numbers) : null;
  const sum = hasNumbers ? numbers.reduce((s, n) => s + n, 0) : null;
  const min = hasNumbers ? Math.min(...numbers) : null;
  const max = hasNumbers ? Math.max(...numbers) : null;
  const range = hasNumbers ? max - min : null;
  const count = numbers.length;
  const sorted = hasNumbers ? [...numbers].sort((a, b) => a - b) : [];

  const handleClear = () => {
    setInput('');
    setShowSorted(false);
  };

  return (
    <div>
      <Seo
        title="Average Calculator – QuickCalcs"
        description="Free online average calculator. Calculate mean, median, mode, range, sum, and more from any set of numbers."
        faqs={[{ q: 'When should I use the mean versus the median?', a: 'Use the mean when your data is roughly symmetrical and free of extreme outliers. Use the median when the data is skewed or contains outliers that pull the average in one direction. For example, in a group of salaries where most people earn around $50,000 but one person earns $5,000,000, the mean would be misleadingly high. The median would far better represent the typical salary. Reporting both values together gives the fullest picture of your data\'s center.' }, { q: 'Can a data set have more than one mode?', a: 'Yes. If two or more values tie for the highest frequency, the data set is called bimodal (two modes) or multimodal (three or more). For instance, in the set 3, 3, 7, 7, 9, both 3 and 7 appear twice, making it bimodal. If every value appears only once, there is no mode at all. This calculator handles all three scenarios and displays each mode separated by commas.' }, { q: 'What is the range and why does it matter?', a: 'The range is simply the difference between the maximum and minimum values -- it tells you how spread out the data is. A small range means values are clustered close together, while a large range indicates wide variation. While the range is easy to compute, it is sensitive to outliers; a single extreme value can inflate it dramatically. For a more robust measure of spread, statisticians often pair the range with standard deviation or interquartile range.' }]}
      />
      <h1>Average Calculator</h1>
      <p className="subtitle">Calculate mean, median, mode &amp; range from a set of numbers.</p>

      <div className="form" style={{ gap: '0.75rem' }}>
        <label htmlFor="number-input" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Enter numbers (separated by commas, spaces, or newlines):
        </label>
        <textarea
          id="number-input"
          className="word-textarea"
          placeholder="e.g. 10, 20, 30, 40, 50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="form-btn secondary" onClick={handleClear}>
            Clear
          </button>
          <button
            className="form-btn"
            onClick={() => setShowSorted((v) => !v)}
            disabled={!hasNumbers}
          >
            {showSorted ? 'Hide Sorted' : 'Show Sorted'}
          </button>
        </div>
      </div>

      {hasNumbers && (
        <div className="results" style={{ marginTop: '1.25rem' }}>
          <div className="primary-result">
            <span className="age-number">{formatNum(mean)}</span>
            <span className="age-label">Mean (Average)</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{formatNum(median)}</span>
              <span className="detail-label">Median</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">
                {mode === null ? 'No mode' : mode.map(formatNum).join(', ')}
              </span>
              <span className="detail-label">Mode</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatNum(range)}</span>
              <span className="detail-label">Range</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatNum(sum)}</span>
              <span className="detail-label">Sum</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{count.toLocaleString()}</span>
              <span className="detail-label">Count</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatNum(min)}</span>
              <span className="detail-label">Min</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatNum(max)}</span>
              <span className="detail-label">Max</span>
            </div>
          </div>
        </div>
      )}

      {!hasNumbers && input.trim() !== '' && (
        <div className="calc-result" style={{ marginTop: '1rem', color: '#dc2626' }}>
          No valid numbers found. Enter numbers separated by commas, spaces, or newlines.
        </div>
      )}

      {showSorted && hasNumbers && (
        <div className="calc-section" style={{ marginTop: '1.25rem' }}>
          <h2>Sorted Numbers ({count})</h2>
          <div
            className="calc-result"
            style={{
              wordBreak: 'break-word',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              lineHeight: '1.6',
            }}
          >
            {sorted.map(formatNum).join(', ')}
          </div>
        </div>
      )}

      <RelatedTools current="/average-calculator" />

      <section className="info-section">
        <h2>How to Use the Average Calculator</h2>
        <p>
          Type or paste your numbers into the text box, separated by commas, spaces, or newlines. Results update in real time as you type -- no need to press a button. The calculator accepts integers, decimals, and negative numbers. Click "Show Sorted" to see your data arranged from smallest to largest. Use the "Clear" button to reset and start over with a new data set.
        </p>

        <h2>How Mean, Median, and Mode Are Calculated</h2>
        <p>
          The <strong>mean</strong> (arithmetic average) is the sum of all values divided by the count. The <strong>median</strong> is the middle value after sorting; for an even number of values, it is the average of the two middle numbers. The <strong>mode</strong> is the value that appears most frequently -- a set can have one mode, multiple modes, or no mode if every value is unique.
        </p>
        <p>
          <strong>Worked example:</strong> Given the data set 12, 15, 15, 18, 22, the sum is 82 and the count is 5, so the mean is 82 / 5 = <strong>16.4</strong>. The sorted list is 12, 15, 15, 18, 22, making the median the third value = <strong>15</strong>. The number 15 appears twice while all others appear once, so the mode is <strong>15</strong>. The range is 22 - 12 = <strong>10</strong>.
        </p>

        <h3>When should I use the mean versus the median?</h3>
        <p>
          Use the mean when your data is roughly symmetrical and free of extreme outliers. Use the median when the data is skewed or contains outliers that pull the average in one direction. For example, in a group of salaries where most people earn around $50,000 but one person earns $5,000,000, the mean would be misleadingly high. The median would far better represent the typical salary. Reporting both values together gives the fullest picture of your data's center.
        </p>

        <h3>Can a data set have more than one mode?</h3>
        <p>
          Yes. If two or more values tie for the highest frequency, the data set is called bimodal (two modes) or multimodal (three or more). For instance, in the set 3, 3, 7, 7, 9, both 3 and 7 appear twice, making it bimodal. If every value appears only once, there is no mode at all. This calculator handles all three scenarios and displays each mode separated by commas.
        </p>

        <h3>What is the range and why does it matter?</h3>
        <p>
          The range is simply the difference between the maximum and minimum values -- it tells you how spread out the data is. A small range means values are clustered close together, while a large range indicates wide variation. While the range is easy to compute, it is sensitive to outliers; a single extreme value can inflate it dramatically. For a more robust measure of spread, statisticians often pair the range with standard deviation or interquartile range.
        </p>
      </section>
    </div>
  );
}

export default AverageCalculator;
