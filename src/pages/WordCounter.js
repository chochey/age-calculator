import { useState } from 'react';

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
        <h2>How the Word Counter Works</h2>
        <p>Simply type or paste your text into the box above. The tool instantly counts words, characters (with and without spaces), sentences, and paragraphs. Reading time is estimated at 200 words per minute, which is the average adult reading speed.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Check essay or assignment word counts</li>
          <li>Stay within social media character limits</li>
          <li>Estimate reading time for blog posts</li>
          <li>Track writing progress</li>
        </ul>
      </section>
    </div>
  );
}

export default WordCounter;
