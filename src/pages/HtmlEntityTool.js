import { useState } from 'react';
import Seo from '../components/Seo';

function encodeEntities(str) {
  return str.replace(/[&<>"']/g, (m) => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[m];
  });
}

function decodeEntities(str) {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

function HtmlEntityTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (mode === 'encode') {
      setOutput(encodeEntities(input));
    } else {
      setOutput(decodeEntities(input));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="HTML Entity Encoder & Decoder" description="Free online HTML entity encoder and decoder. Encode special characters to HTML entities or decode HTML entities back to text." />
      <h1>HTML Entity Encoder / Decoder</h1>
      <p className="subtitle">Encode special characters to HTML entities or decode them back.</p>

      <div className="unit-toggle">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => { setMode('encode'); setOutput(''); }}>Encode</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => { setMode('decode'); setOutput(''); }}>Decode</button>
      </div>

      <textarea
        className="word-textarea code-textarea"
        placeholder={mode === 'encode' ? 'Enter HTML to encode...' : 'Enter encoded entities to decode...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        spellCheck={false}
      />

      <button onClick={process} className="form-btn" style={{ marginTop: '0.75rem' }}>
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>

      {output && (
        <div className="converted-output" style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={5} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>What are HTML Entities?</h2>
        <p>HTML entities are special codes used to display reserved characters in HTML. For example, &lt; represents the less-than sign (&lt;) and &amp; represents the ampersand (&amp;). Encoding prevents browsers from interpreting text as HTML code.</p>

        <h2>Common Entities</h2>
        <ul>
          <li><strong>&amp;amp;</strong> → &amp; (ampersand)</li>
          <li><strong>&amp;lt;</strong> → &lt; (less than)</li>
          <li><strong>&amp;gt;</strong> → &gt; (greater than)</li>
          <li><strong>&amp;quot;</strong> → " (double quote)</li>
          <li><strong>&amp;#39;</strong> → ' (single quote)</li>
        </ul>
      </section>
    </div>
  );
}

export default HtmlEntityTool;
