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
        <h2>About Meta Tags</h2>
        <p>
          Meta tags are snippets of HTML code that provide metadata about a web page. They don't appear on the
          page itself but are read by search engines and social media platforms to understand your content. Properly
          configured meta tags can significantly improve your SEO rankings and click-through rates.
        </p>

        <h2>Essential Meta Tags for SEO</h2>
        <ul>
          <li><strong>Title tag</strong> — The most important on-page SEO element. Keep it under 60 characters for best display in search results.</li>
          <li><strong>Meta description</strong> — A summary shown in search results. Keep it under 160 characters to avoid truncation.</li>
          <li><strong>Canonical URL</strong> — Tells search engines the preferred version of a page to prevent duplicate content issues.</li>
          <li><strong>Robots meta tag</strong> — Controls whether search engines should index the page and follow its links.</li>
        </ul>

        <h2>Open Graph Tags</h2>
        <p>
          Open Graph (OG) tags control how your content appears when shared on Facebook, LinkedIn, and other
          social platforms. The og:title, og:description, and og:image tags are the most important for generating
          attractive social media previews.
        </p>

        <h2>Twitter Card Tags</h2>
        <p>
          Twitter Card tags define how your content is displayed when shared on Twitter/X. The <code>summary_large_image</code> card
          type is the most popular choice as it displays a large image preview above the title and description,
          which tends to drive higher engagement.
        </p>

        <h2>Best Practices</h2>
        <ul>
          <li>Write unique titles and descriptions for every page</li>
          <li>Include your primary keyword near the beginning of the title</li>
          <li>Make descriptions compelling — they serve as ad copy in search results</li>
          <li>Use high-quality images (at least 1200x630px) for Open Graph and Twitter Cards</li>
          <li>Always set a canonical URL to avoid duplicate content penalties</li>
          <li>Test your tags with Facebook Sharing Debugger and Twitter Card Validator</li>
        </ul>
      </section>
    </div>
  );
}

export default MetaTagGenerator;
