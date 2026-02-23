import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function toScientific(num) {
  if (num === 0) return { coefficient: '0', exponent: 0, notation: '0', eNotation: '0e+0' };
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const coeff = num / Math.pow(10, exp);
  const coeffStr = parseFloat(coeff.toPrecision(10)).toString();
  return {
    coefficient: coeffStr,
    exponent: exp,
    notation: `${coeffStr} x 10^${exp}`,
    eNotation: `${coeffStr}e${exp >= 0 ? '+' : ''}${exp}`,
  };
}

function fromScientific(coeff, exp) {
  return parseFloat(coeff) * Math.pow(10, parseInt(exp));
}

function ScientificNotation() {
  const [mode, setMode] = useState('to'); // 'to' or 'from'
  const [decimal, setDecimal] = useState('');
  const [coeff, setCoeff] = useState('');
  const [exponent, setExponent] = useState('');
  const [copied, setCopied] = useState('');

  const result = mode === 'to' && decimal.trim()
    ? toScientific(parseFloat(decimal))
    : null;

  const fromResult = mode === 'from' && coeff.trim() && exponent.trim()
    ? fromScientific(coeff, exponent)
    : null;

  const copy = (val, label) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <Seo title="Scientific Notation Converter - Convert Numbers Online" description="Free scientific notation converter. Convert numbers to and from scientific notation. Shows coefficient, exponent, and e-notation formats." />
      <h1>Scientific Notation Converter</h1>
      <p className="subtitle">Convert between decimal and scientific notation.</p>

      <div className="unit-toggle" style={{ marginBottom: '1rem' }}>
        <button className={mode === 'to' ? 'active' : ''} onClick={() => setMode('to')}>To Scientific</button>
        <button className={mode === 'from' ? 'active' : ''} onClick={() => setMode('from')}>From Scientific</button>
      </div>

      {mode === 'to' ? (
        <>
          <div className="form">
            <label>Enter a number</label>
            <input type="text" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g. 299792458 or 0.000001" spellCheck={false} />
          </div>
          {result && !isNaN(parseFloat(decimal)) && (
            <div className="results">
              <div className="primary-result" style={{ flexDirection: 'column', gap: '0.25rem' }}>
                <span className="age-number" style={{ fontSize: '1.5rem', fontFamily: 'Consolas, monospace' }}>{result.notation}</span>
              </div>
              <div className="hash-results" style={{ marginTop: '0.75rem' }}>
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Scientific Notation</strong>
                    <button onClick={() => copy(result.notation, 'sci')} className="copy-btn">{copied === 'sci' ? 'Copied!' : 'Copy'}</button>
                  </div>
                  <code className="hash-value" style={{ fontSize: '1rem' }}>{result.notation}</code>
                </div>
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>E-Notation</strong>
                    <button onClick={() => copy(result.eNotation, 'e')} className="copy-btn">{copied === 'e' ? 'Copied!' : 'Copy'}</button>
                  </div>
                  <code className="hash-value" style={{ fontSize: '1rem' }}>{result.eNotation}</code>
                </div>
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Coefficient</strong>
                    <button onClick={() => copy(result.coefficient, 'coeff')} className="copy-btn">{copied === 'coeff' ? 'Copied!' : 'Copy'}</button>
                  </div>
                  <code className="hash-value" style={{ fontSize: '1rem' }}>{result.coefficient}</code>
                </div>
                <div className="hash-row">
                  <div className="hash-header"><strong>Exponent</strong></div>
                  <code className="hash-value" style={{ fontSize: '1rem' }}>{result.exponent}</code>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="form">
            <div className="input-row">
              <div className="input-group" style={{ flex: 2 }}>
                <label>Coefficient</label>
                <input type="text" value={coeff} onChange={(e) => setCoeff(e.target.value)} placeholder="1.5" spellCheck={false} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>x 10^</label>
                <input type="text" value={exponent} onChange={(e) => setExponent(e.target.value)} placeholder="8" spellCheck={false} />
              </div>
            </div>
          </div>
          {fromResult !== null && !isNaN(fromResult) && (
            <div className="results">
              <div className="primary-result" style={{ flexDirection: 'column', gap: '0.25rem' }}>
                <span className="age-number" style={{ fontSize: '1.5rem', fontFamily: 'Consolas, monospace' }}>{fromResult.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 20 })}</span>
                <span className="age-label">decimal value</span>
              </div>
            </div>
          )}
        </>
      )}

      <section className="info-section">
        <h2>What is Scientific Notation?</h2>
        <p>Scientific notation expresses numbers as a coefficient between 1 and 10 multiplied by a power of 10. For example, 299,792,458 becomes 2.99792458 x 10^8. It's used to handle very large or very small numbers efficiently.</p>

        <h2>Examples</h2>
        <ul>
          <li><strong>Speed of light:</strong> 299,792,458 = 2.99792458 x 10^8</li>
          <li><strong>Planck's constant:</strong> 0.000000000000000000000000000000000663 = 6.63 x 10^-34</li>
          <li><strong>Earth's mass:</strong> 5,972,000,000,000,000,000,000,000 kg = 5.972 x 10^24</li>
        </ul>
      </section>
      <RelatedTools current="/scientific-notation-converter" />
    </div>
  );
}

export default ScientificNotation;
