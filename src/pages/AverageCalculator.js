import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          The Average Calculator computes key descriptive statistics from any set of numbers
          you provide. Simply type or paste your data and the results update in real time.
          It works with integers, decimals, and negative numbers.
        </p>

        <h2>Understanding the Statistics</h2>
        <ul>
          <li>
            <strong>Mean (Average)</strong> — The sum of all values divided by the number of
            values. This is the most common measure of central tendency.
          </li>
          <li>
            <strong>Median</strong> — The middle value when the numbers are sorted. If there
            is an even number of values, it is the average of the two middle values. The
            median is less affected by outliers than the mean.
          </li>
          <li>
            <strong>Mode</strong> — The value that appears most frequently. A data set can
            have one mode, multiple modes, or no mode at all if every value is unique.
          </li>
          <li>
            <strong>Range</strong> — The difference between the largest and smallest values,
            indicating the spread of the data.
          </li>
          <li>
            <strong>Sum</strong> — The total when all values are added together.
          </li>
          <li>
            <strong>Count</strong> — The total number of values in the data set.
          </li>
          <li>
            <strong>Min / Max</strong> — The smallest and largest values in the set.
          </li>
        </ul>

        <h2>When to Use Mean vs. Median</h2>
        <p>
          The mean works well for symmetrically distributed data without extreme outliers.
          However, when data is skewed or contains outliers (for example, household income
          data), the median often provides a better representation of the "typical" value.
          Using both measures together gives you a more complete picture of your data.
        </p>
      </div>
    </div>
  );
}

export default AverageCalculator;
