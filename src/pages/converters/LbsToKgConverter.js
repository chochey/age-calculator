import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const COMMON_LBS = [5, 10, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 300, 350];

function LbsToKgConverter() {
  const [mode, setMode] = useState('lbsToKg');
  const [lbsValue, setLbsValue] = useState('');
  const [kgValue, setKgValue] = useState('');
  const [copied, setCopied] = useState('');

  const LBS_PER_KG = 2.20462262185;
  const KG_PER_LB = 0.45359237;

  const fmt = (n) => Number(Number(n).toFixed(4)).toString();

  const handleLbsChange = (val) => {
    setLbsValue(val);
    if (val !== '' && !isNaN(Number(val))) {
      setKgValue(fmt(Number(val) * KG_PER_LB));
    } else {
      setKgValue('');
    }
  };

  const handleKgChange = (val) => {
    setKgValue(val);
    if (val !== '' && !isNaN(Number(val))) {
      setLbsValue(fmt(Number(val) * LBS_PER_KG));
    } else {
      setLbsValue('');
    }
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
  };

  const handleTableRowClick = (lbs) => {
    setMode('lbsToKg');
    setLbsValue(String(lbs));
    setKgValue(fmt(lbs * KG_PER_LB));
  };

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const isLbsMode = mode === 'lbsToKg';
  const hasResult = isLbsMode ? (lbsValue !== '' && kgValue !== '') : (kgValue !== '' && lbsValue !== '');

  const ouncesTotal = lbsValue !== '' && !isNaN(Number(lbsValue)) ? fmt(Number(lbsValue) * 16) : '';
  const gramsTotal = kgValue !== '' && !isNaN(Number(kgValue)) ? fmt(Number(kgValue) * 1000) : '';
  const stonesTotal = lbsValue !== '' && !isNaN(Number(lbsValue)) ? fmt(Number(lbsValue) / 14) : '';

  return (
    <div>
      <Seo
        title="Pounds to Kilograms Converter - LBS to KG Calculator"
        description="Free pounds to kilograms converter. Instantly convert lbs to kg and kg to lbs with a quick reference table for common weights. Copy results with one click."
        faqs={[{ q: 'How many kilograms are in one pound?', a: 'One pound equals exactly 0.45359237 kilograms. This conversion factor is defined by international agreement and is used worldwide for trade, science, and everyday weight measurements. To convert any pound value to kilograms, multiply by 0.45359237. For quick mental math, dividing the pound value by 2.2 gives a close approximation.' }, { q: 'Why do some countries use pounds and others use kilograms?', a: 'The kilogram is the SI base unit of mass and is used by the vast majority of countries through the metric system. The United States, Liberia, and Myanmar still use the imperial/customary system where pounds are standard for everyday weight. The difference is historical: most nations adopted the metric system after the French Revolution standardized it, while the US retained its customary units. In practice, many industries in the US, including science, medicine, and military, already use kilograms alongside pounds.' }, { q: 'What is the difference between mass and weight?', a: 'Mass measures the amount of matter in an object and is constant regardless of location. It is measured in kilograms. Weight is the force that gravity exerts on that mass and changes depending on gravitational strength. Technically weight is measured in newtons, but in everyday use people say they "weigh" a certain number of pounds or kilograms. On Earth the distinction rarely matters, but on the Moon you would weigh about one-sixth as much while your mass stays the same.' }]}
      />
      <h1>Pounds to Kilograms Converter</h1>
      <p className="subtitle">Convert between pounds (lbs) and kilograms (kg) instantly.</p>

      {/* Mode Toggle */}
      <div className="unit-toggle">
        <button className={mode === 'lbsToKg' ? 'active' : ''} onClick={() => handleModeSwitch('lbsToKg')}>
          LBS to KG
        </button>
        <button className={mode === 'kgToLbs' ? 'active' : ''} onClick={() => handleModeSwitch('kgToLbs')}>
          KG to LBS
        </button>
      </div>

      {/* Conversion Inputs */}
      <div className="form">
        <div className="input-row">
          {isLbsMode ? (
            <>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Pounds (lbs)</label>
                <input
                  type="number"
                  step="any"
                  value={lbsValue}
                  onChange={(e) => handleLbsChange(e.target.value)}
                  placeholder="e.g. 150"
                  style={{ fontFamily: "'Consolas', monospace" }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>
                =
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Kilograms (kg)</label>
                <input
                  type="text"
                  value={kgValue}
                  readOnly
                  style={{ fontFamily: "'Consolas', monospace", background: '#f8fafc', color: '#4f46e5', fontWeight: 600 }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Kilograms (kg)</label>
                <input
                  type="number"
                  step="any"
                  value={kgValue}
                  onChange={(e) => handleKgChange(e.target.value)}
                  placeholder="e.g. 68"
                  style={{ fontFamily: "'Consolas', monospace" }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>
                =
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Pounds (lbs)</label>
                <input
                  type="text"
                  value={lbsValue}
                  readOnly
                  style={{ fontFamily: "'Consolas', monospace", background: '#f8fafc', color: '#4f46e5', fontWeight: 600 }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      {hasResult && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number" style={{ fontSize: '1.8rem', fontFamily: "'Consolas', monospace" }}>
              {isLbsMode ? `${kgValue} kg` : `${lbsValue} lbs`}
            </span>
            <span className="age-label">{isLbsMode ? `= ${lbsValue} lbs` : `= ${kgValue} kg`}</span>
          </div>

          <div className="hash-results" style={{ marginTop: '1rem' }}>
            <div className="hash-row">
              <div className="hash-header">
                <strong>Pounds</strong>
                <button onClick={() => copy('lbs', `${lbsValue} lbs`)} className="copy-btn">
                  {copied === 'lbs' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{lbsValue} lbs</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Kilograms</strong>
                <button onClick={() => copy('kg', `${kgValue} kg`)} className="copy-btn">
                  {copied === 'kg' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{kgValue} kg</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Ounces</strong>
                <button onClick={() => copy('oz', `${ouncesTotal} oz`)} className="copy-btn">
                  {copied === 'oz' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{ouncesTotal} oz</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Grams</strong>
                <button onClick={() => copy('g', `${gramsTotal} g`)} className="copy-btn">
                  {copied === 'g' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{gramsTotal} g</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>Stone</strong>
                <button onClick={() => copy('st', `${stonesTotal} st`)} className="copy-btn">
                  {copied === 'st' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{stonesTotal} st</code>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>Quick Reference Table</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Common pound to kilogram conversions. Click any row to populate the converter.
        </p>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '0.6rem 1rem',
            background: '#f8fafc',
            borderBottom: '2px solid #e2e8f0',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            <span>Pounds</span>
            <span>Kilograms</span>
            <span>Grams</span>
          </div>
          {/* Table Rows */}
          {COMMON_LBS.map((lbs) => {
            const kg = Number((lbs * KG_PER_LB).toFixed(2));
            const g = Number((lbs * KG_PER_LB * 1000).toFixed(0));
            const isActive = lbsValue === String(lbs) && mode === 'lbsToKg';
            return (
              <div
                key={lbs}
                onClick={() => handleTableRowClick(lbs)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '0.55rem 1rem',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  fontFamily: "'Consolas', monospace",
                  fontSize: '0.9rem',
                  color: isActive ? '#4f46e5' : '#475569',
                  background: isActive ? '#eef2ff' : '#fff',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                <span>{lbs} lbs</span>
                <span>{kg} kg</span>
                <span>{g} g</span>
              </div>
            );
          })}
        </div>
      </div>

      <RelatedTools current="/lbs-to-kg" />

      <div className="info-section">
        <h2>How to Use the Pounds to Kilograms Converter</h2>
        <p>Use the toggle at the top to choose your conversion direction: LBS to KG or KG to LBS. Enter a number in the editable input field and the converted result appears instantly in the read-only field next to it. The results panel shows the equivalent weight in pounds, kilograms, ounces, grams, and stone, each with a copy button for easy pasting. The Quick Reference Table lists common weights; click any row to populate the converter automatically.</p>

        <h2>Understanding Pounds and Kilograms</h2>
        <p><strong>The pound (lb)</strong> is a unit of mass in the imperial and US customary systems. One pound is legally defined as exactly 0.45359237 kilograms. The abbreviation "lb" comes from the Latin word "libra," which was a Roman unit of weight. Pounds are subdivided into 16 ounces, and 14 pounds make one stone, a unit still commonly used in the United Kingdom and Ireland for body weight.</p>
        <p><strong>The kilogram (kg)</strong> is the base unit of mass in the International System of Units (SI). Since 2019 the kilogram has been defined by fixing the numerical value of the Planck constant, replacing the old physical prototype stored in Paris. One kilogram equals approximately 2.20462 pounds. The kilogram is used for nearly every weight measurement worldwide outside the United States, from grocery shopping to industrial manufacturing.</p>

        <h3>Conversion Formulas</h3>
        <p>The formulas are simple and exact. To convert pounds to kilograms: <strong>kg = lbs × 0.45359237</strong>. To convert kilograms to pounds: <strong>lbs = kg × 2.20462</strong>. For a quick mental estimate, divide the pound value by 2.2 to get kilograms, or multiply kilograms by 2.2 to get pounds. This approximation is accurate enough for most everyday situations such as checking luggage weight limits or comparing product labels.</p>

        <h3>When do you need pound to kilogram conversion?</h3>
        <p>Weight conversion is essential when traveling internationally, as airline baggage limits may be listed in kilograms while you think in pounds. Fitness enthusiasts converting between gym equipment labeled in different units use it daily. Cooking recipes from other countries sometimes list ingredients by weight in grams or kilograms. Shipping and logistics companies need accurate conversions for customs declarations, and healthcare providers often convert patient weights between systems depending on the country or the medical equipment in use. Having a reliable converter saves time and prevents costly errors in all of these situations.</p>
      </div>
    </div>
  );
}

export default LbsToKgConverter;
