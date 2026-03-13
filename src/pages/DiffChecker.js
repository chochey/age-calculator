import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the Diff Checker</h2>
        <p>Paste the original version of your text into the left panel labeled "Original" and the modified version into the right panel labeled "Modified." Click the "Compare" button and the tool performs a line-by-line comparison, displaying the results below with color-coded highlighting. Lines that exist only in the modified text appear in green with a <code>+</code> prefix, lines removed from the original appear in red with a <code>-</code> prefix, and unchanged lines are shown without highlighting. A summary bar at the top reports the total counts of added, removed, and unchanged lines so you can gauge the scope of the changes at a glance.</p>

        <h2>How Line-by-Line Diffing Works</h2>
        <p>This diff checker splits both inputs on newline characters and walks through the two arrays in parallel, comparing each line at the same index. When lines match, they are marked as equal. When they differ, the original line is flagged as removed and the modified line is flagged as added. This approach is fast and intuitive for detecting edits in structured content where line positions remain roughly stable, such as source code, configuration files, CSV data, or prose with one sentence per line.</p>
        <p>For example, if line 5 of your original file reads <code>color: blue;</code> and you changed it to <code>color: red;</code> in the modified version, the diff output will show a red line removing <code>color: blue;</code> followed by a green line adding <code>color: red;</code>. If you inserted a completely new line, every subsequent line shifts down by one position, making the insertion and all following changes visible.</p>

        <h3>What types of content can I compare with this tool?</h3>
        <p>You can compare any plain-text content. Common uses include comparing two versions of source code (JavaScript, Python, HTML, CSS, SQL, and more), reviewing changes between configuration files (YAML, JSON, TOML, .env files), checking differences between database migration scripts, proofreading document drafts side by side, and verifying that a search-and-replace operation changed only what you intended. The tool treats input as raw text, so it works regardless of the language or format.</p>

        <h3>Does this diff checker send my data to a server?</h3>
        <p>No. The entire comparison runs locally in your browser using client-side JavaScript. Your text is never transmitted over the network, which makes it safe to compare sensitive content like private API keys in configuration files, proprietary source code, internal documentation, or personal notes. Once you close the page, the data is gone.</p>

        <h3>How is this different from git diff?</h3>
        <p>The <code>git diff</code> command uses a longest-common-subsequence algorithm (typically the Myers algorithm) to compute the minimal edit distance between two files, which produces highly optimized diffs. This browser-based tool uses a simpler positional comparison that is faster to run and easier to read for quick checks. It is ideal when you do not have a Git repository set up or when you want to compare two arbitrary text snippets, such as API responses, log output, or pasted content, without touching the command line.</p>
      </section>
      <RelatedTools current="/diff-checker" />
    </div>
  );
}

export default DiffChecker;
