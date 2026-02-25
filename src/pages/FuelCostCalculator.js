import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function FuelCostCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const dist = parseFloat(distance);
    const eff = parseFloat(efficiency);
    const price = parseFloat(fuelPrice);

    if (!dist || !eff || !price || dist <= 0 || eff <= 0 || price <= 0) {
      setResult(null);
      return;
    }

    let totalFuel, totalCost, costPerUnit;

    if (unit === 'imperial') {
      // MPG: gallons = distance / mpg
      totalFuel = dist / eff;
      totalCost = totalFuel * price;
      costPerUnit = totalCost / dist;
    } else {
      // L/100km: liters = (distance / 100) * L/100km
      totalFuel = (dist / 100) * eff;
      totalCost = totalFuel * price;
      costPerUnit = totalCost / dist;
    }

    // Trip comparison table
    const comparisonDistances = unit === 'imperial'
      ? [50, 100, 250, 500, 1000]
      : [80, 160, 400, 800, 1600];

    const comparisons = comparisonDistances.map((d) => {
      let fuel, cost;
      if (unit === 'imperial') {
        fuel = d / eff;
        cost = fuel * price;
      } else {
        fuel = (d / 100) * eff;
        cost = fuel * price;
      }
      return {
        distance: d,
        fuel: fuel.toFixed(2),
        cost: cost.toFixed(2),
      };
    });

    setResult({
      totalFuel: totalFuel.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerUnit: costPerUnit.toFixed(3),
      comparisons,
    });
  };

  const distLabel = unit === 'imperial' ? 'miles' : 'km';
  const effLabel = unit === 'imperial' ? 'MPG' : 'L/100km';
  const fuelUnit = unit === 'imperial' ? 'gallon' : 'liter';
  const fuelUnitPlural = unit === 'imperial' ? 'gallons' : 'liters';

  return (
    <div>
      <Seo
        title="Fuel Cost Calculator - Trip Gas Cost Estimator"
        description="Free fuel cost calculator. Estimate gas costs for any trip. Enter distance, fuel efficiency, and gas price to calculate total fuel cost."
      />
      <h1>Fuel Cost Calculator</h1>
      <p className="subtitle">Estimate gas costs for any trip based on distance, fuel efficiency, and gas price.</p>

      <div className="unit-toggle">
        <button className={unit === 'imperial' ? 'active' : ''} onClick={() => { setUnit('imperial'); setResult(null); }}>
          Imperial (mi/MPG/gal)
        </button>
        <button className={unit === 'metric' ? 'active' : ''} onClick={() => { setUnit('metric'); setResult(null); }}>
          Metric (km/L per 100km/L)
        </button>
      </div>

      <form onSubmit={handleCalculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Distance ({distLabel})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '250' : '400'}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Fuel Efficiency ({effLabel})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '25' : '8'}
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Fuel Price ($/{fuelUnit})</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder={unit === 'imperial' ? '3.50' : '1.60'}
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Calculate Fuel Cost</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">${result.totalCost}</span>
            <span className="age-label">Total Trip Cost</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.totalFuel} {fuelUnitPlural}</span>
              <span className="detail-label">Total Fuel Needed</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">${result.totalCost}</span>
              <span className="detail-label">Total Cost</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">${result.costPerUnit}</span>
              <span className="detail-label">Cost per {distLabel === 'miles' ? 'Mile' : 'Kilometer'}</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.75rem', color: '#0f172a' }}>Trip Comparison Table</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Distance ({distLabel})</th>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Fuel ({fuelUnitPlural})</th>
                  <th style={{ padding: '0.5rem 0.75rem', color: '#475569' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {result.comparisons.map((row) => (
                  <tr key={row.distance} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{row.distance.toLocaleString()} {distLabel}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{row.fuel} {fuelUnitPlural}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>${row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Calculate Fuel Cost</h2>
        <p>
          Fuel cost depends on three factors: the distance you plan to travel, your vehicle's fuel efficiency,
          and the current price of fuel. In imperial units, the formula is:
          <strong> Total Cost = (Distance / MPG) x Price per Gallon</strong>.
          In metric units, it is: <strong>Total Cost = (Distance / 100) x (L/100km) x Price per Liter</strong>.
        </p>

        <h2>Tips to Improve Fuel Efficiency</h2>
        <ul>
          <li><strong>Maintain steady speed:</strong> Use cruise control on highways to avoid unnecessary acceleration</li>
          <li><strong>Check tire pressure:</strong> Under-inflated tires increase rolling resistance and fuel consumption</li>
          <li><strong>Reduce weight:</strong> Remove unnecessary heavy items from your vehicle</li>
          <li><strong>Avoid idling:</strong> Turn off your engine if you expect to wait more than 60 seconds</li>
          <li><strong>Plan your route:</strong> Shorter routes with fewer stops save fuel compared to longer routes</li>
        </ul>

        <h2>Average Fuel Efficiency by Vehicle Type</h2>
        <ul>
          <li><strong>Compact car:</strong> 30-40 MPG (5.9-7.8 L/100km)</li>
          <li><strong>Midsize sedan:</strong> 25-35 MPG (6.7-9.4 L/100km)</li>
          <li><strong>SUV:</strong> 20-28 MPG (8.4-11.8 L/100km)</li>
          <li><strong>Pickup truck:</strong> 15-25 MPG (9.4-15.7 L/100km)</li>
          <li><strong>Hybrid:</strong> 45-60 MPG (3.9-5.2 L/100km)</li>
        </ul>
      </section>
      <RelatedTools current="/fuel-cost-calculator" />
    </div>
  );
}

export default FuelCostCalculator;
