import { useState, useMemo } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const SHAPES = {
  rectangle: {
    name: 'Rectangle',
    icon: '\u25AD',
    fields: [
      { key: 'length', label: 'Length' },
      { key: 'width', label: 'Width' },
    ],
    areaFormula: 'A = length \u00D7 width',
    perimeterFormula: 'P = 2 \u00D7 (length + width)',
    perimeterLabel: 'Perimeter',
    calc: (v) => {
      const a = v.length * v.width;
      const p = 2 * (v.length + v.width);
      return { area: a, perimeter: p };
    },
  },
  circle: {
    name: 'Circle',
    icon: '\u25CB',
    fields: [
      { key: 'radius', label: 'Radius' },
    ],
    areaFormula: 'A = \u03C0 \u00D7 r\u00B2',
    perimeterFormula: 'C = 2 \u00D7 \u03C0 \u00D7 r',
    perimeterLabel: 'Circumference',
    calc: (v) => {
      const a = Math.PI * v.radius * v.radius;
      const p = 2 * Math.PI * v.radius;
      return { area: a, perimeter: p };
    },
  },
  triangle: {
    name: 'Triangle',
    icon: '\u25B3',
    fields: [
      { key: 'base', label: 'Base' },
      { key: 'height', label: 'Height' },
      { key: 'sideA', label: 'Side A' },
      { key: 'sideB', label: 'Side B' },
    ],
    areaFormula: 'A = \u00BD \u00D7 base \u00D7 height',
    perimeterFormula: 'P = base + side A + side B',
    perimeterLabel: 'Perimeter',
    calc: (v) => {
      const a = 0.5 * v.base * v.height;
      const p = (v.sideA && v.sideB) ? v.base + v.sideA + v.sideB : null;
      return { area: a, perimeter: p };
    },
  },
  trapezoid: {
    name: 'Trapezoid',
    icon: '\u2B1F',
    fields: [
      { key: 'baseA', label: 'Base A (top)' },
      { key: 'baseB', label: 'Base B (bottom)' },
      { key: 'height', label: 'Height' },
      { key: 'sideA', label: 'Side A' },
      { key: 'sideB', label: 'Side B' },
    ],
    areaFormula: 'A = \u00BD \u00D7 (a + b) \u00D7 height',
    perimeterFormula: 'P = a + b + side A + side B',
    perimeterLabel: 'Perimeter',
    calc: (v) => {
      const a = 0.5 * (v.baseA + v.baseB) * v.height;
      const p = (v.sideA && v.sideB) ? v.baseA + v.baseB + v.sideA + v.sideB : null;
      return { area: a, perimeter: p };
    },
  },
  ellipse: {
    name: 'Ellipse',
    icon: '\u2B2D',
    fields: [
      { key: 'semiA', label: 'Semi-axis A' },
      { key: 'semiB', label: 'Semi-axis B' },
    ],
    areaFormula: 'A = \u03C0 \u00D7 a \u00D7 b',
    perimeterFormula: 'P \u2248 \u03C0 \u00D7 [3(a+b) \u2212 \u221A((3a+b)(a+3b))]',
    perimeterLabel: 'Perimeter (approx.)',
    calc: (v) => {
      const a = Math.PI * v.semiA * v.semiB;
      const p = Math.PI * (3 * (v.semiA + v.semiB) - Math.sqrt((3 * v.semiA + v.semiB) * (v.semiA + 3 * v.semiB)));
      return { area: a, perimeter: p };
    },
  },
  parallelogram: {
    name: 'Parallelogram',
    icon: '\u25B1',
    fields: [
      { key: 'base', label: 'Base' },
      { key: 'height', label: 'Height' },
      { key: 'side', label: 'Side' },
    ],
    areaFormula: 'A = base \u00D7 height',
    perimeterFormula: 'P = 2 \u00D7 (base + side)',
    perimeterLabel: 'Perimeter',
    calc: (v) => {
      const a = v.base * v.height;
      const p = v.side ? 2 * (v.base + v.side) : null;
      return { area: a, perimeter: p };
    },
  },
};

const UNITS = [
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' },
  { value: 'in', label: 'in' },
  { value: 'ft', label: 'ft' },
];

function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return null;
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

