import { useState, useRef, useCallback } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function ImageCropper() {
  const [image, setImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [cropX, setCropX] = useState('');
  const [cropY, setCropY] = useState('');
  const [cropW, setCropW] = useState('');
  const [cropH, setCropH] = useState('');
  const [preset, setPreset] = useState('custom');
  const [format, setFormat] = useState('png');
  const [cropped, setCropped] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const presets = {
    custom: null,
    '1:1': 1,
    '16:9': 16 / 9,
    '9:16': 9 / 16,
    '4:3': 4 / 3,
    '3:4': 3 / 4,
    '3:2': 3 / 2,
    '2:3': 2 / 3,
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCropped(null);
    setPreset('custom');
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImage(img.src);
      setOriginalSize({ w: img.width, h: img.height });
      setCropX('0');
      setCropY('0');
      setCropW(String(img.width));
      setCropH(String(img.height));
    };
    img.src = URL.createObjectURL(file);
  };

  const applyPreset = (key) => {
    setPreset(key);
    if (!imgRef.current) return;
    const ratio = presets[key];
    if (!ratio) return;
    const imgW = imgRef.current.width;
    const imgH = imgRef.current.height;
    let w, h;
    if (imgW / imgH > ratio) {
      h = imgH;
      w = Math.round(imgH * ratio);
    } else {
      w = imgW;
      h = Math.round(imgW / ratio);
    }
    const x = Math.round((imgW - w) / 2);
    const y = Math.round((imgH - h) / 2);
    setCropX(String(x));
    setCropY(String(y));
    setCropW(String(w));
    setCropH(String(h));
  };

  const drawPreview = useCallback(() => {
    if (!imgRef.current || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const x = Number(cropX) || 0;
    const y = Number(cropY) || 0;
    const w = Number(cropW) || imgRef.current.width;
    const h = Number(cropH) || imgRef.current.height;
    const maxPreview = 400;
    const scale = Math.min(maxPreview / w, maxPreview / h, 1);
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgRef.current, x, y, w, h, 0, 0, canvas.width, canvas.height);
  }, [cropX, cropY, cropW, cropH]);

  const crop = () => {
    if (!imgRef.current) return;
    const x = Number(cropX) || 0;
    const y = Number(cropY) || 0;
    const w = Number(cropW) || imgRef.current.width;
    const h = Number(cropH) || imgRef.current.height;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgRef.current, x, y, w, h, 0, 0, w, h);
    const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, 0.92);
    setCropped({ url: dataUrl, w, h });
  };

  const preview = () => {
    drawPreview();
  };

  const download = () => {
    if (!cropped) return;
    const a = document.createElement('a');
    a.href = cropped.url;
    a.download = `cropped-${cropped.w}x${cropped.h}.${format}`;
    a.click();
  };

  return (
    <div>
      <Seo title="Image Cropper - Crop Images Online Free" description="Free online image cropper. Upload any image and crop it to custom dimensions or preset aspect ratios like 1:1, 16:9, and 4:3. No upload required, works in your browser." faqs={[{ q: 'How do I crop an image to a specific aspect ratio?', a: 'Select a preset aspect ratio from the dropdown menu (such as 1:1 for a square, 16:9 for widescreen, or 4:3 for standard). The tool automatically calculates the largest possible crop area centered on your image. You can then adjust the X and Y offsets to reposition the crop area before cropping.' }, { q: 'Does cropping reduce image quality?', a: 'No. Cropping simply removes pixels outside the selected area and keeps the remaining pixels at their original quality. Unlike resizing, no interpolation or resampling occurs during a crop operation. The only quality consideration is your chosen output format -- PNG is lossless, while JPG and WebP use slight compression.' }, { q: 'What happens if my crop values exceed the image boundaries?', a: 'The Canvas API will render transparent (for PNG) or black (for JPG) pixels for any area that falls outside the original image boundaries. For best results, make sure your X + Width does not exceed the image width, and Y + Height does not exceed the image height.' }]} />
      <h1>Image Cropper</h1>
      <p className="subtitle">Upload an image and crop it to exact dimensions or preset aspect ratios.</p>

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
              <label>Aspect Ratio Preset</label>
              <select value={preset} onChange={(e) => applyPreset(e.target.value)} className="select-input">
                {Object.keys(presets).map((key) => (
                  <option key={key} value={key}>{key === 'custom' ? 'Custom' : key}</option>
                ))}
              </select>
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

          <div className="input-row" style={{ marginTop: '0.75rem' }}>
            <div className="input-group">
              <label>X Offset (px)</label>
              <input type="number" min="0" value={cropX} onChange={(e) => { setCropX(e.target.value); setPreset('custom'); }} />
            </div>
            <div className="input-group">
              <label>Y Offset (px)</label>
              <input type="number" min="0" value={cropY} onChange={(e) => { setCropY(e.target.value); setPreset('custom'); }} />
            </div>
            <div className="input-group">
              <label>Width (px)</label>
              <input type="number" min="1" value={cropW} onChange={(e) => { setCropW(e.target.value); setPreset('custom'); }} />
            </div>
            <div className="input-group">
              <label>Height (px)</label>
              <input type="number" min="1" value={cropH} onChange={(e) => { setCropH(e.target.value); setPreset('custom'); }} />
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={preview} className="form-btn">Preview Crop</button>
            <button onClick={crop} className="form-btn">Crop & Export</button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <canvas ref={previewCanvasRef} style={{ maxWidth: '100%', border: '1px dashed var(--border-color, #ccc)', display: 'block' }} />
          </div>
        </>
      )}

      {cropped && (
        <div className="img-result" style={{ marginTop: '1.25rem' }}>
          <div className="output-header">
            <strong>Cropped: {cropped.w} x {cropped.h}px</strong>
            <button onClick={download} className="form-btn">Download</button>
          </div>
          <img src={cropped.url} alt="Cropped" className="img-preview" />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the Image Cropper</h2>
        <p>Click "Choose an image" to upload a file from your device. The tool supports all common formats including PNG, JPG, GIF, and WebP. Once your image is loaded, the original dimensions appear and the crop fields default to the full image size. To crop, either select a preset aspect ratio from the dropdown or manually enter pixel values for X offset, Y offset, width, and height. The X and Y offsets control where the top-left corner of the crop rectangle sits relative to the original image. Click "Preview Crop" to see exactly what the final result will look like, then click "Crop & Export" to generate the output. Choose your preferred format and click "Download" to save the cropped image.</p>

        <h2>Understanding Crop Coordinates</h2>
        <p>Image coordinates start at the top-left corner, where X = 0 and Y = 0. The X value moves the crop area horizontally to the right, while the Y value moves it downward. Width and height define the size of the rectangular area to keep. For example, on a 1920x1080 image, setting X to 400, Y to 200, width to 800, and height to 600 would extract a region from the center of the image. When you pick a preset aspect ratio, the tool calculates the largest possible crop at that ratio and centers it automatically.</p>

        <h2>Common Aspect Ratios Explained</h2>
        <ul>
          <li><strong>1:1 (Square)</strong> -- Used for profile pictures on Instagram, Facebook, LinkedIn, and most social platforms. Also common for product photos in e-commerce catalogs.</li>
          <li><strong>16:9 (Widescreen)</strong> -- The standard for YouTube thumbnails, desktop wallpapers, presentations, and modern displays. A 1920x1080 image is 16:9.</li>
          <li><strong>4:3 (Standard)</strong> -- Traditional TV and monitor ratio. Common in PowerPoint slides (1024x768) and many digital cameras' default shooting mode.</li>
          <li><strong>3:2</strong> -- The native aspect ratio of most DSLR cameras and 35mm film. Common for printed photographs at 4x6 and 6x9 inches.</li>
          <li><strong>9:16 (Vertical)</strong> -- The standard for mobile-first content including Instagram Stories, TikTok videos, and Snapchat. Dimensions are typically 1080x1920.</li>
        </ul>

        <h3>How do I crop an image to a specific aspect ratio?</h3>
        <p>Select a preset aspect ratio from the dropdown menu such as 1:1 for a square, 16:9 for widescreen, or 4:3 for standard. The tool automatically calculates the largest possible crop area centered on your image. You can then adjust the X and Y offsets to reposition the crop area before cropping.</p>

        <h3>Does cropping reduce image quality?</h3>
        <p>No. Cropping simply removes pixels outside the selected area and keeps the remaining pixels at their original quality. Unlike resizing, no interpolation or resampling occurs during a crop operation. The only quality consideration is your chosen output format -- PNG is lossless, while JPG and WebP use slight compression.</p>

        <h3>What happens if my crop values exceed the image boundaries?</h3>
        <p>The Canvas API will render transparent (for PNG) or black (for JPG) pixels for any area that falls outside the original image boundaries. For best results, make sure your X + Width does not exceed the image width, and Y + Height does not exceed the image height.</p>
      </section>
      <RelatedTools current="/image-cropper" />
    </div>
  );
}

export default ImageCropper;
