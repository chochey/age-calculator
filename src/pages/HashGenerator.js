import { useState } from 'react';
import Seo from '../components/Seo';

async function hashText(text, algo) {
  const encoded = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algo, encoded);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState(null);
  const [copied, setCopied] = useState('');

  const generate = async () => {
    if (!input) return;
    const [sha1, sha256, sha384, sha512] = await Promise.all([
      hashText(input, 'SHA-1'),
      hashText(input, 'SHA-256'),
      hashText(input, 'SHA-384'),
      hashText(input, 'SHA-512'),
    ]);
    setHashes({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-384': sha384, 'SHA-512': sha512 });
  };

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      <Seo title="Hash Generator - SHA-1, SHA-256, SHA-512 Online" description="Free online hash generator. Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text instantly in your browser." />
      <h1>Hash Generator</h1>
      <p className="subtitle">Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder="Enter text to hash..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        spellCheck={false}
      />

      <button onClick={generate} className="form-btn" style={{ marginTop: '0.75rem' }}>Generate Hashes</button>

      {hashes && (
        <div className="hash-results" style={{ marginTop: '1.25rem' }}>
          {Object.entries(hashes).map(([label, value]) => (
            <div key={label} className="hash-row">
              <div className="hash-header">
                <strong>{label}</strong>
                <button onClick={() => copy(label, value)} className="copy-btn">
                  {copied === label ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value">{value}</code>
            </div>
          ))}
        </div>
      )}

      <section className="info-section">
        <h2>What is a Hash?</h2>
        <p>A hash function takes input text and produces a fixed-length string of characters. The same input always produces the same hash, but even a tiny change completely alters the output. Hashes are one-way — you cannot reverse them to get the original text.</p>

        <h2>Hash Algorithms</h2>
        <ul>
          <li><strong>SHA-1</strong> — 160-bit hash, widely used but considered weak for security</li>
          <li><strong>SHA-256</strong> — 256-bit hash, used in TLS, Bitcoin, and digital signatures</li>
          <li><strong>SHA-384</strong> — 384-bit truncated version of SHA-512</li>
          <li><strong>SHA-512</strong> — 512-bit hash, strongest option available here</li>
        </ul>
      </section>
    </div>
  );
}

export default HashGenerator;
