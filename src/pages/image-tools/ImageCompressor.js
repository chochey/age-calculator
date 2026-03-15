import { useState, useRef } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState('jpeg');
  const [result, setResult] = useState(null);
  const imgRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOriginalFile(file);
    setResult(null);
    const img = new Image();
    img.onload = () => { imgRef.current = img; setImage(URL.createObjectURL(file)); };
    img.src = URL.createObjectURL(file);
  };

  const compress = () => {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setResult({ url, size: blob.size, w: img.width, h: img.height });
    }, mimeType, quality / 100);
  };

  const download = () => {
    if (!result) return;
    const ext = format === 'webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `compressed-q${quality}.${ext}`;
    a.click();
  };

  const savings = result && originalFile ? Math.round((1 - result.size / originalFile.size) * 100) : 0;

  return (
    <div>
      <Seo title="Image Compressor - Compress Images Online Free" description="Free online image compressor. Reduce image file size by adjusting quality. Supports JPEG and WebP output. Processed entirely in your browser." faqs={[{ q: 'Is my image uploaded to a server?', a: 'No. All compression happens entirely in your browser using the HTML5 Canvas API. Your image data never leaves your device. This means the tool works even without an internet connection (after the page has loaded) and your files remain completely private.' }, { q: 'Why is my compressed file sometimes larger than the original?', a: 'This can happen when the original image is already heavily compressed or is a small, simple image. Re-encoding at a high quality setting (90-100%) may add encoding overhead that exceeds the original file size. If you see a size increase, try lowering the quality slider or switching to WebP format, which is more efficient at high quality levels.' }, { q: 'What is the maximum image size I can compress?', a: 'There is no fixed file size limit, but very large images (over 30-50 megapixels) may cause the browser to slow down or run out of memory, since the entire image must be loaded into a Canvas element. For most practical purposes -- web photos, social media images, and document scans -- the tool handles files of any reasonable size without issues.' }]} />
      <h1>Image Compressor</h1>
      <p className="subtitle">Reduce image file size by adjusting quality.</p>

      <div className="img-upload-area">
        <input type="file" accept="image/*" onChange={handleFile} id="compress-input" className="img-file-input" />
        <label htmlFor="compress-input" className="img-upload-label">
          {image ? 'Change image' : 'Choose an image'}
        </label>
        {originalFile && <span className="img-original-size">Original: {formatBytes(originalFile.size)}</span>}
      </div>

      {image && (
        <>
          <div className="quality-control" style={{ marginTop: '1rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Quality: {quality}%</label>
            <input type="range" min="5" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="range-input" />
          </div>

          <div className="unit-toggle" style={{ marginTop: '0.75rem' }}>
            <button className={format === 'jpeg' ? 'active' : ''} onClick={() => setFormat('jpeg')}>JPEG</button>
            <button className={format === 'webp' ? 'active' : ''} onClick={() => setFormat('webp')}>WebP</button>
          </div>

          <button onClick={compress} className="form-btn">Compress</button>
        </>
      )}

      {result && originalFile && (
        <div className="results" style={{ marginTop: '1.25rem' }}>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{formatBytes(originalFile.size)}</span>
              <span className="detail-label">Original</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatBytes(result.size)}</span>
              <span className="detail-label">Compressed</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{savings > 0 ? `-${savings}%` : `+${Math.abs(savings)}%`}</span>
              <span className="detail-label">{savings > 0 ? 'Smaller' : 'Larger'}</span>
            </div>
          </div>

          <div className="img-result">
            <div className="output-header">
              <strong>Compressed Preview</strong>
              <button onClick={download} className="form-btn">Download</button>
            </div>
            <img src={result.url} alt="Compressed" className="img-preview" />
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Image Compressor</h2>
        <p>Click "Choose an image" to upload any image file from your device -- PNG, JPG, GIF, WebP, and other common formats are all supported. Once the image loads, adjust the quality slider to control compression intensity. A quality of 100% preserves maximum detail, while lower values produce smaller files with some loss of sharpness. Choose your output format: JPEG is the most widely compatible format for photographs, while WebP offers significantly better compression at the same visual quality. Click "Compress" to process the image. The results panel displays the original file size, compressed file size, and the percentage reduction. Review the compressed preview to confirm the quality is acceptable, then click "Download" to save the compressed image to your device.</p>

        <h2>How Lossy Image Compression Works</h2>
        <p>This tool uses lossy compression, which selectively discards image data that the human eye is least likely to notice. When you set quality to 75%, the encoder analyzes the image and removes fine details, subtle color variations, and high-frequency patterns that contribute to file size but have minimal impact on perceived quality. The image is drawn onto an HTML5 Canvas element and then exported using the browser's built-in encoding engine at your chosen quality level. Because all processing happens in your browser using the Canvas API, your images are never uploaded to any server -- they remain completely private.</p>

        <h2>Choosing the Right Quality Setting</h2>
        <ul>
          <li><strong>90-100% quality:</strong> Minimal visible difference from the original. File size reduction is modest (10-30%). Best for high-quality prints or portfolio images where every detail matters.</li>
          <li><strong>70-85% quality:</strong> The sweet spot for most uses. Photos look sharp to the naked eye with file sizes reduced by 40-70%. Recommended for blog posts, product images, and general web use.</li>
          <li><strong>50-65% quality:</strong> Noticeable softening in detailed areas but still acceptable for thumbnails, social media posts, and email attachments where speed matters more than pixel-perfect clarity.</li>
          <li><strong>Below 50% quality:</strong> Significant quality loss with visible compression artifacts (blockiness, color banding). Use only when file size is the top priority, such as low-bandwidth environments or bulk image processing.</li>
        </ul>

        <h2>JPEG vs. WebP</h2>
        <p>JPEG has been the standard photo format for decades and is supported by every browser, email client, and image viewer. WebP is a modern format developed by Google that delivers 25-35% smaller files than JPEG at comparable visual quality. If your target platform supports WebP (all modern browsers do), it is the better choice for web performance. For maximum compatibility with older systems and email clients, stick with JPEG.</p>

        <h3>Is my image uploaded to a server?</h3>
        <p>No. All compression happens entirely in your browser using the HTML5 Canvas API. Your image data never leaves your device. This means the tool works even without an internet connection (after the page has loaded) and your files remain completely private.</p>

        <h3>Why is my compressed file sometimes larger than the original?</h3>
        <p>This can happen when the original image is already heavily compressed or is a small, simple image. Re-encoding at a high quality setting (90-100%) may add encoding overhead that exceeds the original file size. If you see a size increase, try lowering the quality slider or switching to WebP format, which is more efficient at high quality levels.</p>

        <h3>What is the maximum image size I can compress?</h3>
        <p>There is no fixed file size limit, but very large images (over 30-50 megapixels) may cause the browser to slow down or run out of memory, since the entire image must be loaded into a Canvas element. For most practical purposes -- web photos, social media images, and document scans -- the tool handles files of any reasonable size without issues.</p>
      </section>
      <RelatedTools current="/image-compressor" />
    </div>
  );
}

export default ImageCompressor;
