import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="CSS Gradient Generator - Create Gradients" description="Free CSS gradient generator. Create beautiful linear and radial gradients with a visual picker and copy the CSS code instantly." faqs={[{ q: 'What is the difference between linear and radial gradients?', a: 'A linear gradient transitions colors along a straight line in a single direction, controlled by an angle value. A radial gradient transitions colors outward from a center point in a circular or elliptical shape. Linear gradients are more common for full-width section backgrounds, while radial gradients are often used for spotlight or glow effects.' }, { q: 'Can I use more than two colors in a CSS gradient?', a: 'Yes. CSS supports multiple color stops in a single gradient declaration. For example, linear-gradient(90deg, #ff0000, #00ff00, #0000ff) creates a rainbow-like transition from red through green to blue. This generator focuses on two-color gradients for simplicity, but you can add extra color stops manually in your CSS after copying the output.' }, { q: 'Do CSS gradients affect page load speed?', a: 'No. CSS gradients are rendered by the browser on the fly and do not require any image downloads. This makes them significantly faster than using gradient image files. They also scale perfectly to any screen size and resolution, including high-DPI retina displays, without any loss in quality.' }]} />
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
        <h2>How to Use the CSS Gradient Generator</h2>
        <p>Creating a gradient takes just a few clicks. First, choose between a linear or radial gradient using the toggle buttons. Next, pick your two colors using the color pickers or by typing HEX codes directly into the text fields. For linear gradients, adjust the angle slider to control the direction of the color transition -- 0 degrees flows bottom to top, 90 degrees flows left to right, and 135 degrees creates a diagonal from the top-left corner. The live preview updates instantly so you can see exactly how the gradient looks. When you are satisfied, click "Copy" to grab the ready-to-use CSS code and paste it into your stylesheet.</p>

        <h2>How CSS Gradients Work</h2>
        <p>CSS gradients are generated natively by the browser and do not require image files, which means they load instantly and scale to any resolution without pixelation. A linear gradient like <code>linear-gradient(135deg, #4f46e5, #7c3aed)</code> tells the browser to blend from indigo to violet along a 135-degree axis. A radial gradient like <code>radial-gradient(circle, #4f46e5, #7c3aed)</code> starts with indigo at the center and transitions outward to violet in a circular pattern. Both types are applied using the CSS <code>background</code> property.</p>

        <h2>Gradient Types Explained</h2>
        <ul>
          <li><strong>Linear Gradient</strong> -- Colors transition along a straight line at a specified angle. Common angles include 0deg (bottom to top), 90deg (left to right), 180deg (top to bottom), and 45deg or 135deg for diagonal effects. Linear gradients are ideal for hero sections, button backgrounds, and navigation bars.</li>
          <li><strong>Radial Gradient</strong> -- Colors radiate outward from a central point in a circular or elliptical pattern. Radial gradients work well for spotlight effects, glowing elements, and decorative backgrounds that draw attention to the center of an element.</li>
        </ul>

        <h2>Practical Tips for Using Gradients</h2>
        <ul>
          <li>Pair colors that are close on the color wheel (e.g., blue to purple) for smooth, natural transitions.</li>
          <li>Use subtle gradients with near-identical colors to add depth to flat designs without being distracting.</li>
          <li>Combine gradients with CSS <code>background-blend-mode</code> or layer them over images for striking visual effects.</li>
          <li>Test your gradient on both light and dark backgrounds to ensure text remains readable.</li>
        </ul>

        <h3>What is the difference between linear and radial gradients?</h3>
        <p>A linear gradient transitions colors along a straight line in a single direction, controlled by an angle value. A radial gradient transitions colors outward from a center point in a circular or elliptical shape. Linear gradients are more common for full-width section backgrounds, while radial gradients are often used for spotlight or glow effects.</p>

        <h3>Can I use more than two colors in a CSS gradient?</h3>
        <p>Yes. CSS supports multiple color stops in a single gradient declaration. For example, <code>linear-gradient(90deg, #ff0000, #00ff00, #0000ff)</code> creates a rainbow-like transition from red through green to blue. This generator focuses on two-color gradients for simplicity, but you can add extra color stops manually in your CSS after copying the output.</p>

        <h3>Do CSS gradients affect page load speed?</h3>
        <p>No. CSS gradients are rendered by the browser on the fly and do not require any image downloads. This makes them significantly faster than using gradient image files. They also scale perfectly to any screen size and resolution, including high-DPI retina displays, without any loss in quality.</p>
      </section>
      <RelatedTools current="/css-gradient-generator" />
    </div>
  );
}

export default GradientGenerator;
