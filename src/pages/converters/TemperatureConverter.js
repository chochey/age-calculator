import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const COMMON_TEMPS = [
  { label: 'Absolute Zero', c: -273.15 },
  { label: 'Dry Ice', c: -78.5 },
  { label: 'Water Freezes', c: 0 },
  { label: 'Refrigerator', c: 4 },
  { label: 'Room Temperature', c: 20 },
  { label: 'Warm Day', c: 30 },
  { label: 'Body Temperature', c: 37 },
  { label: 'Hot Tub', c: 40 },
  { label: 'Pasteurization', c: 72 },
  { label: 'Water Boils', c: 100 },
  { label: 'Oven (Low)', c: 150 },
  { label: 'Oven (High)', c: 230 },
];

function TemperatureConverter() {
  const [mode, setMode] = useState('cToF');
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState('');

  const val = inputValue !== '' && !isNaN(Number(inputValue)) ? Number(inputValue) : null;

  let celsius = null;
  let fahrenheit = null;
  let kelvin = null;

  if (val !== null) {
    if (mode === 'cToF') {
      celsius = val;
      fahrenheit = (val * 9) / 5 + 32;
      kelvin = val + 273.15;
    } else if (mode === 'fToC') {
      fahrenheit = val;
      celsius = ((val - 32) * 5) / 9;
      kelvin = celsius + 273.15;
    } else {
      kelvin = val;
      celsius = val - 273.15;
      fahrenheit = (celsius * 9) / 5 + 32;
    }
  }

  const fmt = (n) => n !== null ? Number(n.toFixed(4)).toString() : '';

  const handleTableRowClick = (c) => {
    setMode('cToF');
    setInputValue(String(c));
  };

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const modeLabels = {
    cToF: { from: 'Celsius (\u00B0C)', placeholder: 'e.g. 100' },
    fToC: { from: 'Fahrenheit (\u00B0F)', placeholder: 'e.g. 212' },
    kToC: { from: 'Kelvin (K)', placeholder: 'e.g. 373.15' },
  };

  const hasResult = val !== null;

  return (
    <div>
      <Seo
        title="Temperature Converter - Celsius, Fahrenheit & Kelvin Calculator"
        description="Free temperature converter for Celsius, Fahrenheit, and Kelvin. Instantly convert between all three scales with a quick reference table of common temperatures."
        faqs={[{ q: 'How do you convert Celsius to Fahrenheit?', a: 'Multiply the Celsius value by 9/5 (or 1.8) and then add 32. For example, 25\u00B0C times 1.8 equals 45, plus 32 equals 77\u00B0F. This formula works because the Fahrenheit scale starts 32 degrees higher than Celsius at the freezing point of water and uses smaller degree increments, so each Celsius degree equals 1.8 Fahrenheit degrees.' }, { q: 'What is the difference between Celsius, Fahrenheit, and Kelvin?', a: 'Celsius sets 0\u00B0 at water\'s freezing point and 100\u00B0 at its boiling point at sea level. Fahrenheit places those same benchmarks at 32\u00B0 and 212\u00B0, making its degrees smaller. Kelvin uses the same increment size as Celsius but starts at absolute zero (\u22120 K = \u2212273.15\u00B0C), the theoretical point where all molecular motion stops. Kelvin is the SI base unit for temperature and is used in science and engineering.' }, { q: 'Why does \u221240 read the same in Celsius and Fahrenheit?', a: 'The Celsius and Fahrenheit scales intersect at exactly \u221240 degrees. Plugging \u221240 into the conversion formula confirms it: (\u221240 \u00D7 9/5) + 32 = \u221272 + 32 = \u221240. This crossover is simply a mathematical consequence of the two scales having different zero points and degree sizes. Below \u221240 the Fahrenheit number is more negative; above it the Fahrenheit number is larger.' }]}
      />
      <h1>Temperature Converter</h1>
      <p className="subtitle">Convert between Celsius, Fahrenheit & Kelvin instantly.</p>

      {/* Mode Toggle */}
      <div className="unit-toggle">
        <button className={mode === 'cToF' ? 'active' : ''} onClick={() => setMode('cToF')}>
          °C to °F
        </button>
        <button className={mode === 'fToC' ? 'active' : ''} onClick={() => setMode('fToC')}>
          °F to °C
        </button>
        <button className={mode === 'kToC' ? 'active' : ''} onClick={() => setMode('kToC')}>
          K to °C
        </button>
      </div>

      {/* Input */}
      <div className="form">
        <div className="input-group">
          <label>{modeLabels[mode].from}</label>
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={modeLabels[mode].placeholder}
            style={{ fontFamily: "'Consolas', monospace" }}
          />
        </div>
      </div>

      {/* Results */}
      {hasResult && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number" style={{ fontSize: '1.8rem', fontFamily: "'Consolas', monospace" }}>
              {mode === 'cToF' ? `${fmt(fahrenheit)}\u00B0F` : `${fmt(celsius)}\u00B0C`}
            </span>
            <span className="age-label">
              {mode === 'cToF' ? `= ${fmt(celsius)}\u00B0C` : mode === 'fToC' ? `= ${fmt(fahrenheit)}\u00B0F` : `= ${fmt(kelvin)} K`}
            </span>
          </div>

          <div className="hash-results" style={{ marginTop: '1rem' }}>
            <div className="hash-row">
              <div className="hash-header">
                <strong>Celsius</strong>
                <button onClick={() => copy('c', `${fmt(celsius)}\u00B0C`)} className="copy-btn">
                  {copied === 'c' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{fmt(celsius)}°C</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Fahrenheit</strong>
                <button onClick={() => copy('f', `${fmt(fahrenheit)}\u00B0F`)} className="copy-btn">
                  {copied === 'f' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{fmt(fahrenheit)}°F</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Kelvin</strong>
                <button onClick={() => copy('k', `${fmt(kelvin)} K`)} className="copy-btn">
                  {copied === 'k' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{fmt(kelvin)} K</code>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>Quick Reference Table</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Common temperatures in all three scales. Click any row to populate the converter.
        </p>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            padding: '0.6rem 1rem',
            background: '#f8fafc',
            borderBottom: '2px solid #e2e8f0',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            <span>Description</span>
            <span>°C</span>
            <span>°F</span>
            <span>K</span>
          </div>
          {/* Table Rows */}
          {COMMON_TEMPS.map((row) => {
            const f = Number(((row.c * 9) / 5 + 32).toFixed(2));
            const k = Number((row.c + 273.15).toFixed(2));
            const isActive = inputValue === String(row.c) && mode === 'cToF';
            return (
              <div
                key={row.label}
                onClick={() => handleTableRowClick(row.c)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
                  padding: '0.55rem 1rem',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  fontFamily: "'Consolas', monospace",
                  fontSize: '0.9rem',
                  color: isActive ? '#4f46e5' : '#475569',
                  background: isActive ? '#eef2ff' : '#fff',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                <span style={{ fontFamily: 'inherit' }}>{row.label}</span>
                <span>{row.c}°C</span>
                <span>{f}°F</span>
                <span>{k} K</span>
              </div>
            );
          })}
        </div>
      </div>

      <RelatedTools current="/temperature-converter" />

      <div className="info-section">
        <h2>How to Use the Temperature Converter</h2>
        <p>Select your conversion direction using the toggle at the top: Celsius to Fahrenheit, Fahrenheit to Celsius, or Kelvin to Celsius. Type a number into the input field and all three equivalent temperatures appear immediately in the results panel. Each value has a copy button so you can paste it into documents, spreadsheets, or code. The Quick Reference Table below lists everyday temperatures such as body temperature, water's freezing and boiling points, room temperature, and common oven settings. Click any row to load that value into the converter.</p>

        <h2>Understanding Temperature Scales</h2>
        <p><strong>Celsius</strong> (also called centigrade) is the metric temperature scale used by most of the world for everyday weather, cooking, and science. It defines 0° as the freezing point of water and 100° as the boiling point at standard atmospheric pressure. The scale was proposed by Anders Celsius in 1742 and later inverted to its current form.</p>
        <p><strong>Fahrenheit</strong> was developed by Daniel Gabriel Fahrenheit in 1724 and remains the primary scale in the United States for weather forecasts, cooking, and household thermostats. Water freezes at 32°F and boils at 212°F, creating a 180-degree span between those two reference points. The smaller degree size can feel more precise for ambient temperatures because a single degree Fahrenheit represents a smaller change than a single degree Celsius.</p>
        <p><strong>Kelvin</strong> is the SI base unit of temperature and is essential in physics, chemistry, and engineering. It uses the same degree increment as Celsius but sets its zero point at absolute zero, the lowest theoretically possible temperature where all thermal motion ceases. This makes Kelvin an absolute scale with no negative values, which simplifies many scientific equations involving energy, pressure, and thermodynamics.</p>

        <h3>Conversion Formulas</h3>
        <p>The core formulas are straightforward. To convert Celsius to Fahrenheit: <strong>°F = (°C × 9/5) + 32</strong>. To reverse it: <strong>°C = (°F − 32) × 5/9</strong>. For Kelvin, simply add or subtract 273.15 from the Celsius value: <strong>K = °C + 273.15</strong> and <strong>°C = K − 273.15</strong>. A handy mental shortcut for Celsius to Fahrenheit is to double the Celsius value and add 30, which gives a rough estimate good enough for casual use.</p>

        <h3>When do you need temperature conversion?</h3>
        <p>Temperature conversion comes up often when following recipes from another country, interpreting weather forecasts while traveling, adjusting thermostat settings in imported equipment, or working with scientific data. Cooking temperatures in European recipes are typically in Celsius, while American recipes use Fahrenheit. International weather services report in Celsius, so travelers from the US need quick conversions to understand local forecasts. In laboratories and engineering contexts, Kelvin is required for calculations involving gas laws, black-body radiation, and thermodynamic efficiency.</p>
      </div>
    </div>
  );
}

export default TemperatureConverter;
