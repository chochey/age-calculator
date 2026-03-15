import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'What is the difference between profit margin and markup?', a: 'Profit margin expresses profit as a share of revenue (the selling price), while markup expresses profit as a share of cost (what you paid). They always refer to the same dollar amount of profit but yield different percentages. A 50% margin means half of your revenue is profit, while a 50% markup means you added half the cost on top. Converting between them: Margin = Markup / (1 + Markup), and Markup = Margin / (1 - Margin).' }, { q: 'What is a good profit margin for a small business?', a: 'It depends heavily on the industry. A net profit margin of 10% is generally considered healthy for most small businesses, while 20% or more is considered strong. Service-based businesses typically enjoy higher margins than product-based ones because they carry less inventory and lower cost of goods sold. The most important thing is to track your margin consistently over time and compare it to industry averages.' }, { q: 'How can I improve my profit margin?', a: 'There are two levers: increase revenue or decrease costs. On the revenue side, consider raising prices, upselling complementary products, or targeting higher-value customers. On the cost side, negotiate better supplier terms, reduce waste, streamline operations, or switch to more cost-effective materials. Even small improvements in margin compound significantly as sales volume grows.' }]}
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
        <h2>How to Use This Profit Margin Calculator</h2>
        <p>
          Choose one of three calculation modes at the top: Calculate Margin (from cost and revenue), Calculate Revenue
          (from cost and desired margin), or Calculate Cost (from revenue and margin). Enter the values you know and
          click "Calculate." The tool instantly displays your profit in dollars, profit margin percentage, markup
          percentage, cost, and revenue. If you are setting prices for a new product, use the Revenue mode to find
          exactly what to charge. If you are evaluating a supplier quote, use the Margin mode to see your profitability.
        </p>

        <h2>The Profit Margin Formula with a Worked Example</h2>
        <p>
          The key formulas are: <strong>Profit = Revenue - Cost</strong>,
          <strong> Profit Margin = (Profit / Revenue) x 100</strong>, and
          <strong> Markup = (Profit / Cost) x 100</strong>. For example, suppose you purchase inventory for $42.00
          per unit and sell it for $70.00. Your profit is $70.00 - $42.00 = <strong>$28.00</strong>. The profit margin
          is ($28.00 / $70.00) x 100 = <strong>40.00%</strong>. The markup is ($28.00 / $42.00) x 100 = <strong>66.67%</strong>.
          Notice that margin and markup describe the same dollar profit but expressed as a percentage of different
          bases -- revenue for margin, cost for markup. Margin is always the smaller number of the two.
        </p>

        <h2>Common Industry Margin Benchmarks</h2>
        <ul>
          <li><strong>Retail:</strong> 2-5% net margin, 20-50% gross margin on individual products</li>
          <li><strong>Restaurants:</strong> 3-9% net margin</li>
          <li><strong>Software / SaaS:</strong> 70-90% gross margin, 20-40% net margin</li>
          <li><strong>Manufacturing:</strong> 5-10% net margin</li>
          <li><strong>Consulting / Services:</strong> 15-25% net margin</li>
        </ul>

        <h3>What is the difference between profit margin and markup?</h3>
        <p>
          Profit margin expresses profit as a share of revenue (the selling price), while markup expresses profit as a
          share of cost (what you paid). They always refer to the same dollar amount of profit but yield different
          percentages. A 50% margin means half of your revenue is profit, while a 50% markup means you added half the
          cost on top. Converting between them: Margin = Markup / (1 + Markup), and Markup = Margin / (1 - Margin).
        </p>

        <h3>What is a good profit margin for a small business?</h3>
        <p>
          It depends heavily on the industry. A net profit margin of 10% is generally considered healthy for most small
          businesses, while 20% or more is considered strong. Service-based businesses typically enjoy higher margins
          than product-based ones because they carry less inventory and lower cost of goods sold. The most important
          thing is to track your margin consistently over time and compare it to industry averages.
        </p>

        <h3>How can I improve my profit margin?</h3>
        <p>
          There are two levers: increase revenue or decrease costs. On the revenue side, consider raising prices,
          upselling complementary products, or targeting higher-value customers. On the cost side, negotiate better
          supplier terms, reduce waste, streamline operations, or switch to more cost-effective materials. Even small
          improvements in margin compound significantly as sales volume grows.
        </p>
      </section>

      <RelatedTools current="/profit-margin-calculator" />
    </div>
  );
}

export default ProfitMarginCalc;
