import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function textToBinary(text) {
  return text.split('').map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function textToHex(text) {
  return text.split('').map((char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

function textToOctal(text) {
  return text.split('').map((char) => char.charCodeAt(0).toString(8).padStart(3, '0')).join(' ');
}

function textToDecimal(text) {
  return text.split('').map((char) => char.charCodeAt(0).toString(10)).join(' ');
}

function binaryToText(binary) {
  const cleaned = binary.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  const bytes = cleaned.split(' ');
  let result = '';
  for (const byte of bytes) {
    if (!/^[01]{1,8}$/.test(byte)) {
      throw new Error(`Invalid binary byte: "${byte}". Each byte must be 1-8 binary digits (0s and 1s).`);
    }
    result += String.fromCharCode(parseInt(byte, 2));
  }
  return result;
}

function TextToBinary() {
  const [mode, setMode] = useState('textToBinary');
  const [input, setInput] = useState('');
  const [binaryOutput, setBinaryOutput] = useState('');
  const [hexOutput, setHexOutput] = useState('');
  const [octalOutput, setOctalOutput] = useState('');
  const [decimalOutput, setDecimalOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const convert = () => {
    setError('');
    setCopied('');

    if (!input.trim()) {
      setError('Please enter some text or binary data.');
      clearOutputs();
      return;
    }

    try {
      if (mode === 'textToBinary') {
        setBinaryOutput(textToBinary(input));
        setHexOutput(textToHex(input));
        setOctalOutput(textToOctal(input));
        setDecimalOutput(textToDecimal(input));
        setTextOutput('');
      } else {
        const text = binaryToText(input);
        setTextOutput(text);
        setBinaryOutput('');
        setHexOutput(textToHex(text));
        setOctalOutput(textToOctal(text));
        setDecimalOutput(textToDecimal(text));
      }
    } catch (e) {
      setError(e.message);
      clearOutputs();
    }
  };

  const clearOutputs = () => {
    setBinaryOutput('');
    setHexOutput('');
    setOctalOutput('');
    setDecimalOutput('');
    setTextOutput('');
  };

  const copy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput('');
    setError('');
    setCopied('');
    clearOutputs();
  };

  const hasResults = binaryOutput || hexOutput || octalOutput || decimalOutput || textOutput;

  return (
    <div>
      <Seo title="Text to Binary Converter - ASCII Text to Binary" description="Free text to binary converter. Convert text to binary, hex, octal, and decimal. Also convert binary back to text." />
      <h1>Text to Binary Converter</h1>
      <p className="subtitle">Convert text to binary, hex, octal, and decimal — or binary back to text.</p>

      <div className="unit-toggle">
        <button className={mode === 'textToBinary' ? 'active' : ''} onClick={() => handleModeChange('textToBinary')}>
          Text to Binary
        </button>
        <button className={mode === 'binaryToText' ? 'active' : ''} onClick={() => handleModeChange('binaryToText')}>
          Binary to Text
        </button>
      </div>

      <textarea
        className="word-textarea"
        placeholder={mode === 'textToBinary'
          ? 'Enter text to convert...\nExample: Hello World'
          : 'Enter binary to convert...\nExample: 01001000 01100101 01101100 01101100 01101111'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        spellCheck={false}
      />

      <button onClick={convert} className="form-btn" style={{ marginTop: '0.75rem' }}>
        {mode === 'textToBinary' ? 'Convert to Binary' : 'Convert to Text'}
      </button>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

      {hasResults && (
        <div className="hash-results" style={{ marginTop: '1.25rem' }}>
          {mode === 'binaryToText' && textOutput && (
            <div className="converted-output" style={{ marginBottom: '1rem' }}>
              <div className="output-header">
                <strong>Decoded Text</strong>
                <button onClick={() => copy('text', textOutput)} className="copy-btn">
                  {copied === 'text' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea className="word-textarea" value={textOutput} readOnly rows={3} spellCheck={false} />
            </div>
          )}

          {(mode === 'textToBinary' ? binaryOutput : hexOutput) && (
            <>
              {mode === 'textToBinary' && binaryOutput && (
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Binary</strong>
                    <button onClick={() => copy('binary', binaryOutput)} className="copy-btn">
                      {copied === 'binary' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <code className="hash-value">{binaryOutput}</code>
                </div>
              )}

              {hexOutput && (
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Hexadecimal</strong>
                    <button onClick={() => copy('hex', hexOutput)} className="copy-btn">
                      {copied === 'hex' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <code className="hash-value">{hexOutput}</code>
                </div>
              )}

              {octalOutput && (
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Octal</strong>
                    <button onClick={() => copy('octal', octalOutput)} className="copy-btn">
                      {copied === 'octal' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <code className="hash-value">{octalOutput}</code>
                </div>
              )}

              {decimalOutput && (
                <div className="hash-row">
                  <div className="hash-header">
                    <strong>Decimal (ASCII)</strong>
                    <button onClick={() => copy('decimal', decimalOutput)} className="copy-btn">
                      {copied === 'decimal' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <code className="hash-value">{decimalOutput}</code>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Text to Binary Converter</h2>
        <p>Choose your conversion direction using the toggle at the top. In "Text to Binary" mode, type or paste any text into the input area and click "Convert to Binary." The tool produces the binary representation along with hexadecimal, octal, and decimal (ASCII) equivalents for every character. For example, entering "Hi" produces binary 01001000 01101001, hex 48 69, octal 110 151, and decimal 72 105. In "Binary to Text" mode, paste a series of space-separated 8-bit binary bytes (e.g., 01001000 01100101 01101100 01101100 01101111) and click "Convert to Text" to decode them back into readable characters -- in this case, "Hello." Click "Copy" next to any output row to copy that specific format to your clipboard.</p>

        <h2>How Binary Encoding Works</h2>
        <p>Every character you type on a keyboard is stored internally as a number defined by the ASCII (American Standard Code for Information Interchange) table. The letter "A" has an ASCII value of 65, which is 01000001 in binary. The letter "a" is 97, or 01100001. A space character is 32 (00100000), and the digit "0" is 48 (00110000). This converter takes each character in your input string, looks up its ASCII code, and converts that code into the selected number base. Binary uses base-2 (digits 0 and 1), hexadecimal uses base-16 (digits 0-9 and A-F), octal uses base-8 (digits 0-7), and decimal uses the standard base-10 number system.</p>

        <h2>Number System Reference</h2>
        <ul>
          <li><strong>Binary (Base-2)</strong> -- The fundamental language of computers. Each character occupies 8 bits (1 byte). The word "Cat" becomes 01000011 01100001 01110100.</li>
          <li><strong>Hexadecimal (Base-16)</strong> -- A compact representation where each byte is expressed as two hex digits. "Cat" becomes 43 61 74. Hex is widely used in programming, memory addresses, and HTML color codes.</li>
          <li><strong>Octal (Base-8)</strong> -- Each byte is expressed using digits 0-7. "Cat" becomes 103 141 164. Octal was historically important in early computing and is still used in Unix file permission notation (e.g., chmod 755).</li>
          <li><strong>Decimal (Base-10)</strong> -- The standard number system used in everyday life. Shows the raw ASCII code for each character: "Cat" becomes 67 97 116.</li>
        </ul>

        <h3>What characters does this converter support?</h3>
        <p>This tool converts standard ASCII characters (codes 0-127), which include all English letters (uppercase and lowercase), digits 0-9, punctuation marks, and common symbols. Extended characters beyond basic ASCII may not convert correctly since the tool processes single-byte character codes using JavaScript's charCodeAt method.</p>

        <h3>How do I convert binary back to text?</h3>
        <p>Switch to "Binary to Text" mode using the toggle button. Paste your binary data as space-separated 8-bit groups (for example, 01001000 01100101 01101100 01101100 01101111). Click "Convert to Text" and the tool will parse each byte, convert it from binary to its decimal ASCII value, and map it to the corresponding character. The decoded text appears in the output area along with hex, octal, and decimal equivalents.</p>

        <h3>Why are there spaces between the binary bytes in the output?</h3>
        <p>Spaces are used to separate individual bytes for readability. Without spaces, a long binary string like 0100100001101001 would be very difficult to parse visually. Each group of 8 digits represents one character. When converting binary back to text, the tool uses these spaces to identify where one character ends and the next begins.</p>
      </section>
      <RelatedTools current="/text-to-binary" />
    </div>
  );
}

export default TextToBinary;
