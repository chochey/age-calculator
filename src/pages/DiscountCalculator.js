import { useState } from 'react';
import Seo from '../components/Seo';

function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!p || isNaN(d) || p <= 0) { setResult(null); return; }

    const savings = p * (d / 100);
    const salePrice = p - savings;
    const taxRate = parseFloat(tax) || 0;
    const taxAmount = salePrice * (taxRate / 100);
    const finalPrice = salePrice + taxAmount;

    setResult({ original: p, discount: d, savings, salePrice, taxAmount, finalPrice });
  };

  return (
    <div>
      <Seo title="Discount Calculator - Sale Price Calculator" description="Free discount calculator. Calculate sale prices, savings, and final cost with tax. Find out how much you save with any percentage discount." />
      <h1>Discount Calculator</h1>
      <p className="subtitle">Calculate sale prices, savings, and final cost with tax.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Original Price ($)</label>
            <input type="number" min="0" step="any" placeholder="99.99" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Discount (%)</label>
            <input type="number" min="0" max="100" step="any" placeholder="25" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Tax % (optional)</label>
            <input type="number" min="0" max="100" step="any" placeholder="8.25" value={tax} onChange={(e) => setTax(e.target.value)} />
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">${result.finalPrice.toFixed(2)}</span>
            <span className="age-label">final price</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">${result.original.toFixed(2)}</span>
              <span className="detail-label">Original Price</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">-${result.savings.toFixed(2)}</span>
              <span className="detail-label">You Save ({result.discount}%)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">${result.salePrice.toFixed(2)}</span>
              <span className="detail-label">Sale Price</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">${result.taxAmount.toFixed(2)}</span>
              <span className="detail-label">Tax</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Calculate Discounts</h2>
        <p>To calculate a discount, multiply the original price by the discount percentage, then subtract that amount from the original price. Optionally add sales tax to get the final price you'll pay at checkout.</p>

        <h2>Quick Reference</h2>
        <ul>
          <li><strong>10% off $50</strong> — Save $5, pay $45</li>
          <li><strong>25% off $100</strong> — Save $25, pay $75</li>
          <li><strong>50% off $80</strong> — Save $40, pay $40</li>
          <li><strong>75% off $200</strong> — Save $150, pay $50</li>
        </ul>
      </section>
    </div>
  );
}

export default DiscountCalculator;
