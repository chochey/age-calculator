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
        <h2>About This Tool</h2>
        <p>The Whitespace Remover cleans up messy text by stripping unnecessary spaces, blank lines, and other whitespace characters. It processes everything in real time directly in your browser -- nothing is sent to a server.</p>

        <h2>Available Options</h2>
        <ul>
          <li><strong>Remove leading/trailing whitespace</strong> -- Strips spaces and tabs from the very beginning and end of the entire text.</li>
          <li><strong>Remove extra spaces</strong> -- Collapses runs of multiple spaces into a single space, while preserving line breaks.</li>
          <li><strong>Remove blank lines</strong> -- Eliminates empty lines that contain only whitespace.</li>
          <li><strong>Remove all line breaks</strong> -- Merges every line into one continuous block of text.</li>
          <li><strong>Trim each line</strong> -- Removes leading and trailing whitespace from every individual line.</li>
        </ul>

        <h2>Common Uses</h2>
        <ul>
          <li>Cleaning up text copied from PDFs, emails, or web pages</li>
          <li>Normalizing code indentation and formatting</li>
          <li>Preparing text for data import or processing</li>
          <li>Removing accidental double spaces from documents</li>
          <li>Stripping trailing whitespace from source code</li>
        </ul>
      </section>
    </div>
  );
}

export default WhitespaceRemover;
