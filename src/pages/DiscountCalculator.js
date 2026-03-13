import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use This Discount Calculator</h2>
        <p>
          Using this tool takes just a few seconds. Enter the original price of the item, type the discount percentage
          being offered, and optionally add your local sales tax rate. Click "Calculate" to instantly see the sale price,
          how much you save in dollars, the tax amount, and the final price you will pay at the register. This is
          especially handy during holiday sales, clearance events, or when stacking multiple promotions.
        </p>

        <h2>The Discount Formula with a Worked Example</h2>
        <p>
          The core formula is: <strong>Savings = Original Price x (Discount% / 100)</strong>, and
          <strong> Sale Price = Original Price - Savings</strong>. If sales tax applies, the final price is
          <strong> Sale Price + (Sale Price x Tax% / 100)</strong>. For example, imagine a jacket originally priced
          at $120.00 is marked 30% off, and your local sales tax is 7.5%. Your savings are $120.00 x 0.30 =
          <strong> $36.00</strong>. The sale price becomes $120.00 - $36.00 = <strong>$84.00</strong>. Tax adds
          $84.00 x 0.075 = <strong>$6.30</strong>, so the final price at checkout is $84.00 + $6.30 = <strong>$90.30</strong>.
          You save $36.00 compared to the original sticker price.
        </p>

        <h2>Quick Discount Reference</h2>
        <ul>
          <li><strong>10% off $50</strong> -- Save $5.00, pay $45.00</li>
          <li><strong>25% off $100</strong> -- Save $25.00, pay $75.00</li>
          <li><strong>40% off $65</strong> -- Save $26.00, pay $39.00</li>
          <li><strong>50% off $80</strong> -- Save $40.00, pay $40.00</li>
          <li><strong>75% off $200</strong> -- Save $150.00, pay $50.00</li>
        </ul>

        <h3>How do I calculate a double discount (discount on top of a discount)?</h3>
        <p>
          When a store offers an extra percentage off an already reduced price, apply the discounts sequentially rather
          than adding them together. For example, 20% off followed by an extra 10% off a $100 item does not equal 30%
          off. Instead, $100 x 0.80 = $80, then $80 x 0.90 = $72.00. The combined effective discount is 28%, not 30%.
        </p>

        <h3>Does the discount apply before or after tax?</h3>
        <p>
          In nearly all retail situations, the discount is applied to the pre-tax price first, and sales tax is then
          calculated on the reduced sale price. This means you also pay less tax when an item is discounted, which
          increases your total savings slightly beyond just the discount amount itself.
        </p>

        <h3>How can I tell if a sale is actually a good deal?</h3>
        <p>
          Compare the final per-unit or per-item cost against prices at other retailers and the item's typical selling
          price over time. Some stores raise prices before a sale to make discounts appear larger. Browser extensions
          and price-tracking websites can show you an item's price history so you know whether the current deal is
          genuinely below average.
        </p>
      </section>
      <RelatedTools current="/discount-calculator" />
    </div>
  );
}

export default DiscountCalculator;
