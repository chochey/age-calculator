import { useState } from 'react';

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tipPercent / 100);
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmount / people : tipAmount;

  const presets = [10, 15, 18, 20, 25];

  return (
    <div>
      <h1>Tip Calculator</h1>
      <p className="subtitle">Calculate tips and split the bill with ease.</p>

      <div className="form">
        <div className="input-group">
          <label>Bill Amount ($)</label>
          <input type="number" min="0" step="0.01" placeholder="0.00" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Tip Percentage</label>
          <div className="preset-row">
            {presets.map((p) => (
              <button key={p} className={`preset-btn ${tipPercent === p ? 'active' : ''}`} onClick={() => setTipPercent(p)} type="button">{p}%</button>
            ))}
          </div>
          <input type="number" min="0" max="100" step="1" value={tipPercent} onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)} />
        </div>

        <div className="input-group">
          <label>Split Between</label>
          <input type="number" min="1" step="1" value={people} onChange={(e) => setPeople(parseInt(e.target.value) || 1)} />
        </div>
      </div>

      {billNum > 0 && (
        <div className="results">
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">${tipAmount.toFixed(2)}</span>
              <span className="detail-label">Tip Amount</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">${total.toFixed(2)}</span>
              <span className="detail-label">Total</span>
            </div>
            {people > 1 && (
              <>
                <div className="detail-card">
                  <span className="detail-value">${tipPerPerson.toFixed(2)}</span>
                  <span className="detail-label">Tip Per Person</span>
                </div>
                <div className="detail-card highlight">
                  <span className="detail-value">${perPerson.toFixed(2)}</span>
                  <span className="detail-label">Total Per Person</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How Much to Tip</h2>
        <p>In the United States, the standard tip for restaurant service is 15-20% of the pre-tax bill. For excellent service, 20-25% is common. For takeout, 10-15% is typical. Use this calculator to quickly figure out the right tip and split the bill evenly.</p>

        <h2>Tipping Guidelines</h2>
        <ul>
          <li><strong>15%</strong> — Standard/adequate service</li>
          <li><strong>18%</strong> — Good service</li>
          <li><strong>20%</strong> — Great service</li>
          <li><strong>25%+</strong> — Exceptional service</li>
        </ul>
      </section>
    </div>
  );
}

export default TipCalculator;
