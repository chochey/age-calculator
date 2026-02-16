import { useState } from 'react';
import Seo from '../components/Seo';

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

const commonRatios = [
  { label: '16:9', w: 16, h: 9, desc: 'Widescreen HD' },
  { label: '4:3', w: 4, h: 3, desc: 'Classic TV / iPad' },
  { label: '1:1', w: 1, h: 1, desc: 'Square / Instagram' },
  { label: '21:9', w: 21, h: 9, desc: 'Ultrawide' },
  { label: '9:16', w: 9, h: 16, desc: 'Phone vertical / Stories' },
  { label: '3:2', w: 3, h: 2, desc: 'DSLR photos' },
  { label: '5:4', w: 5, h: 4, desc: 'Large format photos' },
  { label: '2:1', w: 2, h: 1, desc: 'Univisium / 18:9' },
];

function AspectRatioCalc() {
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [newWidth, setNewWidth] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [lockField, setLockField] = useState('width'); // which field user enters to calculate the other

  const w = parseInt(width) || 0;
  const h = parseInt(height) || 0;
  const g = w && h ? gcd(w, h) : 1;
  const ratioW = w && h ? w / g : 0;
  const ratioH = w && h ? h / g : 0;
  const decimal = h ? (w / h).toFixed(4) : '0';

  const calcFromWidth = (val) => {
    setNewWidth(val);
    if (val && w && h) setNewHeight(String(Math.round((Number(val) * h) / w)));
  };

  const calcFromHeight = (val) => {
    setNewHeight(val);
    if (val && w && h) setNewWidth(String(Math.round((Number(val) * w) / h)));
  };

  const applyRatio = (rw, rh) => {
    const baseW = parseInt(width) || 1920;
    setWidth(String(baseW));
    setHeight(String(Math.round(baseW * rh / rw)));
  };

  return (
    <div>
      <Seo title="Aspect Ratio Calculator - Calculate & Resize Dimensions" description="Free aspect ratio calculator. Find the aspect ratio of any dimensions and resize to new widths or heights while maintaining proportions. Common ratios for video, photos, and screens." />
      <h1>Aspect Ratio Calculator</h1>
      <p className="subtitle">Calculate aspect ratios and resize dimensions proportionally.</p>

      <div className="input-row">
        <div className="input-group">
          <label>Width</label>
          <input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="1920" />
        </div>
        <div className="input-group">
          <label>Height</label>
          <input type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="1080" />
        </div>
      </div>

      {w > 0 && h > 0 && (
        <div className="results" style={{ marginTop: '1.25rem' }}>
          <div className="primary-result">
            <span className="age-number">{ratioW}:{ratioH}</span>
            <span className="age-label">aspect ratio</span>
          </div>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{w} x {h}</span>
              <span className="detail-label">Dimensions</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{decimal}</span>
              <span className="detail-label">Decimal Ratio</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{(w * h).toLocaleString()}</span>
              <span className="detail-label">Total Pixels</span>
            </div>
          </div>

          <h3 style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>Resize by</h3>
          <div className="unit-toggle" style={{ marginBottom: '0.75rem' }}>
            <button className={lockField === 'width' ? 'active' : ''} onClick={() => setLockField('width')}>New Width</button>
            <button className={lockField === 'height' ? 'active' : ''} onClick={() => setLockField('height')}>New Height</button>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>New Width</label>
              <input type="number" min="1" value={newWidth} onChange={(e) => lockField === 'width' ? calcFromWidth(e.target.value) : null} placeholder="Enter width" readOnly={lockField === 'height'} />
            </div>
            <div className="input-group">
              <label>New Height</label>
              <input type="number" min="1" value={newHeight} onChange={(e) => lockField === 'height' ? calcFromHeight(e.target.value) : null} placeholder="Enter height" readOnly={lockField === 'width'} />
            </div>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', margin: '1.25rem 0 0.5rem' }}>Common Aspect Ratios</h3>
      <div className="ratio-grid">
        {commonRatios.map((r) => (
          <button key={r.label} className="ratio-card" onClick={() => applyRatio(r.w, r.h)}>
            <strong>{r.label}</strong>
            <span>{r.desc}</span>
          </button>
        ))}
      </div>

      <section className="info-section">
        <h2>What is Aspect Ratio?</h2>
        <p>Aspect ratio is the proportional relationship between width and height. A 16:9 ratio means for every 16 units of width, there are 9 units of height. It's essential for video production, photography, web design, and screen resolution specifications.</p>

        <h2>Common Uses</h2>
        <ul>
          <li><strong>16:9</strong> — YouTube, HDTV, most monitors</li>
          <li><strong>9:16</strong> — TikTok, Instagram Stories, Reels</li>
          <li><strong>1:1</strong> — Instagram posts, profile pictures</li>
          <li><strong>4:3</strong> — iPad, classic presentations</li>
        </ul>
      </section>
    </div>
  );
}

export default AspectRatioCalc;
