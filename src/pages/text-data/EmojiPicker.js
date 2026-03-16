import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const emojiCategories = [
  { cat: 'Smileys', emojis: '\ud83d\ude00\ud83d\ude03\ud83d\ude04\ud83d\ude01\ud83d\ude06\ud83d\ude05\ud83e\udd23\ud83d\ude02\ud83d\ude42\ud83d\ude43\ud83d\ude09\ud83d\ude0a\ud83d\ude07\ud83e\udd70\ud83d\ude0d\ud83e\udd29\ud83d\ude18\ud83d\ude17\ud83d\ude1a\ud83d\ude19\ud83d\ude0b\ud83d\ude1b\ud83d\ude1c\ud83e\udd2a\ud83d\ude1d\ud83e\udd11\ud83e\udd17\ud83e\udd2d\ud83e\udd2b\ud83e\udd14\ud83e\udd10\ud83e\udd28\ud83d\ude10\ud83d\ude11\ud83d\ude36\ud83d\ude0f\ud83d\ude12\ud83d\ude44\ud83d\ude2c\ud83e\udd25\ud83d\ude0c\ud83d\ude14\ud83d\ude2a\ud83e\udd24\ud83d\ude34\ud83d\ude37\ud83e\udd12\ud83e\udd15\ud83e\udd22\ud83e\udd2e\ud83e\udd75\ud83e\udd76\ud83e\udd74\ud83d\ude35\ud83e\udd2f\ud83e\udd20\ud83e\udd73\ud83d\ude0e\ud83e\udd13\ud83e\uddd0' },
  { cat: 'Gestures', emojis: '\ud83d\udc4b\ud83e\udd1a\u270b\ud83d\udd96\ud83d\udc4c\ud83e\udd0f\u270c\ufe0f\ud83e\udd1e\ud83e\udd1f\ud83e\udd18\ud83e\udd19\ud83d\udc48\ud83d\udc49\ud83d\udc46\ud83d\udc47\u261d\ufe0f\ud83d\udc4d\ud83d\udc4e\u270a\ud83d\udc4a\ud83e\udd1b\ud83e\udd1c\ud83d\udc4f\ud83d\ude4c\ud83d\udc50\ud83e\udd32\ud83e\udd1d\ud83d\ude4f' },
  { cat: 'Hearts', emojis: '\u2764\ufe0f\ud83e\udde1\ud83d\udc9b\ud83d\udc9a\ud83d\udc99\ud83d\udc9c\ud83d\udda4\ud83e\udd0d\ud83e\udd0e\ud83d\udc94\u2763\ufe0f\ud83d\udc95\ud83d\udc9e\ud83d\udc93\ud83d\udc97\ud83d\udc96\ud83d\udc98\ud83d\udc9d\ud83d\udc9f' },
  { cat: 'Animals', emojis: '\ud83d\udc36\ud83d\udc31\ud83d\udc2d\ud83d\udc39\ud83d\udc30\ud83e\udd8a\ud83d\udc3b\ud83d\udc3c\ud83d\udc28\ud83d\udc2f\ud83e\udd81\ud83d\udc2e\ud83d\udc37\ud83d\udc38\ud83d\udc35\ud83d\ude49\ud83d\ude4a\ud83d\udc12\ud83d\udc14\ud83d\udc27\ud83d\udc26\ud83d\udc24\ud83d\udc23\ud83d\udc25\ud83e\udd86\ud83e\udd85\ud83e\udd89\ud83e\udd87\ud83d\udc3a\ud83d\udc17\ud83d\udc34\ud83e\udd84\ud83d\udc1d\ud83d\udc1b\ud83e\udd8b\ud83d\udc0c\ud83d\udc1e\ud83d\udc1c\ud83d\udd77\ud83e\udd82\ud83d\udc22\ud83d\udc0d' },
  { cat: 'Food', emojis: '\ud83c\udf4e\ud83c\udf50\ud83c\udf4a\ud83c\udf4b\ud83c\udf4c\ud83c\udf49\ud83c\udf47\ud83c\udf53\ud83c\udf48\ud83c\udf52\ud83c\udf51\ud83c\udf4d\ud83c\udf45\ud83c\udf46\ud83e\udd51\ud83e\udd66\ud83e\udd52\ud83c\udf3d\ud83e\udd55\ud83e\udd54\ud83c\udf60\ud83e\udd50\ud83e\udd56\ud83c\udf5e\ud83e\uddc0\ud83e\udd5a\ud83c\udf73\ud83e\udd5e\ud83e\udd53\ud83e\udd69\ud83c\udf57\ud83c\udf56\ud83c\udf2d\ud83c\udf54\ud83c\udf5f\ud83c\udf55\ud83e\udd6a\ud83c\udf2e\ud83c\udf2f\ud83e\udd57\ud83c\udf5d\ud83c\udf5c\ud83c\udf72\ud83c\udf5b\ud83c\udf63\ud83c\udf71\ud83c\udf64\ud83c\udf59\ud83c\udf5a\ud83c\udf58\ud83c\udf65\ud83c\udf62\ud83c\udf61\ud83c\udf67\ud83c\udf68\ud83c\udf66\ud83c\udf70\ud83c\udf82\ud83c\udf6d\ud83c\udf6c\ud83c\udf6b\ud83c\udf7f\ud83c\udf69\ud83c\udf6a' },
  { cat: 'Objects', emojis: '\u231a\ud83d\udcf1\ud83d\udcbb\u2328\ufe0f\ud83d\udda5\ud83d\udda8\ud83d\uddb1\ud83d\udd79\ud83d\udcbd\ud83d\udcbe\ud83d\udcbf\ud83d\udcc0\ud83d\udcfc\ud83d\udcf7\ud83d\udcf9\ud83c\udfa5\ud83d\udcde\ud83d\udcfa\ud83d\udcfb\ud83c\udfa4\u23f1\u23f0\ud83d\udce1\ud83d\udd0b\ud83d\udd0c\ud83d\udca1\ud83d\udd26\ud83d\udd6f\ud83d\udcb8\ud83d\udcb5\ud83d\udcb0\ud83d\udcb3\ud83d\udc8e\ud83d\udd27\ud83d\udd28\ud83d\udee0\ud83d\udd29\u2699\ufe0f\ud83d\udca3\ud83d\udd2a\ud83d\udee1\ud83d\udc88\ud83d\udd2d\ud83d\udd2c\ud83d\udc89\ud83e\uddec\ud83e\udda0\ud83e\uddea' },
  { cat: 'Symbols', emojis: '\u2764\ufe0f\ud83d\udcaf\ud83d\udca2\ud83d\udca5\ud83d\udcab\ud83d\udca6\ud83d\udca8\ud83d\udcac\ud83d\udcad\ud83d\udca4\ud83d\udd34\ud83d\udfe0\ud83d\udfe1\ud83d\udfe2\ud83d\udd35\ud83d\udfe3\ud83d\udfe4\u26ab\u26aa\ud83d\udfe5\ud83d\udfe7\ud83d\udfe8\ud83d\udfe9\ud83d\udfe6\ud83d\udfea\ud83d\udfeb\u2b1b\u2b1c\u25fc\ufe0f\u25fb\ufe0f\u25aa\ufe0f\u25ab\ufe0f\ud83d\udd36\ud83d\udd37\ud83d\udd38\ud83d\udd39\ud83d\udd3a\ud83d\udd3b\ud83d\udca0\ud83d\udd18\ud83d\udd33\ud83d\udd32\u2705\u2714\ufe0f\u274c\u274e\u2795\u2796\u2797\u2716\ufe0f\u203c\ufe0f\u2049\ufe0f\u2753\u2754\u2755\u2757\u00a9\ufe0f\u00ae\ufe0f\u2122\ufe0f' },
];

