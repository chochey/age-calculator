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
        <h2>How to Use the Scientific Notation Converter</h2>
        <p>
          Choose a direction using the toggle at the top. In "To Scientific" mode, type any decimal number -- however large or small -- and the converter instantly shows the scientific notation, e-notation, coefficient, and exponent. In "From Scientific" mode, enter a coefficient and a power of 10 to see the full decimal value. Click the "Copy" button next to any result to copy it to your clipboard for use in documents, spreadsheets, or code.
        </p>

        <h2>What Is Scientific Notation and How Does It Work?</h2>
        <p>
          Scientific notation expresses a number as a coefficient between 1 and 10 multiplied by a power of 10. The general form is a x 10^n, where 1 {"<="} a {"<"} 10 and n is an integer. Positive exponents represent large numbers, while negative exponents represent small numbers.
        </p>
        <p>
          <strong>Worked example:</strong> The number 0.00047 is converted by moving the decimal point four places to the right until it sits after the first non-zero digit, giving a coefficient of 4.7. Because you moved the decimal right (the original number is less than 1), the exponent is negative: 0.00047 = <strong>4.7 x 10^-4</strong>. In e-notation, that is written as 4.7e-4. Going the other direction, 3.2 x 10^6 means moving the decimal 6 places to the right: <strong>3,200,000</strong>.
        </p>

        <h3>Why is scientific notation useful?</h3>
        <p>
          It makes extremely large and extremely small numbers practical to read, compare, and compute with. Writing out all 24 digits of the Earth's mass (5.972 x 10^24 kg) every time would be unwieldy and error-prone. Scientific notation also makes multiplication and division simpler -- you multiply the coefficients and add (or subtract) the exponents. For instance, (3 x 10^4) x (2 x 10^3) = 6 x 10^7.
        </p>

        <h3>What is the difference between scientific notation and e-notation?</h3>
        <p>
          They represent the same value in different formats. Scientific notation is the traditional written form -- for example, 2.998 x 10^8. E-notation replaces "x 10^" with the letter "e" or "E" -- the same number becomes 2.998e+8. E-notation is widely used in programming languages (Python, JavaScript, C++), calculators, and spreadsheets because it can be typed on a standard keyboard without superscripts.
        </p>

        <h3>How do I convert a number to scientific notation by hand?</h3>
        <p>
          Move the decimal point until only one non-zero digit remains to its left. Count how many places you moved it -- that count becomes the exponent. If you moved the decimal to the left (the original number is large), the exponent is positive. If you moved it to the right (the original number is small), the exponent is negative. For example, 86,400 becomes 8.64 x 10^4 because the decimal moved 4 places left.
        </p>
      </section>
      <RelatedTools current="/scientific-notation-converter" />
    </div>
  );
}

export default ScientificNotation;
