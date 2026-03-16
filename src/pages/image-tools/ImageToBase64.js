import { useState, useRef } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function ImageToBase64() {
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [base64, setBase64] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewFromBase64, setPreviewFromBase64] = useState(null);
  const [pasteInput, setPasteInput] = useState('');
  const [pasteError, setPasteError] = useState('');
  const fileInputRef = useRef(null);

  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCopied(false);
    setPreviewFromBase64(null);
    setPasteInput('');
    setPasteError('');

    const info = { name: file.name, size: formatBytes(file.size), type: file.type || 'unknown' };

    const img = new Image();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      img.onload = () => {
        setFileInfo({ ...info, width: img.width, height: img.height });
        setImage(dataUrl);
        setBase64(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePastePreview = () => {
    setPasteError('');
    setPreviewFromBase64(null);
    const input = pasteInput.trim();
    if (!input) { setPasteError('Please paste a Base64 string.'); return; }

    let src = input;
    if (!input.startsWith('data:')) {
      src = 'data:image/png;base64,' + input;
    }

    const img = new Image();
    img.onload = () => {
      setPreviewFromBase64({ url: src, width: img.width, height: img.height });
    };
    img.onerror = () => {
      setPasteError('Invalid Base64 string or not a valid image.');
    };
    img.src = src;
  };

  return (
    <div>
      <Seo title="Image to Base64 Converter - Encode Images Online Free" description="Free online image to Base64 encoder. Upload any image to get its Base64 data URI string instantly. Copy the output for use in HTML, CSS, or JavaScript code." faqs={[{ q: 'What is Base64 encoding for images?', a: 'Base64 is a binary-to-text encoding scheme that converts image file data into a string of ASCII characters. The resulting string can be embedded directly in HTML, CSS, or JavaScript without needing a separate image file. A Base64 data URI starts with "data:image/png;base64," followed by the encoded pixel data. This is useful for inlining small images, icons, and sprites to reduce HTTP requests.' }, { q: 'Does Base64 encoding increase file size?', a: 'Yes. Base64 encoding increases the data size by approximately 33% compared to the original binary file. A 30 KB image becomes roughly 40 KB as a Base64 string. This tradeoff is acceptable for small images like icons and logos where eliminating an HTTP request provides a net performance gain, but it makes Base64 impractical for large photographs or high-resolution graphics.' }, { q: 'Can I convert a Base64 string back to an image?', a: 'Yes. Use the "Base64 to Image" section on this page. Paste a Base64 data URI or raw Base64 string and click "Preview Image" to render it in your browser. You can also use a Base64 string directly as the src attribute of an HTML img tag to display the image on any web page.' }]} />
      <h1>Image to Base64 Converter</h1>
      <p className="subtitle">Convert images to Base64 data URIs or decode Base64 strings back to images.</p>

      <div className="img-upload-area">
        <input type="file" accept="image/*" onChange={handleFile} id="img-input" className="img-file-input" ref={fileInputRef} />
        <label htmlFor="img-input" className="img-upload-label">
          {image ? 'Change image' : 'Choose an image'}
        </label>
      </div>

      {fileInfo && (
        <div style={{ marginTop: '1rem' }}>
          <div className="input-row">
            <div className="input-group">
              <label>File Name</label>
              <input type="text" value={fileInfo.name} readOnly />
            </div>
            <div className="input-group">
              <label>File Size</label>
              <input type="text" value={fileInfo.size} readOnly />
            </div>
            <div className="input-group">
              <label>Type</label>
              <input type="text" value={fileInfo.type} readOnly />
            </div>
            <div className="input-group">
              <label>Dimensions</label>
              <input type="text" value={`${fileInfo.width} x ${fileInfo.height}px`} readOnly />
            </div>
          </div>
        </div>
      )}

      {base64 && (
        <div style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Base64 Output ({formatBytes(base64.length)} as text)</strong>
            <button onClick={copyToClipboard} className="form-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea value={base64} readOnly rows={8} style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical' }} />
          {image && <img src={image} alt="Uploaded preview" className="img-preview" style={{ marginTop: '0.75rem' }} />}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h2>Base64 to Image</h2>
        <p className="subtitle">Paste a Base64 string below to preview it as an image.</p>
        <textarea value={pasteInput} onChange={(e) => setPasteInput(e.target.value)} rows={6} placeholder="Paste a Base64 data URI or raw Base64 string here..." style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical' }} />
        <button onClick={handlePastePreview} className="form-btn" style={{ marginTop: '0.5rem' }}>Preview Image</button>
        {pasteError && <p style={{ color: 'var(--error-color, #e74c3c)', marginTop: '0.5rem' }}>{pasteError}</p>}
        {previewFromBase64 && (
          <div className="img-result" style={{ marginTop: '1rem' }}>
            <div className="output-header">
              <strong>Preview: {previewFromBase64.width} x {previewFromBase64.height}px</strong>
            </div>
            <img src={previewFromBase64.url} alt="Decoded from Base64" className="img-preview" />
          </div>
        )}
      </div>

      <section className="info-section">
        <h2>How to Use the Image to Base64 Converter</h2>
        <p>Click "Choose an image" to upload any image from your device. The tool accepts PNG, JPG, GIF, WebP, SVG, and other browser-supported formats. Once loaded, the file name, size, MIME type, and pixel dimensions are displayed. The full Base64 data URI appears in the text area below, ready to copy. Click the "Copy" button to place the string on your clipboard for pasting into your code. To go the other direction, scroll to the "Base64 to Image" section, paste a Base64 string, and click "Preview Image" to see the decoded result. The tool handles both full data URIs and raw Base64 strings without the data URI prefix.</p>

        <h2>When to Use Base64 Images</h2>
        <p>Base64 encoding is most useful for small images that appear on every page of a website. Inlining these images eliminates HTTP requests, which can improve page load times -- especially on high-latency connections. Common use cases include favicons, UI icons, simple logos, email template images (since many email clients block external images by default), and CSS background images for buttons and decorative elements. As a general guideline, images under 10 KB are good candidates for Base64 encoding. Larger images are better served as separate files where the browser can cache them independently.</p>

        <h2>Using Base64 in Your Code</h2>
        <ul>
          <li><strong>HTML:</strong> Set the data URI as the src attribute of an img tag. For example: <code>&lt;img src="data:image/png;base64,..." /&gt;</code></li>
          <li><strong>CSS:</strong> Use the data URI in a background-image property. For example: <code>background-image: url('data:image/png;base64,...');</code></li>
          <li><strong>JavaScript:</strong> Assign the data URI to an Image object's src property or use it in dynamic DOM creation.</li>
          <li><strong>Email HTML:</strong> Embed images directly in email templates to avoid blocked external images. Note that some email clients have size limits for inline images.</li>
        </ul>

        <h3>What is Base64 encoding for images?</h3>
        <p>Base64 is a binary-to-text encoding scheme that converts image file data into a string of ASCII characters. The resulting string can be embedded directly in HTML, CSS, or JavaScript without needing a separate image file. A Base64 data URI starts with "data:image/png;base64," followed by the encoded pixel data. This is useful for inlining small images, icons, and sprites to reduce HTTP requests.</p>

        <h3>Does Base64 encoding increase file size?</h3>
        <p>Yes. Base64 encoding increases the data size by approximately 33% compared to the original binary file. A 30 KB image becomes roughly 40 KB as a Base64 string. This tradeoff is acceptable for small images like icons and logos where eliminating an HTTP request provides a net performance gain, but it makes Base64 impractical for large photographs or high-resolution graphics.</p>

        <h3>Can I convert a Base64 string back to an image?</h3>
        <p>Yes. Use the "Base64 to Image" section on this page. Paste a Base64 data URI or raw Base64 string and click "Preview Image" to render it in your browser. You can also use a Base64 string directly as the src attribute of an HTML img tag to display the image on any web page.</p>
      </section>
      <RelatedTools current="/image-to-base64" />
    </div>
  );
}

export default ImageToBase64;
