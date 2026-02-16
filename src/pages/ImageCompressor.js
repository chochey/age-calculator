import { useState, useRef } from 'react';
import Seo from '../components/Seo';

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
      <Seo title="Image Compressor - Compress Images Online Free" description="Free online image compressor. Reduce image file size by adjusting quality. Supports JPEG and WebP output. Processed entirely in your browser." />
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
        <h2>How Image Compression Works</h2>
        <p>This tool uses lossy compression to reduce file size. Lower quality settings produce smaller files but may introduce visible artifacts. JPEG is best for photos, while WebP offers better compression ratios for the same quality.</p>

        <h2>Tips</h2>
        <ul>
          <li><strong>Photos:</strong> 70-80% quality usually gives great results with significant savings</li>
          <li><strong>Web images:</strong> 60-70% is often acceptable for faster page loads</li>
          <li><strong>WebP format:</strong> Try WebP for 25-35% smaller files vs JPEG at the same quality</li>
        </ul>
      </section>
    </div>
  );
}

export default ImageCompressor;
