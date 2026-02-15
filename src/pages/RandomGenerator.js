import { useState } from 'react';
import Seo from '../components/Seo';

function RandomGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState([]);

  const generate = (e) => {
    e.preventDefault();
    const lo = Math.min(Number(min), Number(max));
    const hi = Math.max(Number(min), Number(max));
    const n = Math.max(1, Math.min(Number(count), 1000));

    if (!allowDuplicates && n > (hi - lo + 1)) {
      setResults(['Not enough unique numbers in range']);
      return;
    }

    if (allowDuplicates) {
      const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo);
      setResults(nums);
    } else {
      const pool = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, n));
    }
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(', '));
  };

  return (
    <div>
      <Seo title="Random Number Generator" description="Free random number generator. Generate random numbers in any range with options for quantity and unique numbers." />
      <h1>Random Number Generator</h1>
      <p className="subtitle">Generate random numbers within any range.</p>

      <form onSubmit={generate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Minimum</label>
            <input type="number" value={min} onChange={(e) => setMin(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Maximum</label>
            <input type="number" value={max} onChange={(e) => setMax(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>How many?</label>
            <input type="number" min="1" max="1000" value={count} onChange={(e) => setCount(e.target.value)} required />
          </div>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} />
          Allow duplicates
        </label>
        <button type="submit">Generate</button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <div className="output-header">
            <strong>Results ({results.length})</strong>
            <button onClick={copyResults} className="copy-btn">Copy</button>
          </div>
          <div className="random-results">
            {results.map((num, i) => (
              <span key={i} className="random-num">{num}</span>
            ))}
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How It Works</h2>
        <p>Enter a minimum and maximum value, choose how many numbers you want, and click Generate. You can allow or disallow duplicate numbers. Results are generated using JavaScript's built-in Math.random() function.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Pick lottery or raffle numbers</li>
          <li>Generate random data for testing</li>
          <li>Make random selections or decisions</li>
          <li>Create random PINs or codes</li>
        </ul>
      </section>
    </div>
  );
}

export default RandomGenerator;
