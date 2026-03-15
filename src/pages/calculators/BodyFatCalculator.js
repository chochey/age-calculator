import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function BodyFatCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [gender, setGender] = useState('male');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const getCategory = (bf, g) => {
    if (g === 'male') {
      if (bf < 6) return { label: 'Essential Fat', color: '#3b82f6' };
      if (bf <= 13) return { label: 'Athletes', color: '#22c55e' };
      if (bf <= 17) return { label: 'Fitness', color: '#22c55e' };
      if (bf <= 24) return { label: 'Average', color: '#f59e0b' };
      return { label: 'Obese', color: '#ef4444' };
    } else {
      if (bf < 14) return { label: 'Essential Fat', color: '#3b82f6' };
      if (bf <= 20) return { label: 'Athletes', color: '#22c55e' };
      if (bf <= 24) return { label: 'Fitness', color: '#22c55e' };
      if (bf <= 31) return { label: 'Average', color: '#f59e0b' };
      return { label: 'Obese', color: '#ef4444' };
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    let neckVal, waistVal, hipVal, heightVal;

    if (unit === 'imperial') {
      neckVal = parseFloat(neck);
      waistVal = parseFloat(waist);
      hipVal = parseFloat(hip);
      heightVal = parseFloat(height);
    } else {
      // Convert cm to inches for the formula
      neckVal = parseFloat(neck) / 2.54;
      waistVal = parseFloat(waist) / 2.54;
      hipVal = parseFloat(hip) / 2.54;
      heightVal = parseFloat(height) / 2.54;
    }

    if (!neckVal || neckVal <= 0 || !waistVal || waistVal <= 0 || !heightVal || heightVal <= 0) {
      setResult(null);
      return;
    }

    if (gender === 'female' && (!hipVal || hipVal <= 0)) {
      setResult(null);
      return;
    }

    let bodyFat;
    if (gender === 'male') {
      const diff = waistVal - neckVal;
      if (diff <= 0) { setResult(null); return; }
      bodyFat = 86.010 * Math.log10(diff) - 70.041 * Math.log10(heightVal) + 36.76;
    } else {
      const sum = waistVal + hipVal - neckVal;
      if (sum <= 0) { setResult(null); return; }
      bodyFat = 163.205 * Math.log10(sum) - 97.684 * Math.log10(heightVal) - 78.387;
    }

    if (isNaN(bodyFat) || !isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 100) {
      setResult(null);
      return;
    }

    const category = getCategory(bodyFat, gender);

    // Calculate lean and fat mass if weight is provided
    let fatMass = null;
    let leanMass = null;
    const w = parseFloat(weight);
    if (w && w > 0) {
      fatMass = w * (bodyFat / 100);
      leanMass = w - fatMass;
    }

    setResult({
      bodyFat: bodyFat.toFixed(1),
      category: category.label,
      color: category.color,
      fatMass: fatMass !== null ? fatMass.toFixed(1) : null,
      leanMass: leanMass !== null ? leanMass.toFixed(1) : null,
    });
  };

  const massUnit = unit === 'imperial' ? 'lbs' : 'kg';
  const measureUnit = unit === 'imperial' ? 'inches' : 'cm';

  return (
    <div>
      <Seo
        title="Body Fat Calculator - U.S. Navy Method"
        description="Free body fat calculator using the U.S. Navy method. Estimate your body fat percentage, lean mass, and fat mass with circumference measurements. Supports imperial and metric units."
        faqs={[{ q: 'How accurate is the U.S. Navy body fat method?', a: 'Studies comparing the Navy method to DEXA scans show it is generally accurate within 3 to 4 percentage points for most people. It works best for individuals with average body proportions. The method can overestimate body fat in very muscular people and underestimate it in those carrying visceral fat without large waist measurements. For the most reliable reading, take each circumference measurement two or three times and use the average.' }, { q: 'What body fat percentage is considered healthy?', a: 'Healthy ranges differ by gender. For men, the fitness range is roughly 14 to 17 percent, while the average healthy range extends to about 24 percent. For women, fitness sits around 21 to 24 percent and a healthy average reaches about 31 percent. Body fat below the essential level -- under 6 percent for men or under 14 percent for women -- can impair hormonal function, immune response, and organ protection.' }, { q: 'How is this different from BMI?', a: 'BMI uses only height and weight, so it cannot distinguish between muscle and fat. A muscular athlete and an overweight sedentary person of the same height and weight will have identical BMI values but very different body fat percentages. The Navy method accounts for body shape through circumference measurements, giving a more meaningful picture of body composition. For the best overall assessment, use body fat percentage alongside BMI rather than relying on either metric alone.' }]}
      />
      <h1>Body Fat Calculator</h1>
      <p className="subtitle">Estimate your body fat percentage using the U.S. Navy method with simple circumference measurements.</p>

      <div className="unit-toggle">
        <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>Imperial (inches/lbs)</button>
        <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>Metric (cm/kg)</button>
      </div>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Gender</label>
            <div className="unit-toggle" style={{ marginBottom: 0 }}>
              <button type="button" className={gender === 'male' ? 'active' : ''} onClick={() => setGender('male')}>Male</button>
              <button type="button" className={gender === 'female' ? 'active' : ''} onClick={() => setGender('female')}>Female</button>
            </div>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Height ({measureUnit})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '70' : '178'}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Weight ({massUnit})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '180' : '82'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Neck ({measureUnit})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '15' : '38'}
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Waist ({measureUnit})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '34' : '86'}
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              required
            />
          </div>
          {gender === 'female' && (
            <div className="input-group">
              <label>Hip ({measureUnit})</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder={unit === 'imperial' ? '38' : '97'}
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <button type="submit">Calculate Body Fat</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result" style={{ background: result.color }}>
            <span className="age-number">{result.bodyFat}%</span>
            <span className="age-label">Body Fat</span>
            <span className="age-label" style={{ opacity: 1, fontWeight: 600 }}>{result.category}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.bodyFat}%</span>
              <span className="detail-label">Body Fat Percentage</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: result.color }}>{result.category}</span>
              <span className="detail-label">Category ({gender === 'male' ? 'Male' : 'Female'})</span>
            </div>
            {result.fatMass && (
              <div className="detail-card">
                <span className="detail-value">{result.fatMass} {massUnit}</span>
                <span className="detail-label">Fat Mass</span>
              </div>
            )}
            {result.leanMass && (
              <div className="detail-card">
                <span className="detail-value">{result.leanMass} {massUnit}</span>
                <span className="detail-label">Lean Mass</span>
              </div>
            )}
          </div>

          <div className="bmi-scale">
            {gender === 'male' ? (
              <>
                <div className="bmi-range" style={{ background: '#3b82f6' }}>&lt;6% Essential</div>
                <div className="bmi-range" style={{ background: '#22c55e' }}>6-13% Athletes</div>
                <div className="bmi-range" style={{ background: '#22c55e' }}>14-17% Fitness</div>
                <div className="bmi-range" style={{ background: '#f59e0b' }}>18-24% Average</div>
                <div className="bmi-range" style={{ background: '#ef4444' }}>25%+ Obese</div>
              </>
            ) : (
              <>
                <div className="bmi-range" style={{ background: '#3b82f6' }}>&lt;14% Essential</div>
                <div className="bmi-range" style={{ background: '#22c55e' }}>14-20% Athletes</div>
                <div className="bmi-range" style={{ background: '#22c55e' }}>21-24% Fitness</div>
                <div className="bmi-range" style={{ background: '#f59e0b' }}>25-31% Average</div>
                <div className="bmi-range" style={{ background: '#ef4444' }}>32%+ Obese</div>
              </>
            )}
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Body Fat Calculator</h2>
        <p>
          Start by selecting your unit system -- imperial (inches and pounds) or metric (centimeters and kilograms). Choose your gender, then enter your height, weight, neck circumference, and waist circumference. Women also need to provide a hip measurement. All circumference measurements should be taken with a flexible, non-elastic tape measure pulled snug against the skin without compressing it. Measure your neck just below the Adam's apple, your waist at the navel (men) or the narrowest point (women), and your hips at the widest point. Click "Calculate Body Fat" to see your estimated body fat percentage, category, and lean-versus-fat mass breakdown.
        </p>

        <h2>The U.S. Navy Formula Explained</h2>
        <p>
          The U.S. Navy developed this circumference-based method so that military personnel could estimate body composition in the field without specialized lab equipment. The formula for men is Body Fat % = 86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76, with all values in inches. For women, the formula is Body Fat % = 163.205 x log10(waist + hip - neck) - 97.684 x log10(height) - 78.387.
        </p>
        <p>
          <strong>Worked example (male):</strong> A man with a 34-inch waist, 15-inch neck, and 70-inch height would calculate 86.010 x log10(34 - 15) - 70.041 x log10(70) + 36.76 = 86.010 x 1.2788 - 70.041 x 1.8451 + 36.76 = 109.99 - 129.24 + 36.76 = <strong>17.5% body fat</strong>, placing him in the Fitness category. If he weighs 180 pounds, his fat mass would be about 31.5 lbs and lean mass about 148.5 lbs.
        </p>

        <h3>How accurate is the U.S. Navy body fat method?</h3>
        <p>
          Studies comparing the Navy method to DEXA scans show it is generally accurate within 3 to 4 percentage points for most people. It works best for individuals with average body proportions. The method can overestimate body fat in very muscular people and underestimate it in those carrying visceral fat without large waist measurements. For the most reliable reading, take each circumference measurement two or three times and use the average.
        </p>

        <h3>What body fat percentage is considered healthy?</h3>
        <p>
          Healthy ranges differ by gender. For men, the fitness range is roughly 14 to 17 percent, while the average healthy range extends to about 24 percent. For women, fitness sits around 21 to 24 percent and a healthy average reaches about 31 percent. Body fat below the essential level -- under 6 percent for men or under 14 percent for women -- can impair hormonal function, immune response, and organ protection.
        </p>

        <h3>How is this different from BMI?</h3>
        <p>
          BMI uses only height and weight, so it cannot distinguish between muscle and fat. A muscular athlete and an overweight sedentary person of the same height and weight will have identical BMI values but very different body fat percentages. The Navy method accounts for body shape through circumference measurements, giving a more meaningful picture of body composition. For the best overall assessment, use body fat percentage alongside BMI rather than relying on either metric alone.
        </p>
      </section>
      <RelatedTools current="/body-fat-calculator" />
    </div>
  );
}

export default BodyFatCalculator;
