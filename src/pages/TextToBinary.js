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
        <p>Select "Text to Binary" mode to convert any text string into its binary representation, along with hexadecimal, octal, and decimal (ASCII) formats. Select "Binary to Text" mode to convert space-separated binary bytes back into readable text.</p>

        <h2>What is Binary?</h2>
        <p>Binary is a base-2 numeral system that uses only two digits: 0 and 1. Computers store and process all data in binary form. Each character in a text string is represented by a sequence of 8 binary digits (bits), known as a byte. For example, the letter "A" is represented as 01000001 in binary (ASCII value 65).</p>

        <h2>Number Representations</h2>
        <ul>
          <li><strong>Binary (Base-2)</strong> — Uses digits 0 and 1. Each ASCII character is 8 bits (1 byte).</li>
          <li><strong>Hexadecimal (Base-16)</strong> — Uses digits 0-9 and letters A-F. Compact representation of binary data, commonly used in programming and color codes.</li>
          <li><strong>Octal (Base-8)</strong> — Uses digits 0-7. Historically used in computing, still seen in Unix file permissions.</li>
          <li><strong>Decimal (Base-10)</strong> — Standard number system. Shows the ASCII code value for each character.</li>
        </ul>

        <h2>Common Use Cases</h2>
        <ul>
          <li>Understanding how text is stored in computer memory</li>
          <li>Debugging data encoding issues in software</li>
          <li>Learning about number systems and ASCII encoding</li>
          <li>Converting data for low-level programming tasks</li>
          <li>Educational exercises in computer science</li>
        </ul>
      </section>
      <RelatedTools current="/text-to-binary" />
    </div>
  );
}

export default TextToBinary;
