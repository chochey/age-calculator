import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [robotsIndex, setRobotsIndex] = useState('index');
  const [robotsFollow, setRobotsFollow] = useState('follow');

  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [ogType, setOgType] = useState('website');

  const [twitterCard, setTwitterCard] = useState('summary_large_image');
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDescription, setTwitterDescription] = useState('');

  const [copied, setCopied] = useState(false);

  const titleWarning = title.length > 60;
  const descWarning = description.length > 160;

  const buildTags = () => {
    const lines = [];
    lines.push('<!-- Basic Meta Tags -->');
    if (title) lines.push(`<title>${title}</title>`);
    lines.push('<meta charset="UTF-8">');
    lines.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    if (description) lines.push(`<meta name="description" content="${description}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}">`);
    if (author) lines.push(`<meta name="author" content="${author}">`);
    lines.push(`<meta name="robots" content="${robotsIndex}, ${robotsFollow}">`);
    if (canonicalUrl) lines.push(`<link rel="canonical" href="${canonicalUrl}">`);

    const effectiveOgTitle = ogTitle || title;
    const effectiveOgDesc = ogDescription || description;
    if (effectiveOgTitle || effectiveOgDesc || ogImage || ogType) {
      lines.push('');
      lines.push('<!-- Open Graph Meta Tags -->');
      if (effectiveOgTitle) lines.push(`<meta property="og:title" content="${effectiveOgTitle}">`);
      if (effectiveOgDesc) lines.push(`<meta property="og:description" content="${effectiveOgDesc}">`);
      if (ogImage) lines.push(`<meta property="og:image" content="${ogImage}">`);
      lines.push(`<meta property="og:type" content="${ogType}">`);
      if (canonicalUrl) lines.push(`<meta property="og:url" content="${canonicalUrl}">`);
    }

    const effectiveTwitterTitle = twitterTitle || ogTitle || title;
    const effectiveTwitterDesc = twitterDescription || ogDescription || description;
    if (effectiveTwitterTitle || effectiveTwitterDesc || twitterCard) {
      lines.push('');
      lines.push('<!-- Twitter Card Meta Tags -->');
      lines.push(`<meta name="twitter:card" content="${twitterCard}">`);
      if (effectiveTwitterTitle) lines.push(`<meta name="twitter:title" content="${effectiveTwitterTitle}">`);
      if (effectiveTwitterDesc) lines.push(`<meta name="twitter:description" content="${effectiveTwitterDesc}">`);
      if (ogImage) lines.push(`<meta name="twitter:image" content="${ogImage}">`);
    }

    return lines.join('\n');
  };

  const generatedTags = buildTags();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncate = (text, max) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '...' : text;
  };

  const previewTitle = title || 'Page Title';
  const previewUrl = canonicalUrl || 'https://example.com';
  const previewDesc = description || 'Page description will appear here. Write a compelling description to improve your click-through rate from search results.';

  return (
    <div>
      <Seo
        title="Meta Tag Generator – QuickCalcs"
        description="Free meta tag generator for SEO. Create HTML meta tags, Open Graph tags, and Twitter Card tags. Preview how your page looks in Google search results."
      />
      <h1>Meta Tag Generator</h1>
      <p className="subtitle">Generate SEO meta tags for your website.</p>

      {/* Basic Meta Tags */}
      <div className="calc-section">
        <h2>Basic Meta Tags</h2>

        <div className="input-group">
          <label>
            Page Title
            <span style={{ float: 'right', fontSize: '0.85rem', color: titleWarning ? '#ef4444' : '#64748b' }}>
              {title.length}/60{titleWarning ? ' — Too long! May be truncated in search results.' : ''}
            </span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Website"
          />
        </div>

        <div className="input-group">
          <label>
            Meta Description
            <span style={{ float: 'right', fontSize: '0.85rem', color: descWarning ? '#ef4444' : '#64748b' }}>
              {description.length}/160{descWarning ? ' — Too long! May be truncated in search results.' : ''}
            </span>
          </label>
          <textarea
            className="word-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of your page for search engines..."
            rows={3}
          />
        </div>

        <div className="input-group">
          <label>Keywords (comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="seo, meta tags, html, web development"
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="input-group">
            <label>Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Robots - Indexing</label>
            <select
              className="select-input"
              value={robotsIndex}
              onChange={(e) => setRobotsIndex(e.target.value)}
            >
              <option value="index">index</option>
              <option value="noindex">noindex</option>
            </select>
          </div>
          <div className="input-group">
            <label>Robots - Following</label>
            <select
              className="select-input"
              value={robotsFollow}
              onChange={(e) => setRobotsFollow(e.target.value)}
            >
              <option value="follow">follow</option>
              <option value="nofollow">nofollow</option>
            </select>
          </div>
        </div>
      </div>

      {/* Open Graph Tags */}
      <div className="calc-section">
        <h2>Open Graph Tags</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
          Used by Facebook, LinkedIn, and other social platforms. Falls back to basic meta values if left empty.
        </p>

        <div className="input-row">
          <div className="input-group">
            <label>og:title</label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder={title || 'Same as page title'}
            />
          </div>
          <div className="input-group">
            <label>og:type</label>
            <select
              className="select-input"
              value={ogType}
              onChange={(e) => setOgType(e.target.value)}
            >
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="blog">blog</option>
              <option value="product">product</option>
              <option value="profile">profile</option>
              <option value="video.other">video</option>
              <option value="music.song">music</option>
              <option value="book">book</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>og:description</label>
          <textarea
            className="word-textarea"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder={description || 'Same as meta description'}
            rows={2}
          />
        </div>

        <div className="input-group">
          <label>og:image URL</label>
          <input
            type="text"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Twitter Card Tags */}
      <div className="calc-section">
        <h2>Twitter Card Tags</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
          Controls how your page appears when shared on Twitter/X. Falls back to Open Graph values, then basic meta values.
        </p>

        <div className="input-group">
          <label>twitter:card</label>
          <select
            className="select-input"
            value={twitterCard}
            onChange={(e) => setTwitterCard(e.target.value)}
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
            <option value="app">app</option>
            <option value="player">player</option>
          </select>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>twitter:title</label>
            <input
              type="text"
              value={twitterTitle}
              onChange={(e) => setTwitterTitle(e.target.value)}
              placeholder={ogTitle || title || 'Same as og:title or page title'}
            />
          </div>
          <div className="input-group">
            <label>twitter:description</label>
            <input
              type="text"
              value={twitterDescription}
              onChange={(e) => setTwitterDescription(e.target.value)}
              placeholder={ogDescription || description || 'Same as og:description'}
            />
          </div>
        </div>
      </div>

      {/* Google Search Preview */}
      <div className="calc-section">
        <h2>Google Search Preview</h2>
        <div
          className="calc-result"
          style={{ padding: '1.25rem', borderRadius: '10px' }}
        >
          <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
            <div style={{ fontSize: '0.8rem', color: '#202124', marginBottom: '2px' }}>
              {truncate(previewUrl, 80)}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#1a0dab', marginBottom: '4px', lineHeight: 1.3 }}>
              {truncate(previewTitle, 60)}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4d5156', lineHeight: 1.5 }}>
              {truncate(previewDesc, 160)}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Tags Output */}
      <div className="converted-output" style={{ marginTop: '1.25rem' }}>
        <div className="output-header">
          <strong>Generated Meta Tags</strong>
          <button onClick={copyToClipboard} className="copy-btn">
            {copied ? 'Copied!' : 'Copy All Tags'}
          </button>
        </div>
        <pre
          className="code-textarea"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            margin: 0,
            padding: '1rem',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            background: '#1e293b',
            color: '#e2e8f0',
            borderRadius: '0 0 8px 8px',
            overflow: 'auto',
          }}
        >
          {generatedTags}
        </pre>
      </div>

      <RelatedTools current="/meta-tag-generator" />

      <section className="info-section">
        <h2>How to Use the Meta Tag Generator</h2>
        <p>Fill in the fields in the "Basic Meta Tags" section to define your page title (under 60 characters recommended), meta description (under 160 characters), keywords, author, canonical URL, and robots directives. Then optionally customize the Open Graph section for Facebook and LinkedIn sharing, and the Twitter Card section for how links appear on Twitter/X. As you type, the Google Search Preview panel shows a live mockup of how your page might look in search results, and the generated HTML code updates in real time at the bottom. When you are finished, click "Copy All Tags" to copy the entire block of meta tags and paste them into the <code>&lt;head&gt;</code> of your HTML document.</p>

        <h2>Why Meta Tags Matter for SEO and Social Sharing</h2>
        <p>Meta tags are invisible HTML elements in your page's <code>&lt;head&gt;</code> that tell search engines and social platforms what your page is about. The <strong>title tag</strong> is the single most important on-page SEO signal: it appears as the clickable headline in Google results and in browser tabs. The <strong>meta description</strong> does not directly affect rankings but serves as ad copy beneath the title in search results, making it critical for click-through rate. A well-written description can be the difference between a user choosing your link over a competitor's.</p>
        <p>The <strong>canonical URL</strong> tag prevents duplicate content penalties when the same page is accessible at multiple URLs (for instance, with and without a trailing slash or with query parameters). The <strong>robots meta tag</strong> controls whether search engines should index the page and follow outbound links, giving you fine-grained control over your site's crawlability.</p>
        <p><strong>Open Graph</strong> tags (og:title, og:description, og:image, og:type) determine how your content previews on Facebook, LinkedIn, WhatsApp, Slack, and other platforms that support the Open Graph protocol. <strong>Twitter Card</strong> tags serve the same purpose on Twitter/X, with the <code>summary_large_image</code> type being the most popular because its large image preview drives higher engagement than the smaller summary card.</p>

        <h3>What is the ideal length for a title tag and meta description?</h3>
        <p>Google typically displays the first 50 to 60 characters of a title tag in search results. Titles longer than 60 characters risk being truncated with an ellipsis, which can cut off important keywords or your brand name. For meta descriptions, Google shows roughly 150 to 160 characters on desktop and slightly less on mobile. Writing within these limits ensures your full message is visible. Place your primary keyword near the beginning of the title, and write the description as a compelling call to action that motivates searchers to click.</p>

        <h3>What is a canonical URL and when should I use one?</h3>
        <p>A canonical URL tells search engines which version of a page is the "official" one when the same content is accessible through multiple URLs. For example, <code>https://example.com/page</code>, <code>https://example.com/page/</code>, and <code>https://example.com/page?ref=newsletter</code> might all serve identical content. Without a canonical tag, search engines may treat these as separate pages and split ranking signals among them, diluting your SEO. Adding <code>&lt;link rel="canonical" href="https://example.com/page"&gt;</code> consolidates all signals onto the preferred URL.</p>

        <h3>Do I need both Open Graph and Twitter Card tags?</h3>
        <p>If you only set Open Graph tags, Twitter/X will fall back to using them for card previews, so technically you can get by with just OG tags. However, adding dedicated Twitter Card tags gives you finer control over how your content appears specifically on that platform. For instance, you might want a shorter title or a different description optimized for Twitter's audience. The <code>twitter:card</code> meta tag also lets you choose card formats (summary, summary_large_image, player, app) that do not have direct OG equivalents. For best results across all platforms, set both.</p>
      </section>
    </div>
  );
}

export default MetaTagGenerator;
