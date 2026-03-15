import { useState, useMemo } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        title="Frequency Counter"
        description="Free word and character frequency counter. Analyze text to find the most common words and characters with percentages."
        faqs={[{ q: 'What are stopwords and when should I filter them?', a: 'Stopwords are the most common function words in a language -- articles, prepositions, pronouns, and auxiliary verbs like "the," "of," "is," and "at." They appear frequently in every text regardless of topic, so they can drown out the meaningful content words you actually care about. Enable the stopwords filter when you want to find the key themes or keywords in a passage, such as when analyzing an essay for topic focus or auditing web content for SEO keyword density. Leave it off when you need a complete linguistic profile of the text.' }, { q: 'How is this useful for SEO and content writing?', a: 'Search engines evaluate keyword relevance partly through word frequency and density. By running your article through this tool, you can verify that your target keyword appears often enough to signal relevance -- generally between 1 and 3 percent of total words -- without stuffing it so heavily that readability suffers. The tool also reveals overused filler words and helps you diversify your vocabulary, both of which contribute to higher-quality content that ranks better and reads more naturally.' }, { q: 'Can I use this tool for languages other than English?', a: 'The word and character counting works with any language that uses space-separated words and standard Unicode characters, including Spanish, French, German, Portuguese, and many others. However, the built-in stopwords list is English-only, so the "Ignore common words" toggle will have no effect on non-English text. For languages like Chinese or Japanese that do not use spaces between words, the character frequency mode is the more appropriate choice.' }]}
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
        <h2>How to Use the Frequency Counter</h2>
        <p>
          Paste or type any text into the large input area. Choose "Word Frequency" to count individual words or "Character Frequency" to count individual characters (whitespace excluded). Results appear instantly in a ranked table showing each item, its count, and its percentage of the total. The top 10 items are highlighted for quick scanning. Toggle "Case sensitive" if you want "Apple" and "apple" counted separately, or enable "Ignore common words" to filter out English stopwords such as "the," "and," and "is." Click "Export CSV to Clipboard" to copy the full results table as comma-separated values for use in spreadsheets or data analysis tools.
        </p>

        <h2>How Frequency Analysis Works</h2>
        <p>
          The tool tokenizes your input -- splitting on spaces and punctuation for words, or examining each non-whitespace character individually. It then builds a frequency map, counting how many times each token appears. The percentage column shows what share of the total each item represents, calculated as (item count / total count) x 100.
        </p>
        <p>
          <strong>Worked example:</strong> Given the sentence "the cat sat on the mat," the word frequencies are: "the" = 2 (33.33%), "cat" = 1 (16.67%), "sat" = 1 (16.67%), "on" = 1 (16.67%), "mat" = 1 (16.67%). With the stopwords filter enabled, "the" and "on" would be removed, leaving "cat," "sat," and "mat" each at 33.33%. In character mode, the same sentence produces "t" = 5 as the most frequent character.
        </p>

        <h3>What are stopwords and when should I filter them?</h3>
        <p>
          Stopwords are the most common function words in a language -- articles, prepositions, pronouns, and auxiliary verbs like "the," "of," "is," and "at." They appear frequently in every text regardless of topic, so they can drown out the meaningful content words you actually care about. Enable the stopwords filter when you want to find the key themes or keywords in a passage, such as when analyzing an essay for topic focus or auditing web content for SEO keyword density. Leave it off when you need a complete linguistic profile of the text.
        </p>

        <h3>How is this useful for SEO and content writing?</h3>
        <p>
          Search engines evaluate keyword relevance partly through word frequency and density. By running your article through this tool, you can verify that your target keyword appears often enough to signal relevance -- generally between 1 and 3 percent of total words -- without stuffing it so heavily that readability suffers. The tool also reveals overused filler words and helps you diversify your vocabulary, both of which contribute to higher-quality content that ranks better and reads more naturally.
        </p>

        <h3>Can I use this tool for languages other than English?</h3>
        <p>
          The word and character counting works with any language that uses space-separated words and standard Unicode characters, including Spanish, French, German, Portuguese, and many others. However, the built-in stopwords list is English-only, so the "Ignore common words" toggle will have no effect on non-English text. For languages like Chinese or Japanese that do not use spaces between words, the character frequency mode is the more appropriate choice.
        </p>
      </section>
      <RelatedTools current="/frequency-counter" />
    </div>
  );
}

export default FrequencyCounter;
