import { useState } from 'react';
import Seo from '../components/Seo';

function generatePassword(length, options) {
  let chars = '';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => chars[x % chars.length]).join('');
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', color: '#ef4444' };
  if (score <= 4) return { label: 'Medium', color: '#f59e0b' };
  return { label: 'Strong', color: '#22c55e' };
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setPassword(generatePassword(length, options));
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? getStrength(password) : null;

  return (
    <div>
      <Seo title="Password Generator - Secure Random Passwords" description="Free secure password generator. Create strong random passwords with customizable length, characters, and strength indicator." />
      <h1>Password Generator</h1>
      <p className="subtitle">Generate secure, random passwords instantly.</p>

      <div className="form">
        <div className="input-group">
          <label>Password Length: {length}</label>
          <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="range-input" />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" checked={options.uppercase} onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })} />
            Uppercase (A-Z)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={options.lowercase} onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })} />
            Lowercase (a-z)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={options.numbers} onChange={(e) => setOptions({ ...options, numbers: e.target.checked })} />
            Numbers (0-9)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={options.symbols} onChange={(e) => setOptions({ ...options, symbols: e.target.checked })} />
            Symbols (!@#$%)
          </label>
        </div>

        <button onClick={generate} className="form-btn">Generate Password</button>
      </div>

      {password && (
        <div className="results">
          <div className="password-display">
            <code className="password-text">{password}</code>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <div className="strength-bar">
            <div className="strength-fill" style={{ width: strength.label === 'Weak' ? '33%' : strength.label === 'Medium' ? '66%' : '100%', background: strength.color }}></div>
          </div>
          <p className="strength-label" style={{ color: strength.color }}>{strength.label}</p>
        </div>
      )}

      <section className="info-section">
        <h2>Why Use a Password Generator?</h2>
        <p>Strong, unique passwords are your first line of defense against hackers. This generator uses cryptographically secure randomness to create passwords that are virtually impossible to guess or crack through brute force.</p>

        <h2>Tips for Strong Passwords</h2>
        <ul>
          <li>Use at least 12 characters (16+ is ideal)</li>
          <li>Include uppercase, lowercase, numbers, and symbols</li>
          <li>Never reuse passwords across different sites</li>
          <li>Use a password manager to store them securely</li>
        </ul>
      </section>
    </div>
  );
}

export default PasswordGenerator;
