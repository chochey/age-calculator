import { useState } from 'react';
import Seo from '../components/Seo';

function convert(value, fromBase) {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) return null;
  return {
    decimal: decimal.toString(10),
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    hex: decimal.toString(16).toUpperCase(),
  };
}

const bases = [
  { label: 'Decimal (10)', base: 10, id: 'decimal', placeholder: '255' },
  { label: 'Binary (2)', base: 2, id: 'binary', placeholder: '11111111' },
  { label: 'Octal (8)', base: 8, id: 'octal', placeholder: '377' },
  { label: 'Hexadecimal (16)', base: 16, id: 'hex', placeholder: 'FF' },
];

function NumberBaseConverter() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [copied, setCopied] = useState('');

  const result = input.trim() ? convert(input.trim(), fromBase) : null;

  const copy = (val, label) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <Seo title="Number Base Converter - Binary, Decimal, Hex, Octal" description="Free number base converter. Convert between binary, decimal, octal, and hexadecimal instantly. Enter a number in any base and see all conversions." />
      <h1>Number Base Converter</h1>
      <p className="subtitle">Convert between binary, decimal, octal, and hexadecimal.</p>

      <div className="unit-toggle" style={{ marginBottom: '0.75rem' }}>
        {bases.map((b) => (
          <button key={b.base} className={fromBase === b.base ? 'active' : ''} onClick={() => { setFromBase(b.base); setInput(''); }}>
            {b.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="word-textarea code-textarea"
        style={{ fontFamily: 'Consolas, monospace', fontSize: '1.1rem', padding: '0.75rem 1rem' }}
        placeholder={bases.find((b) => b.base === fromBase)?.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      {result && (
        <div className="base-results" style={{ marginTop: '1.25rem' }}>
          {bases.map((b) => (
            <div key={b.id} className="hash-row">
              <div className="hash-header">
                <strong>{b.label}</strong>
                <button onClick={() => copy(result[b.id], b.id)} className="copy-btn">
                  {copied === b.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value" style={{ fontSize: '1rem' }}>{result[b.id]}</code>
            </div>
          ))}
        </div>
      )}

      {input.trim() && !result && (
        <p className="error" style={{ marginTop: '0.75rem' }}>Invalid number for base {fromBase}</p>
      )}

      <section className="info-section">
        <h2>Number Systems</h2>
        <ul>
          <li><strong>Binary (Base 2)</strong> — Uses 0 and 1. Fundamental to computing.</li>
          <li><strong>Octal (Base 8)</strong> — Uses 0-7. Used in Unix file permissions.</li>
          <li><strong>Decimal (Base 10)</strong> — Uses 0-9. Everyday number system.</li>
          <li><strong>Hexadecimal (Base 16)</strong> — Uses 0-9 and A-F. Used in colors, memory addresses.</li>
        </ul>

        <h2>Quick Reference</h2>
        <ul>
          <li><strong>255</strong> = 11111111 (binary) = 377 (octal) = FF (hex)</li>
          <li><strong>42</strong> = 101010 (binary) = 52 (octal) = 2A (hex)</li>
          <li><strong>128</strong> = 10000000 (binary) = 200 (octal) = 80 (hex)</li>
        </ul>
      </section>
    </div>
  );
}

export default NumberBaseConverter;
