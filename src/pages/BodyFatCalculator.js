import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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

    let neckVal, waistVal, hipVal, heightVal, weightVal;

    if (unit === 'imperial') {
      neckVal = parseFloat(neck);
      waistVal = parseFloat(waist);
      hipVal = parseFloat(hip);
      heightVal = parseFloat(height);
      weightVal = parseFloat(weight);
    } else {
      // Convert cm to inches for the formula
      neckVal = parseFloat(neck) / 2.54;
      waistVal = parseFloat(waist) / 2.54;
      hipVal = parseFloat(hip) / 2.54;
      heightVal = parseFloat(height) / 2.54;
      // Convert kg to lbs for lean/fat mass
      weightVal = parseFloat(weight);
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
        <h2>What Is the U.S. Navy Body Fat Method?</h2>
        <p>
          The U.S. Navy body fat method is a formula developed by the United States Navy to estimate body fat percentage
          using simple circumference measurements. It was created as a practical field method for assessing the body
          composition of military personnel without requiring specialized equipment like calipers or DEXA scans. The
          method uses measurements of the neck, waist (and hips for women) along with height to calculate an estimate
          of body fat percentage.
        </p>

        <h2>U.S. Navy Body Fat Formulas</h2>
        <ul>
          <li><strong>Men:</strong> Body Fat % = 86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76</li>
          <li><strong>Women:</strong> Body Fat % = 163.205 x log10(waist + hip - neck) - 97.684 x log10(height) - 78.387</li>
        </ul>
        <p>All measurements should be taken in inches. This calculator automatically converts centimeters to inches when using metric units.</p>

        <h2>Body Fat Categories (Male)</h2>
        <ul>
          <li><strong>Essential Fat:</strong> Less than 6% -- minimum amount needed for basic health</li>
          <li><strong>Athletes:</strong> 6-13% -- typical for competitive athletes</li>
          <li><strong>Fitness:</strong> 14-17% -- lean and fit appearance</li>
          <li><strong>Average:</strong> 18-24% -- acceptable, typical range for healthy adults</li>
          <li><strong>Obese:</strong> 25% and above -- elevated health risks</li>
        </ul>

        <h2>Body Fat Categories (Female)</h2>
        <ul>
          <li><strong>Essential Fat:</strong> Less than 14% -- minimum amount needed for basic health</li>
          <li><strong>Athletes:</strong> 14-20% -- typical for competitive athletes</li>
          <li><strong>Fitness:</strong> 21-24% -- lean and fit appearance</li>
          <li><strong>Average:</strong> 25-31% -- acceptable, typical range for healthy adults</li>
          <li><strong>Obese:</strong> 32% and above -- elevated health risks</li>
        </ul>

        <h2>How to Take Measurements</h2>
        <ul>
          <li><strong>Neck:</strong> Measure just below the larynx (Adam's apple), with the tape sloping slightly downward at the front</li>
          <li><strong>Waist:</strong> For men, measure at the navel. For women, measure at the narrowest point of the waist</li>
          <li><strong>Hip (women only):</strong> Measure at the widest point of the hips and buttocks</li>
          <li><strong>Height:</strong> Stand straight against a wall without shoes</li>
        </ul>
        <p>
          Use a flexible, non-elastic tape measure. Pull the tape snug but do not compress the skin. Take each
          measurement two or three times and use the average for the most accurate result.
        </p>

        <h2>Limitations</h2>
        <p>
          The U.S. Navy method provides a reasonable estimate but has limitations. It may be less accurate for
          individuals with unusual body proportions, very muscular individuals, or those at extreme ends of the
          body fat spectrum. For a more precise measurement, consider methods such as DEXA scanning, hydrostatic
          weighing, or air displacement plethysmography (Bod Pod). This calculator is intended for informational
          purposes and should not replace professional medical advice.
        </p>
      </section>
      <RelatedTools current="/body-fat-calculator" />
    </div>
  );
}

export default BodyFatCalculator;
