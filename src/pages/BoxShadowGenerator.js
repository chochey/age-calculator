import { useState } from 'react';
import Seo from '../components/Seo';

function BoxShadowGenerator() {
  const [shadows, setShadows] = useState([
    { x: 4, y: 4, blur: 10, spread: 0, color: '#00000040', inset: false },
  ]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(8);
  const [copied, setCopied] = useState(false);

  const updateShadow = (i, field, val) => {
    const next = [...shadows];
    next[i] = { ...next[i], [field]: val };
    setShadows(next);
  };

  const addShadow = () => {
    setShadows([...shadows, { x: 0, y: 4, blur: 8, spread: 0, color: '#00000020', inset: false }]);
  };

  const removeShadow = (i) => {
    if (shadows.length > 1) setShadows(shadows.filter((_, j) => j !== i));
  };

  const cssValue = shadows.map((s) => {
    const inset = s.inset ? 'inset ' : '';
    return `${inset}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
  }).join(', ');

  const fullCss = `box-shadow: ${cssValue};\nborder-radius: ${borderRadius}px;`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="CSS Box Shadow Generator - Visual Shadow Builder" description="Free CSS box shadow generator. Create beautiful box shadows with a visual editor. Multiple shadows, inset, and copy the CSS code instantly." />
      <h1>Box Shadow Generator</h1>
      <p className="subtitle">Create CSS box shadows visually and copy the code.</p>

      <div className="shadow-preview-area" style={{ background: bgColor, padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div className="shadow-box" style={{
          width: '200px', height: '200px', margin: '0 auto',
          background: boxColor, borderRadius: `${borderRadius}px`,
          boxShadow: cssValue,
        }} />
      </div>

      <div className="input-row" style={{ marginBottom: '1rem' }}>
        <div className="input-group">
          <label>Background</label>
          <div className="color-pick-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="color-text-input" />
          </div>
        </div>
        <div className="input-group">
          <label>Box Color</label>
          <div className="color-pick-row">
            <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} />
            <input type="text" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="color-text-input" />
          </div>
        </div>
        <div className="input-group">
          <label>Border Radius: {borderRadius}px</label>
          <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="range-input" />
        </div>
      </div>

      {shadows.map((s, i) => (
        <div key={i} className="shadow-control">
          <div className="shadow-control-header">
            <strong>Shadow {i + 1}</strong>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <label className="checkbox-label" style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" checked={s.inset} onChange={(e) => updateShadow(i, 'inset', e.target.checked)} /> Inset
              </label>
              {shadows.length > 1 && <button onClick={() => removeShadow(i)} className="gpa-remove">&times;</button>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>X: {s.x}px</label>
              <input type="range" min="-50" max="50" value={s.x} onChange={(e) => updateShadow(i, 'x', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Y: {s.y}px</label>
              <input type="range" min="-50" max="50" value={s.y} onChange={(e) => updateShadow(i, 'y', Number(e.target.value))} className="range-input" />
            </div>
          </div>
          <div className="input-row" style={{ marginTop: '0.35rem' }}>
            <div className="input-group">
              <label>Blur: {s.blur}px</label>
              <input type="range" min="0" max="100" value={s.blur} onChange={(e) => updateShadow(i, 'blur', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Spread: {s.spread}px</label>
              <input type="range" min="-50" max="50" value={s.spread} onChange={(e) => updateShadow(i, 'spread', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Color</label>
              <div className="color-pick-row">
                <input type="color" value={s.color.slice(0, 7)} onChange={(e) => updateShadow(i, 'color', e.target.value + (s.color.length > 7 ? s.color.slice(7) : '40'))} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addShadow} className="form-btn secondary" style={{ marginTop: '0.5rem' }}>+ Add Shadow</button>

      <div className="converted-output" style={{ marginTop: '1.25rem' }}>
        <div className="output-header">
          <strong>CSS Code</strong>
          <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
        </div>
        <code className="gradient-code" style={{ whiteSpace: 'pre-wrap' }}>{fullCss}</code>
      </div>

      <section className="info-section">
        <h2>CSS Box Shadow Syntax</h2>
        <p>The box-shadow property accepts: <code>x-offset y-offset blur spread color</code>. Add <code>inset</code> for inner shadows. Multiple shadows are separated by commas.</p>

        <h2>Tips</h2>
        <ul>
          <li>Use subtle shadows (low blur, low opacity) for flat design</li>
          <li>Layer multiple shadows for depth and realism</li>
          <li>Inset shadows work great for input fields and pressed buttons</li>
          <li>Use RGBA colors for transparency control</li>
        </ul>
      </section>
    </div>
  );
}

export default BoxShadowGenerator;
