import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function compareLines(textA, textB) {
  const linesA = textA.split('\n');
  const linesB = textB.split('\n');
  const maxLen = Math.max(linesA.length, linesB.length);
  const results = [];
  let added = 0;
  let removed = 0;
  let unchanged = 0;

  for (let i = 0; i < maxLen; i++) {
    const a = i < linesA.length ? linesA[i] : undefined;
    const b = i < linesB.length ? linesB[i] : undefined;

    if (a === undefined) {
      results.push({ type: 'added', line: b, num: i + 1 });
      added++;
    } else if (b === undefined) {
      results.push({ type: 'removed', line: a, num: i + 1 });
      removed++;
    } else if (a === b) {
      results.push({ type: 'unchanged', line: a, num: i + 1 });
      unchanged++;
    } else {
      results.push({ type: 'removed', line: a, num: i + 1 });
      results.push({ type: 'added', line: b, num: i + 1 });
      removed++;
      added++;
    }
  }

  return { results, added, removed, unchanged };
}

function TextCompare() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState(null);

  const handleCompare = () => {
    if (!textA && !textB) return;
    setDiff(compareLines(textA, textB));
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setDiff(null);
  };

  return (
    <div>
      <Seo title="Compare Text Online - Find Differences Between Two Texts" description="Free online text comparison tool. Paste two texts side by side, compare them line by line, and instantly see additions, removals, and unchanged lines highlighted." faqs={[{ q: 'How does the text comparison work?', a: 'The tool splits both texts into individual lines and compares them position by position. If a line exists only in the second text, it is marked as added (green). If a line exists only in the first text, it is marked as removed (red). Lines that are identical in both texts are shown as unchanged. This line-by-line approach makes it easy to spot exactly where two versions of a document differ.' }, { q: 'Can I compare large documents with this tool?', a: 'Yes. The comparison runs entirely in your browser, so there is no file size limit imposed by a server. However, very large documents with tens of thousands of lines may take a moment to process and render. For best performance, keep documents under 10,000 lines. All text stays in your browser and is never sent to any server.' }, { q: 'What is the difference between this tool and a diff checker?', a: 'A diff checker typically uses algorithms like Myers diff to find the minimal set of changes between two texts, which is useful for code review. This text comparison tool takes a simpler line-by-line approach that is easier to read for general-purpose text like essays, emails, or articles. Both tools help you find differences, but this one prioritizes readability over algorithmic precision.' }]} />
      <h1>Compare Text Online</h1>
      <p className="subtitle">Paste two texts and instantly see the differences line by line.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Original Text</label>
          <textarea
            className="word-textarea"
            placeholder="Paste original text here..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={10}
          />
        </div>
        <div className="input-group">
          <label>Modified Text</label>
          <textarea
            className="word-textarea"
            placeholder="Paste modified text here..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={10}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button className="form-btn" onClick={handleCompare}>Compare</button>
        <button className="copy-btn" onClick={handleClear}>Clear</button>
      </div>

      {diff && (
        <>
          <div className="detail-grid" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#22c55e' }}>+{diff.added}</span>
              <span className="detail-label">Lines Added</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#ef4444' }}>-{diff.removed}</span>
              <span className="detail-label">Lines Removed</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{diff.unchanged}</span>
              <span className="detail-label">Lines Unchanged</span>
            </div>
          </div>

          <div className="converted-output">
            <div className="output-header">
              <strong>Comparison Results</strong>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap', padding: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
              {diff.results.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2px 8px',
                    backgroundColor:
                      r.type === 'added' ? 'rgba(34,197,94,0.12)' :
                      r.type === 'removed' ? 'rgba(239,68,68,0.12)' :
                      'transparent',
                    color:
                      r.type === 'added' ? '#22c55e' :
                      r.type === 'removed' ? '#ef4444' :
                      'inherit',
                    borderLeft:
                      r.type === 'added' ? '3px solid #22c55e' :
                      r.type === 'removed' ? '3px solid #ef4444' :
                      '3px solid transparent',
                  }}
                >
                  {r.type === 'added' ? '+ ' : r.type === 'removed' ? '- ' : '  '}{r.line}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <RelatedTools current="/text-compare" />

      <section className="info-section">
        <h2>How to Use the Text Comparison Tool</h2>
        <p>Paste your original text into the left text area and the modified version into the right text area. Click the "Compare" button to see the differences. The tool splits each text into lines and compares them one by one, highlighting additions in green and removals in red. Unchanged lines appear in the default text color. The statistics panel above the results shows totals for added, removed, and unchanged lines so you can quickly gauge how much has changed. Use the "Clear" button to reset both text areas and start a new comparison. All processing happens locally in your browser -- nothing is uploaded to any server.</p>

        <h2>How the Line-by-Line Comparison Works</h2>
        <p>The comparison algorithm takes a straightforward positional approach. It splits both texts on newline characters to produce two arrays of lines. It then iterates through both arrays simultaneously, comparing lines at the same index. If both lines match exactly, the line is marked unchanged. If the lines differ, the original line is marked as removed and the modified line is marked as added. If one text has more lines than the other, the extra lines are marked as additions or removals accordingly. This positional method is fast and produces output that is easy to scan visually. While it does not detect moved or reordered lines the way advanced diff algorithms do, it excels at showing clear, readable results for general text comparison tasks like proofreading documents, checking email drafts, or reviewing article revisions.</p>

        <h2>Common Uses for Text Comparison</h2>
        <ul>
          <li><strong>Proofreading edits</strong> -- Compare the original and edited versions of an essay, report, or article to see exactly what your editor changed. Green lines show new text and red lines show what was removed.</li>
          <li><strong>Checking email drafts</strong> -- Before sending, paste two versions of an important email to verify you made all intended changes and did not accidentally delete content.</li>
          <li><strong>Verifying copy-paste accuracy</strong> -- After copying text between applications, compare the source and destination to confirm nothing was lost or altered during the transfer.</li>
          <li><strong>Reviewing terms and policies</strong> -- When a service updates its terms of service or privacy policy, paste the old and new versions to find exactly what changed.</li>
          <li><strong>Comparing configuration files</strong> -- Quickly spot differences between two versions of a config file, settings export, or data file without installing specialized diff software.</li>
        </ul>

        <h3>How does the text comparison work?</h3>
        <p>The tool splits both texts into individual lines and compares them position by position. If a line exists only in the second text, it is marked as added (green). If a line exists only in the first text, it is marked as removed (red). Lines that are identical in both texts are shown as unchanged. This line-by-line approach makes it easy to spot exactly where two versions of a document differ.</p>

        <h3>Can I compare large documents with this tool?</h3>
        <p>Yes. The comparison runs entirely in your browser, so there is no file size limit imposed by a server. However, very large documents with tens of thousands of lines may take a moment to process and render. For best performance, keep documents under 10,000 lines. All text stays in your browser and is never sent to any server.</p>

        <h3>What is the difference between this tool and a diff checker?</h3>
        <p>A diff checker typically uses algorithms like Myers diff to find the minimal set of changes between two texts, which is useful for code review. This text comparison tool takes a simpler line-by-line approach that is easier to read for general-purpose text like essays, emails, or articles. Both tools help you find differences, but this one prioritizes readability over algorithmic precision.</p>
      </section>
    </div>
  );
}

export default TextCompare;
