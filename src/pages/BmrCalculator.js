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
        <h2>How to Use the BMR Calculator</h2>
        <p>
          Getting your BMR result takes just a few steps. First, choose your preferred unit system -- imperial (pounds and feet) or metric (kilograms and centimeters). Next, enter your age, select your gender, and fill in your height and weight. Click "Calculate BMR" to see your results. The calculator returns two BMR estimates side by side -- one from the Harris-Benedict equation and one from the Mifflin-St Jeor equation -- along with a full TDEE table showing estimated daily calories for five different activity levels, from sedentary office work to intense daily training.
        </p>

        <h2>The Formulas Behind the Numbers</h2>
        <p>
          Both equations estimate the calories your body burns at complete rest. The <strong>Mifflin-St Jeor equation</strong> for men is BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5, and for women it replaces the +5 with -161. The <strong>Harris-Benedict equation</strong> (revised 1984) uses different coefficients: for men, BMR = 88.362 + (13.397 x weight) + (4.799 x height) - (5.677 x age).
        </p>
        <p>
          <strong>Worked example:</strong> A 30-year-old male who weighs 80 kg and stands 178 cm tall would calculate Mifflin-St Jeor BMR as (10 x 80) + (6.25 x 178) - (5 x 30) + 5 = 800 + 1112.5 - 150 + 5 = <strong>1,768 calories per day</strong>. Multiply that by an activity factor of 1.55 (moderately active) to get a TDEE of roughly 2,740 calories. The Academy of Nutrition and Dietetics generally recommends the Mifflin-St Jeor equation as the more accurate option for today's populations.
        </p>

        <h3>What is the difference between BMR and TDEE?</h3>
        <p>
          BMR (Basal Metabolic Rate) is the calorie cost of keeping your body alive at total rest -- breathing, pumping blood, and maintaining body temperature. It typically accounts for 60 to 75 percent of your daily burn. TDEE (Total Daily Energy Expenditure) adds the calories you use through physical activity and digestion on top of your BMR. When planning a diet, TDEE is the number that matters because it represents your actual daily calorie needs.
        </p>

        <h3>Which BMR equation is more accurate?</h3>
        <p>
          Research published in the Journal of the American Dietetic Association found that the Mifflin-St Jeor equation predicted resting metabolic rate within 10 percent of measured values more often than the Harris-Benedict equation. That said, both are estimates. Individual factors like muscle mass, genetics, and hormonal balance can shift your real BMR above or below the calculated figure, so treat these numbers as a strong starting point rather than an absolute answer.
        </p>

        <h3>How often should I recalculate my BMR?</h3>
        <p>
          Recalculate whenever your body composition changes noticeably -- after gaining or losing 10 or more pounds, after a birthday that moves you into a new decade, or if your activity level shifts significantly. Because the formulas factor in weight, height, and age, keeping the inputs current ensures your calorie targets stay relevant. Many nutritionists recommend re-checking every two to three months during an active weight-loss or muscle-building phase.
        </p>
      </section>
      <RelatedTools current="/bmr-calculator" />
    </div>
  );
}

export default BmrCalculator;
