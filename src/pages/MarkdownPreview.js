import { useState } from 'react';
import Seo from '../components/Seo';

function parseMarkdown(md) {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // headers
    .replace(/^######\s(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
    // bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%" />')
    // links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // horizontal rules
    .replace(/^---$/gm, '<hr />')
    // unordered lists
    .replace(/^-\s(.+)$/gm, '<li>$1</li>')
    // blockquotes
    .replace(/^&gt;\s(.+)$/gm, '<blockquote>$1</blockquote>')
    // line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');

  html = '<p>' + html + '</p>';
  html = html.replace(/<p><(h[1-6]|hr|li|blockquote)/g, '<$1');
  html = html.replace(/<\/(h[1-6]|hr|li|blockquote)><\/p>/g, '</$1>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  return html;
}

function MarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n## Features\n\n- Easy to use\n- Live preview\n- Free forever\n\n> This is a blockquote\n\nVisit [QuickCalc](https://quickcalcs.net) for more tools.\n\n---\n\nInline `code` looks like this.');
  const [copied, setCopied] = useState(false);

  const copyHtml = () => {
    navigator.clipboard.writeText(parseMarkdown(input));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Markdown Preview - Live Markdown Editor" description="Free online Markdown preview tool. Write Markdown and see the rendered HTML output in real time. Supports headers, bold, italic, links, lists, and more." />
      <h1>Markdown Preview</h1>
      <p className="subtitle">Write Markdown and see the rendered output live.</p>

      <div className="md-layout">
        <div className="md-pane">
          <div className="output-header">
            <strong>Markdown</strong>
          </div>
          <textarea
            className="word-textarea code-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            spellCheck={false}
          />
        </div>
        <div className="md-pane">
          <div className="output-header">
            <strong>Preview</strong>
            <button onClick={copyHtml} className="copy-btn">{copied ? 'Copied HTML!' : 'Copy HTML'}</button>
          </div>
          <div className="md-preview" dangerouslySetInnerHTML={{ __html: parseMarkdown(input) }} />
        </div>
      </div>

      <section className="info-section">
        <h2>What is Markdown?</h2>
        <p>Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It's widely used for README files, documentation, blogs, and forums like Reddit and GitHub.</p>

        <h2>Supported Syntax</h2>
        <ul>
          <li><strong>Headers</strong> — # H1, ## H2, ### H3</li>
          <li><strong>Emphasis</strong> — *italic*, **bold**, ***both***</li>
          <li><strong>Links</strong> — [text](url)</li>
          <li><strong>Lists</strong> — - item</li>
          <li><strong>Code</strong> — `inline code`</li>
          <li><strong>Blockquotes</strong> — &gt; quote</li>
          <li><strong>Horizontal rule</strong> — ---</li>
        </ul>
      </section>
    </div>
  );
}

export default MarkdownPreview;
