import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'How do I find my vehicle\'s actual MPG?', a: 'The most accurate method is to fill your tank completely, reset your trip odometer, drive normally until you need fuel again, then divide the miles driven by the gallons it takes to refill. The EPA rating on your vehicle\'s window sticker is a useful starting point, but real-world mileage varies based on driving habits, terrain, weather, and vehicle maintenance. Repeating the fill-up test over several tanks gives you a reliable average.' }, { q: 'Does driving speed affect fuel cost?', a: 'Yes, significantly. Most vehicles reach peak fuel efficiency between 45 and 65 mph. Above 65 mph, aerodynamic drag increases rapidly and fuel economy drops. The U.S. Department of Energy estimates that every 5 mph you drive over 50 mph is roughly equivalent to paying an additional $0.20-$0.30 per gallon for gas. Slowing down on the highway is one of the easiest ways to cut trip costs.' }, { q: 'How do I convert between MPG and L/100km?', a: 'The conversion formula is: L/100km = 235.215 / MPG, and conversely, MPG = 235.215 / (L/100km). For example, a vehicle rated at 30 MPG uses about 235.215 / 30 = 7.84 L/100km. A car rated at 6 L/100km achieves 235.215 / 6 = 39.2 MPG. Keep in mind that lower L/100km numbers indicate better efficiency, while higher MPG numbers indicate better efficiency.' }]}
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
        <h2>How to Use This Fuel Cost Calculator</h2>
        <p>
          Start by choosing between Imperial (miles, MPG, gallons) and Metric (km, L/100km, liters) units using the
          toggle at the top. Enter the total distance of your trip, your vehicle's fuel efficiency rating, and the
          current price you pay per gallon or liter. Click "Calculate Fuel Cost" to see the total fuel needed, the
          total trip cost, and the cost per mile or kilometer. A handy comparison table also shows estimated costs for
          common trip distances using your vehicle and fuel price inputs.
        </p>

        <h2>The Fuel Cost Formula with a Worked Example</h2>
        <p>
          For imperial units the formula is: <strong>Total Cost = (Distance / MPG) x Price per Gallon</strong>.
          Suppose you are planning a 350-mile road trip in a car that gets 28 MPG, and gas costs $3.45 per gallon.
          First, calculate fuel needed: 350 / 28 = <strong>12.50 gallons</strong>. Then multiply by the price:
          12.50 x $3.45 = <strong>$43.13 total fuel cost</strong>. Your cost per mile is $43.13 / 350 =
          <strong> $0.123 per mile</strong>. For metric users, the formula is:
          <strong> Total Cost = (Distance / 100) x (L/100km) x Price per Liter</strong>. A 500 km trip at 7.5 L/100km
          with fuel at $1.55/liter would cost (500 / 100) x 7.5 x $1.55 = <strong>$58.13</strong>.
        </p>

        <h2>Tips to Reduce Your Fuel Costs</h2>
        <ul>
          <li><strong>Maintain steady speed</strong> -- use cruise control on highways to minimize unnecessary acceleration and braking.</li>
          <li><strong>Check tire pressure monthly</strong> -- under-inflated tires increase rolling resistance and can lower MPG by 3%.</li>
          <li><strong>Remove excess weight</strong> -- every 100 pounds of unnecessary cargo reduces fuel economy by about 1-2%.</li>
          <li><strong>Avoid extended idling</strong> -- turn off your engine if you will be stopped for more than 60 seconds.</li>
          <li><strong>Compare gas prices</strong> -- apps like GasBuddy can help you find the cheapest fuel along your route.</li>
        </ul>

        <h3>How do I find my vehicle's actual MPG?</h3>
        <p>
          The most accurate method is to fill your tank completely, reset your trip odometer, drive normally until you
          need fuel again, then divide the miles driven by the gallons it takes to refill. The EPA rating on your
          vehicle's window sticker is a useful starting point, but real-world mileage varies based on driving habits,
          terrain, weather, and vehicle maintenance. Repeating the fill-up test over several tanks gives you a reliable
          average.
        </p>

        <h3>Does driving speed affect fuel cost?</h3>
        <p>
          Yes, significantly. Most vehicles reach peak fuel efficiency between 45 and 65 mph. Above 65 mph,
          aerodynamic drag increases rapidly and fuel economy drops. The U.S. Department of Energy estimates that
          every 5 mph you drive over 50 mph is roughly equivalent to paying an additional $0.20-$0.30 per gallon
          for gas. Slowing down on the highway is one of the easiest ways to cut trip costs.
        </p>

        <h3>How do I convert between MPG and L/100km?</h3>
        <p>
          The conversion formula is: <strong>L/100km = 235.215 / MPG</strong>, and conversely,
          <strong> MPG = 235.215 / (L/100km)</strong>. For example, a vehicle rated at 30 MPG uses about
          235.215 / 30 = 7.84 L/100km. A car rated at 6 L/100km achieves 235.215 / 6 = 39.2 MPG. Keep in mind
          that lower L/100km numbers indicate better efficiency, while higher MPG numbers indicate better efficiency.
        </p>
      </section>
      <RelatedTools current="/fuel-cost-calculator" />
    </div>
  );
}

export default FuelCostCalculator;
