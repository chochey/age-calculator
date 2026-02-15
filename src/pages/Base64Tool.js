import { useState } from 'react';

function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setError('Invalid input for ' + (mode === 'encode' ? 'encoding' : 'decoding'));
      setOutput('');
    }
  };

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <h1>Base64 Encoder / Decoder</h1>
      <p className="subtitle">Encode text to Base64 or decode Base64 back to text.</p>

      <div className="unit-toggle">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => { setMode('encode'); setOutput(''); setError(''); }}>Encode</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => { setMode('decode'); setOutput(''); setError(''); }}>Decode</button>
      </div>

      <textarea
        className="word-textarea code-textarea"
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        spellCheck={false}
      />

      <button onClick={process} className="form-btn" style={{ marginTop: '0.75rem' }}>
        {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
      </button>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

      {output && (
        <div className="converted-output" style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copy} className="copy-btn">Copy</button>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={6} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>What is Base64?</h2>
        <p>Base64 is a binary-to-text encoding scheme that represents binary data as ASCII characters. It's commonly used to embed images in HTML/CSS, encode email attachments, transmit data in URLs, and store binary data in JSON or XML.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Encoding images for inline use in HTML/CSS</li>
          <li>Transmitting binary data over text-based protocols</li>
          <li>Encoding API keys and tokens</li>
          <li>Data URIs in web development</li>
        </ul>
      </section>
    </div>
  );
}

export default Base64Tool;
