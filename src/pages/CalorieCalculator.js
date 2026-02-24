import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function CalorieCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [activity, setActivity] = useState('sedentary');
  const [result, setResult] = useState(null);

  const activityMultipliers = {
    sedentary: { value: 1.2, label: 'Sedentary', desc: 'Little or no exercise, desk job' },
    light: { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    moderate: { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    very: { value: 1.725, label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    extra: { value: 1.9, label: 'Extra Active', desc: 'Very hard exercise, physical job' },
  };

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

    // Mifflin-St Jeor Equation
    // Men: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5
    // Women: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * a) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * a) - 161;
    }

    if (bmr <= 0) { setResult(null); return; }

    const multiplier = activityMultipliers[activity].value;
    const tdee = bmr * multiplier;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loseWeight: Math.round(tdee - 500),
      loseFast: Math.round(tdee - 1000),
      gainWeight: Math.round(tdee + 500),
      gainFast: Math.round(tdee + 1000),
      activityLabel: activityMultipliers[activity].label,
    });
  };

  return (
    <div>
      <Seo
        title="Calorie Calculator - Daily Calorie Needs (TDEE)"
        description="Free calorie calculator. Calculate your daily calorie needs based on age, gender, height, weight, and activity level. Uses Mifflin-St Jeor equation."
      />
      <h1>Calorie Calculator</h1>
      <p className="subtitle">Calculate your daily calorie needs based on the Mifflin-St Jeor equation.</p>

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

        <div className="input-row">
          <div className="input-group" style={{ flex: 1 }}>
            <label>Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="select-input"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly Active (1-3 days/week)</option>
              <option value="moderate">Moderately Active (3-5 days/week)</option>
              <option value="very">Very Active (6-7 days/week)</option>
              <option value="extra">Extra Active (very hard exercise, physical job)</option>
            </select>
          </div>
        </div>

        <button type="submit">Calculate Calories</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.tdee.toLocaleString()}</span>
            <span className="age-label">calories / day (TDEE)</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.bmr.toLocaleString()}</span>
              <span className="detail-label">Basal Metabolic Rate (BMR)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.activityLabel}</span>
              <span className="detail-label">Activity Level</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '0.5rem 0 0.75rem', color: '#0f172a' }}>Daily Calorie Goals</h3>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#16a34a' }}>{result.loseFast.toLocaleString()}</span>
              <span className="detail-label">Lose Weight Fast (-1000 cal)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#22c55e' }}>{result.loseWeight.toLocaleString()}</span>
              <span className="detail-label">Lose Weight (-500 cal)</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.tdee.toLocaleString()}</span>
              <span className="detail-label">Maintain Weight</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#f59e0b' }}>{result.gainWeight.toLocaleString()}</span>
              <span className="detail-label">Gain Weight (+500 cal)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#ef4444' }}>{result.gainFast.toLocaleString()}</span>
              <span className="detail-label">Gain Weight Fast (+1000 cal)</span>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
            <strong style={{ color: '#475569' }}>Note:</strong> A deficit of 500 calories per day results in roughly 1 pound of weight loss per week.
            A deficit of 1000 calories per day results in roughly 2 pounds per week. It is generally not recommended to go below 1,200 calories/day
            for women or 1,500 calories/day for men without medical supervision.
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>What Is the Mifflin-St Jeor Equation?</h2>
        <p>
          The Mifflin-St Jeor equation is considered one of the most accurate formulas for estimating Basal Metabolic Rate (BMR).
          Developed in 1990, it calculates the number of calories your body needs at complete rest to maintain basic life functions
          like breathing, circulation, and cell production. The formulas are:
        </p>
        <ul>
          <li><strong>Men:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5</li>
          <li><strong>Women:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) - 161</li>
        </ul>

        <h2>Understanding BMR vs TDEE</h2>
        <p>
          <strong>BMR (Basal Metabolic Rate)</strong> is the number of calories your body burns at complete rest. It represents the minimum
          energy needed to keep your body functioning. <strong>TDEE (Total Daily Energy Expenditure)</strong> is your BMR multiplied by an
          activity factor that accounts for your daily physical activity. TDEE represents the total number of calories you burn in a day
          and is the number you should use for planning your diet.
        </p>

        <h2>Activity Level Multipliers</h2>
        <ul>
          <li><strong>Sedentary (x1.2):</strong> Little or no exercise, desk job</li>
          <li><strong>Lightly Active (x1.375):</strong> Light exercise or sports 1-3 days per week</li>
          <li><strong>Moderately Active (x1.55):</strong> Moderate exercise or sports 3-5 days per week</li>
          <li><strong>Very Active (x1.725):</strong> Hard exercise or sports 6-7 days per week</li>
          <li><strong>Extra Active (x1.9):</strong> Very hard exercise, physical job, or training twice a day</li>
        </ul>

        <h2>Calorie Counting Tips</h2>
        <ul>
          <li>Use a food tracking app to log your meals for more accurate calorie counting</li>
          <li>Weigh and measure food portions rather than estimating by eye</li>
          <li>Focus on nutrient-dense foods that keep you full longer (protein, fiber, healthy fats)</li>
          <li>Adjust your calorie target every 10-15 pounds of weight change, as your TDEE changes with your weight</li>
          <li>Remember that these are estimates -- individual metabolism can vary by 5-10%</li>
        </ul>
      </section>
      <RelatedTools current="/calorie-calculator" />
    </div>
  );
}

export default CalorieCalculator;
