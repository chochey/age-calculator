import { useState } from 'react';
import Seo from '../components/Seo';

function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setError('Invalid input for ' + (mode === 'encode' ? 'encoding' : 'decoding'));
      setOutput('');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="URL Encoder & Decoder" description="Free online URL encoder and decoder. Encode special characters for URLs or decode percent-encoded strings back to readable text." />
      <h1>URL Encoder / Decoder</h1>
      <p className="subtitle">Encode or decode URLs and query strings.</p>

      <div className="unit-toggle">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => { setMode('encode'); setOutput(''); setError(''); }}>Encode</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => { setMode('decode'); setOutput(''); setError(''); }}>Decode</button>
      </div>

      <textarea
        className="word-textarea code-textarea"
        placeholder={mode === 'encode' ? 'Enter text to URL-encode...' : 'Enter URL-encoded string to decode...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        spellCheck={false}
      />

      <button onClick={process} className="form-btn" style={{ marginTop: '0.75rem' }}>
        {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
      </button>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

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
        <h2>What is URL Encoding?</h2>
        <p>URL encoding (percent-encoding) replaces special characters with a percent sign followed by their hex code. For example, a space becomes %20 and an ampersand becomes %26. This ensures URLs are transmitted correctly over the internet.</p>

        <h2>When to Use URL Encoding</h2>
        <ul>
          <li>Passing special characters in URL query parameters</li>
          <li>Encoding file names with spaces or symbols</li>
          <li>Building API requests with dynamic values</li>
          <li>Fixing broken links with special characters</li>
        </ul>
      </section>
    </div>
  );
}

export default UrlEncoder;
