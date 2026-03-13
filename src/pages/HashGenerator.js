import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use This Hash Generator</h2>
        <ol>
          <li>Type or paste the text you want to hash into the input area. This can be a password, a file's contents, a message, or any string of characters.</li>
          <li>Click "Generate Hashes" to compute all four hash algorithms simultaneously: SHA-1, SHA-256, SHA-384, and SHA-512.</li>
          <li>Each hash result is displayed in its own row with a "Copy" button so you can quickly grab the specific hash you need.</li>
          <li>To verify data integrity, hash the same text again and confirm the output matches your previously stored hash value.</li>
        </ol>

        <h2>How Cryptographic Hashing Works</h2>
        <p>A cryptographic hash function takes an input of any length and produces a fixed-size output called a digest. The process is deterministic, meaning the same input always yields the same hash, yet even a single-character change produces a completely different result. For example, "hello" and "Hello" generate entirely different SHA-256 digests. This property is called the avalanche effect. Hash functions are also one-way: it is computationally infeasible to reconstruct the original input from its hash. This tool uses the Web Crypto API (crypto.subtle.digest) built into your browser, which means the computation runs locally and your text never leaves your device. The output is displayed as a hexadecimal string, where each byte of the hash is represented by two hex characters (0-9, a-f).</p>

        <h2>Supported Hash Algorithms</h2>
        <ul>
          <li><strong>SHA-1</strong> — Produces a 160-bit (40-character hex) digest. Once standard for certificates and Git commits, it is now deprecated for security purposes due to known collision attacks, but remains useful for checksums and non-security identifiers.</li>
          <li><strong>SHA-256</strong> — Produces a 256-bit (64-character hex) digest. The most widely used secure hash today, employed in TLS certificates, Bitcoin mining, digital signatures, and software package verification.</li>
          <li><strong>SHA-384</strong> — Produces a 384-bit (96-character hex) digest. A truncated variant of SHA-512 that offers a balance between output size and security margin.</li>
          <li><strong>SHA-512</strong> — Produces a 512-bit (128-character hex) digest. The strongest algorithm available here, often used when maximum collision resistance is required.</li>
        </ul>

        <h3>Can I reverse a hash back to the original text?</h3>
        <p>No. Cryptographic hash functions are designed to be one-way. There is no mathematical formula to convert a hash digest back into the original input. Attackers sometimes use precomputed lookup tables (rainbow tables) to find common inputs, but a sufficiently long and complex input is practically irreversible.</p>

        <h3>What is the difference between SHA-256 and SHA-512?</h3>
        <p>SHA-256 produces a 256-bit digest and operates on 32-bit words internally, while SHA-512 produces a 512-bit digest using 64-bit words. SHA-512 provides a larger output and higher theoretical collision resistance. On 64-bit processors, SHA-512 can actually be faster than SHA-256 because its internal operations align with the processor's native word size.</p>

        <h3>Is my data sent to a server when I generate a hash?</h3>
        <p>No. All hash computations happen entirely within your browser using the Web Crypto API. Your text is never transmitted over the network or stored anywhere. This makes the tool safe for hashing sensitive content like passwords or private keys.</p>
      </section>
      <RelatedTools current="/hash-generator" />
    </div>
  );
}

export default HashGenerator;
