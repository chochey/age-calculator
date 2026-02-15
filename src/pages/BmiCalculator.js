import { useState } from 'react';

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
        <h2>What is BMI?</h2>
        <p>Body Mass Index (BMI) is a simple measure using your height and weight to estimate whether you're underweight, normal weight, overweight, or obese. It's calculated by dividing weight (kg) by height (m) squared. While BMI doesn't measure body fat directly, it's a useful screening tool.</p>

        <h2>BMI Categories</h2>
        <ul>
          <li><strong>Underweight:</strong> BMI less than 18.5</li>
          <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
          <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
          <li><strong>Obese:</strong> BMI 30 or greater</li>
        </ul>
      </section>
    </div>
  );
}

export default BmiCalculator;
