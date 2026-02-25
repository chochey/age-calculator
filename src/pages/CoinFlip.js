import { useState, useCallback } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const MULTI_OPTIONS = [1, 2, 5, 10, 100];

function flipOnce() {
  return Math.random() < 0.5 ? 'H' : 'T';
}

function CoinFlip() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState([]);
  const [multiCount, setMultiCount] = useState(1);

  const totalFlips = history.length;
  const headsCount = history.filter((f) => f === 'H').length;
  const tailsCount = totalFlips - headsCount;
  const headsPct = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : '0.0';
  const tailsPct = totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : '0.0';

  const doFlip = useCallback(() => {
    setFlipping(true);
    setTimeout(() => {
      const flips = Array.from({ length: multiCount }, () => flipOnce());
      setResult(multiCount === 1 ? flips[0] : flips);
      setHistory((prev) => {
        const updated = [...flips, ...prev];
        return updated.slice(0, 20);
      });
      setFlipping(false);
    }, 600);
  }, [multiCount]);

  const reset = useCallback(() => {
    setResult(null);
    setHistory([]);
  }, []);

  const lastSingle = multiCount === 1 && result && !Array.isArray(result) ? result : null;
  const lastMulti = Array.isArray(result) ? result : null;

  return (
    <div>
      <Seo title="Coin Flip – QuickCalcs" description="Free online coin flipper. Flip a virtual coin with history tracking and statistics. Heads or tails?" />
      <h1>Coin Flip</h1>
      <p className="subtitle">Flip a virtual coin — heads or tails?</p>

      {/* Flip Multiple selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>Flip Multiple</label>
        <div className="preset-row">
          {MULTI_OPTIONS.map((n) => (
            <button
              key={n}
              className={`preset-btn${multiCount === n ? ' active' : ''}`}
              onClick={() => setMultiCount(n)}
            >
              {n === 1 ? '1 coin' : `${n} coins`}
            </button>
          ))}
        </div>
      </div>

      {/* Flip button */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button className="form-btn" onClick={doFlip} disabled={flipping} style={{ fontSize: '1.1rem', padding: '0.85rem 2.5rem' }}>
          {flipping ? 'Flipping...' : multiCount === 1 ? 'Flip Coin' : `Flip ${multiCount} Coins`}
        </button>
        {history.length > 0 && (
          <button className="form-btn secondary" onClick={reset}>Reset</button>
        )}
      </div>

      {/* Single coin result */}
      {lastSingle && !flipping && (
        <div className="results">
          <div className="primary-result" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: lastSingle === 'H'
                  ? 'linear-gradient(145deg, #fbbf24, #f59e0b)'
                  : 'linear-gradient(145deg, #94a3b8, #64748b)',
                color: lastSingle === 'H' ? '#78350f' : '#fff',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15), inset 0 -2px 4px rgba(0,0,0,0.1)',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              {lastSingle === 'H' ? 'HEADS' : 'TAILS'}
            </div>
            <span className="age-number">{lastSingle === 'H' ? 'Heads!' : 'Tails!'}</span>
          </div>
        </div>
      )}

      {/* Flipping animation */}
      {flipping && (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              margin: '0 auto',
              background: 'linear-gradient(145deg, #fbbf24, #94a3b8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#fff',
              animation: 'coinSpin 0.6s linear',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}
          >
            ?
          </div>
        </div>
      )}

      {/* Multi-coin result */}
      {lastMulti && !flipping && (
        <div className="results">
          <div className="primary-result" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span className="age-number">
              {lastMulti.filter((f) => f === 'H').length}H / {lastMulti.filter((f) => f === 'T').length}T
            </span>
            <span className="age-label">out of {lastMulti.length} flips</span>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            padding: '1rem',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            marginBottom: '1.25rem',
          }}>
            {lastMulti.map((f, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: f === 'H'
                    ? 'linear-gradient(145deg, #fbbf24, #f59e0b)'
                    : 'linear-gradient(145deg, #94a3b8, #64748b)',
                  color: f === 'H' ? '#78350f' : '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {totalFlips > 0 && (
        <div className="detail-grid">
          <div className="detail-card highlight">
            <span className="detail-value">{totalFlips}</span>
            <span className="detail-label">Total Flips</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{headsCount}</span>
            <span className="detail-label">Heads ({headsPct}%)</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{tailsCount}</span>
            <span className="detail-label">Tails ({tailsPct}%)</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '1.1rem' }}>
              {headsCount > tailsCount ? 'Heads' : tailsCount > headsCount ? 'Tails' : 'Tied'}
            </span>
            <span className="detail-label">Leading Side</span>
          </div>
        </div>
      )}

      {/* Flip history */}
      {history.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div className="output-header">
            <strong>Flip History (last {Math.min(history.length, 20)})</strong>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            padding: '1rem',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
          }}>
            {history.map((f, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: f === 'H'
                    ? '#fef3c7'
                    : '#f1f5f9',
                  color: f === 'H' ? '#b45309' : '#475569',
                  border: f === 'H' ? '2px solid #fbbf24' : '2px solid #cbd5e1',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <RelatedTools current="/coin-flip" />

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          This free online coin flipper simulates a fair coin toss using random number generation.
          Each flip has an equal 50/50 chance of landing on heads or tails, just like a real coin.
          Use it to make quick decisions, settle disputes, or test probability concepts.
        </p>

        <h2>How It Works</h2>
        <p>
          Click the "Flip Coin" button to simulate a single coin toss. Choose the multi-flip option
          to flip 2, 5, 10, or even 100 coins at once. The tool tracks your flip history (up to the
          last 20 flips) and calculates running statistics including total flips, heads and tails
          counts, and their respective percentages.
        </p>

        <h2>Common Uses</h2>
        <ul>
          <li>Making quick binary decisions</li>
          <li>Settling friendly disagreements</li>
          <li>Teaching probability and statistics</li>
          <li>Randomizing choices in games</li>
          <li>Demonstrating the law of large numbers with multi-flip</li>
        </ul>

        <h2>Is It Fair?</h2>
        <p>
          Yes. This coin flipper uses JavaScript's Math.random() to generate each result, giving
          a near-perfect 50/50 probability for heads or tails. Over a large number of flips, you
          should see the percentages converge close to 50% for each side.
        </p>
      </div>

      {/* Inline keyframes for coin spin animation */}
      <style>{`
        @keyframes coinSpin {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(900deg) scale(1.1); }
          100% { transform: rotateY(1800deg) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default CoinFlip;
