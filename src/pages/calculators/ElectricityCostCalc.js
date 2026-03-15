import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Electricity Cost Calculator - kWh Energy Cost Estimator" description="Free electricity cost calculator. Estimate how much it costs to run any appliance. Enter watts, hours, and your electric rate to see daily, monthly, and yearly costs." faqs={[{ q: 'How do I find the wattage of my appliance?', a: 'Check the label on the back or bottom of the appliance, which usually lists the wattage. You can also look up the model number in the product manual or manufacturer\'s website. For a more precise measurement, use a plug-in electricity monitor (like a Kill-A-Watt meter) that displays real-time power draw.' }, { q: 'Why does my actual electricity bill differ from the calculator estimate?', a: 'Your bill includes all appliances and devices in your home, not just one. It may also include fixed service charges, demand charges, taxes, and tiered pricing where the rate increases as you use more electricity. Additionally, appliances like refrigerators cycle on and off, so their average power draw is lower than the rated wattage.' }, { q: 'What uses the most electricity in a typical home?', a: 'Heating and cooling systems are typically the largest electricity consumers, accounting for roughly 40-50% of a home\'s energy use. Water heaters, clothes dryers, and electric ovens are also significant. Among always-on devices, refrigerators run 24 hours a day and can cost $50-$150 per year depending on their efficiency rating and age.' }]} />
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
        <h2>How to Use This Electricity Cost Calculator</h2>
        <p>Enter three values to estimate your electricity cost: the power consumption of your appliance in watts, the number of hours per day you use it, and your electricity rate in dollars per kilowatt-hour (kWh). If you are unsure of the wattage, click one of the common appliance buttons below the calculator to auto-fill a typical value. Your electricity rate can be found on your utility bill -- the national average in the United States is roughly $0.12 per kWh, but rates vary significantly by state and provider. The calculator updates results in real time, showing your daily, weekly, monthly, and yearly costs along with daily energy consumption in kWh.</p>

        <h2>Understanding the Formula</h2>
        <p>The electricity cost formula is: <strong>Daily Cost = (Watts x Hours per Day / 1000) x Rate per kWh</strong>. The division by 1000 converts watts to kilowatts, since electricity is billed in kilowatt-hours. For example, running a 1,500-watt space heater for 8 hours a day at $0.12/kWh costs (1500 x 8 / 1000) x 0.12 = $1.44 per day. Over a month (30 days), that totals $43.20, and over a full year it reaches $525.60. Knowing these numbers helps you make informed decisions about which appliances to use and for how long.</p>

        <h2>Practical Applications</h2>
        <ul>
          <li>Comparing the running cost of an old appliance versus a newer energy-efficient model to see if the upgrade pays for itself</li>
          <li>Estimating the cost of running a home office setup including a desktop computer, monitor, and desk lamp throughout the workday</li>
          <li>Budgeting for seasonal costs like air conditioning in summer or space heaters in winter</li>
          <li>Identifying the most expensive appliances in your home so you can target them for energy savings</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>How do I find the wattage of my appliance?</h3>
        <p>Check the label on the back or bottom of the appliance, which usually lists the wattage. You can also look up the model number in the product manual or manufacturer's website. For a more precise measurement, use a plug-in electricity monitor (like a Kill-A-Watt meter) that displays real-time power draw.</p>

        <h3>Why does my actual electricity bill differ from the calculator estimate?</h3>
        <p>Your bill includes all appliances and devices in your home, not just one. It may also include fixed service charges, demand charges, taxes, and tiered pricing where the rate increases as you use more electricity. Additionally, appliances like refrigerators cycle on and off, so their average power draw is lower than the rated wattage.</p>

        <h3>What uses the most electricity in a typical home?</h3>
        <p>Heating and cooling systems are typically the largest electricity consumers, accounting for roughly 40-50% of a home's energy use. Water heaters, clothes dryers, and electric ovens are also significant. Among always-on devices, refrigerators run 24 hours a day and can cost $50-$150 per year depending on their efficiency rating and age.</p>
      </section>
      <RelatedTools current="/electricity-cost-calculator" />
    </div>
  );
}

export default ElectricityCostCalc;
