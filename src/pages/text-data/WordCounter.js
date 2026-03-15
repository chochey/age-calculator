import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function analyze(text) {
  const trimmed = text.trim();
  if (!trimmed) return { words: 0, characters: text.length, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: '0 sec' };

  const words = trimmed.split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || 1;

  const mins = Math.floor(words / 200);
  const secs = Math.round((words % 200) / 200 * 60);
  const readingTime = mins > 0 ? `${mins} min ${secs} sec` : `${secs} sec`;

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
}

function WordCounter() {
  const [text, setText] = useState('');
  const stats = analyze(text);

  return (
    <div>
      <Seo title="Word Counter - Count Words & Characters" description="Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time instantly." faqs={[{ q: 'How accurate is the reading time estimate?', a: 'The estimate assumes a reading speed of 200 words per minute, which is the average for adult English readers consuming non-technical content. Technical writing, academic papers, or text in a second language may take 30-50% longer to read. Conversely, casual or familiar content may be read faster. Treat the estimate as a helpful approximation rather than an exact measurement.' }, { q: 'Does the counter handle different languages?', a: 'Yes, the word counter works with any language that uses spaces to separate words, including English, Spanish, French, German, and most European languages. For languages like Chinese, Japanese, or Thai that do not use spaces between words, the counter will treat the entire text as fewer, longer "words" since it relies on whitespace for word boundaries.' }, { q: 'Why is my character count different from what I see in Word or Google Docs?', a: 'Minor differences can occur because different tools handle line breaks and special characters differently. Some word processors count a line break as two characters (carriage return plus line feed), while browsers typically count it as one. The "characters without spaces" metric strips all whitespace types, giving you a consistent count regardless of formatting.' }]} />
      <h1>Word Counter</h1>
      <p className="subtitle">Count words, characters, sentences, and estimate reading time.</p>

      <div className="detail-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="detail-card">
          <span className="detail-value">{stats.words.toLocaleString()}</span>
          <span className="detail-label">Words</span>
        </div>
        <div className="detail-card">
          <span className="detail-value">{stats.characters.toLocaleString()}</span>
          <span className="detail-label">Characters</span>
        </div>
        <div className="detail-card">
          <span className="detail-value">{stats.charactersNoSpaces.toLocaleString()}</span>
          <span className="detail-label">Characters (no spaces)</span>
        </div>
        <div className="detail-card">
          <span className="detail-value">{stats.sentences.toLocaleString()}</span>
          <span className="detail-label">Sentences</span>
        </div>
        <div className="detail-card">
          <span className="detail-value">{stats.paragraphs.toLocaleString()}</span>
          <span className="detail-label">Paragraphs</span>
        </div>
        <div className="detail-card highlight">
          <span className="detail-value">{stats.readingTime}</span>
          <span className="detail-label">Reading Time</span>
        </div>
      </div>

      <textarea
        className="word-textarea"
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
      />

      <section className="info-section">
        <h2>How to Use This Word Counter</h2>
        <ol>
          <li>Type directly into the text area or paste text from any source such as a document, email, or webpage.</li>
          <li>The statistics update instantly as you type. The six counters above the text area show words, characters (total), characters (excluding spaces), sentences, paragraphs, and estimated reading time.</li>
          <li>Use the word count to verify you meet minimum or maximum length requirements for essays, articles, or social media posts.</li>
          <li>Use the reading time estimate to gauge how long it will take your audience to read your content.</li>
        </ol>

        <h2>How the Counting Works</h2>
        <p>This tool analyzes your text using several distinct methods for each metric. Words are counted by splitting the text on whitespace boundaries, so any sequence of non-space characters counts as one word. This matches how word processors like Microsoft Word and Google Docs count words. Character count includes every character you have typed, including spaces, punctuation, and line breaks. The "characters without spaces" count strips all whitespace to give you the pure text length, which is useful for platforms like Twitter/X where spaces may or may not count toward limits. Sentences are detected by counting terminal punctuation marks (periods, exclamation points, and question marks). Paragraphs are identified by looking for blocks of text separated by one or more blank lines. The reading time estimate divides your total word count by 200 words per minute, which is the widely accepted average silent reading speed for adult English speakers. Content with technical vocabulary or dense formatting may take longer to read in practice.</p>

        <h2>Common Uses for Word Counting</h2>
        <ul>
          <li>Meeting academic requirements such as 500-word essays or 3,000-word research papers</li>
          <li>Staying within character limits for platforms like Twitter/X (280 characters), LinkedIn posts (3,000 characters), or meta descriptions (155 characters)</li>
          <li>Estimating reading time before publishing blog posts or newsletters</li>
          <li>Tracking daily writing progress toward a word count goal</li>
          <li>Checking article length for SEO guidelines that recommend specific word counts for ranking</li>
        </ul>

        <h3>How accurate is the reading time estimate?</h3>
        <p>The estimate assumes a reading speed of 200 words per minute, which is the average for adult English readers consuming non-technical content. Technical writing, academic papers, or text in a second language may take 30-50% longer to read. Conversely, casual or familiar content may be read faster. Treat the estimate as a helpful approximation rather than an exact measurement.</p>

        <h3>Does the counter handle different languages?</h3>
        <p>Yes, the word counter works with any language that uses spaces to separate words, including English, Spanish, French, German, and most European languages. For languages like Chinese, Japanese, or Thai that do not use spaces between words, the counter will treat the entire text as fewer, longer "words" since it relies on whitespace for word boundaries.</p>

        <h3>Why is my character count different from what I see in Word or Google Docs?</h3>
        <p>Minor differences can occur because different tools handle line breaks and special characters differently. Some word processors count a line break as two characters (carriage return plus line feed), while browsers typically count it as one. The "characters without spaces" metric strips all whitespace types, giving you a consistent count regardless of formatting.</p>
      </section>
      <RelatedTools current="/word-counter" />
    </div>
  );
}

export default WordCounter;
