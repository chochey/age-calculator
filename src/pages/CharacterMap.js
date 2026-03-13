import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the Character Map</h2>
        <p>Browse the character grid by selecting a category from the buttons above -- Currency, Math, Arrows, Symbols, Greek, Fractions, Emoji, or Accented letters. Click any character to instantly copy it to your clipboard and add it to the collection tray at the bottom of the page. You can build up a string of multiple characters by clicking them in sequence. For example, click the copyright symbol, then the bullet point, and the tray will show "©•" ready to copy as a single string. Use the search bar at the top to find specific characters by typing them directly. When you have assembled all the characters you need, click "Copy All" to copy the entire collection, or "Clear" to start over.</p>

        <h2>Understanding Special Characters and Unicode</h2>
        <p>Every character displayed in this tool is a standard Unicode character that works in any modern application -- web browsers, word processors, emails, social media posts, and code editors. Unlike image-based symbols, Unicode characters are actual text that can be searched, selected, and resized. Each character has a unique code point (shown in the tooltip when you hover over a character), such as U+00A9 for the copyright symbol or U+221E for the infinity sign. These characters render natively on all operating systems and do not require any special fonts.</p>

        <h2>Character Categories Explained</h2>
        <ul>
          <li><strong>Currency</strong> -- 16 currency symbols including Dollar ($), Euro (€), Pound (£), Yen (¥), Rupee (₹), Bitcoin (₿), and more. Useful for pricing displays and international finance content.</li>
          <li><strong>Math</strong> -- Operators and notation including plus-minus (±), not equal (≠), approximately equal (≈), infinity (∞), square root (√), summation (∑), and logical operators. Essential for academic writing and technical documentation.</li>
          <li><strong>Arrows</strong> -- Directional arrows in various styles: simple (← → ↑ ↓), double (⇐ ⇒), and filled triangles (▶ ◀ ▲ ▼). Great for navigation cues, flowcharts, and instructional content.</li>
          <li><strong>Symbols</strong> -- Common symbols like copyright (©), registered (®), trademark (™), degree (°), bullet (•), and decorative characters like stars (★ ☆) and checkmarks (✓ ✗).</li>
          <li><strong>Greek</strong> -- The complete lowercase Greek alphabet from alpha (α) to omega (ω), widely used in mathematics, science, engineering, and fraternity or sorority names.</li>
          <li><strong>Fractions</strong> -- Pre-composed fraction characters (½, ⅓, ¼, ¾, and more) that display as a single glyph instead of using a slash between two numbers.</li>
          <li><strong>Emoji</strong> -- A curated set of popular emoji characters for quick insertion into social media posts, messages, and casual content.</li>
          <li><strong>Accented</strong> -- Common accented Latin characters (à, é, ñ, ü, ç, and others) needed for writing in French, Spanish, Portuguese, German, and other European languages.</li>
        </ul>

        <h3>Why can I not find a specific character?</h3>
        <p>This character map includes a curated selection of the most commonly used special characters across eight categories. Unicode contains over 150,000 characters, so not every symbol is listed here. If you know the character you need, try pasting it into the search bar. For extremely rare or specialized symbols, you can search by Unicode code point on dedicated Unicode reference sites.</p>

        <h3>Will these characters display correctly everywhere?</h3>
        <p>Yes, for the vast majority of platforms. All characters in this tool are part of the widely supported Unicode standard. Modern web browsers, operating systems, and applications render them natively. In rare cases, very old systems or specialized environments with limited font support may show a placeholder square instead of the intended glyph.</p>

        <h3>How do I type special characters without this tool?</h3>
        <p>On Windows, you can use Alt codes (e.g., Alt+0169 for ©) or the built-in Character Map application. On macOS, use the Character Viewer (Control+Command+Space). On Linux, use the Compose key or the Unicode input method (Ctrl+Shift+U followed by the hex code). However, this online tool provides a faster, visual way to find and copy characters without memorizing key combinations.</p>
      </section>
      <RelatedTools current="/character-map" />
    </div>
  );
}

export default CharacterMap;
