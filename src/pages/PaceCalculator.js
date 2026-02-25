import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function PaceCalculator() {
  const [mode, setMode] = useState('pace');
  const [distanceValue, setDistanceValue] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [paceMin, setPaceMin] = useState('');
  const [paceSec, setPaceSec] = useState('');
  const [paceUnit, setPaceUnit] = useState('min/mile');
  const [result, setResult] = useState(null);

  const racePresets = [
    { label: '5K', distance: 5, unit: 'kilometers' },
    { label: '10K', distance: 10, unit: 'kilometers' },
    { label: 'Half Marathon', distance: 21.0975, unit: 'kilometers' },
    { label: 'Marathon', distance: 42.195, unit: 'kilometers' },
  ];

  const toMiles = (value, unit) => {
    if (unit === 'miles') return value;
    if (unit === 'kilometers') return value / 1.60934;
    if (unit === 'meters') return value / 1609.34;
    return value;
  };

  const toKm = (value, unit) => {
    if (unit === 'kilometers') return value;
    if (unit === 'miles') return value * 1.60934;
    if (unit === 'meters') return value / 1000;
    return value;
  };

  const formatTime = (totalSeconds) => {
    if (!isFinite(totalSeconds) || totalSeconds < 0) return '--:--:--';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const formatPace = (totalSecondsPerUnit) => {
    if (!isFinite(totalSecondsPerUnit) || totalSecondsPerUnit <= 0) return '--:--';
    const m = Math.floor(totalSecondsPerUnit / 60);
    const s = Math.round(totalSecondsPerUnit % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handlePreset = (preset) => {
    if (preset.unit === 'kilometers') {
      if (distanceUnit === 'miles') {
        setDistanceValue((preset.distance / 1.60934).toFixed(2));
      } else if (distanceUnit === 'meters') {
        setDistanceValue((preset.distance * 1000).toFixed(0));
      } else {
        setDistanceValue(preset.distance.toString());
      }
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    if (mode === 'pace') {
      const dist = parseFloat(distanceValue);
      const totalSec = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
      if (!dist || dist <= 0 || totalSec <= 0) { setResult(null); return; }

      const distMiles = toMiles(dist, distanceUnit);
      const distKm = toKm(dist, distanceUnit);

      const pacePerMile = totalSec / distMiles;
      const pacePerKm = totalSec / distKm;
      const speedMph = distMiles / (totalSec / 3600);
      const speedKmh = distKm / (totalSec / 3600);

      const raceEstimates = racePresets.map((race) => {
        const raceDistMiles = toMiles(race.distance, race.unit);
        const raceTime = pacePerMile * raceDistMiles;
        return { label: race.label, time: formatTime(raceTime) };
      });

      setResult({
        type: 'pace',
        pacePerMile: formatPace(pacePerMile),
        pacePerKm: formatPace(pacePerKm),
        speedMph: speedMph.toFixed(2),
        speedKmh: speedKmh.toFixed(2),
        totalTime: formatTime(totalSec),
        raceEstimates,
      });
    } else if (mode === 'time') {
      const dist = parseFloat(distanceValue);
      const pMin = parseFloat(paceMin) || 0;
      const pSec = parseFloat(paceSec) || 0;
      const paceSeconds = pMin * 60 + pSec;
      if (!dist || dist <= 0 || paceSeconds <= 0) { setResult(null); return; }

      const distMiles = toMiles(dist, distanceUnit);
      const distKm = toKm(dist, distanceUnit);

      let totalSec;
      if (paceUnit === 'min/mile') {
        totalSec = paceSeconds * distMiles;
      } else {
        totalSec = paceSeconds * distKm;
      }

      const pacePerMile = paceUnit === 'min/mile' ? paceSeconds : paceSeconds * 1.60934;
      const pacePerKm = paceUnit === 'min/km' ? paceSeconds : paceSeconds / 1.60934;
      const speedMph = 3600 / pacePerMile;
      const speedKmh = 3600 / pacePerKm;

      const raceEstimates = racePresets.map((race) => {
        const raceDistMiles = toMiles(race.distance, race.unit);
        const raceTime = pacePerMile * raceDistMiles;
        return { label: race.label, time: formatTime(raceTime) };
      });

      setResult({
        type: 'time',
        totalTime: formatTime(totalSec),
        pacePerMile: formatPace(pacePerMile),
        pacePerKm: formatPace(pacePerKm),
        speedMph: speedMph.toFixed(2),
        speedKmh: speedKmh.toFixed(2),
        raceEstimates,
      });
    } else if (mode === 'distance') {
      const totalSec = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
      const pMin = parseFloat(paceMin) || 0;
      const pSec = parseFloat(paceSec) || 0;
      const paceSeconds = pMin * 60 + pSec;
      if (totalSec <= 0 || paceSeconds <= 0) { setResult(null); return; }

      let distMiles, distKm;
      if (paceUnit === 'min/mile') {
        distMiles = totalSec / paceSeconds;
        distKm = distMiles * 1.60934;
      } else {
        distKm = totalSec / paceSeconds;
        distMiles = distKm / 1.60934;
      }

      const pacePerMile = paceUnit === 'min/mile' ? paceSeconds : paceSeconds * 1.60934;
      const pacePerKm = paceUnit === 'min/km' ? paceSeconds : paceSeconds / 1.60934;
      const speedMph = 3600 / pacePerMile;
      const speedKmh = 3600 / pacePerKm;

      const raceEstimates = racePresets.map((race) => {
        const raceDistMiles = toMiles(race.distance, race.unit);
        const raceTime = pacePerMile * raceDistMiles;
        return { label: race.label, time: formatTime(raceTime) };
      });

      setResult({
        type: 'distance',
        distanceMiles: distMiles.toFixed(2),
        distanceKm: distKm.toFixed(2),
        distanceMeters: (distKm * 1000).toFixed(0),
        pacePerMile: formatPace(pacePerMile),
        pacePerKm: formatPace(pacePerKm),
        speedMph: speedMph.toFixed(2),
        speedKmh: speedKmh.toFixed(2),
        totalTime: formatTime(totalSec),
        raceEstimates,
      });
    }
  };

  const modes = [
    { key: 'pace', label: 'Calculate Pace' },
    { key: 'time', label: 'Calculate Time' },
    { key: 'distance', label: 'Calculate Distance' },
  ];

  return (
    <div>
      <Seo title="Pace Calculator \u2013 QuickCalcs" description="Free running pace calculator. Calculate your pace, time, or distance for running and jogging. See race time predictions for 5K, 10K, half marathon, and marathon." />
      <h1>Pace Calculator</h1>
      <p className="subtitle">Calculate running pace, time, or distance.</p>

      <div className="unit-toggle">
        {modes.map((m) => (
          <button
            key={m.key}
            className={mode === m.key ? 'active' : ''}
            onClick={() => { setMode(m.key); setResult(null); }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleCalculate} className="form">
        {/* Distance input -- shown for pace and time modes */}
        {(mode === 'pace' || mode === 'time') && (
          <>
            <label style={{ fontWeight: 600, fontSize: '0.95rem', color: '#475569' }}>Distance</label>
            <div className="preset-row">
              {racePresets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-btn ${distanceValue === (distanceUnit === 'miles' ? (p.distance / 1.60934).toFixed(2) : distanceUnit === 'meters' ? (p.distance * 1000).toFixed(0) : p.distance.toString()) ? 'active' : ''}`}
                  onClick={() => handlePreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="input-row">
              <div className="input-group" style={{ flex: 2 }}>
                <label>Distance Value</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="5"
                  value={distanceValue}
                  onChange={(e) => setDistanceValue(e.target.value)}
                  required
                />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Unit</label>
                <select
                  className="select-input"
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                >
                  <option value="miles">Miles</option>
                  <option value="kilometers">Kilometers</option>
                  <option value="meters">Meters</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Time input -- shown for pace and distance modes */}
        {(mode === 'pace' || mode === 'distance') && (
          <div className="input-row">
            <div className="input-group">
              <label>Hours</label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="25"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="0"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Pace input -- shown for time and distance modes */}
        {(mode === 'time' || mode === 'distance') && (
          <>
            <div className="input-row">
              <div className="input-group">
                <label>Pace (minutes)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="8"
                  value={paceMin}
                  onChange={(e) => setPaceMin(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Pace (seconds)</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  placeholder="30"
                  value={paceSec}
                  onChange={(e) => setPaceSec(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Pace Unit</label>
                <select
                  className="select-input"
                  value={paceUnit}
                  onChange={(e) => setPaceUnit(e.target.value)}
                >
                  <option value="min/mile">min/mile</option>
                  <option value="min/km">min/km</option>
                </select>
              </div>
            </div>
          </>
        )}

        <button type="submit">
          {mode === 'pace' ? 'Calculate Pace' : mode === 'time' ? 'Calculate Time' : 'Calculate Distance'}
        </button>
      </form>

      {result && (
        <div className="results">
          {/* Primary result */}
          {result.type === 'pace' && (
            <div className="primary-result">
              <span className="age-number">{result.pacePerMile}</span>
              <span className="age-label">min/mile</span>
              <span className="age-number">{result.pacePerKm}</span>
              <span className="age-label">min/km</span>
            </div>
          )}
          {result.type === 'time' && (
            <div className="primary-result">
              <span className="age-number">{result.totalTime}</span>
              <span className="age-label">Total Time</span>
            </div>
          )}
          {result.type === 'distance' && (
            <div className="primary-result">
              <span className="age-number">{result.distanceMiles}</span>
              <span className="age-label">miles</span>
              <span className="age-number">{result.distanceKm}</span>
              <span className="age-label">km</span>
            </div>
          )}

          {/* Pace and speed details */}
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{result.pacePerMile}</span>
              <span className="detail-label">Pace (min/mile)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.pacePerKm}</span>
              <span className="detail-label">Pace (min/km)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.speedMph} mph</span>
              <span className="detail-label">Speed (mph)</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.speedKmh} km/h</span>
              <span className="detail-label">Speed (km/h)</span>
            </div>
          </div>

          {/* Race time estimates */}
          <h3 style={{ fontSize: '1rem', margin: '0.5rem 0 0.75rem', color: '#0f172a' }}>Race Time Estimates at This Pace</h3>
          <div className="detail-grid">
            {result.raceEstimates.map((race) => (
              <div className="detail-card" key={race.label}>
                <span className="detail-value">{race.time}</span>
                <span className="detail-label">{race.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedTools current="/pace-calculator" />

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          The Pace Calculator helps runners and joggers figure out their running pace, finish time, or distance covered.
          Whether you are training for a 5K or preparing for a marathon, this tool gives you instant results in both
          imperial and metric units.
        </p>

        <h2>How to Use the Pace Calculator</h2>
        <ul>
          <li><strong>Calculate Pace:</strong> Enter your distance and total time to find out how fast you ran per mile or per kilometer.</li>
          <li><strong>Calculate Time:</strong> Enter your distance and target pace to find out how long your run will take.</li>
          <li><strong>Calculate Distance:</strong> Enter your time and pace to see how far you ran or will run.</li>
        </ul>

        <h2>Common Race Distances</h2>
        <ul>
          <li><strong>5K:</strong> 3.11 miles / 5 kilometers -- a popular beginner race distance</li>
          <li><strong>10K:</strong> 6.21 miles / 10 kilometers -- a step up that tests endurance</li>
          <li><strong>Half Marathon:</strong> 13.11 miles / 21.1 kilometers -- a challenging distance for intermediate runners</li>
          <li><strong>Marathon:</strong> 26.22 miles / 42.2 kilometers -- the classic long-distance race</li>
        </ul>

        <h2>Pace vs. Speed</h2>
        <p>
          Pace is measured in minutes per mile (or per kilometer), telling you how long it takes to cover one unit of distance.
          Speed is measured in miles per hour (or km/h), telling you how many units of distance you cover in one hour.
          They are inversely related: a faster pace means a higher speed. For example, an 8:00 min/mile pace equals 7.5 mph.
        </p>

        <h2>Tips for Improving Your Pace</h2>
        <ul>
          <li><strong>Interval training:</strong> Alternate between high-intensity bursts and recovery periods to build speed.</li>
          <li><strong>Long runs:</strong> Build endurance with weekly long runs at a comfortable pace.</li>
          <li><strong>Tempo runs:</strong> Run at a comfortably hard pace to improve your lactate threshold.</li>
          <li><strong>Consistency:</strong> Stick to a regular training schedule to see steady improvement over time.</li>
          <li><strong>Rest and recovery:</strong> Allow your body to recover between hard workouts to prevent injury.</li>
        </ul>
      </div>
    </div>
  );
}

export default PaceCalculator;
