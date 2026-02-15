import { useState } from 'react';
import Seo from '../components/Seo';

const words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','porta','nibh','venenatis','cras','semper','auctor','neque','vitae','pellentesque','dignissim','suspendisse','interdum','posuere','faucibus','ornare','massa','eget','nunc','lobortis','mattis','aliquam','fringilla','purus','lacinia','leo','integer','feugiat','scelerisque','varius','morbi','blandit','cursus','risus','ultrices','gravida','dictum','fusce','placerat','orci'];

function generateSentence() {
  const len = 8 + Math.floor(Math.random() * 12);
  const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]);
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
  return sentence.join(' ') + '.';
}

function generateParagraph() {
  const count = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, generateSentence).join(' ');
}

function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result;
    if (type === 'paragraphs') {
      result = Array.from({ length: count }, generateParagraph).join('\n\n');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, generateSentence).join(' ');
    } else {
      const all = [];
      while (all.length < count) all.push(words[Math.floor(Math.random() * words.length)]);
      result = all.join(' ');
    }
    setOutput(result);
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="Lorem Ipsum Generator" description="Free Lorem Ipsum generator. Generate placeholder text as paragraphs, sentences, or words for your designs and layouts." />
      <h1>Lorem Ipsum Generator</h1>
      <p className="subtitle">Generate placeholder text for your designs and layouts.</p>

      <div className="form">
        <div className="input-row">
          <div className="input-group">
            <label>Amount</label>
            <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} />
          </div>
          <div className="input-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="select-input">
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
        </div>
        <button onClick={generate} className="form-btn">Generate</button>
      </div>

      {output && (
        <div className="converted-output">
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea className="word-textarea" value={output} readOnly rows={12} />
        </div>
      )}

      <section className="info-section">
        <h2>What is Lorem Ipsum?</h2>
        <p>Lorem Ipsum is placeholder text used in the design and publishing industry since the 1500s. It helps designers and developers visualize how text will look in a layout without being distracted by meaningful content.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Website mockups and wireframes</li>
          <li>Print layout previews</li>
          <li>UI/UX design prototypes</li>
          <li>Testing font sizes and line spacing</li>
        </ul>
      </section>
    </div>
  );
}

export default LoremIpsum;
