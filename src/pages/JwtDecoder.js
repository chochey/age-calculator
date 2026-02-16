import { useState } from 'react';
import Seo from '../components/Seo';

function decodeJwt(token) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots.');

  const decode = (str) => {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(padded));
  };

  const header = decode(parts[0]);
  const payload = decode(parts[1]);

  return { header, payload, signature: parts[2] };
}

function formatDate(ts) {
  if (!ts) return null;
  return new Date(ts * 1000).toLocaleString();
}

function JwtDecoder() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const decode = () => {
    setError('');
    setResult(null);
    try {
      setResult(decodeJwt(input));
    } catch (e) {
      setError(e.message);
    }
  };

  const isExpired = result && result.payload.exp ? Date.now() / 1000 > result.payload.exp : null;

  return (
    <div>
      <Seo title="JWT Decoder - Decode JSON Web Tokens Online" description="Free online JWT decoder. Paste a JSON Web Token to decode its header, payload, and check expiration. No data is sent to any server." />
      <h1>JWT Decoder</h1>
      <p className="subtitle">Decode JSON Web Tokens to inspect header and payload.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder="Paste your JWT here (eyJhbG...)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        spellCheck={false}
      />

      <button onClick={decode} className="form-btn" style={{ marginTop: '0.75rem' }}>Decode</button>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

      {result && (
        <div className="jwt-results" style={{ marginTop: '1.25rem' }}>
          {isExpired !== null && (
            <div className={`jwt-expiry ${isExpired ? 'expired' : 'valid'}`}>
              {isExpired ? 'Token is expired' : 'Token is still valid'}
              {result.payload.exp && <span className="jwt-expiry-date"> (exp: {formatDate(result.payload.exp)})</span>}
            </div>
          )}

          <div className="jwt-section">
            <div className="jwt-section-label">Header</div>
            <pre className="jwt-json">{JSON.stringify(result.header, null, 2)}</pre>
          </div>

          <div className="jwt-section">
            <div className="jwt-section-label">Payload</div>
            <pre className="jwt-json">{JSON.stringify(result.payload, null, 2)}</pre>
            {result.payload.iat && <div className="jwt-date">Issued: {formatDate(result.payload.iat)}</div>}
            {result.payload.exp && <div className="jwt-date">Expires: {formatDate(result.payload.exp)}</div>}
          </div>

          <div className="jwt-section">
            <div className="jwt-section-label">Signature</div>
            <code className="hash-value">{result.signature}</code>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>What is a JWT?</h2>
        <p>A JSON Web Token (JWT) is a compact, URL-safe way to represent claims between two parties. It consists of three Base64-encoded parts: a header (algorithm info), a payload (claims/data), and a signature. JWTs are commonly used for authentication and API authorization.</p>

        <h2>Is This Secure?</h2>
        <p>Yes — this tool runs entirely in your browser. Your token is never sent to any server. However, remember that JWTs are only encoded, not encrypted — anyone can read the payload. The signature only verifies the token hasn't been tampered with.</p>
      </section>
    </div>
  );
}

export default JwtDecoder;
