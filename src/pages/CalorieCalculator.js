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
        <h2>How to Use the Calorie Calculator</h2>
        <p>
          Select imperial or metric units, then enter your age, gender, height, and weight. Choose the activity level that best describes your typical week -- from sedentary desk work to intense daily training. Press "Calculate Calories" and the tool returns your BMR (calories at rest), your TDEE (total daily burn), and goal-based calorie targets for losing weight, maintaining weight, or gaining weight. A 500-calorie daily deficit produces roughly one pound of fat loss per week, while a 1,000-calorie deficit doubles that rate.
        </p>

        <h2>The Mifflin-St Jeor Formula and a Worked Example</h2>
        <p>
          This calculator uses the Mifflin-St Jeor equation, widely regarded as the most accurate BMR formula for modern populations. For men the formula is BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5, and for women it is the same but ending with -161 instead of +5.
        </p>
        <p>
          <strong>Example:</strong> A 28-year-old woman who weighs 65 kg and is 165 cm tall would compute BMR = (10 x 65) + (6.25 x 165) - (5 x 28) - 161 = 650 + 1031.25 - 140 - 161 = <strong>1,380 calories/day</strong>. If she exercises moderately three to five days per week (multiplier 1.55), her TDEE comes to about 2,139 calories. Eating 1,639 calories daily (a 500-calorie deficit) would put her on track to lose about one pound per week.
        </p>

        <h3>How many calories should I eat to lose weight?</h3>
        <p>
          A safe starting point for most people is to subtract 500 calories from your TDEE, which yields roughly one pound of weight loss per week. Going beyond a 1,000-calorie deficit is generally not recommended without medical supervision. It is also important not to eat below 1,200 calories per day for women or 1,500 for men, as dropping too low can slow your metabolism, cause muscle loss, and lead to nutrient deficiencies.
        </p>

        <h3>Does my calorie need change as I lose weight?</h3>
        <p>
          Yes. As your body weight decreases, your BMR decreases too because there is less tissue to maintain. For every 10 to 15 pounds you lose, recalculate your TDEE and adjust your calorie intake accordingly. Failing to do this is one of the most common reasons weight-loss plateaus occur. Strength training can help by preserving lean muscle mass, which keeps your metabolic rate higher.
        </p>

        <h3>What is the difference between calories and macronutrients?</h3>
        <p>
          Calories measure the energy in food, while macronutrients -- protein, carbohydrates, and fat -- are the sources of those calories. Protein and carbohydrates each provide 4 calories per gram, while fat provides 9 calories per gram. Two diets with the same calorie count can have very different effects on hunger, energy, and body composition depending on their macronutrient balance. For most people, a moderate split of roughly 30 percent protein, 40 percent carbohydrates, and 30 percent fat is a practical starting framework.
        </p>
      </section>
      <RelatedTools current="/calorie-calculator" />
    </div>
  );
}

export default CalorieCalculator;
