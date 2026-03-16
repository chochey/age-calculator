import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function InchesToCmConverter() {
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');

  const handleInchesChange = (val) => {
    setInches(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCm((num * 2.54).toFixed(4).replace(/\.?0+$/, ''));
    } else {
      setCm('');
    }
  };

  const handleCmChange = (val) => {
    setCm(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setInches((num / 2.54).toFixed(4).replace(/\.?0+$/, ''));
    } else {
      setInches('');
    }
  };

  const inVal = parseFloat(inches) || 0;
  const cmVal = parseFloat(cm) || 0;
  const feet = Math.floor(inVal / 12);
  const remainingInches = inVal % 12;
  const meters = cmVal / 100;
  const mm = cmVal * 10;

  return (
    <div>
      <Seo
        title="Inches to CM Converter - Convert Inches & Centimeters"
        description="Free inches to centimeters converter. Instantly convert between inches and cm with conversions to feet, meters, and millimeters."
        faqs={[
          { q: 'How many centimeters are in an inch?', a: 'One inch equals exactly 2.54 centimeters. To convert inches to centimeters, multiply by 2.54.' },
          { q: 'How do I convert cm to inches?', a: 'Divide the number of centimeters by 2.54. For example, 20 cm / 2.54 = approximately 7.874 inches.' },
          { q: 'What is 5 foot 10 in centimeters?', a: '5 feet 10 inches equals 177.8 cm. Convert 5 feet to 60 inches, add 10, multiply 70 by 2.54.' }
        ]}
      />
      <h1>Inches to CM Converter</h1>
      <p className="subtitle">Convert between inches and centimeters instantly.</p>

      <div className="form">
        <div className="input-group">
          <label>Inches</label>
          <input type="number" min="0" step="any" placeholder="0" value={inches} onChange={(e) => handleInchesChange(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Centimeters</label>
          <input type="number" min="0" step="any" placeholder="0" value={cm} onChange={(e) => handleCmChange(e.target.value)} />
        </div>
      </div>

      {(inVal > 0 || cmVal > 0) && (
        <div className="results">
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{inVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} in</span>
              <span className="detail-label">Inches</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{cmVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} cm</span>
              <span className="detail-label">Centimeters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{feet}&prime; {remainingInches.toFixed(1)}&Prime;</span>
              <span className="detail-label">Feet & Inches</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{meters.toFixed(4)} m</span>
              <span className="detail-label">Meters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{mm.toFixed(1)} mm</span>
              <span className="detail-label">Millimeters</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Convert Inches to Centimeters</h2>
        <p>
          Converting between inches and centimeters is one of the most common unit conversions. The United States
          uses inches (imperial system), while most other countries use centimeters (metric system). The conversion
          factor is simple: one inch equals exactly 2.54 centimeters, standardized internationally in 1959.
        </p>

        <h2>The Conversion Formula</h2>
        <p>
          To convert inches to centimeters, multiply by 2.54. To convert centimeters to inches, divide by 2.54
          (or multiply by 0.3937). For example, 6 inches = 15.24 cm. And 30 cm = approximately 11.81 inches.
          These conversions are essential for international shipping, manufacturing, clothing sizes, and DIY projects.
        </p>

        <h2>Common Conversions Reference</h2>
        <ul>
          <li><strong>1 inch</strong> = 2.54 cm</li>
          <li><strong>6 inches</strong> = 15.24 cm</li>
          <li><strong>12 inches (1 foot)</strong> = 30.48 cm</li>
          <li><strong>10 cm</strong> = 3.937 inches</li>
          <li><strong>100 cm (1 meter)</strong> = 39.37 inches</li>
        </ul>

        <h3>How many centimeters are in an inch?</h3>
        <p>
          One inch equals exactly 2.54 centimeters. This conversion factor was internationally agreed upon in 1959.
          To convert inches to centimeters, multiply the number of inches by 2.54.
        </p>

        <h3>How do I convert cm to inches?</h3>
        <p>
          To convert centimeters to inches, divide the number of centimeters by 2.54. Alternatively, multiply
          by 0.3937. For example, 20 cm divided by 2.54 equals approximately 7.874 inches.
        </p>

        <h3>What is 5 foot 10 in centimeters?</h3>
        <p>
          5 feet 10 inches equals 177.8 cm. First convert 5 feet to inches (5 x 12 = 60 inches), add 10 inches
          to get 70 inches total, then multiply by 2.54 to get 177.8 centimeters.
        </p>
      </section>
      <RelatedTools current="/inches-to-cm" />
    </div>
  );
}

export default InchesToCmConverter;
