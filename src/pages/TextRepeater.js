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
        <h2>How to Use the Text Repeater</h2>
        <p>Type or paste the text you want to duplicate into the input box at the top. Set the number of repetitions using the "Repeat Count" field -- you can repeat text anywhere from 1 to 10,000 times. Choose a separator to control how each repetition is joined: "Newline" places each copy on its own line, "Space" joins them with a single space, "Comma" creates a comma-separated list, "None" concatenates everything without any gap, and "Custom" lets you define your own separator string such as a pipe character (|) or a dash (-). Enable the "Add line numbers" checkbox to prefix each repetition with a sequential number (1., 2., 3., etc.). The output preview and character/word counts update in real time. Click "Copy" to send the result to your clipboard.</p>

        <h2>How Text Repetition Works</h2>
        <p>This tool generates the repeated output entirely in your browser using JavaScript. It creates an array with the specified number of entries, each containing your original text. If line numbering is enabled, each entry is prefixed with its index. The array is then joined using your chosen separator string. For example, entering "Hello" with a count of 3 and a comma separator produces "Hello, Hello, Hello". Entering the same text with newline separation and line numbers produces:</p>
        <ul>
          <li>1. Hello</li>
          <li>2. Hello</li>
          <li>3. Hello</li>
        </ul>
        <p>Because processing happens locally, even large repetitions (up to 10,000 copies) are generated almost instantly with no server requests.</p>

        <h2>Practical Use Cases</h2>
        <ul>
          <li><strong>Software testing:</strong> Generate long strings to test input field character limits, database storage, or API payload sizes.</li>
          <li><strong>Spreadsheet population:</strong> Create comma-separated repeated values to paste into Excel or Google Sheets columns for quick prototyping.</li>
          <li><strong>Social media and messaging:</strong> Repeat emoji, phrases, or symbols for creative posts and messages.</li>
          <li><strong>Design mockups:</strong> Fill placeholder areas with repeated labels or sample text to visualize how content wraps and flows in a layout.</li>
          <li><strong>Code generation:</strong> Produce repeated code patterns, SQL insert rows, or configuration entries that follow a consistent structure.</li>
        </ul>

        <h3>Is there a limit to how many times I can repeat text?</h3>
        <p>The tool supports up to 10,000 repetitions per run. This limit ensures the browser remains responsive even with longer input text. For most practical purposes -- test data generation, content filling, or pattern creation -- 10,000 repetitions is more than sufficient.</p>

        <h3>Can I use multi-line text as input?</h3>
        <p>Yes. The input field is a full text area, so you can paste paragraphs, code blocks, or any multi-line content. Each repetition will include the entire block of text exactly as you entered it, with your chosen separator placed between each copy.</p>

        <h3>What happens when I choose a custom separator?</h3>
        <p>The custom separator option lets you type any string to place between each repetition. Common choices include pipe characters (|), dashes (-), semicolons (;), or even multi-character strings like " -- " or " | ". The separator is inserted between copies only, not before the first or after the last entry.</p>
      </section>
      <RelatedTools current="/text-repeater" />
    </div>
  );
}

export default TextRepeater;
