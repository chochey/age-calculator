import { useState } from 'react';

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length !== 6 && h.length !== 3) return null;
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(full, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function ColorConverter() {
  const [hex, setHex] = useState('#4f46e5');
  const [rgb, setRgb] = useState({ r: 79, g: 70, b: 229 });

  const updateFromHex = (value) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) setRgb(result);
  };

  const updateFromRgb = (key, value) => {
    const newRgb = { ...rgb, [key]: Number(value) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromPicker = (value) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) setRgb(result);
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cssRgb = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const cssHsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const copyValue = (val) => navigator.clipboard.writeText(val);

  return (
    <div>
      <h1>Color Picker & Converter</h1>
      <p className="subtitle">Pick a color and convert between HEX, RGB, and HSL formats.</p>

      <div className="color-preview" style={{ background: hex }}>
        <input
          type="color"
          value={hex.length === 7 ? hex : '#000000'}
          onChange={(e) => updateFromPicker(e.target.value)}
          className="color-input-native"
        />
      </div>

      <div className="color-inputs">
        <div className="calc-section">
          <h2>HEX</h2>
          <div className="color-value-row">
            <input type="text" value={hex} onChange={(e) => updateFromHex(e.target.value)} className="color-text-input" spellCheck={false} />
            <button onClick={() => copyValue(hex)} className="copy-btn">Copy</button>
          </div>
        </div>

        <div className="calc-section">
          <h2>RGB</h2>
          <div className="input-row" style={{ marginBottom: '0.5rem' }}>
            <div className="input-group">
              <label>R</label>
              <input type="number" min="0" max="255" value={rgb.r} onChange={(e) => updateFromRgb('r', e.target.value)} />
            </div>
            <div className="input-group">
              <label>G</label>
              <input type="number" min="0" max="255" value={rgb.g} onChange={(e) => updateFromRgb('g', e.target.value)} />
            </div>
            <div className="input-group">
              <label>B</label>
              <input type="number" min="0" max="255" value={rgb.b} onChange={(e) => updateFromRgb('b', e.target.value)} />
            </div>
          </div>
          <div className="color-value-row">
            <code>{cssRgb}</code>
            <button onClick={() => copyValue(cssRgb)} className="copy-btn">Copy</button>
          </div>
        </div>

        <div className="calc-section">
          <h2>HSL</h2>
          <div className="color-value-row">
            <code>{cssHsl}</code>
            <button onClick={() => copyValue(cssHsl)} className="copy-btn">Copy</button>
          </div>
          <div className="hsl-values">
            <span>Hue: {hsl.h}°</span>
            <span>Saturation: {hsl.s}%</span>
            <span>Lightness: {hsl.l}%</span>
          </div>
        </div>
      </div>

      <section className="info-section">
        <h2>About Color Conversion</h2>
        <p>Use the color picker or enter values manually to convert between HEX, RGB, and HSL color formats. Click "Copy" to grab any value for use in your CSS, design tools, or code.</p>

        <h2>Color Formats</h2>
        <ul>
          <li><strong>HEX</strong> — 6-digit hexadecimal (#FF5733), most common in web development</li>
          <li><strong>RGB</strong> — Red, Green, Blue values 0-255, used in CSS and design tools</li>
          <li><strong>HSL</strong> — Hue, Saturation, Lightness, intuitive for color adjustments</li>
        </ul>
      </section>
    </div>
  );
}

export default ColorConverter;
