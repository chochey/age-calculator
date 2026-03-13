import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the JWT Decoder</h2>
        <p>Paste a complete JSON Web Token into the text area above and click "Decode." The tool splits the token at its two dot delimiters, Base64-decodes the header and payload sections, and displays them as formatted JSON. If the payload contains an <code>exp</code> (expiration) claim, a status badge tells you whether the token is still valid or has expired, along with the exact expiration timestamp. The signature segment is shown as a raw Base64 string. You can decode tokens from any identity provider, including Auth0, Firebase, AWS Cognito, and Okta, without sending data to any external server.</p>

        <h2>Anatomy of a JSON Web Token</h2>
        <p>A JWT is made up of three Base64URL-encoded parts separated by dots: <code>header.payload.signature</code>. The <strong>header</strong> typically contains two fields, <code>alg</code> (the signing algorithm, such as HS256 or RS256) and <code>typ</code> (usually "JWT"). The <strong>payload</strong> carries claims, which are statements about the user and additional metadata. Standard registered claims include <code>iss</code> (issuer), <code>sub</code> (subject), <code>aud</code> (audience), <code>exp</code> (expiration time), <code>nbf</code> (not before), and <code>iat</code> (issued at). Custom claims like user roles or permissions can also be included. The <strong>signature</strong> is computed by taking the encoded header and payload, joining them with a dot, and signing with a secret key (HMAC) or a private key (RSA/ECDSA). The receiving server verifies this signature to confirm the token has not been tampered with.</p>
        <p>For example, a token signed with HS256 uses <code>HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)</code> to produce the signature. RS256 tokens use an RSA private key instead, and the public key is published so any service can verify the token independently.</p>

        <h3>Is it safe to decode a JWT in the browser?</h3>
        <p>Yes. This decoder runs entirely on your device using client-side JavaScript. Your token never leaves the browser and is not transmitted to any server. That said, it is important to understand that JWTs are encoded, not encrypted. Anyone who obtains a JWT can decode the header and payload and read its contents. The signature ensures integrity (detecting tampering) but does not provide confidentiality. Avoid placing sensitive data like passwords or credit card numbers inside a JWT payload. If you need encrypted tokens, look into JWE (JSON Web Encryption).</p>

        <h3>What do the exp, iat, and nbf claims mean?</h3>
        <p>These are registered time-based claims defined in the JWT specification (RFC 7519). <code>iat</code> (issued at) records the Unix timestamp when the token was created. <code>exp</code> (expiration time) is the Unix timestamp after which the token should be rejected. <code>nbf</code> (not before) is the earliest time at which the token should be accepted. All three values are expressed as seconds since January 1, 1970 (the Unix epoch). This decoder automatically converts <code>exp</code> and <code>iat</code> to human-readable dates and checks whether the current time has passed the expiration.</p>

        <h3>What is the difference between HS256 and RS256 signing algorithms?</h3>
        <p>HS256 (HMAC with SHA-256) is a symmetric algorithm, meaning the same secret key is used to both sign and verify the token. It is simple to set up and works well when the issuer and verifier are the same application. RS256 (RSA Signature with SHA-256) is an asymmetric algorithm that uses a private key to sign and a separate public key to verify. RS256 is preferred in distributed systems where multiple services need to verify tokens without sharing a secret, because the public key can be freely distributed via a JWKS (JSON Web Key Set) endpoint.</p>
      </section>
      <RelatedTools current="/jwt-decoder" />
    </div>
  );
}

export default JwtDecoder;
