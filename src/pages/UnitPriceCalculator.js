import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>What Is Unit Pricing?</h2>
        <p>
          Unit pricing is the cost of a product expressed per standard unit of measurement (such as
          per ounce, per pound, or per liter). It allows you to compare products of different sizes
          and brands on an equal basis, so you can see which option truly gives you the most value
          for your money.
        </p>

        <h2>How Stores Use Unit Pricing</h2>
        <p>
          Many grocery stores are required by law to display unit prices on shelf labels. However,
          these labels can be easy to miss, may use different units for similar products, or may not
          be displayed at all for sale items. A unit price calculator helps you quickly compare
          options without hunting for small print or doing mental math in the aisle.
        </p>

        <h2>Tips for Smart Shopping</h2>
        <ul>
          <li>
            <strong>Bigger is not always cheaper.</strong> While bulk sizes often have a lower unit
            price, this is not always the case. Stores sometimes price medium-sized packages more
            competitively, so always check the unit price.
          </li>
          <li>
            <strong>Compare across brands.</strong> Store brands and generics frequently have the
            same ingredients as name brands at a significantly lower unit price.
          </li>
          <li>
            <strong>Watch for sale traps.</strong> A product on "sale" might still have a higher
            unit price than a competing product at its regular price. Use unit pricing to verify
            real savings.
          </li>
          <li>
            <strong>Consider shelf life.</strong> A lower unit price only saves money if you can
            use the product before it expires. Buying in bulk is wasteful if food goes bad.
          </li>
          <li>
            <strong>Use consistent units.</strong> Make sure you are comparing the same unit type
            (weight vs. volume vs. count) for an accurate comparison.
          </li>
        </ul>

        <h2>How to Calculate Unit Price</h2>
        <p>
          The formula is simple: <strong>Unit Price = Total Price / Quantity</strong>. For example,
          if a 32 oz bottle of juice costs $3.99, the unit price is $3.99 / 32 = $0.1247 per oz.
          Compare this to a 64 oz bottle at $6.49, which has a unit price of $6.49 / 64 = $0.1014
          per oz -- the larger bottle is the better deal in this case.
        </p>
      </section>

      <RelatedTools current="/unit-price-calculator" />
    </div>
  );
}

export default UnitPriceCalculator;
