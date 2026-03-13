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
        <h2>How to Use the PX to REM Converter</h2>
        <p>Start by confirming or adjusting the base font size at the top of the form (the default is 16px, which matches the browser default for most users). Use the toggle to choose your conversion direction: "PX to REM" or "REM to PX." Enter a value in the editable field, and the converted result appears instantly in the read-only field beside it. Below the converter you will find copyable outputs for the PX value, the REM value, the EM equivalent, and a ready-to-paste CSS declaration. The Quick Reference Table at the bottom lists common pixel sizes and their REM/EM equivalents; click any row to populate the converter automatically.</p>

        <h2>Understanding PX, REM, and EM Units in CSS</h2>
        <p><strong>Pixels (px)</strong> are an absolute CSS unit. A value of 16px always renders at 16 device pixels regardless of context, which makes pixel values straightforward but rigid. They do not respond to a user who changes their browser's default font size for accessibility reasons.</p>
        <p><strong>REM (root em)</strong> is a relative unit tied to the font size of the root <code>&lt;html&gt;</code> element. When the root is set to the browser default of 16px, 1rem equals 16px. If a user or a stylesheet changes the root font size, every rem-based measurement scales proportionally. This single point of reference makes rem predictable even in deeply nested components.</p>
        <p><strong>EM</strong> is also a relative unit, but it references the font size of the element's immediate parent rather than the root. This means em values compound when elements are nested: a 1.5em font inside a 1.5em parent yields an effective size of 2.25 times the base. This compounding behavior makes em harder to manage in complex layouts, which is why rem is generally preferred for spacing and typography in modern CSS.</p>
        <p>The conversion formula is simple: <strong>rem = px / base</strong>. With a 16px base, 24px becomes 1.5rem. To reverse the calculation, multiply: <strong>px = rem * base</strong>. If your project sets the root font size to 10px for easier math (the "62.5% trick"), update the base value in this converter to see accurate results.</p>

        <h3>Why should I use REM instead of pixels in my CSS?</h3>
        <p>Using rem units improves accessibility because they respect the user's browser font-size preference. If a visually impaired user increases their default font size from 16px to 24px, all rem-based text, margins, and padding scale up accordingly, keeping the layout proportional and readable. Pixel values ignore this preference entirely, forcing the user to zoom the entire page instead. The Web Content Accessibility Guidelines (WCAG) recommend using relative units for text sizing to support this kind of user customization.</p>

        <h3>What is the 62.5% base font-size trick?</h3>
        <p>Some developers set <code>html {"{"} font-size: 62.5%; {"}"}</code> in their stylesheet, which reduces the root font size from 16px to 10px. With a 10px base, the math becomes trivial: 1rem = 10px, 1.4rem = 14px, 1.6rem = 16px, and so on. This can speed up development and reduce conversion errors. The rest of the page is then styled in rem units, and the body font size is typically reset to <code>1.6rem</code> (16px) so that default text remains a comfortable reading size. If you use this pattern, set the base font size in this converter to 10 for accurate results.</p>

        <h3>When should I use EM instead of REM?</h3>
        <p>EM is useful when you intentionally want a measurement to scale relative to the component's own font size rather than the global root. A common example is padding on a button: setting <code>padding: 0.5em 1em</code> means the padding automatically increases if the button text is made larger, keeping the proportions balanced. Icon sizes inside text and typographic details like letter-spacing also benefit from em because they should stay proportional to the surrounding text. For everything else, including page-level spacing, grid dimensions, and media query breakpoints, rem is the safer choice because it avoids compounding.</p>
      </div>
    </div>
  );
}

export default PxToRemConverter;
