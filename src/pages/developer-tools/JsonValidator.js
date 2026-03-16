import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function getJsonStats(obj, depth = 0) {
  let keys = 0;
  let maxDepth = depth;
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    const entries = Object.keys(obj);
    keys += entries.length;
    entries.forEach((k) => {
      const child = getJsonStats(obj[k], depth + 1);
      keys += child.keys;
      if (child.maxDepth > maxDepth) maxDepth = child.maxDepth;
    });
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => {
      const child = getJsonStats(item, depth + 1);
      keys += child.keys;
      if (child.maxDepth > maxDepth) maxDepth = child.maxDepth;
    });
  }
  return { keys, maxDepth };
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function JsonValidator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState(null); // { valid, message }
  const [stats, setStats] = useState(null);
  const [indent, setIndent] = useState('2');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    if (!input.trim()) {
      setStatus(null);
      setOutput('');
      setStats(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const indentValue = indent === 'tab' ? '\t' : Number(indent);
      const formatted = JSON.stringify(parsed, null, indentValue);
      const info = getJsonStats(parsed);
      setOutput(formatted);
      setStatus({ valid: true, message: 'Valid JSON' });
      setStats({
        keys: info.keys,
        depth: info.maxDepth,
        size: formatBytes(new Blob([input]).size)
      });
    } catch (err) {
      const msg = err.message;
      // Try to extract position info from the error message
      let line = null;
      const posMatch = msg.match(/position\s+(\d+)/i);
      if (posMatch) {
        const pos = Number(posMatch[1]);
        const before = input.substring(0, pos);
        line = (before.match(/\n/g) || []).length + 1;
      }
      const lineInfo = line ? ' (near line ' + line + ')' : '';
      setOutput('');
      setStatus({ valid: false, message: msg + lineInfo });
      setStats(null);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="JSON Validator - Validate & Format JSON Online" description="Free online JSON validator and formatter. Paste JSON to check for syntax errors with line numbers, then format with customizable indentation options." faqs={[{ q: 'What does the JSON validator check for?', a: 'The validator parses your input using the standard JSON specification (RFC 8259). It checks for correct syntax including properly quoted keys, valid string escaping, balanced brackets and braces, correct comma placement, and valid value types (strings, numbers, booleans, null, objects, and arrays). When a syntax error is found, the validator reports the error message along with the approximate line number where the problem occurs, making it easy to locate and fix the issue in large JSON documents.' }, { q: 'Does this tool send my JSON data to a server?', a: 'No. All validation and formatting happens entirely in your browser using JavaScript. Your JSON data never leaves your machine. This makes the tool safe to use with sensitive data such as API responses containing authentication tokens, configuration files with credentials, or any other private information. You can verify this by checking your browser\'s network tab while using the tool.' }, { q: 'What indentation options are available for formatting?', a: 'The formatter offers three indentation options: 2 spaces, 4 spaces, and tabs. Two-space indentation is the most common choice for JSON files in web development projects and is the default used by many JavaScript formatters. Four-space indentation provides more visual separation and is popular in Python ecosystems and configuration files. Tab indentation lets each developer configure their preferred width in their editor. All three options produce valid, well-formatted JSON that is easy to read and diff.' }]} />
      <h1>JSON Validator</h1>
      <p className="subtitle">Validate JSON syntax, view errors with line numbers, and format with custom indentation.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        spellCheck={false}
      />

      <div className="json-buttons" style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={validate} className="form-btn">Validate & Format</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem' }}>
          Indent:
          <select value={indent} onChange={(e) => setIndent(e.target.value)} style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tabs</option>
          </select>
        </label>
      </div>

      {status && (
        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '6px', background: status.valid ? '#e6f9e6' : '#fde8e8', color: status.valid ? '#1a7a1a' : '#b91c1c', fontWeight: 500, wordBreak: 'break-word' }}>
          {status.valid ? '\u2713 ' : '\u2717 '}{status.message}
        </div>
      )}

      {stats && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: '#555', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span>Keys: {stats.keys}</span>
          <span>Max depth: {stats.depth}</span>
          <span>Size: {stats.size}</span>
        </div>
      )}

      {output && (
        <div className="converted-output" style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Formatted JSON</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={12} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the JSON Validator</h2>
        <p>Paste your JSON into the text area above and click "Validate & Format." If the JSON is syntactically correct, the tool displays a green success banner along with the formatted output and basic statistics including the total number of keys, maximum nesting depth, and data size. If the JSON contains errors, a red banner shows the error message and the approximate line number where the problem was detected, so you can quickly jump to the right spot in your editor and fix it. Choose your preferred indentation (2 spaces, 4 spaces, or tabs) before formatting, then click "Copy" to send the result to your clipboard.</p>

        <h2>Why Validate JSON?</h2>
        <p>JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. APIs, configuration files, databases, and message queues all rely on well-formed JSON. A single misplaced comma, unquoted key, or trailing bracket can cause an entire API response to fail or a configuration file to be rejected by the application reading it. Manually scanning a large JSON document for syntax errors is tedious and error-prone. This validator instantly parses the full document and pinpoints the exact location of any syntax violation, saving you time and frustration during development and debugging.</p>
        <p>The formatter complements validation by restructuring valid JSON into a human-readable layout. Deeply nested objects and long arrays become much easier to understand when each level of nesting is clearly indented. Consistent formatting also improves version control diffs because each key-value pair sits on its own line, making it obvious what changed between commits.</p>

        <h3>What does the JSON validator check for?</h3>
        <p>The validator parses your input using the standard JSON specification (RFC 8259). It checks for correct syntax including properly quoted keys, valid string escaping, balanced brackets and braces, correct comma placement, and valid value types (strings, numbers, booleans, null, objects, and arrays). When a syntax error is found, the validator reports the error message along with the approximate line number where the problem occurs, making it easy to locate and fix the issue in large JSON documents.</p>

        <h3>Does this tool send my JSON data to a server?</h3>
        <p>No. All validation and formatting happens entirely in your browser using JavaScript. Your JSON data never leaves your machine. This makes the tool safe to use with sensitive data such as API responses containing authentication tokens, configuration files with credentials, or any other private information. You can verify this by checking your browser's network tab while using the tool.</p>

        <h3>What indentation options are available for formatting?</h3>
        <p>The formatter offers three indentation options: 2 spaces, 4 spaces, and tabs. Two-space indentation is the most common choice for JSON files in web development projects and is the default used by many JavaScript formatters. Four-space indentation provides more visual separation and is popular in Python ecosystems and configuration files. Tab indentation lets each developer configure their preferred width in their editor. All three options produce valid, well-formatted JSON that is easy to read and diff.</p>
      </section>
      <RelatedTools current="/json-validator" />
    </div>
  );
}

export default JsonValidator;
