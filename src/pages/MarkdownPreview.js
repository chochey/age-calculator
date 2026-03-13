import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the Markdown Preview Tool</h2>
        <p>Type or paste Markdown text into the editor on the left side. The rendered HTML preview updates in real time on the right, so you can see exactly how your content will look as you write. The editor comes preloaded with a sample document demonstrating headers, bold text, italics, links, lists, blockquotes, and horizontal rules. When you are happy with the output, click "Copy HTML" to copy the generated HTML markup to your clipboard, ready to paste into a blog post, email template, CMS editor, or any other context that accepts HTML.</p>

        <h2>Markdown Syntax Overview</h2>
        <p>Markdown was created by John Gruber in 2004 as a simple way to write formatted documents in plain text that can be converted to valid HTML. Its syntax is intentionally minimal: headers are marked with hash signs (<code># H1</code>, <code>## H2</code>, <code>### H3</code>), bold text uses double asterisks (<code>**bold**</code>), italic text uses single asterisks (<code>*italic*</code>), and you can combine them with triple asterisks (<code>***bold and italic***</code>). Links follow the pattern <code>[link text](url)</code>, images use <code>![alt text](image-url)</code>, and unordered list items begin with a hyphen or asterisk followed by a space. Blockquotes start with <code>&gt;</code>, inline code is wrapped in backticks, and horizontal rules are created with three hyphens (<code>---</code>). Strikethrough text uses double tildes (<code>~~deleted~~</code>).</p>
        <p>This tool supports all of these common Markdown elements and converts them to clean, semantic HTML. Because the conversion happens entirely in your browser, it is fast and private; your text is never sent to a server.</p>

        <h3>Where is Markdown commonly used?</h3>
        <p>Markdown has become the default writing format across a wide range of developer and content platforms. GitHub and GitLab use it for README files, issues, pull request descriptions, and wiki pages. Static site generators like Jekyll, Hugo, and Gatsby accept Markdown files as content sources. Documentation tools such as MkDocs, Docusaurus, and ReadTheDocs are built around Markdown. Note-taking applications like Obsidian, Notion, and Bear support Markdown input. Blogging platforms including Dev.to, Hashnode, and Ghost provide native Markdown editors. Even chat applications like Slack, Discord, and Microsoft Teams use Markdown-inspired syntax for message formatting.</p>

        <h3>What is the difference between Markdown and HTML?</h3>
        <p>HTML (HyperText Markup Language) is the standard markup language for web pages. It uses angle-bracket tags like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, and <code>&lt;a href="..."&gt;</code> to define structure and formatting. Markdown is a lightweight shorthand that converts to HTML. Writing <code>## My Heading</code> in Markdown produces <code>&lt;h2&gt;My Heading&lt;/h2&gt;</code> in HTML. Markdown is faster to write and easier to read in its raw form, while HTML offers full control over every element and attribute. For most content authoring tasks, Markdown provides enough formatting capability while being significantly less verbose.</p>

        <h3>Can I use HTML inside Markdown?</h3>
        <p>Yes. The original Markdown specification explicitly allows inline HTML. You can mix Markdown syntax with raw HTML tags when you need features Markdown does not support natively, such as tables with merged cells, embedded videos, or custom-styled elements. Most Markdown processors will pass HTML tags through unchanged. However, be aware that some platforms (like GitHub) sanitize HTML for security reasons, stripping tags like <code>&lt;script&gt;</code> and <code>&lt;style&gt;</code>. This preview tool focuses on Markdown-to-HTML conversion and renders the Markdown syntax; any raw HTML in your input will be entity-encoded for safe display.</p>
      </section>
      <RelatedTools current="/markdown-preview" />
    </div>
  );
}

export default MarkdownPreview;
