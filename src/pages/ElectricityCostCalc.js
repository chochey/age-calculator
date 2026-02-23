import { useState } from 'react';
import Seo from '../components/Seo';

function ElectricityCostCalc() {
  const [watts, setWatts] = useState('');
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('0.12');

  const w = parseFloat(watts) || 0;
  const h = parseFloat(hours) || 0;
  const r = parseFloat(rate) || 0;

  const kwhPerDay = (w * h) / 1000;
  const costPerDay = kwhPerDay * r;
  const costPerWeek = costPerDay * 7;
  const costPerMonth = costPerDay * 30;
  const costPerYear = costPerDay * 365;

  const fmt = (n) => '$' + n.toFixed(2);

  const commonAppliances = [
    { name: 'LED Light Bulb', watts: 10 },
    { name: 'Laptop', watts: 50 },
    { name: 'Desktop PC', watts: 200 },
    { name: 'TV (LED 55")', watts: 80 },
    { name: 'Gaming Console', watts: 150 },
    { name: 'Refrigerator', watts: 150 },
    { name: 'Washing Machine', watts: 500 },
    { name: 'Microwave', watts: 1000 },
    { name: 'Air Conditioner', watts: 1500 },
    { name: 'Space Heater', watts: 1500 },
    { name: 'Hair Dryer', watts: 1800 },
    { name: 'Electric Oven', watts: 2500 },
  ];

  const selectAppliance = (w) => {
    setWatts(String(w));
  };

  return (
    <div>
      <Seo title="Electricity Cost Calculator - kWh Energy Cost Estimator" description="Free electricity cost calculator. Estimate how much it costs to run any appliance. Enter watts, hours, and your electric rate to see daily, monthly, and yearly costs." />
      <h1>Electricity Cost Calculator</h1>
      <p className="subtitle">Estimate how much it costs to run any appliance.</p>

      <div className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Power (watts)</label>
            <input type="number" min="0" step="any" value={watts} onChange={(e) => setWatts(e.target.value)} placeholder="100" />
          </div>
          <div className="input-group">
            <label>Hours / Day</label>
            <input type="number" min="0" max="24" step="any" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="8" />
          </div>
          <div className="input-group">
            <label>Rate ($/kWh)</label>
            <input type="number" min="0" step="any" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="0.12" />
          </div>
        </div>
      </div>

      {w > 0 && h > 0 && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{fmt(costPerMonth)}</span>
            <span className="age-label">per month</span>
          </div>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{kwhPerDay.toFixed(2)} kWh</span>
              <span className="detail-label">Energy / Day</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(costPerDay)}</span>
              <span className="detail-label">Daily Cost</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{fmt(costPerWeek)}</span>
              <span className="detail-label">Weekly Cost</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{fmt(costPerYear)}</span>
              <span className="detail-label">Yearly Cost</span>
            </div>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', margin: '1.25rem 0 0.5rem' }}>Common Appliances</h3>
      <div className="case-buttons" style={{ marginBottom: '0' }}>
        {commonAppliances.map((a) => (
          <button key={a.name} onClick={() => selectAppliance(a.watts)} className={parseInt(watts) === a.watts ? 'active-case' : ''}>
            {a.name} ({a.watts}W)
          </button>
        ))}
      </div>

      <section className="info-section">
        <h2>How to Calculate Electricity Cost</h2>
        <p>Electricity cost is calculated as: <strong>(Watts x Hours per Day / 1000) x Rate per kWh</strong>. This gives you the daily cost. The average US electricity rate is about $0.12/kWh, but rates vary by state and provider.</p>

        <h2>Energy Saving Tips</h2>
        <ul>
          <li>Switch to LED bulbs (10W vs 60W incandescent)</li>
          <li>Unplug devices when not in use (standby power adds up)</li>
          <li>Use a programmable thermostat</li>
          <li>Run washing machines and dishwashers with full loads</li>
        </ul>
      </section>
    </div>
  );
}

export default ElectricityCostCalc;
