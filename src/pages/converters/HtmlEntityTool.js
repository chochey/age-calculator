import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="HTML Entity Encoder & Decoder" description="Free online HTML entity encoder and decoder. Encode special characters to HTML entities or decode HTML entities back to text." faqs={[{ q: 'When should I encode HTML entities?', a: 'You should encode entities whenever you insert dynamic or user-supplied text into an HTML document. This includes rendering database content on a web page, displaying form input back to the user, embedding text inside HTML attributes, and generating HTML email templates. Encoding prevents the browser from treating the text as active markup, which is the primary defense against reflected and stored XSS attacks. Most server-side frameworks and templating engines perform this encoding automatically, but it is essential to verify that encoding is applied consistently, especially when building raw HTML strings manually.' }, { q: 'What is the difference between named and numeric HTML entities?', a: 'Named entities use a human-readable label, like &amp; or &copy;, and are easier to recognize at a glance. Numeric entities use either a decimal code (&#38;) or a hexadecimal code (&#x26;) and can represent any Unicode character, even those without a named entity. Named entities are limited to the set defined in the HTML specification, while numeric entities can encode the full range of Unicode code points. In practice, named entities are preferred for common characters because of their readability, and numeric entities are used for less common symbols.' }, { q: 'Does this tool handle all Unicode characters?', a: 'The encoder targets the five characters that are syntactically significant in HTML: ampersand, less-than, greater-than, double quote, and single quote. These are the characters that cause parsing issues and security vulnerabilities when left unencoded. The decoder, on the other hand, can handle any valid HTML entity, including named entities, decimal numeric entities, and hexadecimal numeric entities, by leveraging the browser\'s built-in HTML parser. This means you can decode exotic entities like &hearts; or &#8364; just as easily as the common five.' }]} />
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
        <h2>How to Use the HTML Entity Encoder / Decoder</h2>
        <p>Select the mode you need using the toggle at the top: "Encode" converts special characters in your text into their corresponding HTML entity codes, while "Decode" reverses the process, turning entity codes back into readable characters. Paste or type your content into the text area and click the action button. The result appears below, ready to copy with a single click. This is useful any time you need to safely embed user-generated content in HTML, prepare text for display in a web page, or recover the original characters from an entity-encoded string.</p>

        <h2>What Are HTML Entities and Why Do They Matter?</h2>
        <p>HTML reserves certain characters for its own syntax. The angle brackets <code>&lt;</code> and <code>&gt;</code> define tags, the ampersand <code>&amp;</code> begins entity references, and double quotes <code>"</code> delimit attribute values. If these characters appear literally in page content, browsers may misinterpret them as markup, breaking the page layout or, worse, creating a cross-site scripting (XSS) vulnerability. HTML entities solve this problem by replacing each reserved character with a named or numeric code that the browser renders as the original character without treating it as markup.</p>
        <p>For example, writing <code>&amp;lt;</code> in your HTML source displays the less-than sign on screen. The five most commonly encoded characters and their entities are: <code>&amp;amp;</code> for the ampersand, <code>&amp;lt;</code> for less-than, <code>&amp;gt;</code> for greater-than, <code>&amp;quot;</code> for the double quote, and <code>&amp;#39;</code> for the single quote (apostrophe). Beyond these, HTML defines hundreds of named entities for symbols like <code>&amp;copy;</code> (copyright), <code>&amp;euro;</code> (euro sign), and <code>&amp;mdash;</code> (em dash).</p>

        <h3>When should I encode HTML entities?</h3>
        <p>You should encode entities whenever you insert dynamic or user-supplied text into an HTML document. This includes rendering database content on a web page, displaying form input back to the user, embedding text inside HTML attributes, and generating HTML email templates. Encoding prevents the browser from treating the text as active markup, which is the primary defense against reflected and stored XSS attacks. Most server-side frameworks and templating engines perform this encoding automatically, but it is essential to verify that encoding is applied consistently, especially when building raw HTML strings manually.</p>

        <h3>What is the difference between named and numeric HTML entities?</h3>
        <p>Named entities use a human-readable label, like <code>&amp;amp;</code> or <code>&amp;copy;</code>, and are easier to recognize at a glance. Numeric entities use either a decimal code (<code>&amp;#38;</code>) or a hexadecimal code (<code>&amp;#x26;</code>) and can represent any Unicode character, even those without a named entity. Named entities are limited to the set defined in the HTML specification, while numeric entities can encode the full range of Unicode code points. In practice, named entities are preferred for common characters because of their readability, and numeric entities are used for less common symbols.</p>

        <h3>Does this tool handle all Unicode characters?</h3>
        <p>The encoder targets the five characters that are syntactically significant in HTML: ampersand, less-than, greater-than, double quote, and single quote. These are the characters that cause parsing issues and security vulnerabilities when left unencoded. The decoder, on the other hand, can handle any valid HTML entity, including named entities, decimal numeric entities, and hexadecimal numeric entities, by leveraging the browser's built-in HTML parser. This means you can decode exotic entities like <code>&amp;hearts;</code> or <code>&amp;#8364;</code> just as easily as the common five.</p>
      </section>
      <RelatedTools current="/html-entity-encoder" />
    </div>
  );
}

export default HtmlEntityTool;
