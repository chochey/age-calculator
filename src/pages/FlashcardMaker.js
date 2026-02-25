import { useState, useCallback, useEffect } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function FlashcardMaker() {
  const [mode, setMode] = useState('create'); // 'create' | 'study'
  const [cards, setCards] = useState([
    { front: '', back: '' },
    { front: '', back: '' },
  ]);
  const [studyCards, setStudyCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());
  const [copyLabel, setCopyLabel] = useState('Export JSON');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  // --- Create mode helpers ---
  const updateCard = (i, field, value) => {
    const updated = [...cards];
    updated[i] = { ...updated[i], [field]: value };
    setCards(updated);
  };

  const addCard = () => setCards([...cards, { front: '', back: '' }]);

  const removeCard = (i) => setCards(cards.filter((_, j) => j !== i));

  const validCards = cards.filter((c) => c.front.trim() && c.back.trim());

  // --- Study mode helpers ---
  const startStudy = useCallback((shuffle) => {
    if (validCards.length === 0) return;
    let deck = [...validCards];
    if (shuffle) {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
    setStudyCards(deck);
    setCurrentIndex(0);
    setFlipped(false);
    setSeen(new Set([0]));
    setMode('study');
  }, [validCards]);

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const goNext = useCallback(() => {
    if (currentIndex < studyCards.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setFlipped(false);
      setSeen((prev) => new Set(prev).add(next));
    }
  }, [currentIndex, studyCards.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  }, [currentIndex]);

  const backToCreate = () => setMode('create');

  // --- Import / Export ---
  const exportCards = () => {
    const data = validCards.map(({ front, back }) => ({ front, back }));
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Export JSON'), 1500);
    });
  };

  const importCards = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setImportError('JSON must be a non-empty array of { front, back } objects.');
        return;
      }
      const imported = parsed
        .filter((c) => c && typeof c.front === 'string' && typeof c.back === 'string')
        .map(({ front, back }) => ({ front, back }));
      if (imported.length === 0) {
        setImportError('No valid cards found. Each object needs "front" and "back" strings.');
        return;
      }
      setCards(imported);
      setImportText('');
    } catch {
      setImportError('Invalid JSON. Please paste a valid JSON array.');
    }
  };

  // --- Keyboard shortcuts (study mode only) ---
  useEffect(() => {
    if (mode !== 'study') return;
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); flip(); }
      if (e.code === 'ArrowRight' || e.code === 'ArrowDown') { e.preventDefault(); goNext(); }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode, flip, goNext, goPrev]);

  // --- Render ---
  return (
    <div>
      <Seo
        title="Flashcard Maker – QuickCalcs"
        description="Free online flashcard maker. Create, study, and review flashcards in your browser. No sign-up needed."
      />
      <h1>Flashcard Maker</h1>
      <p className="subtitle">Create and study flashcards — no sign-up needed.</p>

      {/* Mode toggle */}
      <div className="unit-toggle" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button className={mode === 'create' ? 'active' : ''} onClick={backToCreate}>Create</button>
        <button
          className={mode === 'study' ? 'active' : ''}
          onClick={() => startStudy(false)}
          disabled={validCards.length === 0}
        >
          Study ({validCards.length})
        </button>
      </div>

      {/* ===== CREATE MODE ===== */}
      {mode === 'create' && (
        <>
          <div className="gpa-courses">
            {cards.map((c, i) => (
              <div key={i} className="gpa-row" style={{ flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder={`Front (question) ${i + 1}`}
                  value={c.front}
                  onChange={(e) => updateCard(i, 'front', e.target.value)}
                  className="gpa-name"
                />
                <input
                  type="text"
                  placeholder={`Back (answer) ${i + 1}`}
                  value={c.back}
                  onChange={(e) => updateCard(i, 'back', e.target.value)}
                  className="gpa-name"
                />
                {cards.length > 1 && (
                  <button onClick={() => removeCard(i)} className="gpa-remove">&times;</button>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={addCard} className="form-btn">+ Add Card</button>
            <button onClick={() => startStudy(false)} className="form-btn secondary" disabled={validCards.length === 0}>
              Study in Order
            </button>
            <button onClick={() => startStudy(true)} className="form-btn secondary" disabled={validCards.length === 0}>
              Shuffle &amp; Study
            </button>
          </div>

          {/* Import / Export */}
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <button onClick={exportCards} className="copy-btn" disabled={validCards.length === 0}>
                {copyLabel}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <textarea
                className="word-textarea code-textarea"
                rows={3}
                placeholder='Paste JSON here, e.g. [{"front":"Q","back":"A"}]'
                value={importText}
                onChange={(e) => { setImportText(e.target.value); setImportError(''); }}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <button onClick={importCards} className="form-btn secondary" disabled={!importText.trim()}>
                Import
              </button>
            </div>
            {importError && <p className="error" style={{ marginTop: '0.5rem' }}>{importError}</p>}
          </div>
        </>
      )}

      {/* ===== STUDY MODE ===== */}
      {mode === 'study' && studyCards.length > 0 && (
        <>
          {/* Progress */}
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.25rem' }}>
            <div className="detail-card">
              <span className="detail-value">{currentIndex + 1} / {studyCards.length}</span>
              <span className="detail-label">Current Card</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{seen.size}</span>
              <span className="detail-label">Cards Seen</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{studyCards.length - seen.size}</span>
              <span className="detail-label">Remaining</span>
            </div>
          </div>

          {/* Flashcard */}
          <div
            onClick={flip}
            style={{
              background: flipped ? '#eef2ff' : '#fff',
              border: flipped ? '2px solid #4f46e5' : '2px solid #e2e8f0',
              borderRadius: '14px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              userSelect: 'none',
              marginBottom: '1rem',
            }}
          >
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: flipped ? '#4f46e5' : '#94a3b8',
              marginBottom: '0.75rem',
            }}>
              {flipped ? 'Answer' : 'Question'}
            </span>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#0f172a',
              lineHeight: 1.5,
              wordBreak: 'break-word',
            }}>
              {flipped ? studyCards[currentIndex].back : studyCards[currentIndex].front}
            </span>
            <span style={{
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#94a3b8',
            }}>
              Click or press Space to flip
            </span>
          </div>

          {/* Navigation buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={goPrev} className="form-btn secondary" disabled={currentIndex === 0}>
              &#8592; Prev
            </button>
            <button onClick={flip} className="form-btn">
              Flip
            </button>
            <button onClick={goNext} className="form-btn secondary" disabled={currentIndex === studyCards.length - 1}>
              Next &#8594;
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => startStudy(true)} className="form-btn secondary">
              Reshuffle
            </button>
            <button onClick={backToCreate} className="form-btn secondary">
              Back to Edit
            </button>
          </div>

          {/* Keyboard shortcuts hint */}
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '1rem' }}>
            Keyboard: Space = flip, Arrow keys = prev/next
          </p>
        </>
      )}

      <RelatedTools current="/flashcard-maker" />

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          The Flashcard Maker lets you create, study, and review flashcards entirely in your browser.
          No account or sign-up required. Your cards stay private in your current session.
        </p>

        <h2>How to Use</h2>
        <ul>
          <li><strong>Create cards</strong> by typing a question on the front and an answer on the back. Add as many as you need.</li>
          <li><strong>Study in order</strong> or <strong>shuffle</strong> the deck for randomized review.</li>
          <li><strong>Flip cards</strong> by clicking them or pressing Space. Use arrow keys or the Prev/Next buttons to navigate.</li>
          <li><strong>Track progress</strong> with the cards-seen and remaining counters at the top of study mode.</li>
          <li><strong>Export</strong> your cards as JSON to save or share, and <strong>import</strong> them later by pasting the JSON back.</li>
        </ul>

        <h2>Keyboard Shortcuts</h2>
        <ul>
          <li><strong>Space</strong> — Flip the current card</li>
          <li><strong>Right Arrow / Down Arrow</strong> — Next card</li>
          <li><strong>Left Arrow / Up Arrow</strong> — Previous card</li>
        </ul>

        <h2>Tips for Effective Flashcard Study</h2>
        <p>
          Keep questions short and focused on a single concept. Use active recall by trying to answer
          before flipping. Shuffle the deck regularly so you don't rely on card order. Review cards you
          struggle with more frequently to strengthen memory retention.
        </p>
      </div>
    </div>
  );
}

export default FlashcardMaker;
