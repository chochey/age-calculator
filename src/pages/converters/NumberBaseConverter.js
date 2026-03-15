import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function convert(value, fromBase) {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) return null;
  return {
    decimal: decimal.toString(10),
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    hex: decimal.toString(16).toUpperCase(),
  };
}

const bases = [
  { label: 'Decimal (10)', base: 10, id: 'decimal', placeholder: '255' },
  { label: 'Binary (2)', base: 2, id: 'binary', placeholder: '11111111' },
  { label: 'Octal (8)', base: 8, id: 'octal', placeholder: '377' },
  { label: 'Hexadecimal (16)', base: 16, id: 'hex', placeholder: 'FF' },
];

function NumberBaseConverter() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [copied, setCopied] = useState('');

  const result = input.trim() ? convert(input.trim(), fromBase) : null;

  const copy = (val, label) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <Seo title="Number Base Converter - Binary, Decimal, Hex, Octal" description="Free number base converter. Convert between binary, decimal, octal, and hexadecimal instantly. Enter a number in any base and see all conversions." faqs={[{ q: 'Why do programmers use hexadecimal instead of binary?', a: 'Binary strings get long quickly -- the number 255 requires eight binary digits (11111111) but only two hex digits (FF). Because 16 is a power of 2, each hex digit maps exactly to four binary bits, making conversion between the two trivial. This compactness is why hex is the standard for representing memory addresses, color codes (e.g., #FF5733), MAC addresses, and byte values in debugging tools.' }, { q: 'Where is octal (base 8) still used today?', a: 'Octal is most commonly seen in Unix and Linux file permissions. The permission string rwxr-xr-- translates to the octal number 754, where each digit represents the read, write, and execute rights for the owner, group, and others. Octal was also historically popular in early computing systems that used 12-bit or 36-bit words, where grouping bits in threes (matching octal digits) was more natural than grouping in fours.' }, { q: 'Can I convert numbers larger than 255?', a: 'Absolutely. This converter handles any non-negative integer supported by JavaScript, which means values up to 2^53 - 1 (9,007,199,254,740,991) will convert accurately across all four bases. Simply type a larger number and the tool produces the correct binary, octal, decimal, and hex representations instantly.' }]} />
      <h1>Number Base Converter</h1>
      <p className="subtitle">Convert between binary, decimal, octal, and hexadecimal.</p>

      <div className="unit-toggle" style={{ marginBottom: '0.75rem' }}>
        {bases.map((b) => (
          <button key={b.base} className={fromBase === b.base ? 'active' : ''} onClick={() => { setFromBase(b.base); setInput(''); }}>
            {b.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="word-textarea code-textarea"
        style={{ fontFamily: 'Consolas, monospace', fontSize: '1.1rem', padding: '0.75rem 1rem' }}
        placeholder={bases.find((b) => b.base === fromBase)?.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      {result && (
        <div className="base-results" style={{ marginTop: '1.25rem' }}>
          {bases.map((b) => (
            <div key={b.id} className="hash-row">
              <div className="hash-header">
                <strong>{b.label}</strong>
                <button onClick={() => copy(result[b.id], b.id)} className="copy-btn">
                  {copied === b.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value" style={{ fontSize: '1rem' }}>{result[b.id]}</code>
            </div>
          ))}
        </div>
      )}

      {input.trim() && !result && (
        <p className="error" style={{ marginTop: '0.75rem' }}>Invalid number for base {fromBase}</p>
      )}

      <section className="info-section">
        <h2>How to Use the Number Base Converter</h2>
        <p>
          Select the base of the number you are entering -- Decimal (10), Binary (2), Octal (8), or Hexadecimal (16) -- using the toggle buttons at the top. Type your number in the input field and all four conversions appear instantly below. Each result has a "Copy" button so you can paste the value directly into your code, documentation, or calculator. To convert a different number, simply clear the field and type a new one; to switch the input base, click a different toggle.
        </p>

        <h2>How Base Conversion Works</h2>
        <p>
          Every number system is positional -- each digit's value depends on its position. In decimal, the number 255 means 2x10{'\u00B2'} + 5x10{'\u00B9'} + 5x10{'\u2070'} = 200 + 50 + 5. To convert decimal 255 to binary, you repeatedly divide by 2 and record the remainders: 255/2 = 127 r1, 127/2 = 63 r1, 63/2 = 31 r1, and so on until you reach 0. Reading the remainders bottom-to-top gives <strong>11111111</strong>. For hexadecimal, divide by 16: 255/16 = 15 r15. Since 15 in hex is represented by F, decimal 255 = <strong>FF</strong> in hex.
        </p>
        <p>
          <strong>Worked example:</strong> Convert binary 10110 to decimal. From right to left the place values are 1, 2, 4, 8, 16. The bits are 0, 1, 1, 0, 1, so the sum is 0 + 2 + 4 + 0 + 16 = <strong>22 decimal</strong>. In octal that is <strong>26</strong>, and in hex it is <strong>16</strong>.
        </p>

        <h3>Why do programmers use hexadecimal instead of binary?</h3>
        <p>
          Binary strings get long quickly -- the number 255 requires eight binary digits (11111111) but only two hex digits (FF). Because 16 is a power of 2, each hex digit maps exactly to four binary bits, making conversion between the two trivial. This compactness is why hex is the standard for representing memory addresses, color codes (e.g., #FF5733), MAC addresses, and byte values in debugging tools.
        </p>

        <h3>Where is octal (base 8) still used today?</h3>
        <p>
          Octal is most commonly seen in Unix and Linux file permissions. The permission string rwxr-xr-- translates to the octal number 754, where each digit represents the read, write, and execute rights for the owner, group, and others. Octal was also historically popular in early computing systems that used 12-bit or 36-bit words, where grouping bits in threes (matching octal digits) was more natural than grouping in fours.
        </p>

        <h3>Can I convert numbers larger than 255?</h3>
        <p>
          Absolutely. This converter handles any non-negative integer supported by JavaScript, which means values up to 2^53 - 1 (9,007,199,254,740,991) will convert accurately across all four bases. Simply type a larger number and the tool produces the correct binary, octal, decimal, and hex representations instantly.
        </p>
      </section>
      <RelatedTools current="/number-base-converter" />
    </div>
  );
}

export default NumberBaseConverter;
