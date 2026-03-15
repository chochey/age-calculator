import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplifyRatio(x, y) {
  if (!x || !y) return null;
  const g = gcd(Math.round(x), Math.round(y));
  return { num: Math.round(x) / g, den: Math.round(y) / g };
}

const presets = [
  { label: '1/2 = 2/4', a: '1', b: '2', c: '2', d: '4', empty: '' },
  { label: '3/4 = ?/12', a: '3', b: '4', c: '', d: '12', empty: 'c' },
  { label: '5/? = 15/9', a: '5', b: '', c: '15', d: '9', empty: 'b' },
  { label: '?/7 = 6/21', a: '', b: '7', c: '6', d: '21', empty: 'a' },
  { label: '2/3 = 10/?', a: '2', b: '3', c: '10', d: '', empty: 'd' },
  { label: '4/5 = ?/25', a: '4', b: '5', c: '', d: '25', empty: 'c' },
];

function ProportionCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const solve = (va, vb, vc, vd) => {
    const vals = { a: va, b: vb, c: vc, d: vd };
    const parsed = {};
    let emptyField = null;
    let emptyCount = 0;

    for (const key of ['a', 'b', 'c', 'd']) {
      if (vals[key] === '' || vals[key] === undefined || vals[key] === null) {
        emptyField = key;
        emptyCount++;
      } else {
        const n = parseFloat(vals[key]);
        if (isNaN(n)) {
          setError(`"${vals[key]}" is not a valid number.`);
          setResult(null);
          return;
        }
        parsed[key] = n;
      }
    }

    if (emptyCount === 0) {
      // All four filled — check if the proportion holds
      const lhs = parsed.a * parsed.d;
      const rhs = parsed.b * parsed.c;
      const isValid = Math.abs(lhs - rhs) < 0.0001;
      const leftSimp = simplifyRatio(parsed.a, parsed.b);
      const rightSimp = simplifyRatio(parsed.c, parsed.d);
      setError('');
      setResult({
        solved: null,
        solvedField: null,
        isValid,
        a: parsed.a,
        b: parsed.b,
        c: parsed.c,
        d: parsed.d,
        leftSimp,
        rightSimp,
      });
      return;
    }

    if (emptyCount > 1) {
      setError('Please fill in exactly 3 of the 4 fields. Leave one field empty to solve for it.');
      setResult(null);
      return;
    }

    // Solve for the missing value: a/b = c/d  =>  a*d = b*c
    let solved;
    switch (emptyField) {
      case 'a':
        if (parsed.d === 0) { setError('Cannot solve: d cannot be zero.'); setResult(null); return; }
        solved = (parsed.b * parsed.c) / parsed.d;
        break;
      case 'b':
        if (parsed.c === 0) { setError('Cannot solve: c cannot be zero.'); setResult(null); return; }
        solved = (parsed.a * parsed.d) / parsed.c;
        break;
      case 'c':
        if (parsed.b === 0) { setError('Cannot solve: b cannot be zero.'); setResult(null); return; }
        solved = (parsed.a * parsed.d) / parsed.b;
        break;
      case 'd':
        if (parsed.a === 0) { setError('Cannot solve: a cannot be zero.'); setResult(null); return; }
        solved = (parsed.b * parsed.c) / parsed.a;
        break;
      default:
        break;
    }

    const allVals = { ...parsed, [emptyField]: solved };
    const leftSimp = simplifyRatio(allVals.a, allVals.b);
    const rightSimp = simplifyRatio(allVals.c, allVals.d);

    setError('');
    setResult({
      solved: Number.isInteger(solved) ? solved : parseFloat(solved.toFixed(6)),
      solvedField: emptyField,
      isValid: true,
      a: allVals.a,
      b: allVals.b,
      c: allVals.c,
      d: allVals.d,
      leftSimp,
      rightSimp,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    solve(a, b, c, d);
  };

  const handleClear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult(null);
    setError('');
  };

  const applyPreset = (preset) => {
    setA(preset.a);
    setB(preset.b);
    setC(preset.c);
    setD(preset.d);
    setResult(null);
    setError('');
    // Automatically solve
    solve(preset.a, preset.b, preset.c, preset.d);
  };

  const formatNum = (n) => {
    if (n === null || n === undefined) return '';
    return Number.isInteger(n) ? n.toLocaleString() : parseFloat(n.toFixed(6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div>
      <Seo
        title="Proportion Calculator"
        description="Free proportion calculator. Solve ratios and proportions instantly. Find the missing value in a/b = c/d."
        faqs={[{ q: 'What is the difference between a ratio and a proportion?', a: 'A ratio compares two quantities, such as 3:5, and simply describes how they relate to each other. A proportion is a statement that two ratios are equal, such as 3/5 = 6/10. While every proportion contains ratios, not every pair of ratios forms a valid proportion. You can verify a proportion by cross multiplying -- if the products are equal (3 x 10 = 5 x 6 = 30), the proportion is valid.' }, { q: 'Can proportions involve decimals or fractions?', a: 'Yes. The cross-multiplication method works with any real numbers, including decimals and fractions. For instance, 0.5/1.5 = 2/6 is valid because 0.5 x 6 = 3 and 1.5 x 2 = 3. This calculator accepts any numeric input, including negative numbers and long decimals, and rounds the solved value to up to six decimal places for precision.' }, { q: 'Where are proportions used in everyday life?', a: 'Proportions appear more often than most people realize. Cooks scale recipes by setting up a proportion between servings and ingredient amounts. Travelers convert currencies using an exchange-rate proportion. Architects and engineers use scale drawings where every dimension on paper is proportional to the real structure. Pharmacists calculate drug dosages based on patient weight using proportional relationships. Even resizing a photo without distortion relies on keeping the width-to-height ratio proportional.' }]}
      />
      <h1>Proportion Calculator</h1>
      <p className="subtitle">Solve ratios and find the missing value.</p>

      <form onSubmit={handleSubmit} className="form">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '0 1 120px', minWidth: '90px' }}>
            <label>a</label>
            <input
              type="number"
              step="any"
              placeholder="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
              style={result && result.solvedField === 'a' ? { borderColor: '#4f46e5', background: '#eef2ff', fontWeight: 700 } : {}}
            />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#475569', paddingTop: '1.25rem' }}>/</span>
          <div className="input-group" style={{ flex: '0 1 120px', minWidth: '90px' }}>
            <label>b</label>
            <input
              type="number"
              step="any"
              placeholder="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
              style={result && result.solvedField === 'b' ? { borderColor: '#4f46e5', background: '#eef2ff', fontWeight: 700 } : {}}
            />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#475569', paddingTop: '1.25rem' }}>=</span>
          <div className="input-group" style={{ flex: '0 1 120px', minWidth: '90px' }}>
            <label>c</label>
            <input
              type="number"
              step="any"
              placeholder="c"
              value={c}
              onChange={(e) => setC(e.target.value)}
              style={result && result.solvedField === 'c' ? { borderColor: '#4f46e5', background: '#eef2ff', fontWeight: 700 } : {}}
            />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#475569', paddingTop: '1.25rem' }}>/</span>
          <div className="input-group" style={{ flex: '0 1 120px', minWidth: '90px' }}>
            <label>d</label>
            <input
              type="number"
              step="any"
              placeholder="d"
              value={d}
              onChange={(e) => setD(e.target.value)}
              style={result && result.solvedField === 'd' ? { borderColor: '#4f46e5', background: '#eef2ff', fontWeight: 700 } : {}}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button type="submit" className="form-btn">Solve Proportion</button>
          <button type="button" className="form-btn secondary" onClick={handleClear}>Clear</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="results">
          {result.solvedField ? (
            <div className="primary-result">
              <span className="age-number">{result.solvedField} = {formatNum(result.solved)}</span>
              <span className="age-label">missing value</span>
            </div>
          ) : (
            <div className="primary-result" style={{ background: result.isValid ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
              <span className="age-number">{result.isValid ? 'Valid' : 'Not Valid'}</span>
              <span className="age-label">proportion</span>
            </div>
          )}

          <div className="calc-section">
            <h2>Proportion Statement</h2>
            <div style={{ textAlign: 'center', fontSize: '1.15rem', padding: '0.75rem 0', color: '#0f172a', fontWeight: 500 }}>
              <span style={result.solvedField === 'a' ? { color: '#4f46e5', fontWeight: 700 } : {}}>{formatNum(result.a)}</span>
              {' is to '}
              <span style={result.solvedField === 'b' ? { color: '#4f46e5', fontWeight: 700 } : {}}>{formatNum(result.b)}</span>
              {' as '}
              <span style={result.solvedField === 'c' ? { color: '#4f46e5', fontWeight: 700 } : {}}>{formatNum(result.c)}</span>
              {' is to '}
              <span style={result.solvedField === 'd' ? { color: '#4f46e5', fontWeight: 700 } : {}}>{formatNum(result.d)}</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: '1.25rem', fontFamily: "'Consolas', monospace", color: '#475569', padding: '0.25rem 0' }}>
              {formatNum(result.a)} / {formatNum(result.b)} = {formatNum(result.c)} / {formatNum(result.d)}
            </div>
          </div>

          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">
                {result.leftSimp ? `${result.leftSimp.num}:${result.leftSimp.den}` : '--'}
              </span>
              <span className="detail-label">Left Ratio (simplified)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">
                {result.rightSimp ? `${result.rightSimp.num}:${result.rightSimp.den}` : '--'}
              </span>
              <span className="detail-label">Right Ratio (simplified)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">
                {result.b !== 0 ? parseFloat((result.a / result.b).toFixed(6)) : '--'}
              </span>
              <span className="detail-label">Decimal Value</span>
            </div>
          </div>

          {result.solvedField && (
            <div className="calc-section">
              <h2>Solution Steps</h2>
              <div style={{ padding: '0.5rem 0', color: '#475569', lineHeight: 1.8, fontFamily: "'Consolas', monospace", fontSize: '0.9rem' }}>
                <div>a / b = c / d</div>
                <div>Cross multiply: a &times; d = b &times; c</div>
                {result.solvedField === 'a' && (
                  <>
                    <div>a = (b &times; c) / d</div>
                    <div>a = ({formatNum(result.b)} &times; {formatNum(result.c)}) / {formatNum(result.d)}</div>
                    <div style={{ fontWeight: 700, color: '#4f46e5' }}>a = {formatNum(result.solved)}</div>
                  </>
                )}
                {result.solvedField === 'b' && (
                  <>
                    <div>b = (a &times; d) / c</div>
                    <div>b = ({formatNum(result.a)} &times; {formatNum(result.d)}) / {formatNum(result.c)}</div>
                    <div style={{ fontWeight: 700, color: '#4f46e5' }}>b = {formatNum(result.solved)}</div>
                  </>
                )}
                {result.solvedField === 'c' && (
                  <>
                    <div>c = (a &times; d) / b</div>
                    <div>c = ({formatNum(result.a)} &times; {formatNum(result.d)}) / {formatNum(result.b)}</div>
                    <div style={{ fontWeight: 700, color: '#4f46e5' }}>c = {formatNum(result.solved)}</div>
                  </>
                )}
                {result.solvedField === 'd' && (
                  <>
                    <div>d = (b &times; c) / a</div>
                    <div>d = ({formatNum(result.b)} &times; {formatNum(result.c)}) / {formatNum(result.a)}</div>
                    <div style={{ fontWeight: 700, color: '#4f46e5' }}>d = {formatNum(result.solved)}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="calc-section" style={{ marginTop: '1.5rem' }}>
        <h2>Common Proportion Examples</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>Click a preset to load it and solve instantly.</p>
        <div className="preset-row" style={{ flexWrap: 'wrap' }}>
          {presets.map((p, i) => (
            <button key={i} className="preset-btn" onClick={() => applyPreset(p)} type="button">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <section className="info-section">
        <h2>How to Use the Proportion Calculator</h2>
        <p>
          Enter three of the four values in the proportion a/b = c/d and leave the fourth field blank. Click "Solve Proportion" and the calculator instantly finds the missing value using cross multiplication. If you fill in all four fields, the tool checks whether the proportion is valid. You can also click any of the preset examples below the form to load a common proportion and see it solved immediately. The result section displays the full proportion statement, simplified ratios on both sides, and a step-by-step solution showing the cross-multiplication work.
        </p>

        <h2>The Cross-Multiplication Method with a Worked Example</h2>
        <p>
          Every proportion a/b = c/d can be solved by cross multiplying: a x d = b x c. To isolate any one variable, rearrange the equation. For example, to solve for c, use c = (a x d) / b.
        </p>
        <p>
          <strong>Worked example:</strong> Suppose a recipe that serves 4 people calls for 6 cups of flour, and you want to serve 10 people. Set up the proportion 6/4 = x/10. Cross multiply: 6 x 10 = 4 x x, giving 60 = 4x, so x = 60 / 4 = <strong>15 cups of flour</strong>. The simplified ratio on both sides is 3:2, confirming the proportion holds. This same technique works for unit conversions, map scales, and any situation where two ratios must remain equal.
        </p>

        <h3>What is the difference between a ratio and a proportion?</h3>
        <p>
          A ratio compares two quantities, such as 3:5, and simply describes how they relate to each other. A proportion is a statement that two ratios are equal, such as 3/5 = 6/10. While every proportion contains ratios, not every pair of ratios forms a valid proportion. You can verify a proportion by cross multiplying -- if the products are equal (3 x 10 = 5 x 6 = 30), the proportion is valid.
        </p>

        <h3>Can proportions involve decimals or fractions?</h3>
        <p>
          Yes. The cross-multiplication method works with any real numbers, including decimals and fractions. For instance, 0.5/1.5 = 2/6 is valid because 0.5 x 6 = 3 and 1.5 x 2 = 3. This calculator accepts any numeric input, including negative numbers and long decimals, and rounds the solved value to up to six decimal places for precision.
        </p>

        <h3>Where are proportions used in everyday life?</h3>
        <p>
          Proportions appear more often than most people realize. Cooks scale recipes by setting up a proportion between servings and ingredient amounts. Travelers convert currencies using an exchange-rate proportion. Architects and engineers use scale drawings where every dimension on paper is proportional to the real structure. Pharmacists calculate drug dosages based on patient weight using proportional relationships. Even resizing a photo without distortion relies on keeping the width-to-height ratio proportional.
        </p>
      </section>

      <RelatedTools current="/proportion-calculator" />
    </div>
  );
}

export default ProportionCalculator;
