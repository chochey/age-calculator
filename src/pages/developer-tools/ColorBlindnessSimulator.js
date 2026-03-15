import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

/* ── Color parsing helpers ─────────────────────────────────── */

function hexToRgb(hex) {
  const h = hex.replace(/^#/, '');
  if (h.length !== 6 && h.length !== 3) return null;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

function parseColorInput(value) {
  const trimmed = value.trim();

  // Try hex
  const hexMatch = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const h = hexMatch[1];
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return hexToRgb('#' + full);
  }

  // Try rgb(r, g, b)
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/
  );
  if (rgbMatch) {
    const r = Math.min(255, parseInt(rgbMatch[1], 10));
    const g = Math.min(255, parseInt(rgbMatch[2], 10));
    const b = Math.min(255, parseInt(rgbMatch[3], 10));
    return { r, g, b };
  }

  return null;
}

/* ── sRGB linearization / de-linearization ────────────────── */

function srgbToLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c) {
  const s = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1.0 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(s * 255)));
}

/* ── Color vision deficiency simulation matrices ─────────────
   Based on the Vienot, Brettel & Mollon (1999) method.
   Each matrix operates on linearized sRGB values.
   ─────────────────────────────────────────────────────────── */

const CVD_MATRICES = {
  protanopia: [
    [0.0, 2.02344, -2.52581],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
  ],
  deuteranopia: [
    [1.0, 0.0, 0.0],
    [0.49421, 0.0, 1.24827],
    [0.0, 0.0, 1.0],
  ],
  tritanopia: [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [-0.86744, 1.86727, 0.0],
  ],
  achromatopsia: null, // luminance-only, handled separately
};

function applyMatrix(matrix, lr, lg, lb) {
  return [
    matrix[0][0] * lr + matrix[0][1] * lg + matrix[0][2] * lb,
    matrix[1][0] * lr + matrix[1][1] * lg + matrix[1][2] * lb,
    matrix[2][0] * lr + matrix[2][1] * lg + matrix[2][2] * lb,
  ];
}

function simulateCvd(r, g, b, type) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  if (type === 'achromatopsia') {
    // ITU-R BT.709 luminance weights
    const lum = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    return {
      r: linearToSrgb(lum),
      g: linearToSrgb(lum),
      b: linearToSrgb(lum),
    };
  }

  const matrix = CVD_MATRICES[type];
  if (!matrix) return { r, g, b };

  const [sr, sg, sb] = applyMatrix(matrix, lr, lg, lb);
  return {
    r: linearToSrgb(sr),
    g: linearToSrgb(sg),
    b: linearToSrgb(sb),
  };
}

/* ── Simulation type metadata ────────────────────────────── */

const SIMULATIONS = [
  {
    id: 'original',
    label: 'Original',
    description: 'Normal color vision',
  },
  {
    id: 'protanopia',
    label: 'Protanopia',
    description: 'No red cones (~1% of males)',
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'No green cones (~1% of males)',
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia',
    description: 'No blue cones (very rare)',
  },
  {
    id: 'achromatopsia',
    label: 'Achromatopsia',
    description: 'Complete color blindness',
  },
];

/* ── Component ───────────────────────────────────────────── */

