import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Base64 Encoder & Decoder" description="Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings back to plain text instantly." faqs={[{ q: 'Is Base64 the same as encryption?', a: 'No. Base64 is an encoding scheme, not an encryption method. It does not provide any security or confidentiality. Anyone can decode a Base64 string back to the original data without a key. If you need to protect sensitive information, use proper encryption algorithms such as AES or RSA before encoding.' }, { q: 'Why does Base64 output end with one or two equal signs?', a: 'The = characters are padding. Base64 processes input in groups of three bytes. If the input is not evenly divisible by three, padding is added: one = if there is one leftover byte, and == if there are two. For example, "A" (1 byte) encodes to "QQ==" and "AB" (2 bytes) encodes to "QUI=".' }, { q: 'Does this tool support Unicode text?', a: 'Yes. This tool properly handles Unicode characters including accented letters, emojis, and characters from non-Latin scripts. It first converts the text to UTF-8 byte sequences before applying Base64 encoding, ensuring that decoding accurately restores the original characters.' }]} />
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
        <h2>How to Use This Base64 Tool</h2>
        <ol>
          <li>Select the mode at the top: "Encode" to convert plain text into Base64, or "Decode" to convert a Base64 string back into readable text.</li>
          <li>Type or paste your input into the text area. For encoding, enter any plain text such as <code>Hello, World!</code>. For decoding, paste a valid Base64 string such as <code>SGVsbG8sIFdvcmxkIQ==</code>.</li>
          <li>Click the action button to process your input. The result appears below instantly.</li>
          <li>Click "Copy" to copy the output to your clipboard for use in your code, email, or configuration file.</li>
        </ol>

        <h2>What is Base64 Encoding?</h2>
        <p>Base64 is a binary-to-text encoding scheme that converts data into a string of 64 ASCII characters (A-Z, a-z, 0-9, +, and /) plus the padding character =. It works by taking every three bytes of input data and splitting them into four 6-bit groups, each mapped to one of the 64 characters. For example, the text "Hello" becomes "SGVsbG8=" in Base64. The trailing = sign is padding that appears when the input length is not a multiple of three bytes. This encoding increases the data size by roughly 33%, but guarantees that the output contains only printable ASCII characters that can safely travel through text-based protocols like HTTP, SMTP, and JSON.</p>

        <h2>Common Uses for Base64</h2>
        <ul>
          <li>Embedding small images directly in HTML or CSS using data URIs (e.g., <code>data:image/png;base64,iVBOR...</code>)</li>
          <li>Encoding email attachments in MIME format</li>
          <li>Transmitting binary data inside JSON or XML payloads</li>
          <li>Encoding authentication credentials in HTTP Basic Auth headers</li>
          <li>Storing binary blobs in text-only databases or configuration files</li>
        </ul>

        <h3>Is Base64 the same as encryption?</h3>
        <p>No. Base64 is an encoding scheme, not an encryption method. It does not provide any security or confidentiality. Anyone can decode a Base64 string back to the original data without a key. If you need to protect sensitive information, use proper encryption algorithms such as AES or RSA before encoding.</p>

        <h3>Why does Base64 output end with one or two equal signs?</h3>
        <p>The = characters are padding. Base64 processes input in groups of three bytes. If the input is not evenly divisible by three, padding is added: one = if there is one leftover byte, and == if there are two. For example, "A" (1 byte) encodes to "QQ==" and "AB" (2 bytes) encodes to "QUI=".</p>

        <h3>Does this tool support Unicode text?</h3>
        <p>Yes. This tool properly handles Unicode characters including accented letters, emojis, and characters from non-Latin scripts. It first converts the text to UTF-8 byte sequences before applying Base64 encoding, ensuring that decoding accurately restores the original characters.</p>
      </section>
      <RelatedTools current="/base64" />
    </div>
  );
}

export default Base64Tool;
