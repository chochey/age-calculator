import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const stats = (() => {
    if (!output || error) return null;
    try {
      const parsed = JSON.parse(input);
      const keys = typeof parsed === 'object' && parsed !== null
        ? (Array.isArray(parsed) ? parsed.length + ' items' : Object.keys(parsed).length + ' keys')
        : 'primitive value';
      return { inputSize: input.length, outputSize: output.length, structure: keys };
    } catch { return null; }
  })();

  return (
    <div>
      <Seo title="JSON Formatter & Validator" description="Free online JSON formatter and validator. Format, beautify, minify, and validate JSON data with syntax error detection." />
      <h1>JSON Formatter & Validator</h1>
      <p className="subtitle">Format, validate, and minify JSON data instantly.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder='Paste your JSON here... e.g. {"name": "John", "age": 30}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        spellCheck={false}
      />

      <div className="json-controls">
        <div className="indent-control">
          <label>Indent:</label>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>Tab (8)</option>
          </select>
        </div>
        <div className="json-buttons">
          <button onClick={format} className="form-btn">Format</button>
          <button onClick={minify} className="form-btn secondary">Minify</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {stats && (
        <div className="detail-grid" style={{ marginBottom: '1rem' }}>
          <div className="detail-card">
            <span className="detail-value">{stats.structure}</span>
            <span className="detail-label">Root Structure</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{stats.outputSize.toLocaleString()}</span>
            <span className="detail-label">Characters</span>
          </div>
        </div>
      )}

      {output && (
        <div className="converted-output">
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copyOutput} className="copy-btn">Copy</button>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={10} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This JSON Formatter</h2>
        <ol>
          <li>Paste your raw JSON into the text area. This can be a minified API response, a configuration file, or any valid JSON string such as <code>&#123;"name":"Jane","scores":[98,87,93]&#125;</code>.</li>
          <li>Choose your preferred indentation level from the dropdown: 2 spaces, 4 spaces, or 8-space tabs.</li>
          <li>Click "Format" to pretty-print the JSON with proper line breaks and indentation, making nested objects and arrays easy to read.</li>
          <li>Alternatively, click "Minify" to compress the JSON into a single line with all unnecessary whitespace removed, which is useful for reducing payload size.</li>
          <li>If your JSON contains a syntax error, the tool will display the exact error message so you can pinpoint and fix the issue.</li>
          <li>Click "Copy" to copy the formatted or minified result to your clipboard.</li>
        </ol>

        <h2>How JSON Formatting Works</h2>
        <p>JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. When APIs return JSON responses, the data is typically minified into a single line to save bandwidth. For example, <code>&#123;"users":[&#123;"id":1,"name":"Alice"&#125;,&#123;"id":2,"name":"Bob"&#125;]&#125;</code> is valid but difficult to read. Pretty-printing adds indentation and line breaks to reveal the hierarchical structure of the data without changing its content. This tool uses the browser's built-in JSON.parse() for validation and JSON.stringify() with a configurable indentation parameter for formatting. The root structure indicator tells you whether your JSON starts with an object (showing key count) or an array (showing item count), giving you a quick overview of the data shape.</p>

        <h2>When to Use a JSON Formatter</h2>
        <ul>
          <li>Debugging REST API responses during development</li>
          <li>Inspecting webhook payloads and configuration files</li>
          <li>Minifying JSON before embedding it in code or sending it over a network</li>
          <li>Validating JSON before importing it into a database or application</li>
        </ul>

        <h3>What counts as valid JSON?</h3>
        <p>Valid JSON must use double quotes around keys and string values. It supports objects, arrays, strings, numbers, booleans (true/false), and null. Trailing commas, single quotes, and comments are not allowed. For instance, <code>&#123;name: "Alice"&#125;</code> is invalid because the key is not quoted, while <code>&#123;"name": "Alice"&#125;</code> is correct.</p>

        <h3>What is the difference between formatting and minifying?</h3>
        <p>Formatting (pretty-printing) adds whitespace, indentation, and line breaks to make the JSON human-readable. Minifying does the opposite, stripping all unnecessary whitespace to produce the smallest possible string. Both operations preserve the data exactly as-is; only the visual presentation changes.</p>

        <h3>Can this tool handle large JSON files?</h3>
        <p>This formatter runs entirely in your browser, so performance depends on your device. It comfortably handles JSON payloads up to several megabytes. For extremely large files (10 MB or more), you may experience a brief delay while the browser parses and re-serializes the data.</p>
      </section>
      <RelatedTools current="/json-formatter" />
    </div>
  );
}

export default JsonFormatter;