function AreaCalculator() {
  const [shape, setShape] = useState('rectangle');
  const [values, setValues] = useState({});
  const [unit, setUnit] = useState('cm');

  const config = SHAPES[shape];

  const handleShapeChange = (key) => {
    setShape(key);
    setValues({});
  };

  const handleInput = (key, raw) => {
    const num = raw === '' ? '' : parseFloat(raw);
    setValues((prev) => ({ ...prev, [key]: raw === '' ? '' : num }));
  };

  const results = useMemo(() => {
    const requiredFields = config.fields.filter((f) => {
      if (shape === 'triangle' && (f.key === 'sideA' || f.key === 'sideB')) return false;
      if (shape === 'trapezoid' && (f.key === 'sideA' || f.key === 'sideB')) return false;
      if (shape === 'parallelogram' && f.key === 'side') return false;
      return true;
    });

    const allFilled = requiredFields.every((f) => {
      const v = values[f.key];
      return v !== '' && v !== undefined && !isNaN(v) && v > 0;
    });

    if (!allFilled) return null;

    const numericValues = {};
    config.fields.forEach((f) => {
      const v = values[f.key];
      numericValues[f.key] = (v !== '' && v !== undefined && !isNaN(v) && v > 0) ? v : 0;
    });

    return config.calc(numericValues);
  }, [values, config, shape]);

  const areaUnit = unit + '\u00B2';
  const perimUnit = unit;

  return (
    <div>
      <Seo
        title="Area Calculator \u2013 QuickCalcs"
        description="Free area calculator for rectangles, circles, triangles, trapezoids & more. Calculate area and perimeter with formulas shown."
      />
      <h1>Area Calculator</h1>
      <p className="subtitle">Calculate area and perimeter for common shapes.</p>

      {/* Shape Selector */}
      <div className="case-buttons" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>
        {Object.entries(SHAPES).map(([key, s]) => (
          <button
            key={key}
            className={shape === key ? 'active-case' : ''}
            onClick={() => handleShapeChange(key)}
          >
            <span style={{ marginRight: '0.35rem' }}>{s.icon}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Unit Toggle */}
      <div className="unit-toggle" style={{ justifyContent: 'center' }}>
        {UNITS.map((u) => (
          <button
            key={u.value}
            className={unit === u.value ? 'active' : ''}
            onClick={() => setUnit(u.value)}
          >
            {u.label}
          </button>
        ))}
      </div>

      {/* Formulas */}
      <div className="calc-section" style={{ marginBottom: '1.25rem' }}>
        <h2>{config.name} Formulas</h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#475569' }}>
          <span><strong>Area:</strong> {config.areaFormula}</span>
          <span><strong>{config.perimeterLabel}:</strong> {config.perimeterFormula}</span>
        </div>
      </div>

      {/* Input Fields */}
      <div className="form">
        <div className="input-row">
          {config.fields.map((f) => {
            const isOptional =
              (shape === 'triangle' && (f.key === 'sideA' || f.key === 'sideB')) ||
              (shape === 'trapezoid' && (f.key === 'sideA' || f.key === 'sideB')) ||
              (shape === 'parallelogram' && f.key === 'side');

            return (
              <div className="input-group" key={f.key}>
                <label htmlFor={`area-${f.key}`}>
                  {f.label} ({unit}){isOptional ? ' *' : ''}
                </label>
                <input
                  id={`area-${f.key}`}
                  type="number"
                  min="0"
                  step="any"
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                  value={values[f.key] === undefined ? '' : values[f.key]}
                  onChange={(e) => handleInput(f.key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
        {(shape === 'triangle' || shape === 'trapezoid' || shape === 'parallelogram') && (
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            * Optional: needed for perimeter calculation
          </p>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(results.area)}</span>
            <span className="age-label">{areaUnit}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{fmt(results.area)} {areaUnit}</span>
              <span className="detail-label">Area</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">
                {results.perimeter !== null && results.perimeter > 0
                  ? `${fmt(results.perimeter)} ${perimUnit}`
                  : '\u2014'}
              </span>
              <span className="detail-label">{config.perimeterLabel}</span>
            </div>
          </div>
        </div>
      )}

      <RelatedTools current="/area-calculator" />

      <div className="info-section">
        <h2>Area Formulas</h2>
        <p>
          Area is the measure of the two-dimensional space enclosed within a shape. Understanding
          area formulas is fundamental in geometry, construction, landscaping, and many other fields.
        </p>

        <h2>Rectangle</h2>
        <p>
          The area of a rectangle is found by multiplying its length by its width: <strong>A = l {'\u00D7'} w</strong>.
          The perimeter is the sum of all sides: <strong>P = 2(l + w)</strong>. Rectangles are one of
          the most common shapes encountered in everyday life, from rooms and screens to books and tiles.
        </p>

        <h2>Circle</h2>
        <p>
          A circle's area is calculated using <strong>A = {'\u03C0'}r{'\u00B2'}</strong>, where r is the radius.
          The circumference (perimeter) is <strong>C = 2{'\u03C0'}r</strong>. The constant {'\u03C0'} (pi)
          is approximately 3.14159. Circles appear in wheels, pipes, clocks, and countless engineering applications.
        </p>

        <h2>Triangle</h2>
        <p>
          The most common triangle area formula is <strong>A = {'\u00BD'} {'\u00D7'} base {'\u00D7'} height</strong>.
          The perimeter is the sum of all three sides. For triangles where you know all three sides, you
          can also use Heron's formula. Triangles are fundamental in structural engineering and trigonometry.
        </p>

        <h2>Trapezoid</h2>
        <p>
          A trapezoid (trapezium in British English) has one pair of parallel sides. Its area
          is <strong>A = {'\u00BD'}(a + b) {'\u00D7'} h</strong>, where a and b are the parallel bases
          and h is the height. The perimeter is the sum of all four sides.
        </p>

        <h2>Ellipse</h2>
        <p>
          An ellipse is an elongated circle with two semi-axes. Its area
          is <strong>A = {'\u03C0'} {'\u00D7'} a {'\u00D7'} b</strong>, where a and b are the semi-major
          and semi-minor axes. The perimeter of an ellipse has no simple closed-form expression;
          Ramanujan's approximation is commonly used for accurate estimates.
        </p>

        <h2>Parallelogram</h2>
        <p>
          A parallelogram has two pairs of parallel sides. Its area is <strong>A = base {'\u00D7'} height</strong>,
          where the height is the perpendicular distance between the base and the opposite side.
          The perimeter is <strong>P = 2(base + side)</strong>.
        </p>

        <h2>How to Use This Calculator</h2>
        <ul>
          <li>Select a shape using the buttons at the top.</li>
          <li>Choose your preferred measurement unit (cm, m, in, or ft).</li>
          <li>Enter the required dimensions. Results update in real time as you type.</li>
          <li>For shapes with optional side fields (triangle, trapezoid, parallelogram), fill those in to also calculate the perimeter.</li>
          <li>The formula used for each shape is shown above the input fields for reference.</li>
        </ul>
      </div>
    </div>
  );
}

export default AreaCalculator;
