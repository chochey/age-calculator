import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const COMMON_PX = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72];

function PxToRemConverter() {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [mode, setMode] = useState('pxToRem');
  const [pxValue, setPxValue] = useState('');
  const [remValue, setRemValue] = useState('');
  const [copied, setCopied] = useState('');

  const base = baseFontSize > 0 ? baseFontSize : 16;

  const handlePxChange = (val) => {
    setPxValue(val);
    if (val !== '' && !isNaN(Number(val))) {
      setRemValue((Number(val) / base).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setRemValue('');
    }
  };

  const handleRemChange = (val) => {
    setRemValue(val);
    if (val !== '' && !isNaN(Number(val))) {
      setPxValue((Number(val) * base).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setPxValue('');
    }
  };

  const handleBaseChange = (val) => {
    const newBase = Number(val) || 0;
    setBaseFontSize(newBase);
    if (newBase > 0) {
      if (mode === 'pxToRem' && pxValue !== '' && !isNaN(Number(pxValue))) {
        setRemValue((Number(pxValue) / newBase).toFixed(6).replace(/\.?0+$/, ''));
      } else if (mode === 'remToPx' && remValue !== '' && !isNaN(Number(remValue))) {
        setPxValue((Number(remValue) * newBase).toFixed(6).replace(/\.?0+$/, ''));
      }
    }
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
  };

  const handleTableRowClick = (px) => {
    setMode('pxToRem');
    setPxValue(String(px));
    setRemValue((px / base).toFixed(6).replace(/\.?0+$/, ''));
  };

  const emValue = remValue !== '' && !isNaN(Number(remValue)) ? remValue : '';

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const isPxMode = mode === 'pxToRem';
  const hasResult = isPxMode ? (pxValue !== '' && remValue !== '') : (remValue !== '' && pxValue !== '');

  return (
    <div>
      <Seo
        title="PX to REM Converter - QuickCalcs"
        description="Free pixel to REM converter. Convert between px, rem, and em CSS units. Includes quick reference table for common values."
      />
      <h1>PX to REM Converter</h1>
      <p className="subtitle">Convert between px, rem & em CSS units.</p>

      {/* Mode Toggle */}
      <div className="unit-toggle">
        <button className={mode === 'pxToRem' ? 'active' : ''} onClick={() => handleModeSwitch('pxToRem')}>
          PX to REM
        </button>
        <button className={mode === 'remToPx' ? 'active' : ''} onClick={() => handleModeSwitch('remToPx')}>
          REM to PX
        </button>
      </div>

      {/* Base Font Size */}
      <div className="form">
        <div className="input-group">
          <label>Base Font Size (px)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={baseFontSize}
            onChange={(e) => handleBaseChange(e.target.value)}
            placeholder="16"
          />
        </div>

        {/* Conversion Inputs */}
        <div className="input-row">
          {isPxMode ? (
            <>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Pixels (px)</label>
                <input
                  type="number"
                  step="any"
                  value={pxValue}
                  onChange={(e) => handlePxChange(e.target.value)}
                  placeholder="e.g. 16"
                  style={{ fontFamily: "'Consolas', monospace" }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>
                =
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>REM</label>
                <input
                  type="text"
                  value={remValue}
                  readOnly
                  style={{ fontFamily: "'Consolas', monospace", background: '#f8fafc', color: '#4f46e5', fontWeight: 600 }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-group" style={{ flex: 1 }}>
                <label>REM</label>
                <input
                  type="number"
                  step="any"
                  value={remValue}
                  onChange={(e) => handleRemChange(e.target.value)}
                  placeholder="e.g. 1"
                  style={{ fontFamily: "'Consolas', monospace" }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>
                =
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Pixels (px)</label>
                <input
                  type="text"
                  value={pxValue}
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
              {isPxMode ? `${remValue}rem` : `${pxValue}px`}
            </span>
            <span className="age-label">{isPxMode ? `= ${pxValue}px` : `= ${remValue}rem`}</span>
          </div>

          <div className="hash-results" style={{ marginTop: '1rem' }}>
            <div className="hash-row">
              <div className="hash-header">
                <strong>PX Value</strong>
                <button onClick={() => copy('px', `${pxValue}px`)} className="copy-btn">
                  {copied === 'px' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{pxValue}px</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>REM Value</strong>
                <button onClick={() => copy('rem', `${remValue}rem`)} className="copy-btn">
                  {copied === 'rem' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{remValue}rem</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>EM Equivalent</strong>
                <button onClick={() => copy('em', `${emValue}em`)} className="copy-btn">
                  {copied === 'em' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{emValue}em</code>
            </div>

            <div className="hash-row">
              <div className="hash-header">
                <strong>CSS Declaration</strong>
                <button onClick={() => copy('css', `font-size: ${remValue}rem; /* ${pxValue}px */`)} className="copy-btn">
                  {copied === 'css' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">font-size: {remValue}rem; /* {pxValue}px */</code>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>Quick Reference Table</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Based on {base}px base font size. Click any row to populate the converter.
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
            <span>Pixels</span>
            <span>REM</span>
            <span>EM</span>
          </div>
          {/* Table Rows */}
          {COMMON_PX.map((px) => {
            const rem = (px / base).toFixed(6).replace(/\.?0+$/, '');
            const isActive = pxValue === String(px);
            return (
              <div
                key={px}
                onClick={() => handleTableRowClick(px)}
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
                <span>{px}px</span>
                <span>{rem}rem</span>
                <span>{rem}em</span>
              </div>
            );
          })}
        </div>
      </div>

      <RelatedTools current="/px-to-rem" />

      <div className="info-section">
        <h2>About REM Units</h2>
        <p>
          REM stands for "root em" and is a relative CSS unit based on the root element's font size (the
          <code style={{ background: '#f1f5f9', padding: '0.15em 0.4em', borderRadius: '4px', fontSize: '0.9em' }}>&lt;html&gt;</code> element).
          By default, most browsers set the root font size to 16px, so 1rem equals 16px.
          Unlike em units, which are relative to the parent element's font size, rem always references the root,
          making it more predictable and easier to manage across complex layouts.
        </p>

        <h2>PX vs REM vs EM</h2>
        <ul>
          <li><strong>PX (Pixels):</strong> An absolute unit. 16px is always 16px regardless of context. Simple to use but does not scale with user preferences.</li>
          <li><strong>REM (Root EM):</strong> A relative unit tied to the root font size. If the root is 16px, 1rem = 16px. Scales globally when the user changes browser font size settings.</li>
          <li><strong>EM:</strong> A relative unit tied to the parent element's font size. 1em = the parent's font size. Can compound when nested, making it harder to predict.</li>
        </ul>

        <h2>Why Use REM?</h2>
        <p>
          Using rem units improves accessibility by respecting users' browser font size preferences.
          If a user increases their default font size from 16px to 20px, all rem-based measurements scale proportionally.
          This is especially important for responsive design, ensuring text, spacing, and layout adapt to user needs.
          The rem unit also avoids the compounding problem of em units in nested elements.
        </p>

        <h2>How to Convert PX to REM</h2>
        <p>
          The formula is straightforward: <strong>rem = px / base font size</strong>. With a default base of 16px,
          24px becomes 24 / 16 = 1.5rem. To convert back, multiply: <strong>px = rem * base font size</strong>,
          so 1.5rem * 16 = 24px. If your project uses a different base font size (e.g., 10px for easier math),
          adjust the base value in this converter accordingly.
        </p>

        <h2>Common Conversion Values</h2>
        <p>
          At a 16px base: 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem, 18px = 1.125rem, 20px = 1.25rem,
          24px = 1.5rem, 32px = 2rem, 48px = 3rem, and 64px = 4rem. These are commonly used for font sizes,
          margins, padding, and other spacing properties in CSS.
        </p>
      </div>
    </div>
  );
}

export default PxToRemConverter;
