import { useState } from 'react';
import Seo from '../components/Seo';

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generatePalette(hex, type) {
  const [h, s, l] = hexToHsl(hex);
  switch (type) {
    case 'complementary':
      return [hex, hslToHex((h + 180) % 360, s, l)];
    case 'analogous':
      return [hslToHex((h - 30 + 360) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l)];
    case 'triadic':
      return [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case 'split-complementary':
      return [hex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case 'shades':
      return [10, 25, 40, 55, 70, 85].map((lv) => hslToHex(h, s, lv));
    case 'monochromatic':
      return [20, 35, 50, 65, 80].map((sv) => hslToHex(h, sv, l));
    default:
      return [hex];
  }
}

const schemes = [
  { id: 'complementary', label: 'Complementary' },
  { id: 'analogous', label: 'Analogous' },
  { id: 'triadic', label: 'Triadic' },
  { id: 'split-complementary', label: 'Split Comp.' },
  { id: 'shades', label: 'Shades' },
  { id: 'monochromatic', label: 'Monochromatic' },
];

function ColorPalette() {
  const [color, setColor] = useState('#4f46e5');
  const [scheme, setScheme] = useState('analogous');
  const [copied, setCopied] = useState('');

  const palette = generatePalette(color, scheme);

  const copy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <Seo title="Color Palette Generator - Create Color Schemes" description="Free color palette generator. Pick a base color and generate complementary, analogous, triadic, and monochromatic color schemes instantly." />
      <h1>Color Palette Generator</h1>
      <p className="subtitle">Generate harmonious color schemes from any base color.</p>

      <div className="palette-controls">
        <div className="palette-picker">
          <div className="color-preview" style={{ background: color, height: '80px' }}>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="color-input-native" />
          </div>
          <code style={{ textAlign: 'center', display: 'block', marginTop: '0.25rem', color: '#475569' }}>{color.toUpperCase()}</code>
        </div>

        <div className="case-buttons" style={{ justifyContent: 'center' }}>
          {schemes.map((s) => (
            <button key={s.id} className={scheme === s.id ? 'active-case' : ''} onClick={() => setScheme(s.id)}>{s.label}</button>
          ))}
        </div>
      </div>

      <div className="palette-swatches">
        {palette.map((hex, i) => (
          <div key={i} className="palette-swatch" onClick={() => copy(hex)}>
            <div className="swatch-color" style={{ background: hex }} />
            <code className="swatch-hex">{copied === hex ? 'Copied!' : hex.toUpperCase()}</code>
          </div>
        ))}
      </div>

      <section className="info-section">
        <h2>Color Scheme Types</h2>
        <ul>
          <li><strong>Complementary</strong> — Two colors opposite on the color wheel. High contrast.</li>
          <li><strong>Analogous</strong> — Three adjacent colors. Harmonious and pleasing.</li>
          <li><strong>Triadic</strong> — Three evenly spaced colors. Vibrant and balanced.</li>
          <li><strong>Split Complementary</strong> — A color plus two adjacent to its complement.</li>
          <li><strong>Shades</strong> — Same hue at different lightness levels.</li>
          <li><strong>Monochromatic</strong> — Same hue at different saturation levels.</li>
        </ul>
      </section>
    </div>
  );
}

export default ColorPalette;
