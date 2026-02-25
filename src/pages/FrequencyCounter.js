import { useState, useMemo } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const STOPWORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
  'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'is', 'am', 'are', 'was', 'were', 'been',
  'being', 'has', 'had', 'having', 'does', 'did', 'doing', 'shall', 'should',
  'may', 'might', 'must', 'need', 'dare', 'ought', 'used', 'very', 'own',
]);

function getWordFrequency(text, caseSensitive, ignoreStopwords) {
  if (!text.trim()) return [];
  const processed = caseSensitive ? text : text.toLowerCase();
  const words = processed.match(/[\w']+/g);
  if (!words) return [];

  const filtered = ignoreStopwords
    ? words.filter((w) => !STOPWORDS.has(w.toLowerCase()))
    : words;

  const counts = {};
  for (const word of filtered) {
    counts[word] = (counts[word] || 0) + 1;
  }

  const total = filtered.length;
  return Object.entries(counts)
    .map(([word, count]) => ({ item: word, count, percentage: ((count / total) * 100).toFixed(2) }))
    .sort((a, b) => b.count - a.count);
}

function getCharFrequency(text, caseSensitive) {
  if (!text.trim()) return [];
  const processed = caseSensitive ? text : text.toLowerCase();
  const chars = processed.replace(/\s/g, '').split('');
  if (!chars.length) return [];

  const counts = {};
  for (const char of chars) {
    counts[char] = (counts[char] || 0) + 1;
  }

  const total = chars.length;
  return Object.entries(counts)
    .map(([char, count]) => ({ item: char, count, percentage: ((count / total) * 100).toFixed(2) }))
    .sort((a, b) => b.count - a.count);
}

function FrequencyCounter() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('word');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoreStopwords, setIgnoreStopwords] = useState(false);
  const [copied, setCopied] = useState('');

  const results = useMemo(() => {
    if (mode === 'word') {
      return getWordFrequency(text, caseSensitive, ignoreStopwords);
    }
    return getCharFrequency(text, caseSensitive);
  }, [text, mode, caseSensitive, ignoreStopwords]);

  const uniqueCount = results.length;
  const totalCount = results.reduce((sum, r) => sum + r.count, 0);

  const exportCsv = () => {
    if (!results.length) return;
    const header = mode === 'word' ? 'Word,Count,Percentage' : 'Character,Count,Percentage';
    const rows = results.map((r) => `"${r.item.replace(/"/g, '""')}",${r.count},${r.percentage}%`);
    const csv = [header, ...rows].join('\n');
    navigator.clipboard.writeText(csv);
    setCopied('csv');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      <Seo
        title="Frequency Counter – QuickCalcs"
        description="Free word and character frequency counter. Analyze text to find the most common words and characters with percentages."
      />
      <h1>Frequency Counter</h1>
      <p className="subtitle">Count word and character frequency in any text.</p>

      <textarea
        className="word-textarea"
        placeholder="Paste or type your text here to analyze word and character frequency..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />

      <div className="unit-toggle" style={{ marginTop: '1rem' }}>
        <button className={mode === 'word' ? 'active' : ''} onClick={() => setMode('word')}>
          Word Frequency
        </button>
        <button className={mode === 'char' ? 'active' : ''} onClick={() => setMode('char')}>
          Character Frequency
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Case sensitive
        </label>
        {mode === 'word' && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={ignoreStopwords}
              onChange={(e) => setIgnoreStopwords(e.target.checked)}
            />
            Ignore common words (stopwords)
          </label>
        )}
      </div>

      {results.length > 0 && (
        <>
          <div className="detail-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="detail-card">
              <span className="detail-value">{totalCount.toLocaleString()}</span>
              <span className="detail-label">Total {mode === 'word' ? 'Words' : 'Characters'}</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{uniqueCount.toLocaleString()}</span>
              <span className="detail-label">Unique {mode === 'word' ? 'Words' : 'Characters'}</span>
            </div>
          </div>

          <div className="output-header" style={{ marginBottom: '0.5rem' }}>
            <strong>Results ({results.length})</strong>
            <button onClick={exportCsv} className="copy-btn">
              {copied === 'csv' ? 'Copied!' : 'Export CSV to Clipboard'}
            </button>
          </div>

          <div style={{
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#fff',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 100px 100px',
              padding: '0.6rem 0.75rem',
              background: '#f8fafc',
              borderBottom: '2px solid #e2e8f0',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: '#64748b',
              textTransform: 'uppercase',
            }}>
              <span>#</span>
              <span>{mode === 'word' ? 'Word' : 'Character'}</span>
              <span style={{ textAlign: 'right' }}>Count</span>
              <span style={{ textAlign: 'right' }}>Percentage</span>
            </div>

            <div style={{ maxHeight: '480px', overflowY: 'auto' }}>
              {results.map((r, i) => (
                <div
                  key={r.item}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 100px 100px',
                    padding: '0.5rem 0.75rem',
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.9rem',
                    background: i < 10 ? '#eef2ff' : 'transparent',
                    fontWeight: i < 10 ? 600 : 400,
                  }}
                >
                  <span style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.8rem' }}>{i + 1}</span>
                  <span style={{
                    fontFamily: mode === 'char' ? "'Consolas', monospace" : 'inherit',
                    color: i < 10 ? '#4f46e5' : '#0f172a',
                    wordBreak: 'break-all',
                  }}>
                    {mode === 'char' && r.item === ' ' ? '(space)' : r.item}
                  </span>
                  <span style={{ textAlign: 'right', color: '#0f172a' }}>{r.count.toLocaleString()}</span>
                  <span style={{ textAlign: 'right', color: '#64748b' }}>{r.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {text.trim() && results.length === 0 && (
        <p style={{ color: '#64748b', fontStyle: 'italic', marginTop: '1rem' }}>
          No {mode === 'word' ? 'words' : 'characters'} found. {mode === 'word' && ignoreStopwords ? 'Try disabling the stopwords filter.' : ''}
        </p>
      )}

      <section className="info-section">
        <h2>About This Tool</h2>
        <p>The Frequency Counter analyzes any block of text and shows how often each word or character appears. Results are sorted by frequency with counts and percentages, making it easy to identify the most common elements in your text.</p>

        <h2>How It Works</h2>
        <p>Paste or type your text, then choose between Word Frequency and Character Frequency mode. The tool instantly counts every occurrence, calculates percentages, and highlights the top 10 most frequent items. Toggle case sensitivity to treat uppercase and lowercase separately, or enable the stopwords filter to exclude common English words like "the", "and", "is".</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Analyze keyword density for SEO content writing</li>
          <li>Identify overused words in essays and articles</li>
          <li>Study letter frequency for cryptography and puzzles</li>
          <li>Check vocabulary diversity in writing samples</li>
          <li>Audit content for repeated phrases and filler words</li>
          <li>Linguistic research and text analysis</li>
        </ul>

        <h2>Features</h2>
        <ul>
          <li><strong>Word Frequency</strong> — Count how often each word appears in your text</li>
          <li><strong>Character Frequency</strong> — Count how often each character appears (whitespace excluded)</li>
          <li><strong>Case Sensitivity</strong> — Choose whether "Word" and "word" count as the same item</li>
          <li><strong>Stopwords Filter</strong> — Remove common English words to focus on meaningful content</li>
          <li><strong>Top 10 Highlighting</strong> — The most frequent items are visually highlighted</li>
          <li><strong>CSV Export</strong> — Copy results as CSV data to your clipboard for use in spreadsheets</li>
        </ul>
      </section>
      <RelatedTools current="/frequency-counter" />
    </div>
  );
}

export default FrequencyCounter;
