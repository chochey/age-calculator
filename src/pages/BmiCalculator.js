import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function BmiCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [height, setHeight] = useState({ ft: '', in: '', cm: '' });
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    let bmi;
    if (unit === 'imperial') {
      const totalInches = parseFloat(height.ft) * 12 + parseFloat(height.in || 0);
      bmi = (parseFloat(weight) / (totalInches * totalInches)) * 703;
    } else {
      const cm = parseFloat(height.cm);
      bmi = parseFloat(weight) / ((cm / 100) * (cm / 100));
    }

    if (isNaN(bmi) || !isFinite(bmi) || bmi <= 0) { setResult(null); return; }

    let category, color;
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
    else if (bmi < 25) { category = 'Normal weight'; color = '#22c55e'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
    else { category = 'Obese'; color = '#ef4444'; }

    setResult({ bmi: bmi.toFixed(1), category, color });
  };

  return (
    <div>
      <Seo title="BMI Calculator - Body Mass Index" description="Free BMI calculator. Calculate your Body Mass Index using imperial or metric units and see your weight category." />
      <h1>BMI Calculator</h1>
      <p className="subtitle">Calculate your Body Mass Index and see what category you fall into.</p>

      <div className="unit-toggle">
        <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>Imperial (lb/ft)</button>
        <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>Metric (kg/cm)</button>
      </div>

      <form onSubmit={handleCalculate} className="form">
        {unit === 'imperial' ? (
          <div className="input-row">
            <div className="input-group">
              <label>Height (ft)</label>
              <input type="number" min="0" step="1" placeholder="5" value={height.ft} onChange={(e) => setHeight({ ...height, ft: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Height (in)</label>
              <input type="number" min="0" max="11" step="1" placeholder="10" value={height.in} onChange={(e) => setHeight({ ...height, in: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Weight (lb)</label>
              <input type="number" min="0" step="any" placeholder="160" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
          </div>
        ) : (
          <div className="input-row">
            <div className="input-group">
              <label>Height (cm)</label>
              <input type="number" min="0" step="any" placeholder="178" value={height.cm} onChange={(e) => setHeight({ ...height, cm: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input type="number" min="0" step="any" placeholder="73" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
          </div>
        )}
        <button type="submit">Calculate BMI</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result" style={{ background: result.color }}>
            <span className="age-number">{result.bmi}</span>
            <span className="age-label">BMI</span>
            <span className="age-label" style={{ opacity: 1, fontWeight: 600 }}>{result.category}</span>
          </div>

          <div className="bmi-scale">
            <div className="bmi-range" style={{ background: '#3b82f6' }}>&lt;18.5 Underweight</div>
            <div className="bmi-range" style={{ background: '#22c55e' }}>18.5-24.9 Normal</div>
            <div className="bmi-range" style={{ background: '#f59e0b' }}>25-29.9 Overweight</div>
            <div className="bmi-range" style={{ background: '#ef4444' }}>30+ Obese</div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This BMI Calculator</h2>
        <p>Start by selecting your preferred unit system -- Imperial (pounds and feet/inches) or Metric (kilograms and centimeters). If you choose Imperial, enter your height in feet and inches along with your weight in pounds. For Metric, enter your height in centimeters and your weight in kilograms. Click "Calculate BMI" to see your Body Mass Index score and which weight category you fall into. The color-coded result makes it easy to see where you stand at a glance, with a reference scale displayed below your score.</p>

        <h2>Understanding the BMI Formula</h2>
        <p>The BMI formula in metric units is: <strong>BMI = weight (kg) / [height (m)]^2</strong>. For Imperial units, the formula becomes: <strong>BMI = [weight (lb) / height (in)^2] x 703</strong>. For example, if you weigh 160 pounds and stand 5 feet 10 inches tall (70 inches), your BMI would be (160 / 4900) x 703 = 22.9, placing you in the "Normal weight" category. The multiplication factor of 703 converts the Imperial measurement to match the metric-based BMI scale.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Screening tool used by doctors during routine health checkups to flag potential weight-related health risks</li>
          <li>Tracking your weight category over time as part of a fitness or nutrition plan</li>
          <li>Meeting health requirements for military service, athletic programs, or insurance assessments</li>
          <li>Setting realistic weight goals by calculating what weight range corresponds to a normal BMI for your height</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>Is BMI accurate for athletes and muscular people?</h3>
        <p>BMI does not distinguish between muscle mass and fat mass. Athletes, bodybuilders, and people with high muscle density may receive an "Overweight" or "Obese" BMI score even though their body fat percentage is low. In these cases, additional measurements like waist circumference, body fat percentage, or a DEXA scan provide a more complete picture of health.</p>

        <h3>What BMI range is considered healthy?</h3>
        <p>A BMI between 18.5 and 24.9 is classified as "Normal weight" and is generally associated with lower risk of weight-related diseases. Below 18.5 is considered "Underweight," 25 to 29.9 is "Overweight," and 30 or above is "Obese." These ranges were established by the World Health Organization and are used globally as a screening guideline.</p>

        <h3>Does BMI apply the same way to all ages?</h3>
        <p>This calculator is designed for adults aged 20 and older. For children and teenagers, BMI is interpreted differently using age- and sex-specific percentile charts because body composition changes significantly during growth. Pediatricians use CDC growth charts to assess whether a child's BMI is appropriate for their developmental stage.</p>
      </section>
      <RelatedTools current="/bmi-calculator" />
    </div>
  );
}

export default BmiCalculator;
