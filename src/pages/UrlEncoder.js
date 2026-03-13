import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use This URL Encoder / Decoder</h2>
        <ol>
          <li>Select your mode: "Encode" to convert plain text into a URL-safe format, or "Decode" to convert a percent-encoded string back into readable text.</li>
          <li>Type or paste your input. For encoding, enter text like <code>hello world &amp; goodbye</code>. For decoding, paste a URL-encoded string like <code>hello%20world%20%26%20goodbye</code>.</li>
          <li>Click the action button to process. The result appears instantly below.</li>
          <li>Click "Copy" to copy the output to your clipboard for use in URLs, API calls, or code.</li>
        </ol>

        <h2>How URL Encoding Works</h2>
        <p>URLs can only contain a limited set of ASCII characters. When a URL includes characters outside this safe set, such as spaces, ampersands, question marks, or non-ASCII letters, they must be percent-encoded. Each unsafe character is replaced by a percent sign (%) followed by its two-digit hexadecimal byte value. For example, a space becomes <code>%20</code>, an ampersand becomes <code>%26</code>, and the equals sign becomes <code>%3D</code>. Unicode characters like accented letters are first encoded to their UTF-8 byte sequence, then each byte is percent-encoded individually. This tool uses JavaScript's built-in encodeURIComponent() for encoding and decodeURIComponent() for decoding, which handle the full Unicode range correctly. Note that encodeURIComponent encodes all special characters except <code>- _ . ! ~ * ' ( )</code>, making it the right choice for encoding query parameter values. It differs from encodeURI(), which leaves characters like <code>: / ? # &amp;</code> intact because they have structural meaning in a full URL.</p>

        <h2>Common URL Encoding Reference</h2>
        <ul>
          <li>Space — <code>%20</code> (or + in form submissions)</li>
          <li>Ampersand (&amp;) — <code>%26</code></li>
          <li>Equals (=) — <code>%3D</code></li>
          <li>Question mark (?) — <code>%3F</code></li>
          <li>Forward slash (/) — <code>%2F</code></li>
          <li>At sign (@) — <code>%40</code></li>
        </ul>

        <h3>When should I URL-encode my text?</h3>
        <p>You should encode any value that will be placed inside a URL query parameter, a form field, or a URL path segment that contains special characters. If you are building an API request and one of your parameters contains spaces, symbols, or non-English characters, encoding it prevents the URL from breaking or being misinterpreted by the server.</p>

        <h3>What is the difference between encodeURI and encodeURIComponent?</h3>
        <p>encodeURI is designed for encoding a complete URL and leaves structural characters like <code>: / ? # &amp;</code> untouched. encodeURIComponent is designed for encoding individual values within a URL and encodes everything except a handful of unreserved characters. This tool uses encodeURIComponent, which is the correct choice for encoding query string values and form data.</p>

        <h3>Can I use this tool to encode entire URLs?</h3>
        <p>This tool is best suited for encoding individual values or segments rather than full URLs. If you paste an entire URL like <code>https://example.com/search?q=hello world</code>, the colons and slashes will also be encoded, which is usually not what you want. Instead, encode only the parts that need it, such as the query parameter value "hello world", and construct the full URL yourself.</p>
      </section>
      <RelatedTools current="/url-encoder" />
    </div>
  );
}

export default UrlEncoder;
