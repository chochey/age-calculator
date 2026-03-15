import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function BoxShadowGenerator() {
  const [shadows, setShadows] = useState([
    { x: 4, y: 4, blur: 10, spread: 0, color: '#00000040', inset: false },
  ]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(8);
  const [copied, setCopied] = useState(false);

  const updateShadow = (i, field, val) => {
    const next = [...shadows];
    next[i] = { ...next[i], [field]: val };
    setShadows(next);
  };

  const addShadow = () => {
    setShadows([...shadows, { x: 0, y: 4, blur: 8, spread: 0, color: '#00000020', inset: false }]);
  };

  const removeShadow = (i) => {
    if (shadows.length > 1) setShadows(shadows.filter((_, j) => j !== i));
  };

  const cssValue = shadows.map((s) => {
    const inset = s.inset ? 'inset ' : '';
    return `${inset}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
  }).join(', ');

  const fullCss = `box-shadow: ${cssValue};\nborder-radius: ${borderRadius}px;`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="CSS Box Shadow Generator - Visual Shadow Builder" description="Free CSS box shadow generator. Create beautiful box shadows with a visual editor. Multiple shadows, inset, and copy the CSS code instantly." faqs={[{ q: 'What do the X-offset and Y-offset values control?', a: 'The X-offset moves the shadow horizontally (positive values go right, negative values go left) and the Y-offset moves it vertically (positive goes down, negative goes up). Setting both to 0 creates a shadow that is evenly distributed around the element, which works well for glow effects. Typical card shadows use a Y-offset of 2-6 pixels with an X-offset of 0 to simulate overhead lighting.' }, { q: 'How do blur and spread differ?', a: 'Blur controls the softness of the shadow edges. A blur of 0 produces a hard, sharp-edged shadow, while higher values create a gradual fade. Spread controls the size of the shadow relative to the element. Positive spread values make the shadow larger than the box, while negative values shrink it. Combining a small positive blur with a negative spread is a popular technique for creating tight, subtle drop shadows.' }, { q: 'Can I use multiple box shadows on one element?', a: 'Yes. CSS allows you to stack as many box shadows as you need by separating each shadow definition with a comma. Layering multiple shadows at different offsets, blur levels, and opacities is the key to achieving realistic material-design-style elevation. This generator supports adding and removing shadow layers so you can experiment with multi-shadow effects visually before copying the final CSS.' }]} />
      <h1>Box Shadow Generator</h1>
      <p className="subtitle">Create CSS box shadows visually and copy the code.</p>

      <div className="shadow-preview-area" style={{ background: bgColor, padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div className="shadow-box" style={{
          width: '200px', height: '200px', margin: '0 auto',
          background: boxColor, borderRadius: `${borderRadius}px`,
          boxShadow: cssValue,
        }} />
      </div>

      <div className="input-row" style={{ marginBottom: '1rem' }}>
        <div className="input-group">
          <label>Background</label>
          <div className="color-pick-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="color-text-input" />
          </div>
        </div>
        <div className="input-group">
          <label>Box Color</label>
          <div className="color-pick-row">
            <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} />
            <input type="text" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="color-text-input" />
          </div>
        </div>
        <div className="input-group">
          <label>Border Radius: {borderRadius}px</label>
          <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="range-input" />
        </div>
      </div>

      {shadows.map((s, i) => (
        <div key={i} className="shadow-control">
          <div className="shadow-control-header">
            <strong>Shadow {i + 1}</strong>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <label className="checkbox-label" style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" checked={s.inset} onChange={(e) => updateShadow(i, 'inset', e.target.checked)} /> Inset
              </label>
              {shadows.length > 1 && <button onClick={() => removeShadow(i)} className="gpa-remove">&times;</button>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>X: {s.x}px</label>
              <input type="range" min="-50" max="50" value={s.x} onChange={(e) => updateShadow(i, 'x', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Y: {s.y}px</label>
              <input type="range" min="-50" max="50" value={s.y} onChange={(e) => updateShadow(i, 'y', Number(e.target.value))} className="range-input" />
            </div>
          </div>
          <div className="input-row" style={{ marginTop: '0.35rem' }}>
            <div className="input-group">
              <label>Blur: {s.blur}px</label>
              <input type="range" min="0" max="100" value={s.blur} onChange={(e) => updateShadow(i, 'blur', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Spread: {s.spread}px</label>
              <input type="range" min="-50" max="50" value={s.spread} onChange={(e) => updateShadow(i, 'spread', Number(e.target.value))} className="range-input" />
            </div>
            <div className="input-group">
              <label>Color</label>
              <div className="color-pick-row">
                <input type="color" value={s.color.slice(0, 7)} onChange={(e) => updateShadow(i, 'color', e.target.value + (s.color.length > 7 ? s.color.slice(7) : '40'))} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addShadow} className="form-btn secondary" style={{ marginTop: '0.5rem' }}>+ Add Shadow</button>

      <div className="converted-output" style={{ marginTop: '1.25rem' }}>
        <div className="output-header">
          <strong>CSS Code</strong>
          <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
        </div>
        <code className="gradient-code" style={{ whiteSpace: 'pre-wrap' }}>{fullCss}</code>
      </div>

      <section className="info-section">
        <h2>How to Use the Box Shadow Generator</h2>
        <p>Start by adjusting the sliders for your first shadow layer. The X and Y sliders control the horizontal and vertical offset of the shadow, while Blur sets how soft the edges appear and Spread controls how far the shadow extends beyond the box. Use the color picker to set the shadow color -- semi-transparent blacks like #00000040 produce natural-looking results. To create more complex depth effects, click "+ Add Shadow" to layer multiple shadows on the same element. You can also toggle the "Inset" checkbox to create inner shadows. Customize the box color, background color, and border radius to match your design. When your shadow looks right, click "Copy" to grab the generated CSS code.</p>

        <h2>Understanding CSS Box Shadow Syntax</h2>
        <p>The CSS <code>box-shadow</code> property follows this pattern: <code>x-offset y-offset blur-radius spread-radius color</code>. For example, <code>box-shadow: 4px 4px 10px 0px #00000040</code> creates a shadow offset 4 pixels to the right and 4 pixels down, with a 10-pixel blur and no spread, using a semi-transparent black. Adding the <code>inset</code> keyword at the beginning moves the shadow inside the element, which is useful for simulating pressed buttons or recessed input fields. You can combine multiple shadow values separated by commas to build layered lighting effects.</p>

        <h2>Design Techniques with Box Shadows</h2>
        <ul>
          <li><strong>Subtle elevation:</strong> Use small offsets (1-3px), moderate blur (6-12px), and low-opacity colors for clean, modern card designs. Example: <code>0px 2px 8px 0px #0000001a</code>.</li>
          <li><strong>Layered depth:</strong> Combine two or three shadows at different blur levels to mimic realistic lighting. A tight, dark shadow paired with a wide, light one creates convincing depth.</li>
          <li><strong>Inset effects:</strong> Apply inset shadows to input fields, toggles, or containers to give them a recessed appearance. Example: <code>inset 0px 2px 4px 0px #00000020</code>.</li>
          <li><strong>Colored glows:</strong> Use a matching brand color with a large blur radius and no offset to create a glowing halo effect around buttons or badges.</li>
        </ul>

        <h3>What do the X-offset and Y-offset values control?</h3>
        <p>The X-offset moves the shadow horizontally (positive values go right, negative values go left) and the Y-offset moves it vertically (positive goes down, negative goes up). Setting both to 0 creates a shadow that is evenly distributed around the element, which works well for glow effects. Typical card shadows use a Y-offset of 2-6 pixels with an X-offset of 0 to simulate overhead lighting.</p>

        <h3>How do blur and spread differ?</h3>
        <p>Blur controls the softness of the shadow edges. A blur of 0 produces a hard, sharp-edged shadow, while higher values create a gradual fade. Spread controls the size of the shadow relative to the element. Positive spread values make the shadow larger than the box, while negative values shrink it. Combining a small positive blur with a negative spread is a popular technique for creating tight, subtle drop shadows.</p>

        <h3>Can I use multiple box shadows on one element?</h3>
        <p>Yes. CSS allows you to stack as many box shadows as you need by separating each shadow definition with a comma. Layering multiple shadows at different offsets, blur levels, and opacities is the key to achieving realistic material-design-style elevation. This generator supports adding and removing shadow layers so you can experiment with multi-shadow effects visually before copying the final CSS.</p>
      </section>
      <RelatedTools current="/box-shadow-generator" />
    </div>
  );
}

export default BoxShadowGenerator;
