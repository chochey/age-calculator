import { useState } from 'react';
import Seo from '../components/Seo';

const charGroups = [
  {
    label: 'Currency',
    chars: ['$', '€', '£', '¥', '¢', '₹', '₽', '₩', '₿', '₴', '₺', '₫', '₱', '₸', '₦', '₼'],
  },
  {
    label: 'Math',
    chars: ['±', '×', '÷', '≠', '≈', '≤', '≥', '∞', '√', '∑', '∏', 'π', 'Δ', '∫', '∂', '∇', '∈', '∉', '⊂', '⊃', '∅', '∧', '∨', '¬'],
  },
  {
    label: 'Arrows',
    chars: ['←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '➜', '➤', '▶', '◀', '▲', '▼'],
  },
  {
    label: 'Symbols',
    chars: ['©', '®', '™', '°', '•', '·', '…', '†', '‡', '§', '¶', '‰', '♠', '♣', '♥', '♦', '★', '☆', '✓', '✗', '✦', '⚡', '☀', '☁'],
  },
  {
    label: 'Greek',
    chars: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'],
  },
  {
    label: 'Fractions',
    chars: ['½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞'],
  },
  {
    label: 'Emoji',
    chars: ['😀', '😂', '🥰', '😎', '🤔', '👍', '👎', '❤️', '🔥', '⭐', '💡', '🎉', '✅', '❌', '⚠️', '💬'],
  },
  {
    label: 'Accented',
    chars: ['à', 'á', 'â', 'ã', 'ä', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ñ', 'ç'],
  },
];

function CharacterMap() {
  const [activeGroup, setActiveGroup] = useState('Currency');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');
  const [collected, setCollected] = useState('');

  const copy = (char) => {
    navigator.clipboard.writeText(char);
    setCopied(char);
    setTimeout(() => setCopied(''), 1000);
  };

  const addToCollected = (char) => {
    setCollected((prev) => prev + char);
    copy(char);
  };

  const copyCollected = () => {
    navigator.clipboard.writeText(collected);
    setCopied('all');
    setTimeout(() => setCopied(''), 1500);
  };

  const group = charGroups.find((g) => g.label === activeGroup);

  const filteredChars = search.trim()
    ? charGroups.flatMap((g) => g.chars).filter((c) => c.includes(search))
    : group?.chars || [];

  return (
    <div>
      <Seo title="Character Map - Copy Special Characters & Symbols" description="Free online character map. Browse and copy special characters, symbols, emoji, Greek letters, math symbols, arrows, and accented characters." />
      <h1>Character Map</h1>
      <p className="subtitle">Browse and copy special characters, symbols, and emoji.</p>

      <input
        type="text"
        className="word-textarea"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '0.75rem', height: 'auto', padding: '0.6rem 0.75rem' }}
      />

      {!search && (
        <div className="case-buttons" style={{ marginBottom: '0.75rem' }}>
          {charGroups.map((g) => (
            <button key={g.label} className={activeGroup === g.label ? 'active-case' : ''} onClick={() => setActiveGroup(g.label)}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      <div className="char-grid">
        {filteredChars.map((char, i) => (
          <button key={i} className={`char-cell ${copied === char ? 'char-copied' : ''}`} onClick={() => addToCollected(char)} title={`U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`}>
            <span className="char-display">{char}</span>
          </button>
        ))}
      </div>

      {collected && (
        <div className="char-collected">
          <div className="output-header">
            <strong>Collected</strong>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={copyCollected} className="copy-btn">{copied === 'all' ? 'Copied!' : 'Copy All'}</button>
              <button onClick={() => setCollected('')} className="copy-btn">Clear</button>
            </div>
          </div>
          <code className="hash-value" style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>{collected}</code>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use</h2>
        <p>Click any character to copy it to your clipboard and add it to the collection tray. Use the category buttons to browse different character sets, or search for specific characters. Click "Copy All" to copy your entire collection at once.</p>

        <h2>Character Categories</h2>
        <ul>
          <li><strong>Currency</strong> — Dollar, Euro, Pound, Yen, Bitcoin, and more</li>
          <li><strong>Math</strong> — Mathematical operators and symbols</li>
          <li><strong>Arrows</strong> — Directional arrows and indicators</li>
          <li><strong>Greek</strong> — Lowercase Greek alphabet</li>
          <li><strong>Fractions</strong> — Common fraction characters</li>
        </ul>
      </section>
    </div>
  );
}

export default CharacterMap;
