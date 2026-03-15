import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}

function toSnakeCase(str) {
  return str.replace(/\s+/g, '_').replace(/[A-Z]/g, (c) => '_' + c.toLowerCase()).replace(/^_/, '').replace(/_+/g, '_').toLowerCase();
}

function toKebabCase(str) {
  return str.replace(/\s+/g, '-').replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()).replace(/^-/, '').replace(/-+/g, '-').toLowerCase();
}

function alternatingCase(str) {
  return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
}

function CaseConverter() {
  const [text, setText] = useState('');
  const [converted, setConverted] = useState('');

  const apply = (fn) => setConverted(fn(text));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(converted);
  };

  return (
    <div>
      <Seo title="Case Converter - Change Text Case Online" description="Free online case converter. Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more." faqs={[{ q: 'Does the converter handle multiple sentences correctly?', a: 'Yes. The sentence case conversion detects sentence boundaries using punctuation marks (periods, exclamation marks, and question marks) and capitalizes the first letter following each one. For multi-sentence input, each sentence will begin with a capital letter while the rest remains lowercase.' }, { q: 'How does camelCase handle special characters and numbers?', a: 'The camelCase converter strips non-alphanumeric characters and treats them as word boundaries. For example, "user-first-name" becomes "userFirstName" and "item_count_2" becomes "itemCount2". Numbers are kept in place but do not trigger capitalization of the following letter.' }, { q: 'Can I convert programming variable names between formats?', a: 'Absolutely. This is one of the most common use cases. Paste a camelCase variable like "getUserProfile" and click "snake_case" to get "get_user_profile", or click "kebab-case" to get "get-user-profile". This is especially handy when migrating code between languages with different naming conventions.' }]} />
      <h1>Case Converter</h1>
      <p className="subtitle">Convert text between uppercase, lowercase, title case, and more.</p>

      <textarea
        className="word-textarea"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />

      <div className="case-buttons">
        <button onClick={() => apply((t) => t.toUpperCase())}>UPPERCASE</button>
        <button onClick={() => apply((t) => t.toLowerCase())}>lowercase</button>
        <button onClick={() => apply(toTitleCase)}>Title Case</button>
        <button onClick={() => apply(toSentenceCase)}>Sentence case</button>
        <button onClick={() => apply(toCamelCase)}>camelCase</button>
        <button onClick={() => apply(toSnakeCase)}>snake_case</button>
        <button onClick={() => apply(toKebabCase)}>kebab-case</button>
        <button onClick={() => apply(alternatingCase)}>aLtErNaTiNg</button>
      </div>

      {converted && (
        <div className="converted-output">
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copyToClipboard} className="copy-btn">Copy</button>
          </div>
          <textarea className="word-textarea" value={converted} readOnly rows={6} />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Case Converter</h2>
        <ol>
          <li>Type or paste your text into the input area. It can be a single word, a sentence, a full paragraph, or a variable name you want to reformat.</li>
          <li>Click one of the eight conversion buttons to transform your text. For example, clicking "UPPERCASE" converts "hello world" to "HELLO WORLD", while clicking "camelCase" converts it to "helloWorld".</li>
          <li>The converted result appears below the buttons. Click "Copy" to copy it to your clipboard.</li>
          <li>To try a different conversion, simply click another button. The tool always converts from your original input, so you can compare different formats without re-entering your text.</li>
        </ol>

        <h2>Understanding Text Case Formats</h2>
        <p>Text case refers to the pattern of uppercase and lowercase letters in a string. Different contexts call for different conventions. In everyday writing, sentence case and title case are the standards for readability. In programming, variable naming conventions vary by language and framework. JavaScript and Java developers typically use camelCase for variables and functions, while Python developers prefer snake_case. CSS class names and URL slugs often use kebab-case because hyphens are URL-safe and readable. This tool handles all these transformations instantly, saving you from manual retyping or writing one-off conversion scripts. The conversions work by analyzing word boundaries, splitting your text into individual tokens, and reassembling them according to the rules of each format.</p>

        <h2>Available Conversions</h2>
        <ul>
          <li><strong>UPPERCASE</strong> — Every letter is capitalized. Useful for acronyms, constants, and emphasis.</li>
          <li><strong>lowercase</strong> — Every letter is lowercased. Useful as a starting point for further transformations.</li>
          <li><strong>Title Case</strong> — The first letter of every word is capitalized. Standard for headings, book titles, and proper nouns.</li>
          <li><strong>Sentence case</strong> — Only the first letter after a sentence-ending punctuation mark is capitalized. Natural for body text and paragraphs.</li>
          <li><strong>camelCase</strong> — Words are joined with no separator and each word after the first is capitalized. The standard for JavaScript, TypeScript, and Java variables.</li>
          <li><strong>snake_case</strong> — Words are joined with underscores and all letters are lowercase. Standard in Python, Ruby, and SQL column names.</li>
          <li><strong>kebab-case</strong> — Words are joined with hyphens and all letters are lowercase. Used for CSS classes, URL slugs, and CLI flags.</li>
          <li><strong>aLtErNaTiNg CaSe</strong> — Letters alternate between lowercase and uppercase. A playful format often used in memes and informal communication.</li>
        </ul>

        <h3>Does the converter handle multiple sentences correctly?</h3>
        <p>Yes. The sentence case conversion detects sentence boundaries using punctuation marks (periods, exclamation marks, and question marks) and capitalizes the first letter following each one. For multi-sentence input, each sentence will begin with a capital letter while the rest remains lowercase.</p>

        <h3>How does camelCase handle special characters and numbers?</h3>
        <p>The camelCase converter strips non-alphanumeric characters and treats them as word boundaries. For example, "user-first-name" becomes "userFirstName" and "item_count_2" becomes "itemCount2". Numbers are kept in place but do not trigger capitalization of the following letter.</p>

        <h3>Can I convert programming variable names between formats?</h3>
        <p>Absolutely. This is one of the most common use cases. Paste a camelCase variable like "getUserProfile" and click "snake_case" to get "get_user_profile", or click "kebab-case" to get "get-user-profile". This is especially handy when migrating code between languages with different naming conventions.</p>
      </section>
      <RelatedTools current="/case-converter" />
    </div>
  );
}

export default CaseConverter;
