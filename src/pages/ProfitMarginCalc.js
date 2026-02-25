import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function ProfitMarginCalc() {
  const [mode, setMode] = useState('margin');
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');
  const [margin, setMargin] = useState('');
  const [result, setResult] = useState(null);

  const fmt = (n) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';

  const calculate = (e) => {
    e.preventDefault();

    let calcCost, calcRevenue, calcProfit, calcMargin, calcMarkup;

    if (mode === 'margin') {
      // Calculate Margin from Cost & Revenue
      calcCost = parseFloat(cost);
      calcRevenue = parseFloat(revenue);
      if (isNaN(calcCost) || isNaN(calcRevenue) || calcCost < 0 || calcRevenue < 0) { setResult(null); return; }

      calcProfit = calcRevenue - calcCost;
      calcMargin = calcRevenue === 0 ? 0 : (calcProfit / calcRevenue) * 100;
      calcMarkup = calcCost === 0 ? (calcProfit > 0 ? Infinity : 0) : (calcProfit / calcCost) * 100;
    } else if (mode === 'revenue') {
      // Calculate Revenue from Cost & Margin
      calcCost = parseFloat(cost);
      calcMargin = parseFloat(margin);
      if (isNaN(calcCost) || isNaN(calcMargin) || calcCost < 0 || calcMargin >= 100) { setResult(null); return; }

      calcRevenue = calcCost / (1 - calcMargin / 100);
      calcProfit = calcRevenue - calcCost;
      calcMarkup = calcCost === 0 ? (calcProfit > 0 ? Infinity : 0) : (calcProfit / calcCost) * 100;
    } else {
      // Calculate Cost from Revenue & Margin
      calcRevenue = parseFloat(revenue);
      calcMargin = parseFloat(margin);
      if (isNaN(calcRevenue) || isNaN(calcMargin) || calcRevenue < 0) { setResult(null); return; }

      calcCost = calcRevenue * (1 - calcMargin / 100);
      calcProfit = calcRevenue - calcCost;
      calcMarkup = calcCost === 0 ? (calcProfit > 0 ? Infinity : 0) : (calcProfit / calcCost) * 100;
    }

    setResult({
      cost: calcCost,
      revenue: calcRevenue,
      profit: calcProfit,
      margin: calcMargin,
      markup: calcMarkup,
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setResult(null);
    setCost('');
    setRevenue('');
    setMargin('');
  };

  return (
    <div>
      <Seo
        title="Profit Margin Calculator – QuickCalcs"
        description="Free profit margin calculator. Calculate profit margin, markup, revenue, and cost. Understand the difference between margin and markup."
      />
      <h1>Profit Margin Calculator</h1>
      <p className="subtitle">Calculate profit margin, markup & revenue.</p>

      <div className="unit-toggle">
        <button className={mode === 'margin' ? 'active' : ''} onClick={() => switchMode('margin')}>
          Calculate Margin
        </button>
        <button className={mode === 'revenue' ? 'active' : ''} onClick={() => switchMode('revenue')}>
          Calculate Revenue
        </button>
        <button className={mode === 'cost' ? 'active' : ''} onClick={() => switchMode('cost')}>
          Calculate Cost
        </button>
      </div>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          {mode !== 'cost' && (
            <div className="input-group">
              <label>Cost ($)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="50"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
          )}
          {mode !== 'revenue' && (
            <div className="input-group">
              <label>Revenue ($)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="80"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                required
              />
            </div>
          )}
          {mode !== 'margin' && (
            <div className="input-group">
              <label>Profit Margin (%)</label>
              <input
                type="number"
                step="any"
                placeholder="37.5"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{pct(result.margin)}</span>
            <span className="age-label">profit margin</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{fmt(result.profit)}</span>
              <span className="detail-label">Profit</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{pct(result.margin)}</span>
              <span className="detail-label">Profit Margin</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.markup === Infinity ? '\u221E' : pct(result.markup)}</span>
              <span className="detail-label">Markup</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(result.cost)}</span>
              <span className="detail-label">Cost</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(result.revenue)}</span>
              <span className="detail-label">Revenue</span>
            </div>
          </div>

          {result.profit < 0 && (
            <p style={{ color: '#dc2626', fontWeight: 600, marginTop: '0.75rem', textAlign: 'center' }}>
              Warning: Negative profit -- you are selling below cost.
            </p>
          )}
        </div>
      )}

      <section className="calc-section" style={{ marginTop: '2rem' }}>
        <h2>Formulas</h2>
        <div className="detail-grid">
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.85rem' }}>Profit = Revenue - Cost</span>
            <span className="detail-label">Profit</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.85rem' }}>Margin = (Profit / Revenue) x 100</span>
            <span className="detail-label">Profit Margin %</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.85rem' }}>Markup = (Profit / Cost) x 100</span>
            <span className="detail-label">Markup %</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.85rem' }}>Revenue = Cost / (1 - Margin/100)</span>
            <span className="detail-label">Revenue from Cost & Margin</span>
          </div>
          <div className="detail-card">
            <span className="detail-value" style={{ fontSize: '0.85rem' }}>Cost = Revenue x (1 - Margin/100)</span>
            <span className="detail-label">Cost from Revenue & Margin</span>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Margin vs Markup</h2>
        <p>
          Profit margin and markup are both ways to express the relationship between cost and profit, but
          they use different bases. <strong>Profit margin</strong> is the percentage of <em>revenue</em> that
          is profit, while <strong>markup</strong> is the percentage of <em>cost</em> that is added on top as
          profit. For example, if you buy a product for $50 and sell it for $80, the profit is $30. The
          margin is 37.5% (30/80) and the markup is 60% (30/50). Margin is always lower than markup for
          the same transaction.
        </p>

        <h2>Why Margin Matters</h2>
        <p>
          Profit margin is one of the most important metrics for any business. It tells you how much of
          every dollar in revenue actually becomes profit. A higher margin means more efficient operations
          and greater pricing power. Investors, lenders, and analysts all look at profit margins to
          evaluate business health.
        </p>

        <h2>Common Margin Benchmarks</h2>
        <ul>
          <li><strong>Retail:</strong> 2-5% net margin (20-50% gross margin on products)</li>
          <li><strong>Restaurants:</strong> 3-9% net margin</li>
          <li><strong>Software / SaaS:</strong> 20-40% net margin (70-90% gross margin)</li>
          <li><strong>Manufacturing:</strong> 5-10% net margin</li>
          <li><strong>Consulting / Services:</strong> 15-25% net margin</li>
        </ul>

        <h2>Quick Margin-to-Markup Conversions</h2>
        <ul>
          <li><strong>10% margin</strong> = 11.1% markup</li>
          <li><strong>20% margin</strong> = 25% markup</li>
          <li><strong>25% margin</strong> = 33.3% markup</li>
          <li><strong>33.3% margin</strong> = 50% markup</li>
          <li><strong>50% margin</strong> = 100% markup</li>
        </ul>
      </section>

      <RelatedTools current="/profit-margin-calculator" />
    </div>
  );
}

export default ProfitMarginCalc;
