import { useState } from 'react';
import Seo from '../components/Seo';

const perms = ['read', 'write', 'execute'];
const permValues = { read: 4, write: 2, execute: 1 };
const roles = ['owner', 'group', 'others'];

function ChmodCalculator() {
  const [bits, setBits] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true },
  });
  const [numericInput, setNumericInput] = useState('');

  const toggle = (role, perm) => {
    setBits((prev) => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }));
  };

  const getDigit = (role) => perms.reduce((sum, p) => sum + (bits[role][p] ? permValues[p] : 0), 0);
  const numeric = `${getDigit('owner')}${getDigit('group')}${getDigit('others')}`;

  const symbolic = roles.map((role) => {
    const r = bits[role].read ? 'r' : '-';
    const w = bits[role].write ? 'w' : '-';
    const x = bits[role].execute ? 'x' : '-';
    return r + w + x;
  }).join('');

  const applyNumeric = () => {
    const val = numericInput.trim();
    if (!/^[0-7]{3}$/.test(val)) return;
    const newBits = {};
    roles.forEach((role, i) => {
      const d = parseInt(val[i], 10);
      newBits[role] = {
        read: (d & 4) !== 0,
        write: (d & 2) !== 0,
        execute: (d & 1) !== 0,
      };
    });
    setBits(newBits);
    setNumericInput('');
  };

  return (
    <div>
      <Seo title="Chmod Calculator - Linux File Permissions" description="Free chmod calculator. Convert between numeric (octal) and symbolic Linux file permissions. Toggle read, write, and execute for owner, group, and others." />
      <h1>Chmod Calculator</h1>
      <p className="subtitle">Calculate Linux file permissions in numeric and symbolic notation.</p>

      <div className="results" style={{ marginBottom: '1.5rem' }}>
        <div className="primary-result">
          <span className="age-number">{numeric}</span>
          <span className="age-label">numeric</span>
          <span className="age-number" style={{ fontFamily: 'Consolas, monospace', fontSize: '1.5rem' }}>{symbolic}</span>
          <span className="age-label">symbolic</span>
        </div>
      </div>

      <div className="chmod-grid">
        <div className="chmod-header">
          <div></div>
          {perms.map((p) => <div key={p} className="chmod-col-label">{p.charAt(0).toUpperCase() + p.slice(1)}</div>)}
        </div>
        {roles.map((role) => (
          <div key={role} className="chmod-row">
            <div className="chmod-role">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
            {perms.map((perm) => (
              <div key={perm} className="chmod-cell">
                <label className="checkbox-label" style={{ justifyContent: 'center' }}>
                  <input type="checkbox" checked={bits[role][perm]} onChange={() => toggle(role, perm)} />
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter numeric (e.g. 644)"
          value={numericInput}
          onChange={(e) => setNumericInput(e.target.value)}
          maxLength={3}
          style={{ padding: '0.6rem 0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'Consolas, monospace', width: '160px' }}
        />
        <button onClick={applyNumeric} className="form-btn">Apply</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <code className="gradient-code">chmod {numeric} filename</code>
      </div>

      <section className="info-section">
        <h2>Understanding Chmod</h2>
        <p>Linux file permissions control who can read, write, and execute files. Each file has three permission groups: owner, group, and others. The chmod command sets these permissions using either numeric (octal) or symbolic notation.</p>

        <h2>Common Permissions</h2>
        <ul>
          <li><strong>755</strong> (rwxr-xr-x) — Owner: full, others: read & execute. Standard for directories and scripts.</li>
          <li><strong>644</strong> (rw-r--r--) — Owner: read & write, others: read only. Standard for files.</li>
          <li><strong>700</strong> (rwx------) — Owner only, no access for group or others. Private files.</li>
          <li><strong>777</strong> (rwxrwxrwx) — Full access for everyone. Avoid on production servers.</li>
        </ul>
      </section>
    </div>
  );
}

export default ChmodCalculator;
