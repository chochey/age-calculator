import { useState } from 'react';
import Seo from '../components/Seo';

function GradientGenerator() {
  const [color1, setColor1] = useState('#4f46e5');
  const [color2, setColor2] = useState('#7c3aed');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState('linear');
  const [copied, setCopied] = useState(false);

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const css = `background: ${gradient};`;

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="CSS Gradient Generator - Create Gradients" description="Free CSS gradient generator. Create beautiful linear and radial gradients with a visual picker and copy the CSS code instantly." />
      <h1>CSS Gradient Generator</h1>
      <p className="subtitle">Create beautiful gradients and copy the CSS code.</p>

      <div className="gradient-preview" style={{ background: gradient }} />

      <div className="form">
        <div className="unit-toggle">
          <button className={type === 'linear' ? 'active' : ''} onClick={() => setType('linear')}>Linear</button>
          <button className={type === 'radial' ? 'active' : ''} onClick={() => setType('radial')}>Radial</button>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Color 1</label>
            <div className="color-pick-row">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
              <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} spellCheck={false} style={{ fontFamily: 'Consolas, monospace' }} />
            </div>
          </div>
          <div className="input-group">
            <label>Color 2</label>
            <div className="color-pick-row">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} spellCheck={false} style={{ fontFamily: 'Consolas, monospace' }} />
            </div>
          </div>
        </div>

        {type === 'linear' && (
          <div className="input-group">
            <label>Angle: {angle}°</label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="range-input" />
          </div>
        )}
      </div>

      <div className="converted-output">
        <div className="output-header">
          <strong>CSS Code</strong>
          <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
        </div>
        <code className="gradient-code">{css}</code>
      </div>

      <section className="info-section">
        <h2>About CSS Gradients</h2>
        <p>CSS gradients let you display smooth transitions between two or more colors. They are commonly used for backgrounds, buttons, and decorative elements without needing image files.</p>

        <h2>Gradient Types</h2>
        <ul>
          <li><strong>Linear</strong> — Colors transition along a straight line at a specified angle</li>
          <li><strong>Radial</strong> — Colors radiate outward from a center point</li>
        </ul>
      </section>
    </div>
  );
}

export default GradientGenerator;
