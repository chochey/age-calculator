import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']);

function formatHtml(html, indentStr = '  ') {
  // Tokenize: split into tags and text
  const tokens = [];
  const regex = /(<\/?[^>]+?>)/g;
  let last = 0;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match.index > last) {
      const text = html.substring(last, match.index).trim();
      if (text) tokens.push({ type: 'text', value: text });
    }
    tokens.push({ type: 'tag', value: match[1] });
    last = regex.lastIndex;
  }
  if (last < html.length) {
    const text = html.substring(last).trim();
    if (text) tokens.push({ type: 'text', value: text });
  }

  let level = 0;
  const lines = [];

  tokens.forEach((token) => {
    if (token.type === 'text') {
      lines.push(indentStr.repeat(level) + token.value);
      return;
    }

    const tag = token.value;
    // Comment
    if (tag.startsWith('<!--')) {
      lines.push(indentStr.repeat(level) + tag);
      return;
    }
    // Doctype
    if (tag.startsWith('<!')) {
      lines.push(indentStr.repeat(level) + tag);
      return;
    }
    // Closing tag
    if (tag.startsWith('</')) {
      level = Math.max(0, level - 1);
      lines.push(indentStr.repeat(level) + tag);
      return;
    }
    // Self-closing tag
    if (tag.endsWith('/>')) {
      lines.push(indentStr.repeat(level) + tag);
      return;
    }
    // Void element
    const nameMatch = tag.match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
    const tagName = nameMatch ? nameMatch[1].toLowerCase() : '';
    if (VOID_ELEMENTS.has(tagName)) {
      lines.push(indentStr.repeat(level) + tag);
      return;
    }
    // Opening tag
    lines.push(indentStr.repeat(level) + tag);
    level++;
  });

  return lines.join('\n');
}

function minifyHtml(html) {
  return html
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const beautify = () => {
    if (!input.trim()) return;
    setOutput(formatHtml(input));
  };
  const minify = () => {
    if (!input.trim()) return;
    setOutput(minifyHtml(input));
  };
  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = output ? output.split('\n').length : 0;
  const size = output ? formatBytes(new Blob([output]).size) : '';

  return (
    <div>
      <Seo title="HTML Formatter - Beautify & Minify HTML Online" description="Free online HTML formatter and beautifier. Format messy HTML with proper indentation, or minify it for production. No data sent to any server." faqs={[{ q: 'How does the HTML formatter handle indentation?', a: 'The formatter parses your HTML into individual tags and text nodes, then rebuilds the output with consistent indentation. Each opening tag increases the indent level by one step, and each closing tag decreases it. Void elements (such as br, img, input, hr, meta, and link) do not change the indent level because they cannot have children. Self-closing tags written with a trailing slash are also handled correctly. The result is a clean, hierarchical view of your document structure that makes it easy to see parent-child relationships at a glance.' }, { q: 'Does minifying HTML affect how the page renders?', a: 'In almost all cases, minified HTML renders identically to the original. The minifier removes extra whitespace and line breaks between tags, which browsers already ignore when rendering. However, whitespace inside pre and code elements is significant, so you should review those sections after minifying. For general page markup such as divs, paragraphs, headings, lists, and tables, minification is completely safe and can reduce file size noticeably on large pages.' }, { q: 'Is my HTML data processed on a server?', a: 'No. The formatting and minification logic runs entirely in your browser using JavaScript. Your HTML never leaves your device. This means you can safely paste HTML that contains internal markup, draft content, or any other sensitive material without worrying about it being stored or transmitted. You can confirm this by opening your browser developer tools and checking the Network tab while using the tool.' }]} />
      <h1>HTML Formatter</h1>
      <p className="subtitle">Beautify messy HTML with proper indentation, or minify it for production.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder="Paste your HTML here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        spellCheck={false}
      />

      <div className="json-buttons" style={{ marginTop: '0.75rem' }}>
        <button onClick={beautify} className="form-btn">Beautify</button>
        <button onClick={minify} className="form-btn secondary">Minify</button>
      </div>

      {output && (
        <div className="converted-output" style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Result</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.88rem', color: '#555' }}>{lineCount} lines &middot; {size}</span>
              <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
            </div>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={12} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the HTML Formatter</h2>
        <p>Paste your raw or messy HTML into the text area above and click "Beautify" to reformat it with clean, consistent indentation. Each nested element is indented one level deeper than its parent, making the document structure immediately visible. If you need a compact version for production deployment or embedding, click "Minify" to strip all unnecessary whitespace and collapse the markup onto as few characters as possible. Once the result appears, the tool shows the line count and file size so you can gauge the impact of formatting or minification. Click "Copy" to send the output to your clipboard. Everything runs locally in your browser, and no data is sent to any server.</p>

        <h2>Why Format HTML?</h2>
        <p>Well-formatted HTML is essential for productive web development. When markup is properly indented, developers can instantly identify which elements are nested inside others, spot unclosed tags, and understand the overall page layout without mentally parsing a wall of text. During code reviews, clean indentation highlights structural changes and makes it easy to leave targeted comments on specific sections. Teams that enforce consistent HTML formatting in their projects spend less time debating style and more time shipping features.</p>
        <p>Minification serves the opposite purpose. By removing whitespace, line breaks, and unnecessary characters, minified HTML is smaller in file size and faster to transfer over the network. While modern compression algorithms like gzip and Brotli already reduce transfer size significantly, pre-minified HTML still offers marginal gains and is a standard step in many production build pipelines. This tool lets you quickly minify a snippet without setting up a build tool.</p>

        <h3>How does the HTML formatter handle indentation?</h3>
        <p>The formatter parses your HTML into individual tags and text nodes, then rebuilds the output with consistent indentation. Each opening tag increases the indent level by one step, and each closing tag decreases it. Void elements (such as br, img, input, hr, meta, and link) do not change the indent level because they cannot have children. Self-closing tags written with a trailing slash are also handled correctly. The result is a clean, hierarchical view of your document structure that makes it easy to see parent-child relationships at a glance.</p>

        <h3>Does minifying HTML affect how the page renders?</h3>
        <p>In almost all cases, minified HTML renders identically to the original. The minifier removes extra whitespace and line breaks between tags, which browsers already ignore when rendering. However, whitespace inside pre and code elements is significant, so you should review those sections after minifying. For general page markup such as divs, paragraphs, headings, lists, and tables, minification is completely safe and can reduce file size noticeably on large pages.</p>

        <h3>Is my HTML data processed on a server?</h3>
        <p>No. The formatting and minification logic runs entirely in your browser using JavaScript. Your HTML never leaves your device. This means you can safely paste HTML that contains internal markup, draft content, or any other sensitive material without worrying about it being stored or transmitted. You can confirm this by opening your browser developer tools and checking the Network tab while using the tool.</p>
      </section>
      <RelatedTools current="/html-formatter" />
    </div>
  );
}

export default HtmlFormatter;
