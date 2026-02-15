import { useState } from 'react';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}

function toSnakeCase(str) {
  return str.replace(/\s+/g, '_').replace(/[A-Z]/g, (c) => '_' + c.toLowerCase()).replace(/^_/, '').replace(/_+/g, '_').toLowerCase();
}

function toKebabCase(str) {
  return str.replace(/\s+/g, '-').replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()).replace(/^-/, '').replace(/-+/g, '-').toLowerCase();
}

function alternatingCase(str) {
  return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
}

function CaseConverter() {
  const [text, setText] = useState('');
  const [converted, setConverted] = useState('');

  const apply = (fn) => setConverted(fn(text));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(converted);
  };

  return (
    <div>
      <h1>Case Converter</h1>
      <p className="subtitle">Convert text between uppercase, lowercase, title case, and more.</p>

      <textarea
        className="word-textarea"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />

      <div className="case-buttons">
        <button onClick={() => apply((t) => t.toUpperCase())}>UPPERCASE</button>
        <button onClick={() => apply((t) => t.toLowerCase())}>lowercase</button>
        <button onClick={() => apply(toTitleCase)}>Title Case</button>
        <button onClick={() => apply(toSentenceCase)}>Sentence case</button>
        <button onClick={() => apply(toCamelCase)}>camelCase</button>
        <button onClick={() => apply(toSnakeCase)}>snake_case</button>
        <button onClick={() => apply(toKebabCase)}>kebab-case</button>
        <button onClick={() => apply(alternatingCase)}>aLtErNaTiNg</button>
      </div>

      {converted && (
        <div className="converted-output">
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copyToClipboard} className="copy-btn">Copy</button>
          </div>
          <textarea className="word-textarea" value={converted} readOnly rows={6} />
        </div>
      )}

      <section className="info-section">
        <h2>About Case Conversion</h2>
        <p>Quickly convert text between different cases. Useful for formatting titles, converting variable names between coding conventions, or fixing text that was accidentally typed in the wrong case.</p>

        <h2>Available Conversions</h2>
        <ul>
          <li><strong>UPPERCASE</strong> — All letters capitalized</li>
          <li><strong>lowercase</strong> — All letters lowercase</li>
          <li><strong>Title Case</strong> — First letter of each word capitalized</li>
          <li><strong>Sentence case</strong> — First letter of each sentence capitalized</li>
          <li><strong>camelCase</strong> — Common in JavaScript variable names</li>
          <li><strong>snake_case</strong> — Common in Python and database columns</li>
          <li><strong>kebab-case</strong> — Common in URLs and CSS class names</li>
        </ul>
      </section>
    </div>
  );
}

export default CaseConverter;
