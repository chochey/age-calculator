import { useMemo, useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Regex Tester - Test Regular Expressions Online" description="Free online regex tester. Test regular expressions against any text with real-time highlighting, match details, and capture groups." faqs={[{ q: 'What do regex flags do?', a: 'Flags modify how the regex engine processes the pattern. The g (global) flag finds all matches rather than stopping at the first one. The i (case-insensitive) flag treats uppercase and lowercase letters as equivalent. The m (multiline) flag makes ^ and $ match the start and end of each line rather than the entire string. You can combine multiple flags, such as gim.' }, { q: 'What are capture groups and how do I use them?', a: 'Capture groups are created by wrapping part of your pattern in parentheses. When the regex matches, each group captures the text matched by that portion. For example, (\\w+)@(\\w+)\\.(\\w+) applied to "user@example.com" captures "user", "example", and "com" as three separate groups. This tester displays capture groups alongside each match so you can verify your extraction logic.' }, { q: 'Why does my pattern cause an infinite loop or freeze?', a: 'Certain patterns with nested quantifiers, such as (a+)+, can cause catastrophic backtracking where the engine tries an exponential number of paths. To avoid this, keep your quantifiers specific, use non-greedy versions (e.g., +? instead of +), and avoid nesting quantifiers inside groups that also have quantifiers.' }]} />
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
        <h2>How to Use This Regex Tester</h2>
        <ol>
          <li>Enter your regular expression pattern in the "Pattern" field. For example, type <code>\b[A-Z][a-z]+\b</code> to match capitalized words.</li>
          <li>Set the flags in the "Flags" field. The default is <code>g</code> (global), which finds all matches. You can add <code>i</code> for case-insensitive matching, <code>m</code> for multiline mode, or combine them like <code>gi</code>.</li>
          <li>Paste or type your test string in the text area below. Matches are highlighted in real time as you type.</li>
          <li>Review the match list underneath, which shows each match's text, its position (index) in the string, and any captured groups.</li>
        </ol>

        <h2>How Regular Expressions Work</h2>
        <p>A regular expression (regex) is a sequence of characters that defines a search pattern. The regex engine scans the input string from left to right, attempting to match the pattern at each position. Patterns can include literal characters like <code>abc</code>, character classes like <code>[0-9]</code> that match any digit, quantifiers like <code>+</code> (one or more) and <code>*</code> (zero or more), and anchors like <code>^</code> (start of line) and <code>$</code> (end of line). Parentheses create capture groups that extract specific portions of a match. For instance, the pattern <code>(\d&#123;4&#125;)-(\d&#123;2&#125;)-(\d&#123;2&#125;)</code> matches a date like "2025-03-15" and captures the year, month, and day in separate groups. This tester uses JavaScript's built-in RegExp engine, so the syntax is fully compatible with patterns you would use in JavaScript, TypeScript, and Node.js applications.</p>

        <h2>Common Regex Patterns</h2>
        <ul>
          <li><strong>Email</strong> — [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;</li>
          <li><strong>Phone (US)</strong> — \(?\d&#123;3&#125;\)?[-.\s]?\d&#123;3&#125;[-.\s]?\d&#123;4&#125;</li>
          <li><strong>URL</strong> — https?:\/\/[^\s]+</li>
          <li><strong>IP Address</strong> — \d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;</li>
          <li><strong>HTML Tag</strong> — &lt;([a-z]+)[^&gt;]*&gt;.*?&lt;\/\1&gt;</li>
        </ul>

        <h3>What do regex flags do?</h3>
        <p>Flags modify how the regex engine processes the pattern. The <code>g</code> (global) flag finds all matches rather than stopping at the first one. The <code>i</code> (case-insensitive) flag treats uppercase and lowercase letters as equivalent. The <code>m</code> (multiline) flag makes <code>^</code> and <code>$</code> match the start and end of each line rather than the entire string. You can combine multiple flags, such as <code>gim</code>.</p>

        <h3>What are capture groups and how do I use them?</h3>
        <p>Capture groups are created by wrapping part of your pattern in parentheses. When the regex matches, each group captures the text matched by that portion. For example, <code>(\w+)@(\w+)\.(\w+)</code> applied to "user@example.com" captures "user", "example", and "com" as three separate groups. This tester displays capture groups alongside each match so you can verify your extraction logic.</p>

        <h3>Why does my pattern cause an infinite loop or freeze?</h3>
        <p>Certain patterns with nested quantifiers, such as <code>(a+)+</code>, can cause catastrophic backtracking where the engine tries an exponential number of paths. To avoid this, keep your quantifiers specific, use non-greedy versions (e.g., <code>+?</code> instead of <code>+</code>), and avoid nesting quantifiers inside groups that also have quantifiers.</p>
      </section>
      <RelatedTools current="/regex-tester" />
    </div>
  );
}

export default RegexTester;
