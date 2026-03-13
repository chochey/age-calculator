import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
      <Seo title="Tip Calculator - Calculate Tips & Split Bills" description="Free tip calculator. Calculate tips for any bill amount, choose tip percentage, and split the bill between any number of people." />
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
        <h2>How to Use This Tip Calculator</h2>
        <p>
          Follow these simple steps to calculate the perfect tip every time. First, enter the total bill amount before tax.
          Next, select or type your desired tip percentage -- most diners choose between 15% and 25% depending on service quality.
          Finally, if you are splitting the check, enter the number of people in your party. The calculator instantly shows the
          tip amount, the total with tip included, and each person's share if you are splitting the bill.
        </p>

        <h2>The Tip Formula Explained</h2>
        <p>
          The formula behind tip calculation is straightforward: <strong>Tip Amount = Bill Amount x (Tip Percentage / 100)</strong>.
          The total you pay is the original bill plus the tip. For example, suppose your dinner bill is $85.00 and you want to
          leave an 18% tip. The tip comes to $85.00 x 0.18 = <strong>$15.30</strong>, making your total $85.00 + $15.30 = <strong>$100.30</strong>.
          If three people are splitting the bill equally, each person pays $100.30 / 3 = <strong>$33.43</strong>.
          This approach works for any bill size -- from a quick coffee to a formal dinner.
        </p>

        <h2>Tipping Guidelines by Service Type</h2>
        <ul>
          <li><strong>15%</strong> -- Adequate or standard service at a sit-down restaurant</li>
          <li><strong>18-20%</strong> -- Good to great service, the most common range for dine-in meals</li>
          <li><strong>25%+</strong> -- Exceptional service or when a server goes above and beyond</li>
          <li><strong>10-15%</strong> -- Takeout, counter service, or buffets</li>
          <li><strong>$1-2 per drink</strong> -- Bars and coffee shops</li>
        </ul>

        <h3>Is a tip calculated on the pre-tax or post-tax amount?</h3>
        <p>
          Traditionally, tips are calculated on the pre-tax subtotal of your bill. However, many people simply tip on the
          total including tax for convenience. The difference is usually small -- on an $80 bill with 8% tax, tipping 20%
          pre-tax yields $16.00, while tipping post-tax yields $17.28.
        </p>

        <h3>How much should I tip for delivery orders?</h3>
        <p>
          For food delivery, a tip of 15-20% is standard, with a minimum of $3-5 for small orders. If the weather is poor
          or the driver traveled a long distance, consider tipping on the higher end. Many delivery apps suggest tip
          amounts before you place your order.
        </p>

        <h3>Should I still tip if the service was bad?</h3>
        <p>
          While tipping is customary in the United States, the amount is ultimately at your discretion. For poor service,
          a 10% tip acknowledges the server's effort while signaling room for improvement. If the issue was with the
          kitchen rather than the server, it is fair to tip normally since servers often have no control over food
          preparation times or errors.
        </p>
      </section>
      <RelatedTools current="/tip-calculator" />
    </div>
  );
}

export default TipCalculator;
