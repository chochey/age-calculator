import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use This Aspect Ratio Calculator</h2>
        <p>Enter the width and height of your image, video, or screen in the input fields at the top. The calculator instantly displays the simplified aspect ratio, the decimal ratio, and the total pixel count. To resize your dimensions while preserving the same proportions, choose whether you want to enter a new width or new height, then type your desired value -- the calculator automatically computes the other dimension. You can also click any of the common aspect ratio presets below to quickly apply standard ratios like 16:9 or 4:3 to your current width.</p>

        <h2>Understanding the Calculation Method</h2>
        <p>The aspect ratio is found by dividing both the width and height by their greatest common divisor (GCD). For example, a resolution of 1920 x 1080 has a GCD of 120, so dividing both values gives 16:9. When resizing, the calculator maintains the ratio by using the formula: <strong>new height = new width x (original height / original width)</strong>. So if you have a 16:9 image and enter a new width of 1280, the new height would be 1280 x (9/16) = 720, giving you a perfect 1280 x 720 resolution.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Resizing video footage for different platforms -- converting a 16:9 YouTube video to 9:16 for TikTok or Instagram Reels</li>
          <li>Preparing images for print at specific dimensions while maintaining their original proportions</li>
          <li>Designing responsive website layouts where elements must scale proportionally across screen sizes</li>
          <li>Choosing the right monitor or TV by understanding how aspect ratio affects viewing experience for gaming, movies, or productivity</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>What aspect ratio should I use for YouTube videos?</h3>
        <p>YouTube's standard player uses 16:9, so resolutions like 1920x1080 (1080p), 2560x1440 (1440p), and 3840x2160 (4K) are ideal. If you upload a video in a different ratio, YouTube will add black bars (letterboxing or pillarboxing) to fit the player. For YouTube Shorts, use 9:16 vertical video at 1080x1920.</p>

        <h3>How do I find the aspect ratio of my monitor?</h3>
        <p>Enter your monitor's native resolution into the width and height fields. Common results include 16:9 for standard widescreen monitors (1920x1080, 2560x1440), 16:10 for productivity monitors (1920x1200, 2560x1600), and 21:9 for ultrawide displays (2560x1080, 3440x1440). The calculator simplifies any resolution to its base ratio automatically.</p>

        <h3>What is the difference between aspect ratio and resolution?</h3>
        <p>Resolution refers to the exact number of pixels in width and height (such as 1920x1080), while aspect ratio is the simplified proportional relationship between those dimensions (16:9). Two different resolutions can share the same aspect ratio -- for instance, 1280x720, 1920x1080, and 3840x2160 are all 16:9. Resolution determines image quality and sharpness, while aspect ratio determines the shape of the frame.</p>
      </section>
      <RelatedTools current="/aspect-ratio-calculator" />
    </div>
  );
}

export default AspectRatioCalc;
