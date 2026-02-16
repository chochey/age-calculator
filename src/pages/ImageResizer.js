import { useState, useRef } from 'react';
import Seo from '../components/Seo';

function ImageResizer() {
  const [image, setImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [format, setFormat] = useState('png');
  const [resized, setResized] = useState(null);
  const aspectRef = useRef(1);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResized(null);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setOriginalSize({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
      aspectRef.current = img.width / img.height;
    };
    img.src = URL.createObjectURL(file);
  };

  const onWidthChange = (val) => {
    setWidth(val);
    if (keepRatio && val) setHeight(String(Math.round(Number(val) / aspectRef.current)));
  };

  const onHeightChange = (val) => {
    setHeight(val);
    if (keepRatio && val) setWidth(String(Math.round(Number(val) * aspectRef.current)));
  };

  const resize = () => {
    if (!image) return;
    const w = Number(width) || image.width;
    const h = Number(height) || image.height;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, w, h);
    const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, 0.92);
    setResized({ url: dataUrl, w, h });
  };

  const download = () => {
    if (!resized) return;
    const a = document.createElement('a');
    a.href = resized.url;
    a.download = `resized-${resized.w}x${resized.h}.${format}`;
    a.click();
  };

  return (
    <div>
      <Seo title="Image Resizer - Resize Images Online Free" description="Free online image resizer. Upload any image and resize it to custom dimensions. Supports PNG, JPG, and WebP output formats." />
      <h1>Image Resizer</h1>
      <p className="subtitle">Upload an image and resize it to any dimensions.</p>

      <div className="img-upload-area">
        <input type="file" accept="image/*" onChange={handleFile} id="img-input" className="img-file-input" />
        <label htmlFor="img-input" className="img-upload-label">
          {image ? 'Change image' : 'Choose an image'}
        </label>
        {originalSize && <span className="img-original-size">Original: {originalSize.w} x {originalSize.h}px</span>}
      </div>

      {image && (
        <>
          <div className="input-row" style={{ marginTop: '1rem' }}>
            <div className="input-group">
              <label>Width (px)</label>
              <input type="number" min="1" value={width} onChange={(e) => onWidthChange(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Height (px)</label>
              <input type="number" min="1" value={height} onChange={(e) => onHeightChange(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="select-input">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          <label className="checkbox-label" style={{ marginTop: '0.75rem' }}>
            <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} />
            Keep aspect ratio
          </label>

          <button onClick={resize} className="form-btn" style={{ marginTop: '0.75rem' }}>Resize</button>
        </>
      )}

      {resized && (
        <div className="img-result" style={{ marginTop: '1.25rem' }}>
          <div className="output-header">
            <strong>Resized: {resized.w} x {resized.h}px</strong>
            <button onClick={download} className="form-btn">Download</button>
          </div>
          <img src={resized.url} alt="Resized" className="img-preview" />
        </div>
      )}

      <section className="info-section">
        <h2>How to Resize an Image</h2>
        <p>Upload any image (PNG, JPG, GIF, WebP), set your desired width and height, then click Resize. Enable "Keep aspect ratio" to prevent stretching. Download the result in PNG, JPG, or WebP format.</p>

        <h2>Privacy</h2>
        <p>Your images are processed entirely in your browser using the Canvas API. Nothing is uploaded to any server.</p>
      </section>
    </div>
  );
}

export default ImageResizer;
