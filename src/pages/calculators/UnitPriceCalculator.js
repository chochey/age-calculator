import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const unitOptions = ['oz', 'lb', 'kg', 'g', 'ml', 'L', 'fl oz', 'gal', 'count/each'];

function UnitPriceCalculator() {
  const [products, setProducts] = useState([
    { name: '', price: '', quantity: '', unit: 'oz' },
    { name: '', price: '', quantity: '', unit: 'oz' },
  ]);
  const [result, setResult] = useState(null);

  const updateProduct = (i, field, value) => {
    const updated = [...products];
    updated[i] = { ...updated[i], [field]: value };
    setProducts(updated);
  };

  const addProduct = () => {
    if (products.length < 4) {
      setProducts([...products, { name: '', price: '', quantity: '', unit: 'oz' }]);
    }
  };

  const removeProduct = (i) => {
    if (products.length > 2) {
      setProducts(products.filter((_, j) => j !== i));
      setResult(null);
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    const computed = products.map((p, i) => {
      const price = parseFloat(p.price);
      const quantity = parseFloat(p.quantity);
      if (isNaN(price) || isNaN(quantity) || price < 0 || quantity <= 0) {
        return null;
      }
      const unitPrice = price / quantity;
      return {
        name: p.name || `Product ${i + 1}`,
        price,
        quantity,
        unit: p.unit,
        unitPrice,
      };
    });

    if (computed.some((c) => c === null)) {
      setResult(null);
      return;
    }

    const minUnitPrice = Math.min(...computed.map((c) => c.unitPrice));
    const bestIndex = computed.findIndex((c) => c.unitPrice === minUnitPrice);

    const withSavings = computed.map((c, i) => ({
      ...c,
      isBest: i === bestIndex,
      savingsPerUnit: c.unitPrice - minUnitPrice,
      savingsTotal: (c.unitPrice - minUnitPrice) * c.quantity,
    }));

    setResult(withSavings);
  };

  const fmt = (n) =>
    '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  const fmtDollars = (n) =>
    '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <Seo
        title="Unit Price Calculator - Compare Product Prices"
        description="Free unit price calculator. Compare product prices side by side to find the best deal. Calculate cost per unit for groceries, household items, and more."
        faqs={[{ q: 'Why do stores display unit prices differently for similar products?', a: 'Stores sometimes list one product\'s unit price per ounce and a comparable product\'s price per pound or per count, making direct comparison difficult. This can be accidental due to how the manufacturer reports package size, or it can be a deliberate merchandising choice. A unit price calculator eliminates this problem by letting you compare any products using the same unit of measurement side by side.' }, { q: 'Is the bulk size always the best value?', a: 'Not always. While warehouse clubs and large packages often offer lower unit prices, there are frequent exceptions. Grocery stores sometimes run promotions on smaller sizes that temporarily beat the bulk price. Additionally, buying more than you can use before the expiration date means the excess goes to waste, which effectively increases your real cost per usable unit.' }, { q: 'Can I compare products with different units (e.g., ounces vs. liters)?', a: 'For an accurate comparison, you should use the same unit of measurement for all products. If one item is sold by weight and another by volume, you would need to convert them to a common unit first. For reference, 1 liter is approximately 33.81 fluid ounces, and 1 pound equals 16 ounces. Enter the converted quantities into this calculator using matching units to get a reliable comparison.' }]}
      />
      <h1>Unit Price Calculator</h1>
      <p className="subtitle">Compare products side by side to find the best deal.</p>

      <form onSubmit={calculate} className="form">
        {products.map((p, i) => (
          <div key={i} className="input-row" style={{ alignItems: 'flex-end', gap: '0.5rem' }}>
            <div className="input-group" style={{ flex: '1.5' }}>
              <label>Name</label>
              <input
                type="text"
                placeholder={`Product ${i + 1}`}
                value={p.name}
                onChange={(e) => updateProduct(i, 'name', e.target.value)}
              />
            </div>
            <div className="input-group" style={{ flex: '1' }}>
              <label>Price ($)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
                value={p.price}
                onChange={(e) => updateProduct(i, 'price', e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{ flex: '1' }}>
              <label>Quantity</label>
              <input
                type="number"
                min="0.01"
                step="any"
                placeholder="1"
                value={p.quantity}
                onChange={(e) => updateProduct(i, 'quantity', e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{ flex: '1' }}>
              <label>Unit</label>
              <select
                value={p.unit}
                onChange={(e) => updateProduct(i, 'unit', e.target.value)}
                className="select-input"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            {products.length > 2 && (
              <button
                type="button"
                onClick={() => removeProduct(i)}
                className="gpa-remove"
                title="Remove product"
                style={{ marginBottom: '0.25rem' }}
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {products.length < 4 && (
            <button type="button" onClick={addProduct} className="form-btn secondary">
              + Add Product
            </button>
          )}
          <button type="submit">Calculate</button>
        </div>
      </form>

      {result && (
        <div className="results">
          {result.map((r, i) => {
            const best = r.isBest;
            return (
              <div key={i} style={{ marginBottom: i < result.length - 1 ? '1rem' : 0 }}>
                {best && (
                  <div className="primary-result">
                    <span className="age-number">{r.name}</span>
                    <span className="age-label">Best Deal!</span>
                  </div>
                )}
              </div>
            );
          })}

          <div className="detail-grid">
            {result.map((r, i) => (
              <div
                key={i}
                className={`detail-card${r.isBest ? ' highlight' : ''}`}
                style={
                  r.isBest
                    ? { borderColor: '#16a34a', background: '#f0fdf4' }
                    : {}
                }
              >
                <span className="detail-value">{fmt(r.unitPrice)}</span>
                <span className="detail-label">
                  {r.name} — per {r.unit}
                </span>
                <span
                  className="detail-label"
                  style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}
                >
                  {fmtDollars(r.price)} / {r.quantity} {r.unit}
                </span>
                {r.isBest ? (
                  <span
                    style={{
                      marginTop: '0.5rem',
                      color: '#16a34a',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    Lowest Price
                  </span>
                ) : (
                  <span
                    style={{
                      marginTop: '0.5rem',
                      color: '#dc2626',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    +{fmt(r.savingsPerUnit)}/{r.unit} more (costs {fmtDollars(r.savingsTotal)} extra)
                  </span>
                )}
              </div>
            ))}
          </div>

          {result.filter((r) => !r.isBest).length > 0 && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#334155', fontSize: '1rem' }}>
                Savings Summary
              </h3>
              {result
                .filter((r) => !r.isBest)
                .map((r, i) => {
                  const best = result.find((b) => b.isBest);
                  return (
                    <p key={i} style={{ margin: '0.25rem 0', color: '#475569', fontSize: '0.9rem' }}>
                      Choosing <strong>{best.name}</strong> over <strong>{r.name}</strong> saves{' '}
                      <strong style={{ color: '#16a34a' }}>
                        {fmt(r.savingsPerUnit)}
                      </strong>{' '}
                      per {r.unit}
                    </p>
                  );
                })}
            </div>
          )}
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Unit Price Calculator</h2>
        <p>
          Enter the name, total price, quantity, and unit of measurement for at least two products you want to compare.
          You can add up to four products at once. Click "Calculate" and the tool instantly computes the cost per unit
          for each item, highlights the best deal in green, and shows exactly how much extra you would spend by choosing
          a more expensive option. This is perfect for comparing different sizes of the same product or different brands
          on the grocery shelf.
        </p>

        <h2>The Unit Price Formula with a Worked Example</h2>
        <p>
          The formula is: <strong>Unit Price = Total Price / Quantity</strong>. Suppose you are choosing between two
          bottles of olive oil. Brand A costs $8.49 for 16.9 oz, and Brand B costs $12.99 for 33.8 oz. Brand A's unit
          price is $8.49 / 16.9 = <strong>$0.5024 per oz</strong>. Brand B's unit price is $12.99 / 33.8 =
          <strong> $0.3843 per oz</strong>. Brand B costs $0.1181 less per ounce, saving you about <strong>$1.99</strong>
          over the equivalent 16.9 oz that Brand A contains. Even though Brand B has a higher sticker price, it
          delivers significantly more value per unit.
        </p>

        <h2>Tips for Smart Shopping with Unit Prices</h2>
        <ul>
          <li><strong>Bigger is not always cheaper</strong> -- stores sometimes price medium packages more competitively than bulk sizes.</li>
          <li><strong>Compare across brands</strong> -- store brands often match name-brand quality at a much lower unit price.</li>
          <li><strong>Watch for sale traps</strong> -- a "sale" item may still cost more per unit than a competitor at regular price.</li>
          <li><strong>Consider shelf life</strong> -- a lower unit price only saves money if you use the product before it expires.</li>
        </ul>

        <h3>Why do stores display unit prices differently for similar products?</h3>
        <p>
          Stores sometimes list one product's unit price per ounce and a comparable product's price per pound or per
          count, making direct comparison difficult. This can be accidental due to how the manufacturer reports package
          size, or it can be a deliberate merchandising choice. A unit price calculator eliminates this problem by
          letting you compare any products using the same unit of measurement side by side.
        </p>

        <h3>Is the bulk size always the best value?</h3>
        <p>
          Not always. While warehouse clubs and large packages often offer lower unit prices, there are frequent
          exceptions. Grocery stores sometimes run promotions on smaller sizes that temporarily beat the bulk price.
          Additionally, buying more than you can use before the expiration date means the excess goes to waste, which
          effectively increases your real cost per usable unit.
        </p>

        <h3>Can I compare products with different units (e.g., ounces vs. liters)?</h3>
        <p>
          For an accurate comparison, you should use the same unit of measurement for all products. If one item is sold
          by weight and another by volume, you would need to convert them to a common unit first. For reference, 1 liter
          is approximately 33.81 fluid ounces, and 1 pound equals 16 ounces. Enter the converted quantities into this
          calculator using matching units to get a reliable comparison.
        </p>
      </section>

      <RelatedTools current="/unit-price-calculator" />
    </div>
  );
}

export default UnitPriceCalculator;
