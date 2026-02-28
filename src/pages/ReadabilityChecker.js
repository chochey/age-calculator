import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  let count = 0;
  const vowels = 'aeiouy';
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) {
      count++;
    }
    prevVowel = isVowel;
  }
  // subtract silent e
  if (w.endsWith('e') && count > 1) {
    count--;
  }
  return Math.max(1, count);
}

function analyzeText(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      complexWords: 0,
      polysyllables: 0,
      letters: 0,
      avgWordsPerSentence: 0,
      avgSyllablesPerWord: 0,
      fleschEase: 0,
      fleschKincaid: 0,
      gunningFog: 0,
      colemanLiau: 0,
      smog: 0,
    };
  }

  const wordList = trimmed.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = wordList.length;

  const sentenceMatches = trimmed.match(/[.!?]+/g);
  const sentenceCount = sentenceMatches ? sentenceMatches.length : (trimmed.length > 0 ? 1 : 0);

  let totalSyllables = 0;
  let complexWordCount = 0;
  let polysyllableCount = 0;
  let totalLetters = 0;

  for (const word of wordList) {
    const cleaned = word.replace(/[^a-zA-Z]/g, '');
    totalLetters += cleaned.length;
    const syl = countSyllables(word);
    totalSyllables += syl;
    if (syl >= 3) {
      complexWordCount++;
      polysyllableCount++;
    }
  }

  const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

  // Flesch Reading Ease
  const fleschEase = wordCount > 0 && sentenceCount > 0
    ? 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)
    : 0;

  // Flesch-Kincaid Grade Level
  const fleschKincaid = wordCount > 0 && sentenceCount > 0
    ? 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59
    : 0;

  // Gunning Fog Index
  const gunningFog = wordCount > 0 && sentenceCount > 0
    ? 0.4 * ((wordCount / sentenceCount) + 100 * (complexWordCount / wordCount))
    : 0;

  // Coleman-Liau Index
  const L = wordCount > 0 ? (totalLetters / wordCount) * 100 : 0;
  const S = wordCount > 0 ? (sentenceCount / wordCount) * 100 : 0;
  const colemanLiau = wordCount > 0 ? 0.0588 * L - 0.296 * S - 15.8 : 0;

  // SMOG Index
  const smog = sentenceCount > 0
    ? 3 + Math.sqrt(polysyllableCount * (30 / sentenceCount))
    : 0;

  return {
    words: wordCount,
    sentences: sentenceCount,
    syllables: totalSyllables,
    complexWords: complexWordCount,
    polysyllables: polysyllableCount,
    letters: totalLetters,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    fleschEase: Math.round(fleschEase * 10) / 10,
    fleschKincaid: Math.round(fleschKincaid * 10) / 10,
    gunningFog: Math.round(gunningFog * 10) / 10,
    colemanLiau: Math.round(colemanLiau * 10) / 10,
    smog: Math.round(smog * 10) / 10,
  };
}

function getFleschLabel(score) {
  if (score >= 90) return '5th grade — Very easy to read';
  if (score >= 80) return '6th grade — Easy to read';
  if (score >= 70) return '7th grade — Fairly easy to read';
  if (score >= 60) return '8th-9th grade — Standard';
  if (score >= 50) return '10th-12th grade — Fairly difficult';
  if (score >= 30) return 'College level — Difficult';
  return 'College graduate — Very difficult';
}

function getGradeLabel(grade) {
  if (grade <= 5) return 'Elementary school level';
  if (grade <= 8) return 'Middle school level';
  if (grade <= 12) return 'High school level';
  if (grade <= 16) return 'College level';
  return 'Graduate level';
}

function getOverallRating(fleschEase) {
  if (fleschEase >= 60) return { label: 'Easy', color: '#16a34a', bg: '#dcfce7' };
  if (fleschEase >= 30) return { label: 'Moderate', color: '#ca8a04', bg: '#fef9c3' };
  return { label: 'Difficult', color: '#dc2626', bg: '#fee2e2' };
}

