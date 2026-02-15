import { useState } from 'react';
import Seo from '../components/Seo';

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
        <h2>About JSON Formatter</h2>
        <p>Paste any JSON string to validate, format with indentation, or minify it. The tool checks for syntax errors and shows you exactly where the problem is. Useful for debugging API responses, config files, or any JSON data.</p>

        <h2>Features</h2>
        <ul>
          <li>Validate JSON syntax with error messages</li>
          <li>Pretty-print with 2, 4, or 8 space indentation</li>
          <li>Minify JSON to a single line</li>
          <li>Copy formatted output to clipboard</li>
        </ul>
      </section>
    </div>
  );
}

export default JsonFormatter;
