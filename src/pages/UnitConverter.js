import { useState } from 'react';

const categories = {
  Length: {
    units: ['Meters', 'Kilometers', 'Miles', 'Feet', 'Inches', 'Centimeters', 'Yards'],
    toBase: { Meters: 1, Kilometers: 1000, Miles: 1609.344, Feet: 0.3048, Inches: 0.0254, Centimeters: 0.01, Yards: 0.9144 },
  },
  Weight: {
    units: ['Kilograms', 'Grams', 'Pounds', 'Ounces', 'Milligrams', 'Tons'],
    toBase: { Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495, Milligrams: 0.000001, Tons: 907.185 },
  },
  Temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    custom: true,
  },
  Volume: {
    units: ['Liters', 'Milliliters', 'Gallons', 'Quarts', 'Cups', 'Fluid Ounces'],
    toBase: { Liters: 1, Milliliters: 0.001, Gallons: 3.78541, Quarts: 0.946353, Cups: 0.236588, 'Fluid Ounces': 0.0295735 },
  },
  Speed: {
    units: ['m/s', 'km/h', 'mph', 'knots'],
    toBase: { 'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704, 'knots': 0.514444 },
  },
};

function convertTemp(value, from, to) {
  let celsius;
  if (from === 'Celsius') celsius = value;
  else if (from === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
  else celsius = value - 273.15;

  if (to === 'Celsius') return celsius;
  if (to === 'Fahrenheit') return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

function UnitConverter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [value, setValue] = useState('');

  const cat = categories[category];
  const units = cat.units;

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setFromUnit(categories[newCat].units[0]);
    setToUnit(categories[newCat].units[1]);
    setValue('');
  };

  let result = '';
  if (value !== '' && !isNaN(Number(value))) {
    const num = Number(value);
    if (cat.custom) {
      result = convertTemp(num, fromUnit, toUnit).toLocaleString(undefined, { maximumFractionDigits: 6 });
    } else {
      const baseValue = num * cat.toBase[fromUnit];
      result = (baseValue / cat.toBase[toUnit]).toLocaleString(undefined, { maximumFractionDigits: 6 });
    }
  }

  return (
    <div>
      <h1>Unit Converter</h1>
      <p className="subtitle">Convert between common units of measurement.</p>

      <div className="case-buttons">
        {Object.keys(categories).map((c) => (
          <button key={c} onClick={() => handleCategoryChange(c)} className={category === c ? 'active-case' : ''}>{c}</button>
        ))}
      </div>

      <div className="form">
        <div className="input-row">
          <div className="input-group">
            <label>From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="select-input">
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label>To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="select-input">
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="input-group">
          <label>Value</label>
          <input type="number" step="any" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
        </div>
      </div>

      {result && (
        <div className="calc-result" style={{ marginTop: '1rem' }}>
          {value} {fromUnit} = <strong>{result} {toUnit}</strong>
        </div>
      )}

      <section className="info-section">
        <h2>About Unit Conversion</h2>
        <p>Convert between common units of length, weight, temperature, volume, and speed. Select a category, choose your units, enter a value, and see the result instantly.</p>

        <h2>Supported Categories</h2>
        <ul>
          <li><strong>Length</strong> — Meters, km, miles, feet, inches, cm, yards</li>
          <li><strong>Weight</strong> — Kilograms, grams, pounds, ounces, tons</li>
          <li><strong>Temperature</strong> — Celsius, Fahrenheit, Kelvin</li>
          <li><strong>Volume</strong> — Liters, ml, gallons, quarts, cups, fl oz</li>
          <li><strong>Speed</strong> — m/s, km/h, mph, knots</li>
        </ul>
      </section>
    </div>
  );
}

export default UnitConverter;