function ReadabilityChecker() {
  const [text, setText] = useState('');
  const stats = analyzeText(text);
  const hasText = stats.words > 0;
  const rating = getOverallRating(stats.fleschEase);

  return (
    <div>
      <Seo
        title="Readability Score Checker - Analyze Text Complexity"
        description="Free readability score checker. Analyze text with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and SMOG Index scores."
      />
      <h1>Readability Score Checker</h1>
      <p className="subtitle">Analyze text complexity with multiple readability formulas and get instant readability scores.</p>

      <div className="form">
        <textarea
          className="word-textarea"
          placeholder="Paste or type your text here to analyze readability..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
        />
      </div>

      {hasText && (
        <div className="results">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem',
            marginBottom: '1.25rem',
            borderRadius: '10px',
            background: rating.bg,
            border: `2px solid ${rating.color}`,
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: rating.color }}>
              Overall: {rating.label}
            </span>
            <span style={{ fontSize: '0.95rem', color: '#64748b' }}>
              (Flesch Reading Ease: {stats.fleschEase})
            </span>
          </div>

          <div className="detail-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="detail-card">
              <span className="detail-value">{stats.words.toLocaleString()}</span>
              <span className="detail-label">Words</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.sentences.toLocaleString()}</span>
              <span className="detail-label">Sentences</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.avgWordsPerSentence}</span>
              <span className="detail-label">Avg Words / Sentence</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.avgSyllablesPerWord}</span>
              <span className="detail-label">Avg Syllables / Word</span>
            </div>
          </div>

          <h2 style={{ marginBottom: '0.75rem' }}>Readability Scores</h2>
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{stats.fleschEase}</span>
              <span className="detail-label">Flesch Reading Ease</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getFleschLabel(stats.fleschEase)}
              </span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.fleschKincaid}</span>
              <span className="detail-label">Flesch-Kincaid Grade</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getGradeLabel(stats.fleschKincaid)}
              </span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.gunningFog}</span>
              <span className="detail-label">Gunning Fog Index</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getGradeLabel(stats.gunningFog)}
              </span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.colemanLiau}</span>
              <span className="detail-label">Coleman-Liau Index</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getGradeLabel(stats.colemanLiau)}
              </span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{stats.smog}</span>
              <span className="detail-label">SMOG Index</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getGradeLabel(stats.smog)}
              </span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>About the Readability Score Checker</h2>
        <p>This tool analyzes your text using five established readability formulas to determine how easy or difficult it is to read. Simply paste your text above and get instant scores with grade-level interpretations.</p>

        <h2>Readability Formulas Explained</h2>
        <ul>
          <li><strong>Flesch Reading Ease</strong> — Scores from 0 to 100 where higher means easier. Based on sentence length and syllable count. A score of 60-70 is considered standard for most audiences.</li>
          <li><strong>Flesch-Kincaid Grade Level</strong> — Translates the Flesch score into a U.S. school grade level. A score of 8.0 means an 8th grader can understand the text.</li>
          <li><strong>Gunning Fog Index</strong> — Estimates the years of formal education needed to understand the text on first reading. It emphasizes complex words (3+ syllables).</li>
          <li><strong>Coleman-Liau Index</strong> — Unlike other formulas, this uses character counts instead of syllables, making it more reliable for computer-based analysis.</li>
          <li><strong>SMOG Index</strong> — Stands for Simple Measure of Gobbledygook. It estimates the grade level by counting polysyllabic words (3+ syllables) and is considered one of the most accurate formulas.</li>
        </ul>

        <h2>Understanding Reading Levels</h2>
        <ul>
          <li><strong>Grade 5 and below</strong> — Very easy. Suitable for a wide general audience and children.</li>
          <li><strong>Grade 6-8</strong> — Standard. Appropriate for most consumer content, newspapers, and everyday writing.</li>
          <li><strong>Grade 9-12</strong> — Somewhat difficult. Suitable for high school students and informed adults.</li>
          <li><strong>Grade 13-16</strong> — Difficult. College-level writing found in academic papers and professional journals.</li>
          <li><strong>Grade 17+</strong> — Very difficult. Graduate-level material requiring specialized knowledge.</li>
        </ul>

        <h2>Tips for Improving Readability</h2>
        <ul>
          <li>Use shorter sentences to reduce complexity</li>
          <li>Choose simpler words when possible (e.g., "use" instead of "utilize")</li>
          <li>Break up long paragraphs into smaller ones</li>
          <li>Avoid jargon unless writing for a specialized audience</li>
          <li>Aim for a Flesch Reading Ease score of 60-70 for general audiences</li>
        </ul>
      </section>
      <RelatedTools current="/readability-checker" />
    </div>
  );
}

export default ReadabilityChecker;