function EmojiPicker() {
  const [activeCat, setActiveCat] = useState('Smileys');
  const [copied, setCopied] = useState('');

  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(''), 1500);
  };

  const activeData = emojiCategories.find((c) => c.cat === activeCat);
  const emojis = activeData ? [...activeData.emojis] : [];

  return (
    <div>
      <Seo
        title="Emoji Picker - Browse & Copy Emojis"
        description="Free emoji picker tool. Browse emojis by category and copy to clipboard with one click. Hundreds of emojis for social media, messaging, and documents."
        faqs={[
          { q: 'How do I copy an emoji from this tool?', a: 'Click on any emoji to copy it to your clipboard, then paste with Ctrl+V or Cmd+V anywhere you like.' },
          { q: 'Are these emojis compatible with all devices?', a: 'Yes, these are standard Unicode emojis supported by all modern operating systems including Windows, macOS, iOS, Android, and Linux.' },
          { q: 'Can I use emojis in professional documents?', a: 'Yes, Unicode emojis work in Google Docs, Microsoft Word, Notion, Gmail, and Outlook. Some older systems may not render all emojis.' }
        ]}
      />
      <h1>Emoji Picker</h1>
      <p className="subtitle">Browse and copy emojis with one click.</p>

      <div className="preset-row" style={{ flexWrap: 'wrap', marginBottom: '1rem' }}>
        {emojiCategories.map((c) => (
          <button
            key={c.cat}
            type="button"
            className={`preset-btn ${activeCat === c.cat ? 'active' : ''}`}
            onClick={() => setActiveCat(c.cat)}
          >
            {c.cat}
          </button>
        ))}
      </div>

      {copied && (
        <div className="results" style={{ padding: '0.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>
          Copied {copied} to clipboard!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))', gap: '4px' }}>
        {emojis.map((emoji, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleCopy(emoji)}
            style={{
              fontSize: '1.5rem',
              padding: '6px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--card-bg)',
              cursor: 'pointer',
            }}
            title={'Copy ' + emoji}
          >
            {emoji}
          </button>
        ))}
      </div>

      <section className="info-section">
        <h2>How to Use the Emoji Picker</h2>
        <p>
          This emoji picker lets you quickly browse and copy emojis organized by category. Click any emoji to
          instantly copy it to your clipboard, then paste it into your messages, social media posts, documents,
          or anywhere else that supports text. Browse by category using the tabs above. All emojis are standard
          Unicode characters that work across all modern platforms and devices.
        </p>

        <h2>About Unicode Emojis</h2>
        <p>
          Emojis are standardized by the Unicode Consortium, ensuring they work consistently across devices and
          platforms. Each emoji has a unique code point. While the visual design varies between Apple, Google,
          Microsoft, and Samsung, the meaning and code point remain the same. This tool uses native Unicode
          emojis, so what you copy will display in your device native emoji style.
        </p>

        <h2>Tips for Using Emojis</h2>
        <ul>
          <li><strong>Social media:</strong> Emojis increase engagement on Instagram, Twitter, and Facebook posts</li>
          <li><strong>Email subject lines:</strong> An emoji can increase open rates by making your subject stand out</li>
          <li><strong>Slack and Teams:</strong> Emojis are widely used in workplace messaging for quick reactions</li>
          <li><strong>GitHub:</strong> Use emojis in commit messages and pull request descriptions for clarity</li>
        </ul>

        <h3>How do I copy an emoji from this tool?</h3>
        <p>
          Simply click on any emoji to copy it to your clipboard. You will see a brief confirmation message. Then
          paste it anywhere using Ctrl+V (or Cmd+V on Mac) in messages, social media posts, documents, or code.
        </p>

        <h3>Are these emojis compatible with all devices?</h3>
        <p>
          These are standard Unicode emojis supported by all modern operating systems including Windows, macOS,
          iOS, Android, and Linux. The exact appearance may vary slightly between platforms.
        </p>

        <h3>Can I use emojis in professional documents?</h3>
        <p>
          Yes, Unicode emojis work in most modern document editors including Google Docs, Microsoft Word, and
          Notion. They also work in email clients like Gmail and Outlook. Some older systems may not render all
          emojis correctly, so test before sending important documents.
        </p>
      </section>
      <RelatedTools current="/emoji-picker" />
    </div>
  );
}

export default EmojiPicker;
