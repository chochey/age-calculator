import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'How do I convert a HEX color to RGB manually?', a: 'Split the six-digit HEX code into three pairs. Convert each pair from base-16 to base-10. For instance, #FF5733 becomes FF = 255, 57 = 87, 33 = 51, yielding rgb(255, 87, 51). For three-digit shorthand codes, double each digit first: #F53 becomes #FF5533, then convert each pair the same way.' }, { q: 'Why do designers use HSL over HEX or RGB?', a: 'HSL separates a color into three intuitive properties. If you want a darker shade, reduce the lightness value. If you want a pastel version, lower the saturation. With HEX or RGB, achieving the same result requires recalculating all three channel values. This makes HSL especially valuable when building design systems with consistent color scales.' }, { q: 'Are there colors that HEX can represent but RGB cannot?', a: 'No. HEX and RGB are two different notations for the exact same color space. Both cover the full sRGB gamut of 16,777,216 colors (256 x 256 x 256). Every HEX code has a one-to-one RGB equivalent, and vice versa. The choice between them is purely a matter of syntax preference and context.' }]}
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
        <h2>How to Use the HEX to RGB Converter</h2>
        <p>Start by selecting the conversion direction using the toggle at the top. In "HEX to RGB" mode, type or paste a hex color code like #4F46E5 into the input field. The converter instantly displays the corresponding RGB values, HSL breakdown, and a live color preview. In "RGB to HEX" mode, adjust the Red, Green, and Blue sliders or type values from 0 to 255 into the number fields. The tool calculates the HEX equivalent in real time. Click "Copy" next to any output value to copy it to your clipboard for use in CSS, JavaScript, or your preferred design application.</p>

        <h2>How the Conversion Works</h2>
        <p>A HEX color code is a six-character string where each pair of characters represents one color channel in base-16 notation. For example, #4F46E5 breaks down as 4F (red), 46 (green), and E5 (blue). Converting each pair from hexadecimal to decimal gives R: 79, G: 70, B: 229, which is the RGB representation. Three-digit shorthand codes like #F0A are expanded by doubling each digit to produce #FF00AA. The reverse process -- converting RGB to HEX -- takes each decimal channel value, converts it to a two-digit hexadecimal string, and concatenates them with a leading hash symbol.</p>

        <p>This tool also calculates HSL (Hue, Saturation, Lightness) from the RGB values. Hue is expressed as a degree on the 360-degree color wheel (0 is red, 120 is green, 240 is blue). Saturation measures color intensity from 0% (gray) to 100% (fully vivid). Lightness ranges from 0% (black) through 50% (pure color) to 100% (white). For #4F46E5, the HSL result is approximately hsl(243, 76%, 59%), indicating a vibrant blue-violet.</p>

        <h2>Common CSS Color Formats</h2>
        <ul>
          <li><strong>HEX:</strong> #FF5733 -- the most compact notation, widely used in stylesheets and design tools.</li>
          <li><strong>RGB:</strong> rgb(255, 87, 51) -- decimal channel values, useful for dynamic color manipulation in JavaScript.</li>
          <li><strong>HSL:</strong> hsl(11, 100%, 60%) -- separates hue from intensity and brightness, making it intuitive for creating tints, shades, and color variations.</li>
          <li><strong>RGBA / HSLA:</strong> rgb(255, 87, 51, 0.5) or hsl(11, 100%, 60%, 0.5) -- adds an alpha channel for transparency, essential for overlays and semi-transparent UI elements.</li>
        </ul>

        <h3>How do I convert a HEX color to RGB manually?</h3>
        <p>Split the six-digit HEX code into three pairs. Convert each pair from base-16 to base-10. For instance, #FF5733 becomes FF = 255, 57 = 87, 33 = 51, yielding rgb(255, 87, 51). For three-digit shorthand codes, double each digit first: #F53 becomes #FF5533, then convert each pair the same way.</p>

        <h3>Why do designers use HSL over HEX or RGB?</h3>
        <p>HSL separates a color into three intuitive properties. If you want a darker shade, reduce the lightness value. If you want a pastel version, lower the saturation. With HEX or RGB, achieving the same result requires recalculating all three channel values. This makes HSL especially valuable when building design systems with consistent color scales.</p>

        <h3>Are there colors that HEX can represent but RGB cannot?</h3>
        <p>No. HEX and RGB are two different notations for the exact same color space. Both cover the full sRGB gamut of 16,777,216 colors (256 x 256 x 256). Every HEX code has a one-to-one RGB equivalent, and vice versa. The choice between them is purely a matter of syntax preference and context.</p>
      </section>
      <RelatedTools current="/hex-to-rgb" />
    </div>
  );
}

export default HexToRgb;
