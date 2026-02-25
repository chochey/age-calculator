import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const romanMap = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
];

function numberToRoman(num) {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) {
    return null;
  }
  let result = '';
  let remaining = num;
  for (const { value, numeral } of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

function romanToNumber(str) {
  const upper = str.toUpperCase().trim();
  if (!upper) return null;

  // Validate characters
  if (!/^[IVXLCDM]+$/.test(upper)) {
    return null;
  }

  const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < upper.length; i++) {
    const current = romanValues[upper[i]];
    const next = i + 1 < upper.length ? romanValues[upper[i + 1]] : 0;

    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  // Validate by converting back: the roundtrip must match
  if (total < 1 || total > 3999) return null;
  const roundTrip = numberToRoman(total);
  if (roundTrip !== upper) return null;

  return total;
}

const referenceTable = [
  { numeral: 'I', value: 1 },
  { numeral: 'IV', value: 4 },
  { numeral: 'V', value: 5 },
  { numeral: 'IX', value: 9 },
  { numeral: 'X', value: 10 },
  { numeral: 'XL', value: 40 },
  { numeral: 'L', value: 50 },
  { numeral: 'XC', value: 90 },
  { numeral: 'C', value: 100 },
  { numeral: 'CD', value: 400 },
  { numeral: 'D', value: 500 },
  { numeral: 'CM', value: 900 },
  { numeral: 'M', value: 1000 },
];

function RomanNumeralConverter() {
  const [mode, setMode] = useState('toRoman');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const getResult = () => {
    if (!input.trim()) return null;

    if (mode === 'toRoman') {
      const num = parseInt(input, 10);
      if (isNaN(num)) return { error: 'Please enter a valid number.' };
      if (num < 1 || num > 3999) return { error: 'Number must be between 1 and 3,999.' };
      if (!Number.isInteger(Number(input))) return { error: 'Please enter a whole number.' };
      const roman = numberToRoman(num);
      return roman ? { value: roman, label: 'Roman Numeral' } : { error: 'Could not convert.' };
    } else {
      const upper = input.toUpperCase().trim();
      if (!/^[IVXLCDM]+$/.test(upper)) {
        return { error: 'Invalid characters. Only I, V, X, L, C, D, M are allowed.' };
      }
      const num = romanToNumber(input);
      return num !== null
        ? { value: num.toLocaleString(), label: 'Decimal Number' }
        : { error: 'Invalid Roman numeral. Please check the format.' };
    }
  };

  const result = getResult();

  const copyResult = () => {
    if (!result || result.error) return;
    navigator.clipboard.writeText(String(result.value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Roman Numeral Converter - Numbers to Roman Numerals" description="Free Roman numeral converter. Convert numbers to Roman numerals and back. Supports values from 1 to 3,999 with instant conversion." />
      <h1>Roman Numeral Converter</h1>
      <p className="subtitle">Convert between numbers and Roman numerals instantly.</p>

      <div className="unit-toggle">
        <button
          className={mode === 'toRoman' ? 'active' : ''}
          onClick={() => { setMode('toRoman'); setInput(''); setCopied(false); }}
        >
          Number to Roman
        </button>
        <button
          className={mode === 'toNumber' ? 'active' : ''}
          onClick={() => { setMode('toNumber'); setInput(''); setCopied(false); }}
        >
          Roman to Number
        </button>
      </div>

      <div className="form" style={{ marginTop: '1rem' }}>
        <label htmlFor="roman-input">
          {mode === 'toRoman' ? 'Enter a number (1-3,999)' : 'Enter a Roman numeral'}
        </label>
        <input
          type="text"
          id="roman-input"
          placeholder={mode === 'toRoman' ? 'e.g., 2024' : 'e.g., MMXXIV'}
          value={input}
          onChange={(e) => { setInput(e.target.value); setCopied(false); }}
          style={{ fontFamily: 'Consolas, monospace', fontSize: '1.1rem', padding: '0.75rem 1rem', textTransform: mode === 'toNumber' ? 'uppercase' : 'none' }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {result && result.error && (
        <p className="error" style={{ marginTop: '0.75rem' }}>{result.error}</p>
      )}

      {result && !result.error && (
        <div className="results" style={{ marginTop: '1.25rem' }}>
          <div className="primary-result">
            <span className="age-number" style={{ fontFamily: 'Consolas, monospace', letterSpacing: '0.05em' }}>
              {result.value}
            </span>
            <span className="age-label">{result.label}</span>
          </div>
          <button onClick={copyResult} className="copy-btn" style={{ marginTop: '0.75rem' }}>
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Roman Numeral Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem' }}>
          {referenceTable.map((item) => (
            <div
              key={item.numeral}
              style={{
                background: '#1a1a2e',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '0.6rem 0.75rem',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (mode === 'toRoman') {
                  setInput(String(item.value));
                } else {
                  setInput(item.numeral);
                }
                setCopied(false);
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Consolas, monospace' }}>{item.numeral}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="info-section">
        <h2>How to Use the Roman Numeral Converter</h2>
        <p>Select your conversion direction using the toggle buttons above. In "Number to Roman" mode, enter any whole number between 1 and 3,999 to see its Roman numeral equivalent. In "Roman to Number" mode, type a Roman numeral string to see its decimal value. The conversion happens instantly as you type.</p>

        <h2>Roman Numeral Rules</h2>
        <p>Roman numerals use seven basic symbols: <strong>I</strong> (1), <strong>V</strong> (5), <strong>X</strong> (10), <strong>L</strong> (50), <strong>C</strong> (100), <strong>D</strong> (500), and <strong>M</strong> (1000). Numbers are formed by combining these symbols according to specific rules:</p>
        <ul>
          <li>Symbols are generally written from largest to smallest, left to right, and their values are added together.</li>
          <li>A smaller symbol before a larger one means subtraction: <strong>IV</strong> = 4, <strong>IX</strong> = 9, <strong>XL</strong> = 40, <strong>XC</strong> = 90, <strong>CD</strong> = 400, <strong>CM</strong> = 900.</li>
          <li>A symbol may be repeated up to three times consecutively (e.g., III = 3, XXX = 30).</li>
          <li>V, L, and D are never repeated.</li>
        </ul>

        <h2>Why Does It Stop at 3,999?</h2>
        <p>The standard Roman numeral system using the seven basic symbols (I, V, X, L, C, D, M) can only represent numbers up to 3,999 (MMMCMXCIX). Numbers 4,000 and above historically used a vinculum (an overline) to multiply a numeral by 1,000, but this notation is not commonly supported in modern digital text.</p>

        <h2>Common Roman Numerals</h2>
        <ul>
          <li><strong>2024</strong> = MMXXIV</li>
          <li><strong>2025</strong> = MMXXV</li>
          <li><strong>2026</strong> = MMXXVI</li>
          <li><strong>1999</strong> = MCMXCIX</li>
          <li><strong>1776</strong> = MDCCLXXVI</li>
          <li><strong>100</strong> = C</li>
          <li><strong>50</strong> = L</li>
          <li><strong>14</strong> = XIV</li>
        </ul>

        <h2>Where Are Roman Numerals Used Today?</h2>
        <ul>
          <li>Clock and watch faces</li>
          <li>Super Bowl numbering (e.g., Super Bowl LVIII)</li>
          <li>Movie sequel numbering and copyright dates</li>
          <li>Chapter and volume numbering in books</li>
          <li>Outlines and formal document sections</li>
          <li>Monarch names (e.g., King Charles III)</li>
        </ul>
      </section>
      <RelatedTools current="/roman-numeral-converter" />
    </div>
  );
}

export default RomanNumeralConverter;
