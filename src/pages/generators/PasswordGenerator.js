import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Password Generator - Secure Random Passwords" description="Free secure password generator. Create strong random passwords with customizable length, characters, and strength indicator." faqs={[{ q: 'Is this password generator safe to use?', a: 'Yes. The entire password generation process happens locally in your browser using the Web Crypto API. No passwords are transmitted over the internet, stored on a server, or logged in any way. You can even use this tool while offline.' }, { q: 'How long should my password be?', a: 'For most online accounts, 16 characters is a strong baseline. For high-security needs such as master passwords or encryption keys, consider 20 characters or more. Each additional character exponentially increases the time required for a brute-force attack.' }, { q: 'Why should I avoid reusing passwords?', a: 'When one service is compromised in a data breach, attackers try those leaked credentials on other sites, a technique called credential stuffing. Using a unique password for every account ensures that a single breach cannot cascade across your digital life.' }]} />
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
        <h2>How to Use This Password Generator</h2>
        <ol>
          <li>Use the slider to set your desired password length. A minimum of 12 characters is recommended, though 16 or more is ideal for sensitive accounts.</li>
          <li>Select the character types you want to include: uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special symbols (!@#$%). The more variety you enable, the stronger your password will be.</li>
          <li>Click "Generate Password" to create a random password instantly.</li>
          <li>Review the strength indicator bar, which rates your password as Weak, Medium, or Strong based on its length and character diversity.</li>
          <li>Click "Copy" to copy the password to your clipboard and paste it wherever you need it.</li>
        </ol>

        <h2>How the Generator Works</h2>
        <p>This tool uses the Web Crypto API (crypto.getRandomValues) to produce cryptographically secure random numbers. Unlike Math.random(), which relies on a pseudo-random number generator and can be predictable, the Web Crypto API draws entropy from your operating system's secure random source. Each character in the password is selected independently from the pool of allowed characters, ensuring uniform distribution and maximum unpredictability. The strength meter evaluates your password based on length thresholds (8, 12, and 16 characters) and whether it includes a mix of uppercase, lowercase, digits, and symbols. A password rated "Strong" would take billions of years to crack with current brute-force methods.</p>

        <h2>Tips for Strong Passwords</h2>
        <ul>
          <li>Use at least 16 characters for critical accounts like email and banking</li>
          <li>Enable all four character types for maximum entropy</li>
          <li>Never reuse passwords across different websites or services</li>
          <li>Store generated passwords in a reputable password manager rather than writing them down</li>
          <li>Change passwords immediately if a service you use reports a data breach</li>
        </ul>

        <h3>Is this password generator safe to use?</h3>
        <p>Yes. The entire password generation process happens locally in your browser using the Web Crypto API. No passwords are transmitted over the internet, stored on a server, or logged in any way. You can even use this tool while offline.</p>

        <h3>How long should my password be?</h3>
        <p>For most online accounts, 16 characters is a strong baseline. For high-security needs such as master passwords or encryption keys, consider 20 characters or more. Each additional character exponentially increases the time required for a brute-force attack.</p>

        <h3>Why should I avoid reusing passwords?</h3>
        <p>When one service is compromised in a data breach, attackers try those leaked credentials on other sites, a technique called credential stuffing. Using a unique password for every account ensures that a single breach cannot cascade across your digital life.</p>
      </section>
      <RelatedTools current="/password-generator" />
    </div>
  );
}

export default PasswordGenerator;
