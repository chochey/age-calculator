import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
      <Seo title="Color Converter - HEX, RGB, HSL" description="Free color converter and picker. Convert colors between HEX, RGB, and HSL formats with a visual color picker." />
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
        <h2>How to Use the Color Converter</h2>
        <p>Converting colors between formats takes just a few steps with this tool. Start by clicking the large color preview area to open the native color picker, or type a HEX code directly into the HEX input field. As you adjust the color, the RGB and HSL values update in real time. You can also fine-tune individual Red, Green, and Blue channel values using the number inputs under the RGB section. Once you have the color you need, click the "Copy" button next to any format to copy it to your clipboard, ready to paste into your CSS stylesheet, design application, or codebase.</p>

        <h2>How Color Conversion Works</h2>
        <p>Each color format represents the same color in a different notation. A HEX code like #4F46E5 is split into three pairs of hexadecimal digits: 4F for red (79 in decimal), 46 for green (70), and E5 for blue (229). This gives you the equivalent RGB value of rgb(79, 70, 229). To convert to HSL, the tool calculates the hue angle on a 360-degree color wheel, the saturation as a percentage of color intensity, and the lightness as a percentage from black to white. For example, #4F46E5 converts to approximately hsl(243, 76%, 59%), indicating a blue-violet hue with high saturation and medium lightness.</p>

        <h2>Color Formats Explained</h2>
        <ul>
          <li><strong>HEX</strong> -- A six-character hexadecimal string preceded by a hash symbol (e.g., #FF5733). This is the most widely used format in web development and is supported by all browsers and design tools.</li>
          <li><strong>RGB</strong> -- Three decimal values ranging from 0 to 255 representing the Red, Green, and Blue light channels. The CSS syntax is rgb(255, 87, 51). This format is common in both CSS and JavaScript-based color manipulation.</li>
          <li><strong>HSL</strong> -- Stands for Hue, Saturation, and Lightness. Hue is a degree on the color wheel (0-360), Saturation is the vividness (0%-100%), and Lightness controls brightness (0%-100%). Designers often prefer HSL because adjusting a single property produces predictable, intuitive results.</li>
        </ul>

        <h3>What is the difference between HEX and RGB?</h3>
        <p>HEX and RGB represent the exact same color information in different notations. HEX uses a compact base-16 format (#RRGGBB) while RGB uses three base-10 integers from 0 to 255. They are interchangeable and both support the full range of 16.7 million colors. HEX is typically preferred for brevity in stylesheets, while RGB is often used in JavaScript because individual channel values are easier to manipulate programmatically.</p>

        <h3>When should I use HSL instead of HEX or RGB?</h3>
        <p>HSL is ideal when you need to create color variations quickly. Because hue, saturation, and lightness are separate properties, you can darken a color by reducing lightness, desaturate it by lowering saturation, or shift its hue entirely -- all without recalculating red, green, and blue values manually. This makes HSL a strong choice for building design systems and theming.</p>

        <h3>Can I use shorthand HEX codes like #F00?</h3>
        <p>Yes. Three-digit shorthand HEX codes are expanded by doubling each digit, so #F00 becomes #FF0000 (pure red), and #3AF becomes #33AAFF (a light blue). This converter accepts both three-digit and six-digit HEX codes and displays the full six-digit equivalent along with the corresponding RGB and HSL values.</p>
      </section>
      <RelatedTools current="/color-converter" />
    </div>
  );
}

export default ColorConverter;
