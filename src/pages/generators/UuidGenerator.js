import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function generateUuidV4() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
}

function getUuidBreakdown(uuid) {
  const parts = uuid.split('-');
  const versionNibble = parseInt(parts[2][0], 16);
  const variantBits = parseInt(parts[3][0], 16);
  let variant = 'Reserved';
  if ((variantBits & 0x8) === 0) variant = 'NCS (backward compatibility)';
  else if ((variantBits & 0xc) === 0x8) variant = 'RFC 4122 / DCE';
  else if ((variantBits & 0xe) === 0xc) variant = 'Microsoft (backward compatibility)';

  return {
    timeLow: parts[0],
    timeMid: parts[1],
    timeHiAndVersion: parts[2],
    variantAndClockSeq: parts[3],
    node: parts[4],
    version: versionNibble,
    variant,
  };
}

function UuidGenerator() {
  const [quantity, setQuantity] = useState(1);
  const [uuids, setUuids] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [history, setHistory] = useState([]);
  const [showBreakdown, setShowBreakdown] = useState(null);

  const generate = () => {
    const count = Math.max(1, Math.min(100, quantity));
    const newUuids = Array.from({ length: count }, () => generateUuidV4());
    setUuids(newUuids);
    setHistory((prev) => [...newUuids, ...prev].slice(0, 200));
    setCopiedIndex(null);
    setCopiedAll(false);
    setShowBreakdown(null);
  };

  const copyOne = (uuid, index) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div>
      <Seo title="UUID Generator - Create Random UUID v4 Identifiers" description="Generate random UUID v4 identifiers instantly. Create single or batch UUIDs up to 100 at a time, view breakdowns, copy with one click, and track generation history." faqs={[{ q: 'What is a UUID v4?', a: 'A UUID v4 (Universally Unique Identifier version 4) is a 128-bit identifier generated using random or pseudo-random numbers. It follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where 4 indicates the version and y is constrained to 8, 9, a, or b to indicate the RFC 4122 variant.' }, { q: 'Are UUIDs generated here truly unique?', a: 'Yes, for all practical purposes. UUIDs are generated using the Web Crypto API which provides cryptographically secure random values. The probability of generating a duplicate UUID v4 is astronomically low — roughly 1 in 5.3 x 10^36.' }, { q: 'Can I use these UUIDs in production applications?', a: 'Absolutely. The UUIDs generated here conform to the RFC 4122 standard and are suitable for database primary keys, API identifiers, session tokens, and any other use case that requires globally unique identifiers.' }]} />
      <h1>UUID Generator</h1>
      <p className="subtitle">Generate RFC 4122 compliant UUID v4 identifiers instantly.</p>

      <div className="form">
        <div className="input-group">
          <label>Quantity (1-100)</label>
          <input type="number" min="1" max="100" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-input" />
        </div>

        <button onClick={generate} className="form-btn">Generate UUID{quantity > 1 ? 's' : ''}</button>
      </div>

      {uuids.length > 0 && (
        <div className="results">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong>{uuids.length} UUID{uuids.length > 1 ? 's' : ''} Generated</strong>
            {uuids.length > 1 && (
              <button onClick={copyAll} className="copy-btn">{copiedAll ? 'Copied All!' : 'Copy All'}</button>
            )}
          </div>
          {uuids.map((uuid, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <code style={{ flex: 1, wordBreak: 'break-all' }}>{uuid}</code>
              <button onClick={() => copyOne(uuid, i)} className="copy-btn">{copiedIndex === i ? 'Copied!' : 'Copy'}</button>
              <button onClick={() => setShowBreakdown(showBreakdown === i ? null : i)} className="copy-btn">{showBreakdown === i ? 'Hide' : 'Breakdown'}</button>
              {showBreakdown === i && (() => {
                const bd = getUuidBreakdown(uuid);
                return (
                  <div style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary, #f5f5f5)', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <p><strong>Version:</strong> {bd.version} (Random)</p>
                    <p><strong>Variant:</strong> {bd.variant}</p>
                    <p><strong>Time Low:</strong> {bd.timeLow}</p>
                    <p><strong>Time Mid:</strong> {bd.timeMid}</p>
                    <p><strong>Time Hi &amp; Version:</strong> {bd.timeHiAndVersion}</p>
                    <p><strong>Variant &amp; Clock Seq:</strong> {bd.variantAndClockSeq}</p>
                    <p><strong>Node:</strong> {bd.node}</p>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="results" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong>History ({history.length})</strong>
            <button onClick={clearHistory} className="copy-btn">Clear</button>
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {history.map((uuid, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <code style={{ flex: 1, fontSize: '0.85rem', wordBreak: 'break-all' }}>{uuid}</code>
                <button onClick={() => copyOne(uuid, 'h' + i)} className="copy-btn" style={{ fontSize: '0.75rem' }}>{copiedIndex === 'h' + i ? 'Copied!' : 'Copy'}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This UUID Generator</h2>
        <ol>
          <li>Set the quantity of UUIDs you want to generate, from 1 to 100 at a time.</li>
          <li>Click "Generate UUID" to create your identifiers instantly.</li>
          <li>Use the "Copy" button next to any UUID to copy it to your clipboard, or click "Copy All" to grab the entire batch at once.</li>
          <li>Click "Breakdown" on any UUID to see its internal structure, including version, variant, and field segments.</li>
          <li>Scroll down to the History section to revisit previously generated UUIDs from this session.</li>
        </ol>

        <h2>How UUID v4 Generation Works</h2>
        <p>A UUID (Universally Unique Identifier) version 4 is a 128-bit value generated almost entirely from random data. This tool uses the Web Crypto API (crypto.getRandomValues) to fill 16 random bytes, then sets the version nibble to 4 and the variant bits to the RFC 4122 standard (binary 10xx). The result is formatted as five hexadecimal groups separated by hyphens: 8-4-4-4-12 characters. Because 122 of the 128 bits are random, there are over 5.3 x 10^36 possible UUID v4 values, making collisions virtually impossible even when generating billions of identifiers. Unlike UUID v1, which embeds timestamps and MAC addresses, UUID v4 reveals no information about when or where it was created, making it ideal for privacy-sensitive applications.</p>

        <h2>Common Use Cases for UUIDs</h2>
        <ul>
          <li>Database primary keys that need to be unique across distributed systems without coordination</li>
          <li>API request and response identifiers for tracing and debugging</li>
          <li>Session tokens and temporary identifiers in web applications</li>
          <li>File naming in storage systems to prevent collisions</li>
          <li>Correlation IDs in microservice architectures for log aggregation</li>
          <li>Unique identifiers in offline-first applications that sync data later</li>
        </ul>

        <h3>What is a UUID v4?</h3>
        <p>A UUID v4 (Universally Unique Identifier version 4) is a 128-bit identifier generated using random or pseudo-random numbers. It follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where 4 indicates the version and y is constrained to 8, 9, a, or b to indicate the RFC 4122 variant.</p>

        <h3>Are UUIDs generated here truly unique?</h3>
        <p>Yes, for all practical purposes. UUIDs are generated using the Web Crypto API which provides cryptographically secure random values. The probability of generating a duplicate UUID v4 is astronomically low — roughly 1 in 5.3 x 10^36.</p>

        <h3>Can I use these UUIDs in production applications?</h3>
        <p>Absolutely. The UUIDs generated here conform to the RFC 4122 standard and are suitable for database primary keys, API identifiers, session tokens, and any other use case that requires globally unique identifiers.</p>
      </section>
      <RelatedTools current="/uuid-generator" />
    </div>
  );
}

export default UuidGenerator;
