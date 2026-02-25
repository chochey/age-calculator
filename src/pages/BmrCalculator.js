import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function BmrCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [result, setResult] = useState(null);

  const activityLevels = [
    { label: 'Sedentary', desc: 'Little or no exercise, desk job', factor: 1.2 },
    { label: 'Lightly Active', desc: 'Light exercise 1-3 days/week', factor: 1.375 },
    { label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', factor: 1.55 },
    { label: 'Very Active', desc: 'Hard exercise 6-7 days/week', factor: 1.725 },
    { label: 'Extra Active', desc: 'Very hard exercise, physical job', factor: 1.9 },
  ];

  const calculate = (e) => {
    e.preventDefault();

    const a = parseFloat(age);
    if (!a || a <= 0 || a > 150) { setResult(null); return; }

    let weightInKg, heightInCm;

    if (unit === 'imperial') {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      heightInCm = totalInches * 2.54;
      weightInKg = (parseFloat(weightLbs) || 0) * 0.453592;
    } else {
      heightInCm = parseFloat(heightCm) || 0;
      weightInKg = parseFloat(weightKg) || 0;
    }

    if (heightInCm <= 0 || weightInKg <= 0) { setResult(null); return; }

    // Harris-Benedict Equation (revised)
    // Men: BMR = 88.362 + (13.397 x weight kg) + (4.799 x height cm) - (5.677 x age)
    // Women: BMR = 447.593 + (9.247 x weight kg) + (3.098 x height cm) - (4.330 x age)
    let harrisBenedict;
    if (gender === 'male') {
      harrisBenedict = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * a);
    } else {
      harrisBenedict = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * a);
    }

    // Mifflin-St Jeor Equation
    // Men: BMR = (10 x weight kg) + (6.25 x height cm) - (5 x age) + 5
    // Women: BMR = (10 x weight kg) + (6.25 x height cm) - (5 x age) - 161
    let mifflinStJeor;
    if (gender === 'male') {
      mifflinStJeor = (10 * weightInKg) + (6.25 * heightInCm) - (5 * a) + 5;
    } else {
      mifflinStJeor = (10 * weightInKg) + (6.25 * heightInCm) - (5 * a) - 161;
    }

    if (harrisBenedict <= 0 || mifflinStJeor <= 0) { setResult(null); return; }

    const tdeeTable = activityLevels.map((level) => ({
      label: level.label,
      desc: level.desc,
      factor: level.factor,
      harrisBenedict: Math.round(harrisBenedict * level.factor),
      mifflinStJeor: Math.round(mifflinStJeor * level.factor),
    }));

    setResult({
      harrisBenedict: Math.round(harrisBenedict),
      mifflinStJeor: Math.round(mifflinStJeor),
      tdeeTable,
    });
  };

  return (
    <div>
      <Seo
        title="BMR Calculator - Basal Metabolic Rate"
        description="Free BMR calculator. Calculate your basal metabolic rate using Harris-Benedict and Mifflin-St Jeor equations. See calories burned at rest."
      />
      <h1>BMR Calculator</h1>
      <p className="subtitle">Calculate your Basal Metabolic Rate using two proven equations and see TDEE for all activity levels.</p>

      <div className="unit-toggle">
        <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>Imperial (lb/ft)</button>
        <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>Metric (kg/cm)</button>
      </div>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              min="1"
              max="150"
              step="1"
              placeholder="25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {unit === 'imperial' ? (
          <div className="input-row">
            <div className="input-group">
              <label>Height (ft)</label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="5"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Height (in)</label>
              <input
                type="number"
                min="0"
                max="11"
                step="1"
                placeholder="10"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Weight (lbs)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="160"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                required
              />
            </div>
          </div>
        ) : (
          <div className="input-row">
            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="178"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="73"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <button type="submit">Calculate BMR</button>
      </form>

      {result && (
        <div className="results">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="primary-result" style={{ background: '#4f46e5' }}>
              <span className="age-number">{result.harrisBenedict.toLocaleString()}</span>
              <span className="age-label">Harris-Benedict BMR</span>
            </div>
            <div className="primary-result" style={{ background: '#7c3aed' }}>
              <span className="age-number">{result.mifflinStJeor.toLocaleString()}</span>
              <span className="age-label">Mifflin-St Jeor BMR</span>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.harrisBenedict.toLocaleString()} cal</span>
              <span className="detail-label">Harris-Benedict (calories/day at rest)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.mifflinStJeor.toLocaleString()} cal</span>
              <span className="detail-label">Mifflin-St Jeor (calories/day at rest)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{Math.abs(result.harrisBenedict - result.mifflinStJeor).toLocaleString()} cal</span>
              <span className="detail-label">Difference Between Equations</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.75rem', color: '#0f172a' }}>TDEE by Activity Level</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Activity Level</th>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Factor</th>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Harris-Benedict</th>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Mifflin-St Jeor</th>
                </tr>
              </thead>
              <tbody>
                {result.tdeeTable.map((row) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <strong>{row.label}</strong>
                      <br />
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{row.desc}</span>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>x{row.factor}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>{row.harrisBenedict.toLocaleString()} cal</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>{row.mifflinStJeor.toLocaleString()} cal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>
            <strong style={{ color: '#475569' }}>Note:</strong> BMR represents the minimum calories your body needs at complete rest.
            TDEE (Total Daily Energy Expenditure) accounts for your activity level and is the number you should use for
            daily calorie planning. The Mifflin-St Jeor equation is generally considered more accurate for modern populations.
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>What Is Basal Metabolic Rate (BMR)?</h2>
        <p>
          Basal Metabolic Rate (BMR) is the number of calories your body requires to perform essential life-sustaining
          functions at complete rest. These include breathing, blood circulation, cell production, nutrient processing,
          and temperature regulation. BMR typically accounts for 60-75% of your total daily calorie expenditure.
        </p>

        <h2>Harris-Benedict vs Mifflin-St Jeor</h2>
        <p>
          This calculator uses two of the most widely recognized BMR equations. The <strong>Harris-Benedict equation</strong>,
          originally developed in 1919 and revised in 1984, was the standard for decades. The <strong>Mifflin-St Jeor equation</strong>,
          published in 1990, is considered more accurate for modern populations and is recommended by the Academy of Nutrition
          and Dietetics. Both equations use weight, height, age, and gender as inputs but apply different coefficients.
        </p>

        <h2>Harris-Benedict Equation (Revised)</h2>
        <ul>
          <li><strong>Men:</strong> BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age)</li>
          <li><strong>Women:</strong> BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age)</li>
        </ul>

        <h2>Mifflin-St Jeor Equation</h2>
        <ul>
          <li><strong>Men:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5</li>
          <li><strong>Women:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) - 161</li>
        </ul>

        <h2>Understanding Activity Levels (TDEE)</h2>
        <p>
          To estimate your Total Daily Energy Expenditure (TDEE), your BMR is multiplied by an activity factor.
          Choose the level that best matches your typical week:
        </p>
        <ul>
          <li><strong>Sedentary (x1.2):</strong> Little or no exercise, desk job</li>
          <li><strong>Lightly Active (x1.375):</strong> Light exercise or sports 1-3 days per week</li>
          <li><strong>Moderately Active (x1.55):</strong> Moderate exercise or sports 3-5 days per week</li>
          <li><strong>Very Active (x1.725):</strong> Hard exercise or sports 6-7 days per week</li>
          <li><strong>Extra Active (x1.9):</strong> Very hard exercise, physical job, or training twice a day</li>
        </ul>
      </section>
      <RelatedTools current="/bmr-calculator" />
    </div>
  );
}

export default BmrCalculator;
