import { useState, useMemo } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        title="Area Calculator"
        description="Free area calculator for rectangles, circles, triangles, trapezoids & more. Calculate area and perimeter with formulas shown."
        faqs={[{ q: 'When should I use this calculator instead of doing the math by hand?', a: 'Any time you need a quick, error-free answer. Common real-world situations include estimating flooring or tile for a room (rectangle), figuring out the coverage area of a sprinkler (circle), calculating the sail area of a triangular boat sail (triangle), or sizing a driveway apron (trapezoid). The calculator handles the arithmetic instantly and lets you switch units without manual conversion.' }, { q: 'How do I find the area of an irregular shape?', a: 'Break the irregular shape into simpler shapes whose areas you can calculate individually -- for example, a house floor plan might be split into two rectangles and a triangle. Calculate each part separately and add the results together. If curves are involved, approximate them with circles or ellipses. For very complex shapes, graph paper or digital tools that use pixel counting can provide an estimate.' }, { q: 'What is the difference between area and perimeter?', a: 'Area measures the two-dimensional space inside a shape and is expressed in square units (cm\u00B2, m\u00B2, ft\u00B2). Perimeter measures the total length of the boundary around the shape and is expressed in linear units (cm, m, ft). For example, a 5 m x 3 m rectangle has an area of 15 m\u00B2 but a perimeter of 16 m. Both measurements are essential in construction, landscaping, and design.' }]}
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

      <section className="info-section">
        <h2>How to Use the Area Calculator</h2>
        <p>
          Pick a shape from the buttons at the top -- rectangle, circle, triangle, trapezoid, ellipse, or parallelogram. Select your measurement unit (cm, m, in, or ft), then type the required dimensions into the input fields. Results appear instantly as you type, showing both the area and the perimeter (or circumference for circles). For triangles, trapezoids, and parallelograms, the side fields marked with an asterisk are optional; filling them in enables the perimeter calculation as well. The active formula is always displayed above the inputs for quick reference.
        </p>

        <h2>Formulas and a Worked Example</h2>
        <p>
          Each shape has its own formula. A <strong>rectangle</strong> uses A = length x width. A <strong>circle</strong> uses A = {'\u03C0'}r{'\u00B2'}. A <strong>triangle</strong> uses A = {'\u00BD'} x base x height. A <strong>trapezoid</strong> uses A = {'\u00BD'}(a + b) x height. An <strong>ellipse</strong> uses A = {'\u03C0'} x a x b. A <strong>parallelogram</strong> uses A = base x height.
        </p>
        <p>
          <strong>Worked example (circle):</strong> If a circular garden has a radius of 4 meters, its area is {'\u03C0'} x 4{'\u00B2'} = {'\u03C0'} x 16 = <strong>50.27 m{'\u00B2'}</strong>, and its circumference is 2 x {'\u03C0'} x 4 = <strong>25.13 m</strong>. Knowing the area helps you order the correct amount of mulch or sod, while the circumference tells you how much edging material you need.
        </p>

        <h3>When should I use this calculator instead of doing the math by hand?</h3>
        <p>
          Any time you need a quick, error-free answer. Common real-world situations include estimating flooring or tile for a room (rectangle), figuring out the coverage area of a sprinkler (circle), calculating the sail area of a triangular boat sail (triangle), or sizing a driveway apron (trapezoid). The calculator handles the arithmetic instantly and lets you switch units without manual conversion.
        </p>

        <h3>How do I find the area of an irregular shape?</h3>
        <p>
          Break the irregular shape into simpler shapes whose areas you can calculate individually -- for example, a house floor plan might be split into two rectangles and a triangle. Calculate each part separately and add the results together. If curves are involved, approximate them with circles or ellipses. For very complex shapes, graph paper or digital tools that use pixel counting can provide an estimate.
        </p>

        <h3>What is the difference between area and perimeter?</h3>
        <p>
          Area measures the two-dimensional space inside a shape and is expressed in square units (cm{'\u00B2'}, m{'\u00B2'}, ft{'\u00B2'}). Perimeter measures the total length of the boundary around the shape and is expressed in linear units (cm, m, ft). For example, a 5 m x 3 m rectangle has an area of 15 m{'\u00B2'} but a perimeter of 16 m. Both measurements are essential in construction, landscaping, and design.
        </p>
      </section>
    </div>
  );
}

export default AreaCalculator;
