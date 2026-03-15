import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Roman Numeral Converter - Numbers to Roman Numerals" description="Free Roman numeral converter. Convert numbers to Roman numerals and back. Supports values from 1 to 3,999 with instant conversion." faqs={[{ q: 'Why does the converter only go up to 3,999?', a: 'The standard seven-symbol Roman numeral system maxes out at MMMCMXCIX (3,999). Historically, numbers 4,000 and above were written by placing a bar (called a vinculum) over a numeral to multiply it by 1,000 -- for example, a V with a bar meant 5,000. Modern digital text does not natively support this overline notation, so most converters and reference materials stick to the 1-3,999 range where the output is unambiguous and universally readable.' }, { q: 'What are the subtractive notation rules?', a: 'Only certain subtractive pairs are valid: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). You cannot subtract a symbol from one more than ten times its value -- for instance, IC is not a valid way to write 99; the correct form is XCIX (90 + 9). Additionally, only powers of ten (I, X, C) can be used as the subtractive element, never V, L, or D. The converter validates input against these rules and rejects malformed strings.' }, { q: 'Where are Roman numerals still used in everyday life?', a: 'Roman numerals remain surprisingly common. Clock and watch faces use them for hour markers. The Super Bowl is numbered with Roman numerals (Super Bowl LIX, for instance). Movie sequels and copyright dates in film credits are often displayed in Roman numerals. Books use them for preface page numbers and chapter headings. Monarchs and popes append them to their names (e.g., King Charles III, Pope John Paul II). Outlines in formal documents and legal filings also rely on Roman numeral ordering.' }]} />
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
        <p>
          Select your conversion direction with the toggle at the top. In "Number to Roman" mode, type any whole number from 1 to 3,999 and the Roman numeral equivalent appears instantly. In "Roman to Number" mode, type a Roman numeral string (such as MMXXVI) to see its decimal value. You can also click any cell in the reference table below to load that value into the converter. Use the "Copy Result" button to paste the output into documents, presentations, or messages.
        </p>

        <h2>How Roman Numeral Conversion Works</h2>
        <p>
          Roman numerals use seven symbols: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). To form a number, list symbols from largest to smallest and add their values. When a smaller symbol appears directly before a larger one, subtract instead of add -- this is called subtractive notation.
        </p>
        <p>
          <strong>Worked example:</strong> Convert the number 1,994 to Roman numerals. Start with the largest symbol that fits: M = 1000, leaving 994. CM = 900 (1000 - 100), leaving 94. XC = 90 (100 - 10), leaving 4. IV = 4 (5 - 1), leaving 0. Concatenate the pieces: <strong>MCMXCIV</strong>. To verify, read it back: M (1000) + CM (900) + XC (90) + IV (4) = 1,994.
        </p>

        <h3>Why does the converter only go up to 3,999?</h3>
        <p>
          The standard seven-symbol Roman numeral system maxes out at MMMCMXCIX (3,999). Historically, numbers 4,000 and above were written by placing a bar (called a vinculum) over a numeral to multiply it by 1,000 -- for example, a V with a bar meant 5,000. Modern digital text does not natively support this overline notation, so most converters and reference materials stick to the 1-3,999 range where the output is unambiguous and universally readable.
        </p>

        <h3>What are the subtractive notation rules?</h3>
        <p>
          Only certain subtractive pairs are valid: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). You cannot subtract a symbol from one more than ten times its value -- for instance, IC is not a valid way to write 99; the correct form is XCIX (90 + 9). Additionally, only powers of ten (I, X, C) can be used as the subtractive element, never V, L, or D. The converter validates input against these rules and rejects malformed strings.
        </p>

        <h3>Where are Roman numerals still used in everyday life?</h3>
        <p>
          Roman numerals remain surprisingly common. Clock and watch faces use them for hour markers. The Super Bowl is numbered with Roman numerals (Super Bowl LIX, for instance). Movie sequels and copyright dates in film credits are often displayed in Roman numerals. Books use them for preface page numbers and chapter headings. Monarchs and popes append them to their names (e.g., King Charles III, Pope John Paul II). Outlines in formal documents and legal filings also rely on Roman numeral ordering.
        </p>
      </section>
      <RelatedTools current="/roman-numeral-converter" />
    </div>
  );
}

export default RomanNumeralConverter;
