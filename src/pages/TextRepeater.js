import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function getOutput(text, count, separator, customSep, addLineNumbers) {
  if (!text || count < 1) return '';
  const sep =
    separator === 'none' ? '' :
    separator === 'newline' ? '\n' :
    separator === 'space' ? ' ' :
    separator === 'comma' ? ', ' :
    customSep;
  const lines = Array.from({ length: count }, (_, i) => {
    const line = text;
    return addLineNumbers ? `${i + 1}. ${line}` : line;
  });
  return lines.join(sep);
}

function countWords(str) {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function TextRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState('newline');
  const [customSep, setCustomSep] = useState('-');
  const [addLineNumbers, setAddLineNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = getOutput(text, count, separator, customSep, addLineNumbers);
  const charCount = output.length;
  const wordCount = countWords(output);

  const handleCountChange = (e) => {
    const val = e.target.value;
    if (val === '') { setCount(''); return; }
    const num = Number(val);
    if (num < 1) setCount(1);
    else if (num > 10000) setCount(10000);
    else setCount(num);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Text Repeater – QuickCalcs" description="Free online text repeater. Repeat any text multiple times with custom separators. Copy the result instantly." />
      <h1>Text Repeater</h1>
      <p className="subtitle">Repeat any text multiple times with custom separators.</p>

      <div className="form">
        <div className="input-group">
          <label>Text to Repeat</label>
          <textarea
            className="word-textarea"
            placeholder="Type or paste the text you want to repeat..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Repeat Count</label>
            <input
              type="number"
              min="1"
              max="10000"
              value={count}
              onChange={handleCountChange}
              onBlur={() => { if (count === '' || count < 1) setCount(1); }}
            />
          </div>
          <div className="input-group">
            <label>Separator</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="select-input"
            >
              <option value="none">None</option>
              <option value="newline">Newline</option>
              <option value="space">Space</option>
              <option value="comma">Comma</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {separator === 'custom' && (
            <div className="input-group">
              <label>Custom Separator</label>
              <input
                type="text"
                value={customSep}
                onChange={(e) => setCustomSep(e.target.value)}
                placeholder="e.g. | or -"
              />
            </div>
          )}
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={addLineNumbers}
            onChange={(e) => setAddLineNumbers(e.target.checked)}
          />
          Add line numbers
        </label>
      </div>

      {output && (
        <>
          <div className="detail-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="detail-card">
              <span className="detail-value">{charCount.toLocaleString()}</span>
              <span className="detail-label">Characters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{wordCount.toLocaleString()}</span>
              <span className="detail-label">Words</span>
            </div>
          </div>

          <div className="converted-output">
            <div className="output-header">
              <strong>Result</strong>
              <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <textarea className="word-textarea" value={output} readOnly rows={12} />
          </div>
        </>
      )}

      <section className="info-section">
        <h2>About This Tool</h2>
        <p>The Text Repeater lets you duplicate any text a specified number of times. Whether you need to generate repeated strings for testing, fill a document with placeholder content, or create patterns, this tool handles it instantly in your browser.</p>

        <h2>How to Use</h2>
        <ul>
          <li>Enter or paste the text you want to repeat in the input box.</li>
          <li>Set the number of repetitions (1 to 10,000).</li>
          <li>Choose a separator: none, newline, space, comma, or a custom string.</li>
          <li>Optionally enable line numbers to prefix each repetition.</li>
          <li>Copy the result to your clipboard with one click.</li>
        </ul>

        <h2>Common Uses</h2>
        <ul>
          <li>Generating test data and placeholder text</li>
          <li>Creating repeated patterns for design or coding</li>
          <li>Building bulk content for spreadsheet cells</li>
          <li>Producing repeated strings for stress testing inputs</li>
        </ul>
      </section>
      <RelatedTools current="/text-repeater" />
    </div>
  );
}

export default TextRepeater;