function ColorBlindnessSimulator() {
  const [colorInput, setColorInput] = useState('#4f46e5');
  const [copied, setCopied] = useState('');

  const parsed = parseColorInput(colorInput);
  const baseRgb = parsed || { r: 0, g: 0, b: 0 };

  const results = SIMULATIONS.map((sim) => {
    const rgb =
      sim.id === 'original'
        ? baseRgb
        : simulateCvd(baseRgb.r, baseRgb.g, baseRgb.b, sim.id);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return { ...sim, rgb, hex };
  });

  const handlePickerChange = (e) => {
    setColorInput(e.target.value);
  };

  const handleTextChange = (e) => {
    setColorInput(e.target.value);
  };

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const validHex =
    parsed && colorInput.replace(/^#/, '').length >= 3
      ? rgbToHex(parsed.r, parsed.g, parsed.b)
      : '#000000';

  return (
    <div>
      <Seo
        title="Color Blindness Simulator"
        description="Free color blindness simulator. See how colors appear to people with protanopia, deuteranopia, tritanopia, and achromatopsia."
        faqs={[{ q: 'What percentage of people have color blindness?', a: 'Approximately 8% of men and 0.5% of women of Northern European descent have some form of color vision deficiency. Red-green deficiencies (protanopia and deuteranopia combined) are by far the most common, accounting for about 99% of all cases. Tritanopia and achromatopsia are extremely rare.' }, { q: 'How accurate is this simulator?', a: 'The simulation uses peer-reviewed transformation matrices that closely approximate the color perception of each deficiency type. While no screen-based simulation can perfectly replicate the experience of someone with color blindness -- individual variation exists even within the same deficiency category -- these matrices are widely accepted in accessibility research and provide a reliable guide for design decisions.' }, { q: 'Which colors should I avoid using together?', a: 'Avoid pairing red with green, as this combination is indistinguishable for the most common forms of color blindness. Similarly, avoid blue paired with yellow if you need to account for tritanopia. Safe high-contrast pairings include blue with orange, and dark blue with white. Always verify your specific color choices with the simulator before finalizing a design.' }]}
      />
      <h1>Color Blindness Simulator</h1>
      <p className="subtitle">
        Preview how colors appear to people with different types of color vision
        deficiency.
      </p>

      {/* Color input area */}
      <div className="form">
        <div className="input-row" style={{ alignItems: 'flex-end' }}>
          <div className="input-group" style={{ flex: '0 0 60px' }}>
            <label>Pick</label>
            <input
              type="color"
              value={validHex}
              onChange={handlePickerChange}
              style={{
                width: '100%',
                height: '44px',
                padding: '2px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                cursor: 'pointer',
                background: '#fff',
              }}
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Color (HEX or RGB)</label>
            <input
              type="text"
              value={colorInput}
              onChange={handleTextChange}
              placeholder="#4f46e5 or rgb(79, 70, 229)"
              spellCheck={false}
              className="color-text-input"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        {!parsed && colorInput.trim().length > 0 && (
          <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>
            Enter a valid hex code (e.g. #4f46e5) or rgb value (e.g. rgb(79,
            70, 229))
          </span>
        )}
      </div>

      {/* Original color preview bar */}
      <div
        className="color-preview"
        style={{ background: validHex, height: '80px', marginBottom: '1.5rem' }}
      />

      {/* Simulation grid */}
      <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {results.map((sim) => (
          <div className="detail-card" key={sim.id} style={{ padding: '0', overflow: 'hidden' }}>
            {/* Color swatch */}
            <div
              style={{
                height: '110px',
                background: sim.hex,
                transition: 'background 0.15s ease',
              }}
            />
            {/* Info */}
            <div style={{ padding: '0.85rem 1rem' }}>
              <span
                className="detail-value"
                style={{ fontSize: '1rem', marginBottom: '0.15rem' }}
              >
                {sim.label}
              </span>
              <span
                className="detail-label"
                style={{ marginBottom: '0.5rem', display: 'block' }}
              >
                {sim.description}
              </span>

              {/* HEX row */}
              <div
                className="color-value-row"
                style={{ marginBottom: '0.35rem' }}
              >
                <code
                  style={{
                    fontFamily: "'Consolas', monospace",
                    fontSize: '0.9rem',
                    color: '#475569',
                  }}
                >
                  {sim.hex.toUpperCase()}
                </code>
                <button
                  className="copy-btn"
                  onClick={() => copy(sim.id + '-hex', sim.hex.toUpperCase())}
                >
                  {copied === sim.id + '-hex' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* RGB row */}
              <div className="color-value-row">
                <code
                  style={{
                    fontFamily: "'Consolas', monospace",
                    fontSize: '0.9rem',
                    color: '#475569',
                  }}
                >
                  rgb({sim.rgb.r}, {sim.rgb.g}, {sim.rgb.b})
                </code>
                <button
                  className="copy-btn"
                  onClick={() =>
                    copy(
                      sim.id + '-rgb',
                      `rgb(${sim.rgb.r}, ${sim.rgb.g}, ${sim.rgb.b})`
                    )
                  }
                >
                  {copied === sim.id + '-rgb' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-side comparison */}
      <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#0f172a' }}>
          Side-by-Side Comparison
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${results.length}, 1fr)`,
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            height: '90px',
          }}
        >
          {results.map((sim) => (
            <div
              key={sim.id + '-bar'}
              style={{
                background: sim.hex,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '0.35rem',
              }}
              title={`${sim.label}: ${sim.hex.toUpperCase()}`}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color:
                    sim.rgb.r * 0.299 + sim.rgb.g * 0.587 + sim.rgb.b * 0.114 >
                    150
                      ? '#1e293b'
                      : '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                {sim.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RelatedTools current="/color-blindness-simulator" />

      <section className="info-section">
        <h2>How to Use the Color Blindness Simulator</h2>
        <p>Enter any color using the color picker or by typing a HEX code (e.g., #4F46E5) or RGB value (e.g., rgb(79, 70, 229)) into the text field. The simulator instantly generates previews showing how that color appears under four types of color vision deficiency, plus the original. Each result card displays the simulated HEX and RGB values with copy buttons, so you can compare exact color shifts. Use the side-by-side comparison bar at the bottom to see all five versions next to each other at a glance. This helps you evaluate whether your color choices remain distinguishable for all users.</p>

        <h2>How the Simulation Works</h2>
        <p>This tool uses scientifically validated color transformation matrices based on the Brettel, Vienot, and Mollon (1999) research method. Your input color is first linearized from sRGB gamma space into linear RGB. The linearized values are then multiplied through a deficiency-specific 3x3 matrix that remaps the color channels to approximate what a person with that condition perceives. The result is converted back to standard sRGB for display. For achromatopsia (total color blindness), the simulation reduces the color to a single luminance value using ITU-R BT.709 weights (0.2126R + 0.7152G + 0.0722B), producing a grayscale equivalent.</p>

        <h2>Types of Color Vision Deficiency</h2>
        <ul>
          <li><strong>Protanopia</strong> -- absence of red (L-cone) photoreceptors. Reds appear much darker and are easily confused with greens, browns, and dark oranges. Affects approximately 1% of males. A red button (#EF4444) may appear as a muddy olive to someone with protanopia.</li>
          <li><strong>Deuteranopia</strong> -- absence of green (M-cone) photoreceptors. The most prevalent form of color blindness, affecting about 1% of males. Greens and reds appear very similar, making traffic-light-style color coding unreliable without additional cues.</li>
          <li><strong>Tritanopia</strong> -- absence of blue (S-cone) photoreceptors. Blues may appear greenish, and yellows can look pink or light gray. This condition is very rare, affecting fewer than 0.01% of the population, and occurs equally in men and women.</li>
          <li><strong>Achromatopsia</strong> -- complete absence of functioning cone cells, resulting in a world seen entirely in shades of gray. Extremely rare, affecting about 1 in 30,000 people. Individuals with achromatopsia often experience light sensitivity and reduced visual acuity as well.</li>
        </ul>

        <h2>Designing for Accessibility</h2>
        <p>Never rely on color alone to convey information. Pair color indicators with text labels, icons, or patterns. For example, mark required form fields with both a red asterisk and the word "required." The WCAG 2.1 guidelines recommend a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Test your palette with this simulator to confirm that adjacent colors remain distinguishable across all deficiency types.</p>

        <h3>What percentage of people have color blindness?</h3>
        <p>Approximately 8% of men and 0.5% of women of Northern European descent have some form of color vision deficiency. Red-green deficiencies (protanopia and deuteranopia combined) are by far the most common, accounting for about 99% of all cases. Tritanopia and achromatopsia are extremely rare.</p>

        <h3>How accurate is this simulator?</h3>
        <p>The simulation uses peer-reviewed transformation matrices that closely approximate the color perception of each deficiency type. While no screen-based simulation can perfectly replicate the experience of someone with color blindness -- individual variation exists even within the same deficiency category -- these matrices are widely accepted in accessibility research and provide a reliable guide for design decisions.</p>

        <h3>Which colors should I avoid using together?</h3>
        <p>Avoid pairing red with green, as this combination is indistinguishable for the most common forms of color blindness. Similarly, avoid blue paired with yellow if you need to account for tritanopia. Safe high-contrast pairings include blue with orange, and dark blue with white. Always verify your specific color choices with the simulator before finalizing a design.</p>
      </section>
    </div>
  );
}

export default ColorBlindnessSimulator;
