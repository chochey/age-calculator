import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Color Palette Generator - Create Color Schemes" description="Free color palette generator. Pick a base color and generate complementary, analogous, triadic, and monochromatic color schemes instantly." faqs={[{ q: 'How does a color palette generator work?', a: 'This tool converts your base color to the HSL color model, which separates hue, saturation, and lightness into independent values. It then calculates new colors by rotating the hue angle on the 360-degree color wheel according to the rules of each scheme type. For example, a complementary color is found by adding 180 degrees to the hue, while triadic colors are spaced at 120-degree intervals. The results are converted back to HEX for easy use in web projects.' }, { q: 'Which color scheme should I use for my website?', a: 'For most websites, an analogous or monochromatic scheme provides a clean, professional look. Use complementary or split-complementary schemes when you need strong visual contrast, such as highlighting buttons or promotional banners. Triadic schemes work best for creative or playful brands. Start with your primary brand color, generate the palette, and test it against real content to see how it reads at different sizes.' }, { q: 'Can I export these colors to my design software?', a: 'Yes. Click any swatch to copy its HEX code to your clipboard. You can paste HEX values directly into Figma, Sketch, Adobe XD, Photoshop, or any CSS file. For bulk use, copy each color in the palette and add them as a saved color set in your design tool of choice.' }]} />
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
        <h2>How to Use the Color Palette Generator</h2>
        <p>Creating a professional color scheme is simple. Click the color preview swatch or use the color picker to select a base color -- for instance, a brand blue like #2563EB. Next, choose a scheme type from the buttons below the picker. The generator will instantly produce a set of harmonious colors based on established color theory principles. Click any swatch in the result to copy its HEX code to your clipboard. You can then paste these values directly into your CSS, design tool, or brand guidelines document.</p>

        <h2>Understanding Color Scheme Types</h2>
        <p>Color harmony is rooted in the relationships between positions on the color wheel. Each scheme type produces a different visual effect, and choosing the right one depends on the mood and purpose of your design.</p>
        <ul>
          <li><strong>Complementary</strong> -- Two colors that sit directly opposite each other on the color wheel, such as blue (#2563EB) and orange (#EB8B25). This pairing creates maximum contrast and is ideal for call-to-action buttons or elements that need to stand out.</li>
          <li><strong>Analogous</strong> -- Three colors that are adjacent on the wheel, like blue, blue-violet, and violet. Analogous palettes feel calm and cohesive, making them a popular choice for backgrounds and editorial layouts.</li>
          <li><strong>Triadic</strong> -- Three colors evenly spaced at 120-degree intervals. A triadic scheme using red, blue, and yellow provides a vibrant, balanced look that works well in illustrations and playful branding.</li>
          <li><strong>Split Complementary</strong> -- A base color paired with the two colors adjacent to its complement. This offers high contrast like complementary schemes but with more nuance and less visual tension.</li>
          <li><strong>Shades</strong> -- Variations of a single hue at different lightness levels, ranging from near-white to near-black. Shades are essential for building depth in UI design, such as hover states, borders, and text hierarchies.</li>
          <li><strong>Monochromatic</strong> -- A single hue at varying saturation levels. Monochromatic palettes create a sophisticated, unified appearance and are often used in minimalist designs.</li>
        </ul>

        <h3>How does a color palette generator work?</h3>
        <p>This tool converts your base color to the HSL color model, which separates hue, saturation, and lightness into independent values. It then calculates new colors by rotating the hue angle on the 360-degree color wheel according to the rules of each scheme type. For example, a complementary color is found by adding 180 degrees to the hue, while triadic colors are spaced at 120-degree intervals. The results are converted back to HEX for easy use in web projects.</p>

        <h3>Which color scheme should I use for my website?</h3>
        <p>For most websites, an analogous or monochromatic scheme provides a clean, professional look. Use complementary or split-complementary schemes when you need strong visual contrast, such as highlighting buttons or promotional banners. Triadic schemes work best for creative or playful brands. Start with your primary brand color, generate the palette, and test it against real content to see how it reads at different sizes.</p>

        <h3>Can I export these colors to my design software?</h3>
        <p>Yes. Click any swatch to copy its HEX code to your clipboard. You can paste HEX values directly into Figma, Sketch, Adobe XD, Photoshop, or any CSS file. For bulk use, copy each color in the palette and add them as a saved color set in your design tool of choice.</p>
      </section>
      <RelatedTools current="/color-palette-generator" />
    </div>
  );
}

export default ColorPalette;
