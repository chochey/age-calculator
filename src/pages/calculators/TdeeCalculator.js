import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function TdeeCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weightUnit, setWeightUnit] = useState('lb');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('ftin');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const a = parseFloat(age);
    const w = parseFloat(weight);
    if (!a || !w || a <= 0 || w <= 0) { setResult(null); return; }

    const weightKg = weightUnit === 'lb' ? w * 0.453592 : w;
    let heightCm;
    if (heightUnit === 'ftin') {
      const ft = parseFloat(feet) || 0;
      const inc = parseFloat(inches) || 0;
      heightCm = ft * 30.48 + inc * 2.54;
    } else {
      heightCm = parseFloat(cm) || 0;
    }
    if (heightCm <= 0) { setResult(null); return; }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    const factor = parseFloat(activity);
    const tdee = bmr * factor;
    const mildLoss = tdee - 250;
    const weightLoss = tdee - 500;
    const mildGain = tdee + 250;
    const weightGain = tdee + 500;

    setResult({ bmr, tdee, mildLoss, weightLoss, mildGain, weightGain });
  };

  const activityLabels = {
    '1.2': 'Sedentary',
    '1.375': 'Lightly Active',
    '1.55': 'Moderately Active',
    '1.725': 'Active',
    '1.9': 'Very Active'
  };

  return (
    <div>
      <Seo title="TDEE Calculator - Total Daily Energy Expenditure Calculator" description="Free TDEE calculator. Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation. Find your BMR and daily calorie needs for any goal." faqs={[{ q: 'What is TDEE and why does it matter?', a: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day including your basal metabolic rate, physical activity, and the thermic effect of food. Knowing your TDEE helps you set calorie targets: eat below it to lose weight, at it to maintain, or above it to gain weight. It is the single most useful number for managing body composition.' }, { q: 'How accurate is the Mifflin-St Jeor equation?', a: 'The Mifflin-St Jeor equation is considered the most accurate predictive BMR formula for most adults, with studies showing it falls within 10% of measured metabolic rate for about 80% of people. However, it does not account for muscle mass, genetics, or metabolic adaptations, so treat the result as a well-informed starting point and adjust based on real-world results over 2-4 weeks.' }, { q: 'Should I eat at my TDEE or my BMR to lose weight?', a: 'Never eat below your BMR — that is the minimum energy your body needs for basic functions like breathing and circulation. For healthy weight loss, eat 250-500 calories below your TDEE, which creates a moderate deficit that preserves muscle mass. A 500-calorie daily deficit results in approximately one pound of fat loss per week.' }]} />
      <h1>TDEE Calculator</h1>
      <p className="subtitle">Calculate your Total Daily Energy Expenditure and daily calorie needs.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label>Age (years)</label>
            <input type="number" min="1" max="120" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Weight ({weightUnit})</label>
            <input type="number" min="1" step="any" placeholder={weightUnit === 'lb' ? '160' : '73'} value={weight} onChange={(e) => setWeight(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Unit</label>
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="lb">Pounds</option>
              <option value="kg">Kilograms</option>
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Height</label>
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="ftin">Feet & Inches</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>
          {heightUnit === 'ftin' ? (
            <>
              <div className="input-group">
                <label>Feet</label>
                <input type="number" min="1" max="8" placeholder="5" value={feet} onChange={(e) => setFeet(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Inches</label>
                <input type="number" min="0" max="11" step="any" placeholder="10" value={inches} onChange={(e) => setInches(e.target.value)} />
              </div>
            </>
          ) : (
            <div className="input-group">
              <label>Height (cm)</label>
              <input type="number" min="1" step="any" placeholder="178" value={cm} onChange={(e) => setCm(e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>Activity Level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="1.2">Sedentary (little or no exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Active (6-7 days/week)</option>
              <option value="1.9">Very Active (hard exercise daily)</option>
            </select>
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{Math.round(result.tdee)}</span>
            <span className="age-label">calories/day ({activityLabels[activity]})</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{Math.round(result.bmr)}</span>
              <span className="detail-label">BMR (Basal Metabolic Rate)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{Math.round(result.mildLoss)}</span>
              <span className="detail-label">Mild Weight Loss (-0.5 lb/wk)</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{Math.round(result.weightLoss)}</span>
              <span className="detail-label">Weight Loss (-1 lb/wk)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{Math.round(result.mildGain)}</span>
              <span className="detail-label">Mild Weight Gain (+0.5 lb/wk)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{Math.round(result.weightGain)}</span>
              <span className="detail-label">Weight Gain (+1 lb/wk)</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This TDEE Calculator</h2>
        <p>
          Select your gender, enter your age, weight, and height, then choose the activity level that best
          describes your typical week. Click "Calculate" to see your Basal Metabolic Rate (BMR) and Total
          Daily Energy Expenditure (TDEE). The calculator also shows calorie targets for mild weight loss,
          standard weight loss, mild weight gain, and standard weight gain. Use these numbers as a starting
          point and adjust after two to four weeks based on how your body responds.
        </p>

        <h2>The Mifflin-St Jeor Equation Explained</h2>
        <p>
          This calculator uses the Mifflin-St Jeor equation, which is widely considered the most accurate
          predictive formula for estimating BMR. For men the formula is <strong>BMR = 10 x weight(kg) +
          6.25 x height(cm) - 5 x age - 5</strong>, and for women it is <strong>BMR = 10 x weight(kg) +
          6.25 x height(cm) - 5 x age - 161</strong>. The BMR is then multiplied by an activity factor
          ranging from 1.2 (sedentary) to 1.9 (very active) to estimate total daily calorie burn. The
          activity multipliers account for exercise, non-exercise activity thermogenesis (NEAT), and the
          thermic effect of food.
        </p>

        <h2>Worked Example</h2>
        <p>
          A <strong>30-year-old male</strong> weighing <strong>180 lbs (81.6 kg)</strong> who is <strong>5'10"
          (177.8 cm)</strong> and moderately active. BMR = 10(81.6) + 6.25(177.8) - 5(30) + 5 = 816 + 1111.25
          - 150 + 5 = <strong>1,782 calories</strong>. Multiplied by the moderate activity factor of 1.55, his
          TDEE is 1,782 x 1.55 = <strong>2,762 calories/day</strong>. To lose one pound per week, he would eat
          about <strong>2,262 calories/day</strong> (a 500-calorie deficit).
        </p>

        <h3>What is TDEE and why does it matter?</h3>
        <p>
          TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a
          day including your basal metabolic rate, physical activity, and the thermic effect of food. Knowing
          your TDEE helps you set calorie targets: eat below it to lose weight, at it to maintain, or above
          it to gain weight. It is the single most useful number for managing body composition.
        </p>

        <h3>How accurate is the Mifflin-St Jeor equation?</h3>
        <p>
          The Mifflin-St Jeor equation is considered the most accurate predictive BMR formula for most adults,
          with studies showing it falls within 10% of measured metabolic rate for about 80% of people. However,
          it does not account for muscle mass, genetics, or metabolic adaptations, so treat the result as a
          well-informed starting point and adjust based on real-world results over 2-4 weeks.
        </p>

        <h3>Should I eat at my TDEE or my BMR to lose weight?</h3>
        <p>
          Never eat below your BMR — that is the minimum energy your body needs for basic functions like
          breathing and circulation. For healthy weight loss, eat 250-500 calories below your TDEE, which
          creates a moderate deficit that preserves muscle mass. A 500-calorie daily deficit results in
          approximately one pound of fat loss per week.
        </p>
      </section>
      <RelatedTools current="/tdee-calculator" />
    </div>
  );
}

export default TdeeCalculator;
