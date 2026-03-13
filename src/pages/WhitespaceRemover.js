import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function cleanWhitespace(text, options) {
  if (!text) return '';
  let result = text;

  if (options.trimLines) {
    result = result.split('\n').map((line) => line.trim()).join('\n');
  }

  if (options.trimEdges) {
    result = result.trim();
  }

  if (options.removeExtraSpaces) {
    result = result.replace(/[^\S\n]+/g, ' ');
  }

  if (options.removeBlankLines) {
    result = result.replace(/\n\s*\n/g, '\n');
  }

  if (options.removeLineBreaks) {
    result = result.replace(/\n/g, ' ').replace(/ {2,}/g, ' ');
  }

  return result;
}

function WhitespaceRemover() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    trimEdges: true,
    removeExtraSpaces: true,
    removeBlankLines: false,
    removeLineBreaks: false,
    trimLines: false,
  });

  const output = cleanWhitespace(text, options);
  const inputCount = text.length;
  const outputCount = output.length;
  const diff = inputCount - outputCount;

  const toggle = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Whitespace Remover – QuickCalcs" description="Free whitespace remover tool. Remove extra spaces, blank lines, and trim whitespace from text instantly." />
      <h1>Whitespace Remover</h1>
      <p className="subtitle">Clean up extra spaces, blank lines &amp; whitespace.</p>

      <div className="form">
        <div className="input-group">
          <label>Input Text</label>
          <textarea
            className="word-textarea"
            placeholder="Paste or type text with extra whitespace..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
          />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.trimEdges}
              onChange={() => toggle('trimEdges')}
            />
            Remove leading/trailing whitespace
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.removeExtraSpaces}
              onChange={() => toggle('removeExtraSpaces')}
            />
            Remove extra spaces (multiple to single)
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.removeBlankLines}
              onChange={() => toggle('removeBlankLines')}
            />
            Remove blank lines
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.removeLineBreaks}
              onChange={() => toggle('removeLineBreaks')}
            />
            Remove all line breaks
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.trimLines}
              onChange={() => toggle('trimLines')}
            />
            Trim each line
          </label>
        </div>
      </div>

      <div className="detail-grid" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="detail-card">
          <span className="detail-value">{inputCount.toLocaleString()}</span>
          <span className="detail-label">Input Characters</span>
        </div>
        <div className="detail-card">
          <span className="detail-value">{outputCount.toLocaleString()}</span>
          <span className="detail-label">Output Characters</span>
        </div>
        <div className="detail-card highlight">
          <span className="detail-value">{diff > 0 ? `-${diff.toLocaleString()}` : diff === 0 ? '0' : `+${Math.abs(diff).toLocaleString()}`}</span>
          <span className="detail-label">Difference</span>
        </div>
      </div>

      {text && (
        <div className="converted-output">
          <div className="output-header">
            <strong>Cleaned Output</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea className="word-textarea" value={output} readOnly rows={8} />
        </div>
      )}

      <RelatedTools current="/whitespace-remover" />

      <section className="info-section">
        <h2>How to Use the Whitespace Remover</h2>
        <p>Paste or type your text into the input area at the top of the page. The tool processes your text in real time as you type, with the cleaned result appearing in the output area below. Use the checkboxes to control exactly which types of whitespace are removed. "Remove leading/trailing whitespace" strips spaces from the very start and end of your entire text. "Remove extra spaces" collapses multiple consecutive spaces into a single one. "Remove blank lines" eliminates empty lines. "Remove all line breaks" merges everything into a single continuous block. "Trim each line" strips whitespace from the beginning and end of every individual line. You can enable multiple options at once. The character count display shows the original length, cleaned length, and exact number of characters removed. Click "Copy" to copy the cleaned output to your clipboard.</p>

        <h2>How the Whitespace Cleaning Works</h2>
        <p>The tool applies your selected cleaning operations in a specific order to produce predictable results. First, if "Trim each line" is enabled, every line is individually stripped of leading and trailing spaces and tabs. Next, the overall text edges are trimmed if that option is active. Then, extra spaces within lines are collapsed using a regular expression that matches consecutive non-newline whitespace and replaces it with a single space. Blank line removal targets sequences of two or more newline characters (with optional whitespace between them) and reduces them to a single newline. Finally, line break removal replaces all newlines with spaces and cleans up any resulting double spaces. All processing happens locally in your browser -- no data is ever sent to a server.</p>

        <h2>Cleaning Options Explained</h2>
        <ul>
          <li><strong>Remove leading/trailing whitespace</strong> -- Equivalent to the "trim" function in most programming languages. Strips all spaces, tabs, and newlines from the very beginning and end of the entire text block.</li>
          <li><strong>Remove extra spaces</strong> -- Collapses runs of two or more consecutive spaces (or tabs) into a single space character, while leaving line breaks intact. For example, "hello&nbsp;&nbsp;&nbsp;world" becomes "hello world".</li>
          <li><strong>Remove blank lines</strong> -- Detects lines that are completely empty or contain only whitespace and removes them. A paragraph with three blank lines between sentences is reduced to have just one line break between them.</li>
          <li><strong>Remove all line breaks</strong> -- Joins every line into one unbroken paragraph. Useful when text copied from a PDF or email has unwanted hard line breaks mid-sentence.</li>
          <li><strong>Trim each line</strong> -- Processes every line independently, removing any leading indentation and trailing spaces. Particularly useful for cleaning up code snippets or log file entries with inconsistent indentation.</li>
        </ul>

        <h3>Why does text copied from PDFs have so much extra whitespace?</h3>
        <p>PDF files store text in positioned blocks rather than as a continuous flow. When you copy text from a PDF, the operating system reconstructs the reading order and often inserts extra spaces, line breaks, and blank lines where the original layout had column breaks or page boundaries. This tool quickly normalizes that copied text back into clean, readable content.</p>

        <h3>Will this tool change the content of my text?</h3>
        <p>No. The whitespace remover only modifies space characters, tab characters, and line breaks. It never alters letters, numbers, punctuation, or any other visible content. Your words and sentences remain exactly as written -- only the invisible formatting between them is cleaned up.</p>

        <h3>Can I use this tool to clean up source code?</h3>
        <p>Yes, with some care. The "Trim each line" option is excellent for stripping trailing whitespace from code, which is a common linting rule in many projects. However, be cautious with "Remove extra spaces" on code that relies on specific indentation (like Python) or alignment. For most other languages, using "Trim each line" combined with "Remove blank lines" produces clean, consistent code formatting.</p>
      </section>
    </div>
  );
}

export default WhitespaceRemover;
