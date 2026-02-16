import { useState } from 'react';
import Seo from '../components/Seo';

function computeDiff(a, b) {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const result = [];
  const max = Math.max(linesA.length, linesB.length);

  for (let i = 0; i < max; i++) {
    const la = i < linesA.length ? linesA[i] : undefined;
    const lb = i < linesB.length ? linesB[i] : undefined;

    if (la === lb) {
      result.push({ type: 'equal', line: la, num: i + 1 });
    } else {
      if (la !== undefined) result.push({ type: 'removed', line: la, num: i + 1 });
      if (lb !== undefined) result.push({ type: 'added', line: lb, num: i + 1 });
    }
  }
  return result;
}

function DiffChecker() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState(null);

  const compare = () => {
    setDiff(computeDiff(textA, textB));
  };

  const stats = diff ? {
    added: diff.filter((d) => d.type === 'added').length,
    removed: diff.filter((d) => d.type === 'removed').length,
    unchanged: diff.filter((d) => d.type === 'equal').length,
  } : null;

  return (
    <div>
      <Seo title="Diff Checker - Compare Two Texts Online" description="Free online diff checker. Compare two blocks of text side by side and see additions, deletions, and unchanged lines highlighted." />
      <h1>Diff Checker</h1>
      <p className="subtitle">Compare two texts and see the differences highlighted.</p>

      <div className="diff-inputs">
        <div className="diff-pane">
          <label className="diff-label">Original</label>
          <textarea
            className="word-textarea code-textarea"
            placeholder="Paste original text here..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={8}
            spellCheck={false}
          />
        </div>
        <div className="diff-pane">
          <label className="diff-label">Modified</label>
          <textarea
            className="word-textarea code-textarea"
            placeholder="Paste modified text here..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={8}
            spellCheck={false}
          />
        </div>
      </div>

      <button onClick={compare} className="form-btn" style={{ marginTop: '0.75rem' }}>Compare</button>

      {diff && stats && (
        <>
          <div className="results" style={{ marginTop: '1.25rem' }}>
            <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="detail-card" style={{ borderColor: '#22c55e', background: '#f0fdf4' }}>
                <span className="detail-value" style={{ color: '#16a34a' }}>+{stats.added}</span>
                <span className="detail-label">Added</span>
              </div>
              <div className="detail-card" style={{ borderColor: '#ef4444', background: '#fef2f2' }}>
                <span className="detail-value" style={{ color: '#dc2626' }}>-{stats.removed}</span>
                <span className="detail-label">Removed</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{stats.unchanged}</span>
                <span className="detail-label">Unchanged</span>
              </div>
            </div>
          </div>

          <div className="diff-output">
            {diff.map((d, i) => (
              <div key={i} className={`diff-line diff-${d.type}`}>
                <span className="diff-prefix">{d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}</span>
                <span>{d.line}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <section className="info-section">
        <h2>How the Diff Checker Works</h2>
        <p>Paste two versions of text and click Compare. The tool highlights lines that were added (green), removed (red), or unchanged. It works great for comparing code, configuration files, or any text content.</p>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Code reviews</strong> — compare two versions of a file</li>
          <li><strong>Document editing</strong> — see what changed between drafts</li>
          <li><strong>Config files</strong> — spot differences in server configs</li>
          <li><strong>Text comparison</strong> — find changes in any two text blocks</li>
        </ul>
      </section>
    </div>
  );
}

export default DiffChecker;
