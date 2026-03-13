import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the Lorem Ipsum Generator</h2>
        <p>Select the amount and type of placeholder text you need using the controls above. Set the "Amount" field to your desired number (1 to 100) and choose the unit from the dropdown: "Paragraphs" generates full paragraphs of 3 to 6 sentences each, "Sentences" produces individual sentences of 8 to 19 words each, and "Words" outputs a simple word list. Click "Generate" to create the text, then use the "Copy" button to send it to your clipboard. You can generate new content as many times as you like -- each click produces a fresh, randomized arrangement of Lorem Ipsum words.</p>

        <h2>What Is Lorem Ipsum and Where Did It Come From?</h2>
        <p>Lorem Ipsum is dummy text that has been the printing and typesetting industry's standard placeholder since the 1500s. Its origins trace back to a passage from "De Finibus Bonorum et Malorum" (On the Ends of Good and Evil) by the Roman philosopher Cicero, written in 45 BC. An unknown printer scrambled sections of the Latin text to create a type specimen book, and the resulting nonsense text has been in continuous use for over five centuries. Because the text resembles natural language without conveying any meaning, it allows designers and developers to evaluate visual layout, font choices, and spacing without readers being distracted by the content itself.</p>

        <h2>Common Uses for Placeholder Text</h2>
        <ul>
          <li><strong>Website mockups:</strong> Fill page templates and wireframes with realistic-looking text before the actual copy is written, allowing stakeholders to focus on layout and structure.</li>
          <li><strong>UI/UX prototyping:</strong> Populate cards, modals, navigation menus, and form labels in design tools like Figma or Sketch to simulate a complete user interface.</li>
          <li><strong>Print layout design:</strong> Test magazine spreads, brochures, and book layouts with text that approximates the final word count and paragraph structure.</li>
          <li><strong>Font and typography testing:</strong> Compare how different typefaces, sizes, and line heights render across long blocks of content without needing to write original text.</li>
          <li><strong>Development testing:</strong> Populate database seed files, API responses, or template engines with bulk text to test rendering performance and responsive behavior.</li>
        </ul>

        <h3>Is Lorem Ipsum real Latin?</h3>
        <p>Partially. The original Lorem Ipsum passage is based on a genuine Latin text by Cicero, but it has been altered, scrambled, and padded with invented words over the centuries. Most of the individual words are real Latin vocabulary, but the sentences themselves do not form coherent meaning. This generator uses a curated word list drawn from the traditional Lorem Ipsum vocabulary to produce randomized, natural-looking paragraphs.</p>

        <h3>How many words are in a typical Lorem Ipsum paragraph?</h3>
        <p>A paragraph generated by this tool contains between 3 and 6 sentences, with each sentence averaging about 12 words. That means a single paragraph typically ranges from 36 to 72 words. This approximates the length of real-world body paragraphs in web content and print media, making it a reliable stand-in during the design process.</p>

        <h3>Should I use Lorem Ipsum or real content in my designs?</h3>
        <p>Lorem Ipsum is ideal for early-stage design work when the actual copy has not been written yet. It prevents stakeholders from fixating on wording during layout reviews. However, for final-stage designs and usability testing, real content is strongly recommended. Actual text reveals issues with character count, line length, and readability that placeholder text cannot expose. Use Lorem Ipsum as a starting point, then replace it with real content as soon as it becomes available.</p>
      </section>
      <RelatedTools current="/lorem-ipsum" />
    </div>
  );
}

export default LoremIpsum;
