import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function StandardDeviationCalc() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const vals = numbers.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
    if (vals.length < 2) { setResult(null); return; }

    const count = vals.length;
    const mean = vals.reduce((a, b) => a + b, 0) / count;
    const squaredDiffs = vals.map((v) => (v - mean) ** 2);
    const popVariance = squaredDiffs.reduce((a, b) => a + b, 0) / count;
    const sampleVariance = squaredDiffs.reduce((a, b) => a + b, 0) / (count - 1);
    const popStdDev = Math.sqrt(popVariance);
    const sampleStdDev = Math.sqrt(sampleVariance);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min;

    setResult({ count, mean, popVariance, sampleVariance, popStdDev, sampleStdDev, min, max, range });
  };

  return (
    <div>
      <Seo title="Standard Deviation Calculator - Mean & Variance Calculator" description="Free standard deviation calculator. Enter a data set and instantly find the mean, variance, population and sample standard deviation, count, and range." faqs={[{ q: 'What is the difference between population and sample standard deviation?', a: 'Population standard deviation divides by N (the total number of data points) and is used when your data set includes every member of the group you are studying. Sample standard deviation divides by N-1 (called Bessel\'s correction) and is used when your data is a subset drawn from a larger population, which is the more common scenario in statistics.' }, { q: 'How do I interpret standard deviation?', a: 'Standard deviation tells you how spread out values are from the mean. A low standard deviation means data points are clustered tightly around the average, while a high standard deviation means they are spread over a wider range. In a normal distribution, about 68% of values fall within one standard deviation of the mean, and about 95% fall within two standard deviations.' }, { q: 'Can I use this calculator for grades or test scores?', a: 'Yes. Enter each score separated by commas or spaces. The calculator will show the class average (mean) and how much scores vary from that average. Teachers often use standard deviation to understand grade distribution and to set curves or identify outliers in student performance.' }]} />
      <h1>Standard Deviation Calculator</h1>
      <p className="subtitle">Calculate mean, variance, and standard deviation for any data set.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group" style={{ flex: 1 }}>
            <label>Enter Numbers (comma or space separated)</label>
            <input type="text" placeholder="10, 20, 30, 40, 50" value={numbers} onChange={(e) => setNumbers(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.popStdDev.toFixed(4)}</span>
            <span className="age-label">population standard deviation</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.count}</span>
              <span className="detail-label">Count</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.mean.toFixed(4)}</span>
              <span className="detail-label">Mean</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.sampleStdDev.toFixed(4)}</span>
              <span className="detail-label">Sample Std Dev</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.popVariance.toFixed(4)}</span>
              <span className="detail-label">Pop. Variance</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.sampleVariance.toFixed(4)}</span>
              <span className="detail-label">Sample Variance</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.range.toFixed(2)}</span>
              <span className="detail-label">Range ({result.min} - {result.max})</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Standard Deviation Calculator</h2>
        <p>
          Enter your data set into the input field, separating each number with a comma or a space. You can paste
          data directly from a spreadsheet or type values manually. Click "Calculate" to instantly see the count,
          mean, population variance, sample variance, population standard deviation, sample standard deviation,
          and the range of your data set. This tool works for any size data set, from a handful of test scores
          to hundreds of measurements.
        </p>

        <h2>Understanding the Standard Deviation Formula</h2>
        <p>
          Standard deviation measures how far individual data points typically fall from the mean. The formula
          starts by finding the mean (average) of all values. Next, each value's difference from the mean is
          squared to eliminate negative signs. These squared differences are then averaged — dividing by N for
          population standard deviation or by N-1 for sample standard deviation. Finally, the square root of
          that average gives the standard deviation. The squaring and square-root steps ensure the result is in
          the same units as the original data, making interpretation straightforward.
        </p>

        <h2>Worked Example</h2>
        <p>
          Consider the data set: <strong>4, 8, 6, 5, 3</strong>. The mean is (4+8+6+5+3)/5 = <strong>5.2</strong>.
          The squared differences are 1.44, 7.84, 0.64, 0.04, and 4.84, which sum to 14.8. The population
          variance is 14.8/5 = <strong>2.96</strong>, and the population standard deviation is sqrt(2.96) =
          <strong>1.7205</strong>. For the sample standard deviation, divide by 4 instead: 14.8/4 = 3.70, giving
          sqrt(3.70) = <strong>1.9235</strong>. The sample version is slightly larger because it corrects for
          the bias inherent in estimating a population parameter from a sample.
        </p>

        <h3>What is the difference between population and sample standard deviation?</h3>
        <p>
          Population standard deviation divides by N (the total number of data points) and is used when your
          data set includes every member of the group you are studying. Sample standard deviation divides by
          N-1 (called Bessel's correction) and is used when your data is a subset drawn from a larger
          population, which is the more common scenario in statistics.
        </p>

        <h3>How do I interpret standard deviation?</h3>
        <p>
          Standard deviation tells you how spread out values are from the mean. A low standard deviation means
          data points are clustered tightly around the average, while a high standard deviation means they are
          spread over a wider range. In a normal distribution, about 68% of values fall within one standard
          deviation of the mean, and about 95% fall within two standard deviations.
        </p>

        <h3>Can I use this calculator for grades or test scores?</h3>
        <p>
          Yes. Enter each score separated by commas or spaces. The calculator will show the class average (mean)
          and how much scores vary from that average. Teachers often use standard deviation to understand grade
          distribution and to set curves or identify outliers in student performance.
        </p>
      </section>
      <RelatedTools current="/standard-deviation-calculator" />
    </div>
  );
}

export default StandardDeviationCalc;
