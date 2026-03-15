import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'What readability score should I aim for?', a: 'For general web content, marketing material, and consumer communications, aim for a Flesch Reading Ease score between 60 and 70 (roughly 8th-9th grade level). This range is readable by the vast majority of adults. If you are writing for a technical or academic audience, a score in the 30-50 range may be appropriate, but always consider whether simpler phrasing could convey the same information.' }, { q: 'Why do my five readability scores differ from each other?', a: 'Each formula measures different aspects of text complexity. Flesch and Flesch-Kincaid focus on sentence length and syllable count. Gunning Fog emphasizes multi-syllable words specifically. Coleman-Liau uses character counts rather than syllables. SMOG is calibrated to polysyllabic word frequency. Minor differences between scores are normal. If all five scores agree that your text is at a certain grade level, you can be confident in that assessment.' }, { q: 'Does a lower readability score mean my writing is bad?', a: 'Not necessarily. Readability scores measure complexity, not quality. Academic papers, legal contracts, and technical documentation are expected to have higher grade levels because their subject matter demands precision and specialized vocabulary. The key is to match your writing level to your intended audience. What matters is that your readers can understand your message without unnecessary difficulty.' }]}
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
        <h2>How to Use the Readability Score Checker</h2>
        <p>Paste or type your text into the input area above. The tool analyzes your content in real time and displays results as soon as you begin typing. You will see an overall readability rating (Easy, Moderate, or Difficult), basic text statistics (word count, sentence count, average words per sentence, and average syllables per word), and five individual readability scores, each with a corresponding U.S. grade-level interpretation. Use these scores to gauge whether your writing matches your target audience. For example, if you are writing consumer-facing web copy, aim for a Flesch Reading Ease score between 60 and 70, which corresponds to an 8th-9th grade reading level that is comfortable for most adults.</p>

        <h2>Readability Formulas Explained</h2>
        <p>Each formula approaches readability measurement from a slightly different angle, which is why this tool includes all five. Comparing multiple scores gives you a more reliable picture than relying on any single metric.</p>
        <ul>
          <li><strong>Flesch Reading Ease</strong> -- Produces a score from 0 to 100, where higher scores indicate easier text. The formula weighs average sentence length and average syllables per word. A newspaper article typically scores 60-70. Hemingway's fiction scores around 80-90. Academic papers often fall below 30.</li>
          <li><strong>Flesch-Kincaid Grade Level</strong> -- Uses the same inputs as Flesch Reading Ease but outputs a U.S. school grade level. A score of 8.0 means an average 8th grader should be able to comprehend the text. Most business writing targets grades 7-10.</li>
          <li><strong>Gunning Fog Index</strong> -- Estimates the years of formal education required to understand text on first reading. It places special emphasis on "complex words" -- those with three or more syllables. A Fog Index above 12 suggests the text may be too dense for a general audience.</li>
          <li><strong>Coleman-Liau Index</strong> -- Uniquely relies on letter and sentence counts rather than syllable counts, which makes it more consistent for computer-based analysis. It outputs a grade level and tends to correlate well with the other formulas on well-structured prose.</li>
          <li><strong>SMOG Index</strong> -- Stands for "Simple Measure of Gobbledygook." It calculates grade level based on the number of polysyllabic words (3+ syllables) per 30 sentences. Researchers consider SMOG one of the most accurate readability measures, especially for health and educational content.</li>
        </ul>

        <h2>Reading Level Guide</h2>
        <ul>
          <li><strong>Grade 5 and below</strong> -- Very easy. Understood by almost everyone, including children. Ideal for public signage, safety instructions, and the broadest possible audience.</li>
          <li><strong>Grade 6-8</strong> -- Standard. The target range for newspapers, consumer websites, marketing copy, and most non-fiction books intended for general readers.</li>
          <li><strong>Grade 9-12</strong> -- Moderately difficult. Appropriate for high school students, informed adults, and professional communications such as business reports.</li>
          <li><strong>Grade 13-16</strong> -- Difficult. College-level complexity found in academic papers, legal documents, and technical manuals.</li>
          <li><strong>Grade 17+</strong> -- Very difficult. Graduate and post-graduate level. Typically seen in specialized research papers, medical literature, and legal statutes.</li>
        </ul>

        <h2>Tips for Improving Readability</h2>
        <ul>
          <li>Keep sentences under 20 words on average. Long, complex sentences are the single biggest contributor to high difficulty scores.</li>
          <li>Choose common words over formal alternatives -- "use" instead of "utilize," "help" instead of "facilitate," "start" instead of "commence."</li>
          <li>Break long paragraphs into shorter ones. A paragraph of 3-5 sentences is easier to scan than a 10-sentence wall of text.</li>
          <li>Use active voice instead of passive voice. "The team completed the project" reads more clearly than "The project was completed by the team."</li>
          <li>Limit jargon and technical terms unless you are writing for a specialized audience that expects them.</li>
        </ul>

        <h3>What readability score should I aim for?</h3>
        <p>For general web content, marketing material, and consumer communications, aim for a Flesch Reading Ease score between 60 and 70 (roughly 8th-9th grade level). This range is readable by the vast majority of adults. If you are writing for a technical or academic audience, a score in the 30-50 range may be appropriate, but always consider whether simpler phrasing could convey the same information.</p>

        <h3>Why do my five readability scores differ from each other?</h3>
        <p>Each formula measures different aspects of text complexity. Flesch and Flesch-Kincaid focus on sentence length and syllable count. Gunning Fog emphasizes multi-syllable words specifically. Coleman-Liau uses character counts rather than syllables. SMOG is calibrated to polysyllabic word frequency. Minor differences between scores are normal. If all five scores agree that your text is at a certain grade level, you can be confident in that assessment.</p>

        <h3>Does a lower readability score mean my writing is bad?</h3>
        <p>Not necessarily. Readability scores measure complexity, not quality. Academic papers, legal contracts, and technical documentation are expected to have higher grade levels because their subject matter demands precision and specialized vocabulary. The key is to match your writing level to your intended audience. What matters is that your readers can understand your message without unnecessary difficulty.</p>
      </section>
      <RelatedTools current="/readability-checker" />
    </div>
  );
}

export default ReadabilityChecker;
