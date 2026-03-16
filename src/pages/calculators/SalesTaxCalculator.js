import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function SalesTaxCalculator() {
  const [mode, setMode] = useState('forward');
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    if (!p || p <= 0 || isNaN(r) || r < 0) { setResult(null); return; }

    if (mode === 'forward') {
      const taxAmount = p * (r / 100);
      const total = p + taxAmount;
      setResult({ preTax: p, taxRate: r, taxAmount, total });
    } else {
      const preTax = p / (1 + r / 100);
      const taxAmount = p - preTax;
      setResult({ preTax, taxRate: r, taxAmount, total: p });
    }
  };

  return (
    <div>
      <Seo title="Sales Tax Calculator - Tax Amount & Total Price Calculator" description="Free sales tax calculator. Calculate tax amount and total price from any price and tax rate, or reverse-calculate the pre-tax price from a total." faqs={[{ q: 'How do I calculate sales tax from a total receipt amount?', a: 'To find the pre-tax price from a total that already includes tax, divide the total by (1 + tax rate as a decimal). For example, if your total is $107.00 and the tax rate is 7%, divide $107.00 by 1.07 to get $100.00 as the pre-tax price. The tax amount is $107.00 minus $100.00, which equals $7.00.' }, { q: 'Do all US states charge sales tax?', a: 'No. Five US states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some localities in Alaska do impose a local sales tax. Additionally, many states exempt essential items like groceries, prescription drugs, and clothing from sales tax, so the effective rate depends on what you are buying and where.' }, { q: 'Is sales tax applied before or after coupons and discounts?', a: 'In most US states, sales tax is calculated on the actual amount the customer pays after manufacturer coupons and store discounts are applied. This means using a coupon not only reduces the item price but also reduces the sales tax you owe on that item, saving you a little extra.' }]} />
      <h1>Sales Tax Calculator</h1>
      <p className="subtitle">Calculate tax amount and total price, or reverse-calculate pre-tax price.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Calculation Mode</label>
            <select value={mode} onChange={(e) => { setMode(e.target.value); setResult(null); }}>
              <option value="forward">Price + Tax = Total</option>
              <option value="reverse">Total → Pre-Tax Price</option>
            </select>
          </div>
          <div className="input-group">
            <label>{mode === 'forward' ? 'Pre-Tax Price ($)' : 'Total Price ($)'}</label>
            <input type="number" min="0" step="any" placeholder="100.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Tax Rate (%)</label>
            <input type="number" min="0" max="100" step="any" placeholder="8.25" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">${result.total.toFixed(2)}</span>
            <span className="age-label">total price</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">${result.preTax.toFixed(2)}</span>
              <span className="detail-label">Pre-Tax Price</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">${result.taxAmount.toFixed(2)}</span>
              <span className="detail-label">Tax Amount ({result.taxRate}%)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.taxRate}%</span>
              <span className="detail-label">Tax Rate</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Sales Tax Calculator</h2>
        <p>
          Select your calculation mode: choose "Price + Tax = Total" to find the final price after adding tax,
          or choose "Total → Pre-Tax Price" to work backwards from a receipt total to find the original price
          before tax was applied. Enter the dollar amount and your local sales tax rate as a percentage, then
          click "Calculate." The tool instantly shows the pre-tax price, exact tax amount, and total cost. This
          is useful for budgeting, verifying receipts, or comparing prices across states with different tax rates.
        </p>

        <h2>The Sales Tax Formula Explained</h2>
        <p>
          The forward calculation is straightforward: <strong>Tax Amount = Price x (Tax Rate / 100)</strong>, and
          <strong> Total = Price + Tax Amount</strong>. The reverse calculation divides instead: <strong>Pre-Tax
          Price = Total / (1 + Tax Rate / 100)</strong>, and <strong>Tax Amount = Total - Pre-Tax Price</strong>.
          The reverse formula works because the total already contains both the original price and the tax as a
          single combined figure, so dividing by the tax multiplier isolates the base price.
        </p>

        <h2>Worked Example</h2>
        <p>
          Suppose you buy an item priced at <strong>$85.00</strong> in a state with <strong>6.5% sales tax</strong>.
          The tax amount is $85.00 x 0.065 = <strong>$5.53</strong>. The total you pay is $85.00 + $5.53 =
          <strong>$90.53</strong>. Now for the reverse: if your receipt shows a total of $90.53 and you know the
          tax rate is 6.5%, the pre-tax price is $90.53 / 1.065 = <strong>$85.00</strong>, confirming the tax
          portion was $5.53. This reverse method is particularly useful when splitting bills or filing expense reports.
        </p>

        <h3>How do I calculate sales tax from a total receipt amount?</h3>
        <p>
          To find the pre-tax price from a total that already includes tax, divide the total by (1 + tax rate
          as a decimal). For example, if your total is $107.00 and the tax rate is 7%, divide $107.00 by 1.07
          to get $100.00 as the pre-tax price. The tax amount is $107.00 minus $100.00, which equals $7.00.
        </p>

        <h3>Do all US states charge sales tax?</h3>
        <p>
          No. Five US states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon.
          However, some localities in Alaska do impose a local sales tax. Additionally, many states exempt
          essential items like groceries, prescription drugs, and clothing from sales tax, so the effective rate
          depends on what you are buying and where.
        </p>

        <h3>Is sales tax applied before or after coupons and discounts?</h3>
        <p>
          In most US states, sales tax is calculated on the actual amount the customer pays after manufacturer
          coupons and store discounts are applied. This means using a coupon not only reduces the item price but
          also reduces the sales tax you owe on that item, saving you a little extra.
        </p>
      </section>
      <RelatedTools current="/sales-tax-calculator" />
    </div>
  );
}

export default SalesTaxCalculator;
