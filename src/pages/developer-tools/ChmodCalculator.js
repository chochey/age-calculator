import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Chmod Calculator - Linux File Permissions" description="Free chmod calculator. Convert between numeric (octal) and symbolic Linux file permissions. Toggle read, write, and execute for owner, group, and others." faqs={[{ q: 'What is the difference between numeric and symbolic chmod notation?', a: 'Numeric (octal) notation uses three digits such as chmod 644 file.txt, where each digit represents the combined permissions for owner, group, and others. Symbolic notation uses letters and operators, like chmod u+x script.sh, where u stands for user (owner), g for group, o for others, and a for all. The + operator adds a permission, - removes one, and = sets it exactly. Numeric notation sets all permissions at once, while symbolic notation is useful for adding or removing a single permission without affecting the rest.' }, { q: 'Why should I avoid using chmod 777?', a: 'Setting permissions to 777 means every user on the system can read, write, and execute the file. On a shared or public-facing server this is a major security vulnerability because any process or user, including compromised ones, can modify or replace the file. Web servers configured with 777 on application files are a common target for attackers who inject malicious code. Instead, grant only the minimum permissions necessary, typically 755 for directories and scripts and 644 for static files.' }, { q: 'How do file permissions apply to directories in Linux?', a: 'For directories, the three permission bits have slightly different meanings than for regular files. Read permission allows listing the contents of the directory. Write permission allows creating, renaming, or deleting files within it. Execute permission allows entering the directory with cd and accessing files inside it. A directory set to 755 lets anyone browse and enter it, but only the owner can add or remove files. Without execute permission on a directory, users cannot access any files inside it even if those files have open permissions.' }]} />
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
        <h2>How to Use the Chmod Calculator</h2>
        <p>Start by toggling the checkboxes for read, write, and execute under each role (owner, group, and others). The numeric octal code and the symbolic string update instantly as you click. If you already have a three-digit permission number, type it into the input field below the grid and click "Apply" to see the corresponding checkboxes light up. Once you have the permissions you need, copy the ready-made <code>chmod</code> command displayed at the bottom and paste it into your terminal.</p>

        <h2>How Linux File Permissions Work</h2>
        <p>Every file and directory on a Linux or Unix system carries a set of permission bits that determine who can interact with it and how. Permissions are divided into three roles: the <strong>owner</strong> (the user who created the file), the <strong>group</strong> (users who share a group assignment), and <strong>others</strong> (everyone else). Each role can be granted three abilities: <strong>read</strong> (view the contents or list a directory), <strong>write</strong> (modify or delete), and <strong>execute</strong> (run a file as a program or enter a directory).</p>
        <p>In numeric notation, each ability has a value: read is 4, write is 2, and execute is 1. The values are summed per role to produce a single octal digit. For example, read plus write equals 6, and read plus execute equals 5. A full permission set is expressed as three digits, one for each role. The permission <code>755</code> translates to <code>rwxr-xr-x</code>, giving the owner full access while the group and others can read and execute but not modify the file.</p>
        <p>Common configurations include <code>644</code> for regular files (owner reads and writes, everyone else only reads), <code>755</code> for executable scripts and directories, <code>700</code> for private files that only the owner should access, and <code>600</code> for sensitive files like SSH private keys. Setting <code>777</code> grants full access to everyone and should be avoided in production environments because it introduces serious security risks.</p>

        <h3>What is the difference between numeric and symbolic chmod notation?</h3>
        <p>Numeric (octal) notation uses three digits such as <code>chmod 644 file.txt</code>, where each digit represents the combined permissions for owner, group, and others. Symbolic notation uses letters and operators, like <code>chmod u+x script.sh</code>, where <code>u</code> stands for user (owner), <code>g</code> for group, <code>o</code> for others, and <code>a</code> for all. The <code>+</code> operator adds a permission, <code>-</code> removes one, and <code>=</code> sets it exactly. Numeric notation sets all permissions at once, while symbolic notation is useful for adding or removing a single permission without affecting the rest.</p>

        <h3>Why should I avoid using chmod 777?</h3>
        <p>Setting permissions to <code>777</code> means every user on the system can read, write, and execute the file. On a shared or public-facing server this is a major security vulnerability because any process or user, including compromised ones, can modify or replace the file. Web servers configured with <code>777</code> on application files are a common target for attackers who inject malicious code. Instead, grant only the minimum permissions necessary, typically <code>755</code> for directories and scripts and <code>644</code> for static files.</p>

        <h3>How do file permissions apply to directories in Linux?</h3>
        <p>For directories, the three permission bits have slightly different meanings than for regular files. Read permission allows listing the contents of the directory. Write permission allows creating, renaming, or deleting files within it. Execute permission allows entering the directory with <code>cd</code> and accessing files inside it. A directory set to <code>755</code> lets anyone browse and enter it, but only the owner can add or remove files. Without execute permission on a directory, users cannot access any files inside it even if those files have open permissions.</p>
      </section>
      <RelatedTools current="/chmod-calculator" />
    </div>
  );
}

export default ChmodCalculator;
