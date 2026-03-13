import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
      <Seo title="Unit Converter - Length, Weight, Temperature & More" description="Free online unit converter. Convert between units of length, weight, temperature, volume, and speed instantly." />
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
        <h2>How to Use the Unit Converter</h2>
        <p>Start by choosing a measurement category from the buttons at the top: Length, Weight, Temperature, Volume, or Speed. The "From" and "To" dropdowns update automatically to show the units available in that category. Select the unit you are converting from, the unit you are converting to, and type a numeric value. The converted result appears instantly below the form as you type, with no need to click a button. For example, selecting Length, choosing "Miles" as the source and "Kilometers" as the target, and entering 26.2 immediately shows 42.164928 Kilometers -- the distance of a marathon.</p>

        <h2>How the Converter Works</h2>
        <p>For length, weight, volume, and speed, each unit has a fixed conversion factor to a base unit (meters for length, kilograms for weight, liters for volume, and meters per second for speed). The tool multiplies your input by the source unit's base factor and then divides by the target unit's base factor, producing an accurate conversion in a single step. Temperature is handled separately because the relationship between Celsius, Fahrenheit, and Kelvin involves offsets rather than simple ratios. The converter first translates the input to Celsius, then converts from Celsius to the target scale using the standard formulas: F = C x 9/5 + 32 and K = C + 273.15.</p>

        <h2>Supported Categories and Units</h2>
        <ul>
          <li><strong>Length</strong> -- Meters, Kilometers, Miles, Feet, Inches, Centimeters, and Yards. Useful for travel distances, room dimensions, and athletic measurements.</li>
          <li><strong>Weight</strong> -- Kilograms, Grams, Pounds, Ounces, Milligrams, and Tons. Covers everything from cooking recipes to shipping packages.</li>
          <li><strong>Temperature</strong> -- Celsius, Fahrenheit, and Kelvin. Essential for weather, cooking, and scientific applications.</li>
          <li><strong>Volume</strong> -- Liters, Milliliters, Gallons, Quarts, Cups, and Fluid Ounces. Perfect for cooking conversions and liquid measurements.</li>
          <li><strong>Speed</strong> -- Meters per second, Kilometers per hour, Miles per hour, and Knots. Handy for comparing vehicle speeds, running paces, or nautical navigation.</li>
        </ul>

        <h3>How do I convert temperature between Fahrenheit and Celsius?</h3>
        <p>Select the Temperature category, choose Fahrenheit as the "From" unit and Celsius as the "To" unit (or vice versa), and enter a value. For instance, entering 72 Fahrenheit returns 22.222222 Celsius, which is a comfortable room temperature. The formula used is Celsius = (Fahrenheit - 32) x 5/9. For the reverse, Fahrenheit = Celsius x 9/5 + 32. A quick reference: 0 C equals 32 F (freezing point of water) and 100 C equals 212 F (boiling point).</p>

        <h3>Are the conversion factors accurate for scientific use?</h3>
        <p>Yes. The tool uses standard internationally recognized conversion factors. For example, 1 mile equals exactly 1,609.344 meters, 1 pound equals 0.453592 kilograms, and 1 gallon (US) equals 3.78541 liters. Results are displayed with up to six decimal places for precision. While this level of accuracy is more than sufficient for everyday use, engineering, and most scientific applications, extremely high-precision work may require additional significant figures beyond what a browser-based tool provides.</p>

        <h3>Can I convert between metric and imperial units?</h3>
        <p>Absolutely -- that is one of the primary purposes of this tool. The Length category lets you convert between metric units (meters, kilometers, centimeters) and imperial units (miles, feet, inches, yards). The Weight category covers kilograms and grams alongside pounds and ounces. The Volume category bridges liters and milliliters with gallons, quarts, cups, and fluid ounces. Simply pick one metric unit and one imperial unit, enter a value, and the result appears instantly.</p>
      </section>
      <RelatedTools current="/unit-converter" />
    </div>
  );
}

export default UnitConverter;
