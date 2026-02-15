import { useMemo, useState } from 'react';
import Seo from '../components/Seo';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const { matches, highlighted, error } = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: escapeHtml(testString), error: '' };
    try {
      const regex = new RegExp(pattern, flags);
      const found = [];
      let match;
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          found.push({ text: match[0], index: match.index, groups: match.slice(1) });
          if (!match[0]) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) found.push({ text: match[0], index: match.index, groups: match.slice(1) });
      }
      let html;
      if (found.length > 0) {
        const parts = [];
        let lastIndex = 0;
        found.forEach((m) => {
          if (m.index > lastIndex) parts.push(escapeHtml(testString.slice(lastIndex, m.index)));
          parts.push(`<mark class="regex-match">${escapeHtml(m.text)}</mark>`);
          lastIndex = m.index + m.text.length;
        });
        if (lastIndex < testString.length) parts.push(escapeHtml(testString.slice(lastIndex)));
        html = parts.join('');
      } else {
        html = escapeHtml(testString);
      }
      return { matches: found, highlighted: html, error: '' };
    } catch (e) {
      return { matches: [], highlighted: escapeHtml(testString), error: e.message };
    }
  }, [pattern, flags, testString]);

  return (
    <div>
      <Seo title="Regex Tester - Test Regular Expressions Online" description="Free online regex tester. Test regular expressions against any text with real-time highlighting, match details, and capture groups." />
      <h1>Regex Tester</h1>
      <p className="subtitle">Test regular expressions with real-time match highlighting.</p>

      <div className="form">
        <div className="input-row">
          <div className="input-group" style={{ flex: 3 }}>
            <label>Pattern</label>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[A-Za-z]+" spellCheck={false} style={{ fontFamily: 'Consolas, monospace' }} />
          </div>
          <div className="input-group" style={{ flex: 1, minWidth: '80px' }}>
            <label>Flags</label>
            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" spellCheck={false} style={{ fontFamily: 'Consolas, monospace' }} />
          </div>
        </div>
        <div className="input-group">
          <label>Test String</label>
          <textarea className="word-textarea code-textarea" value={testString} onChange={(e) => setTestString(e.target.value)} rows={6} placeholder="Enter text to test against..." spellCheck={false} />
        </div>
      </div>

      {error && <p className="error" style={{ marginTop: '0.5rem' }}>{error}</p>}

      {testString && pattern && !error && (
        <>
          <div className="converted-output" style={{ marginTop: '1rem' }}>
            <div className="output-header">
              <strong>Matches: {matches.length}</strong>
            </div>
            <div className="regex-highlighted" dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>

          {matches.length > 0 && (
            <div className="regex-matches">
              {matches.map((m, i) => (
                <div key={i} className="regex-match-item">
                  <span className="regex-match-index">#{i + 1}</span>
                  <code>{m.text}</code>
                  <span className="regex-match-pos">index {m.index}</span>
                  {m.groups.length > 0 && <span className="regex-match-groups">groups: {m.groups.join(', ')}</span>}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <section className="info-section">
        <h2>What are Regular Expressions?</h2>
        <p>Regular expressions (regex) are patterns used to match character combinations in strings. They are used in programming, text editors, and command-line tools for searching, replacing, and validating text.</p>

        <h2>Common Patterns</h2>
        <ul>
          <li><strong>Email</strong> — [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;</li>
          <li><strong>Phone</strong> — \d&#123;3&#125;[-.]?\d&#123;3&#125;[-.]?\d&#123;4&#125;</li>
          <li><strong>URL</strong> — https?:\/\/[^\s]+</li>
          <li><strong>IP Address</strong> — \d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;</li>
        </ul>
      </section>
    </div>
  );
}

export default RegexTester;
