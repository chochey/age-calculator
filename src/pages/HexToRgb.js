import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function hexToRgb(hex) {
  const h = hex.replace(/^#/, '');
  if (h.length !== 6 && h.length !== 3) return null;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0'))
    .join('');
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function HexToRgb() {
  const [mode, setMode] = useState('hexToRgb');
  const [hexInput, setHexInput] = useState('#4f46e5');
  const [rVal, setRVal] = useState(79);
  const [gVal, setGVal] = useState(70);
  const [bVal, setBVal] = useState(229);
  const [copied, setCopied] = useState('');

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  // Derived values for HEX-to-RGB mode
  const parsedRgb = hexToRgb(hexInput);
  const hexR = parsedRgb ? parsedRgb.r : 0;
  const hexG = parsedRgb ? parsedRgb.g : 0;
  const hexB = parsedRgb ? parsedRgb.b : 0;
  const hexHsl = parsedRgb ? rgbToHsl(hexR, hexG, hexB) : { h: 0, s: 0, l: 0 };
  const hexPreviewColor = parsedRgb ? rgbToHex(hexR, hexG, hexB) : '#000000';

  // Derived values for RGB-to-HEX mode
  const rgbHex = rgbToHex(rVal, gVal, bVal);
  const rgbHsl = rgbToHsl(rVal, gVal, bVal);
  const rgbPreviewColor = rgbHex;

  const isHexMode = mode === 'hexToRgb';
  const previewColor = isHexMode ? hexPreviewColor : rgbPreviewColor;

  const currentRgb = isHexMode
    ? (parsedRgb ? `rgb(${hexR}, ${hexG}, ${hexB})` : 'rgb(0, 0, 0)')
    : `rgb(${rVal}, ${gVal}, ${bVal})`;
  const currentHex = isHexMode ? (parsedRgb ? rgbToHex(hexR, hexG, hexB) : '#000000') : rgbHex;
  const currentHsl = isHexMode ? hexHsl : rgbHsl;
  const currentHslStr = `hsl(${currentHsl.h}, ${currentHsl.s}%, ${currentHsl.l}%)`;

  return (
    <div>
      <Seo
        title="HEX to RGB Converter - Color Code Converter"
        description="Free HEX to RGB converter. Convert hex color codes to RGB and back. See HSL values, color preview, and copy any format instantly."
      />
      <h1>HEX to RGB Converter</h1>
      <p className="subtitle">Convert between HEX and RGB color codes with live preview and HSL values.</p>

      <div className="unit-toggle">
        <button className={mode === 'hexToRgb' ? 'active' : ''} onClick={() => setMode('hexToRgb')}>
          HEX to RGB
        </button>
        <button className={mode === 'rgbToHex' ? 'active' : ''} onClick={() => setMode('rgbToHex')}>
          RGB to HEX
        </button>
      </div>

      {/* Color Preview */}
      <div
        style={{
          width: '100%',
          height: '120px',
          borderRadius: '12px',
          background: previewColor,
          marginBottom: '1.25rem',
          border: '2px solid #e2e8f0',
          transition: 'background 0.15s ease',
        }}
      />

      <div className="form">
        {isHexMode ? (
          <div className="input-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label>HEX Color Code</label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#4f46e5"
                spellCheck={false}
                style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}
              />
              {!parsedRgb && hexInput.replace(/^#/, '').length > 0 && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Enter a valid 3 or 6 digit hex code
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="input-row">
            <div className="input-group">
              <label>Red (R): {rVal}</label>
              <input
                type="range"
                min="0"
                max="255"
                value={rVal}
                onChange={(e) => setRVal(Number(e.target.value))}
                style={{ accentColor: '#ef4444' }}
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rVal}
                onChange={(e) => setRVal(Math.max(0, Math.min(255, Number(e.target.value) || 0)))}
              />
            </div>
            <div className="input-group">
              <label>Green (G): {gVal}</label>
              <input
                type="range"
                min="0"
                max="255"
                value={gVal}
                onChange={(e) => setGVal(Number(e.target.value))}
                style={{ accentColor: '#22c55e' }}
              />
              <input
                type="number"
                min="0"
                max="255"
                value={gVal}
                onChange={(e) => setGVal(Math.max(0, Math.min(255, Number(e.target.value) || 0)))}
              />
            </div>
            <div className="input-group">
              <label>Blue (B): {bVal}</label>
              <input
                type="range"
                min="0"
                max="255"
                value={bVal}
                onChange={(e) => setBVal(Number(e.target.value))}
                style={{ accentColor: '#3b82f6' }}
              />
              <input
                type="number"
                min="0"
                max="255"
                value={bVal}
                onChange={(e) => setBVal(Math.max(0, Math.min(255, Number(e.target.value) || 0)))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="results">
        <div className="primary-result">
          <span className="age-number" style={{ fontSize: '1.8rem', fontFamily: 'monospace' }}>
            {isHexMode ? currentRgb : currentHex}
          </span>
          <span className="age-label">{isHexMode ? 'RGB Value' : 'HEX Value'}</span>
        </div>

        <div className="hash-results" style={{ marginTop: '1rem' }}>
          <div className="hash-row">
            <div className="hash-header">
              <strong>HEX</strong>
              <button onClick={() => copy('hex', currentHex)} className="copy-btn">
                {copied === 'hex' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="hash-value">{currentHex}</code>
          </div>

          <div className="hash-row">
            <div className="hash-header">
              <strong>RGB</strong>
              <button onClick={() => copy('rgb', currentRgb)} className="copy-btn">
                {copied === 'rgb' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="hash-value">{currentRgb}</code>
          </div>

          <div className="hash-row">
            <div className="hash-header">
              <strong>HSL</strong>
              <button onClick={() => copy('hsl', currentHslStr)} className="copy-btn">
                {copied === 'hsl' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="hash-value">{currentHslStr}</code>
          </div>

          <div className="hash-row">
            <div className="hash-header">
              <strong>HSL Breakdown</strong>
            </div>
            <code className="hash-value">
              Hue: {currentHsl.h}&deg; &nbsp; Saturation: {currentHsl.s}% &nbsp; Lightness: {currentHsl.l}%
            </code>
          </div>

          <div className="hash-row">
            <div className="hash-header">
              <strong>RGB Values</strong>
            </div>
            <code className="hash-value">
              R: {isHexMode ? hexR : rVal} &nbsp; G: {isHexMode ? hexG : gVal} &nbsp; B: {isHexMode ? hexB : bVal}
            </code>
          </div>
        </div>
      </div>

      <section className="info-section">
        <h2>About HEX and RGB Color Codes</h2>
        <p>
          HEX and RGB are two common ways to represent colors in web development and design. HEX codes use a
          six-character hexadecimal format (e.g., #4F46E5), while RGB uses three decimal values from 0 to 255
          representing the red, green, and blue channels. Both formats can express the same 16.7 million colors.
        </p>

        <h2>How HEX to RGB Conversion Works</h2>
        <p>
          A HEX color code like #4F46E5 is split into three pairs: 4F (red), 46 (green), and E5 (blue).
          Each pair is converted from hexadecimal (base 16) to decimal (base 10). So #4F46E5 becomes
          R: 79, G: 70, B: 229. Three-digit shorthand codes like #F0A expand to #FF00AA by doubling each digit.
        </p>

        <h2>What Is HSL?</h2>
        <p>
          HSL stands for Hue, Saturation, and Lightness. Hue is the color angle on a 360-degree wheel (0 = red,
          120 = green, 240 = blue). Saturation is the intensity of the color (0% = gray, 100% = full color).
          Lightness controls brightness (0% = black, 50% = pure color, 100% = white). HSL is often preferred
          for adjusting colors because the parameters are more intuitive than RGB.
        </p>

        <h2>Common Color Formats in CSS</h2>
        <ul>
          <li><strong>HEX:</strong> #FF5733 -- most common in web development</li>
          <li><strong>RGB:</strong> rgb(255, 87, 51) -- used in CSS and JavaScript</li>
          <li><strong>HSL:</strong> hsl(11, 100%, 60%) -- intuitive for adjustments</li>
          <li><strong>RGBA/HSLA:</strong> Same as above but with an alpha (transparency) channel</li>
        </ul>
      </section>
      <RelatedTools current="/hex-to-rgb" />
    </div>
  );
}

export default HexToRgb;
