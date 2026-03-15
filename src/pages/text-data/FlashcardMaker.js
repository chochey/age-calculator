import { useState, useCallback, useEffect } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'Are my flashcards saved if I close the browser?', a: 'Cards are stored in your current browser session only. If you close the tab or refresh the page, the deck will be reset to empty. To preserve your cards, use the "Export JSON" button to copy the deck to your clipboard before leaving, then paste the JSON into a file or note for safekeeping. When you return, paste it into the import field and click "Import" to restore your full deck in seconds.' }, { q: 'Can I share my flashcard deck with someone else?', a: 'Yes. Click "Export JSON" to copy your deck as a JSON string. Send that string to a friend via email, messaging, or a shared document. They can visit this page, paste the JSON into the import field, and click "Import" to load your exact deck. This makes it easy for study groups to share vocabulary lists, exam review sets, or training material without needing any accounts or cloud storage.' }, { q: 'What keyboard shortcuts are available during study mode?', a: 'Press Space to flip the current card between question and answer. Press the Right Arrow or Down Arrow to advance to the next card, and the Left Arrow or Up Arrow to go back to the previous card. These shortcuts work as long as your cursor is not focused inside a text input or textarea, making it easy to navigate the entire deck hands-free from your keyboard.' }]}
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
        <h2>How to Use the Flashcard Maker</h2>
        <p>Creating flashcards is fast and requires no account. In the Create tab, type a question or term on the "Front" field and the corresponding answer or definition on the "Back" field. Click "+ Add Card" to add more cards to your deck -- there is no limit. To remove a card, click the X button next to it. Once your deck is ready, choose "Study in Order" to go through the cards sequentially, or "Shuffle &amp; Study" to randomize the order for a more challenging review. During study mode, click the card (or press the Space bar) to flip between the question and answer sides. Use the arrow keys or the Prev/Next buttons to move through the deck. A progress panel at the top shows which card you are on, how many you have seen, and how many remain.</p>
        <p>To save your work, click "Export JSON" to copy the entire deck to your clipboard in JSON format. You can paste this into a text file, a note-taking app, or share it with classmates. To reload a saved deck, paste the JSON into the import text area and click "Import." The cards will populate instantly, ready for editing or studying.</p>

        <h2>How the Flashcard Maker Works</h2>
        <p>The tool stores your flashcard deck as an array of front/back pairs within your browser session. When you enter study mode, the deck is either kept in creation order or shuffled using the Fisher-Yates algorithm for an unbiased random arrangement. Flipping a card simply toggles between displaying the front text and the back text -- there is no network request or server involved, so the experience is instantaneous and fully private. The cards-seen counter uses a JavaScript Set to track which card indices you have visited, ensuring each card is counted only once even if you navigate back and forth. Export converts the card array to formatted JSON, and import parses pasted JSON back into the same structure.</p>

        <h2>Tips for Effective Flashcard Study</h2>
        <p>Research in cognitive science shows that active recall -- trying to answer from memory before seeing the answer -- is one of the most effective study techniques. When you see the question side, pause and mentally formulate your answer before flipping. Shuffle the deck regularly so you do not rely on card order as a memory cue. Space your study sessions over multiple days rather than cramming in one sitting; this "spaced repetition" approach dramatically improves long-term retention. Keep each card focused on a single concept or fact so that your brain forms clear, distinct associations.</p>

        <h3>Are my flashcards saved if I close the browser?</h3>
        <p>Cards are stored in your current browser session only. If you close the tab or refresh the page, the deck will be reset to empty. To preserve your cards, use the "Export JSON" button to copy the deck to your clipboard before leaving, then paste the JSON into a file or note for safekeeping. When you return, paste it into the import field and click "Import" to restore your full deck in seconds.</p>

        <h3>Can I share my flashcard deck with someone else?</h3>
        <p>Yes. Click "Export JSON" to copy your deck as a JSON string. Send that string to a friend via email, messaging, or a shared document. They can visit this page, paste the JSON into the import field, and click "Import" to load your exact deck. This makes it easy for study groups to share vocabulary lists, exam review sets, or training material without needing any accounts or cloud storage.</p>

        <h3>What keyboard shortcuts are available during study mode?</h3>
        <p>Press Space to flip the current card between question and answer. Press the Right Arrow or Down Arrow to advance to the next card, and the Left Arrow or Up Arrow to go back to the previous card. These shortcuts work as long as your cursor is not focused inside a text input or textarea, making it easy to navigate the entire deck hands-free from your keyboard.</p>
      </div>
    </div>
  );
}

export default FlashcardMaker;
