import { useState, useRef } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="Image Resizer - Resize Images Online Free" description="Free online image resizer. Upload any image and resize it to custom dimensions. Supports PNG, JPG, and WebP output formats." faqs={[{ q: 'Will resizing an image reduce its file size?', a: 'Yes, in most cases. Reducing an image\'s dimensions decreases the number of pixels that need to be stored, which directly reduces file size. For example, scaling a 4000x3000 photo down to 1200x900 can reduce a 5 MB JPG to under 500 KB. Switching to a more efficient format like WebP during the resize can save even more space.' }, { q: 'What does "Keep aspect ratio" mean?', a: 'Aspect ratio is the proportional relationship between an image\'s width and height. A 1920x1080 image has a 16:9 aspect ratio. When "Keep aspect ratio" is enabled, changing the width automatically adjusts the height (and vice versa) to maintain this proportion. This prevents the image from appearing stretched or squished. Disable it only when you specifically need non-proportional dimensions, such as cropping a landscape photo into a square.' }, { q: 'Is there a limit to how large I can make an image?', a: 'You can scale an image up to any dimensions, but enlarging a small image will not add detail -- the browser interpolates (guesses) new pixel values between existing ones, which can make the image appear blurry or soft. For best results, only scale images down or keep them close to their original size. If you need a larger version of an image, start with the highest-resolution original available.' }]} />
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
        <h2>How to Use the Image Resizer</h2>
        <p>Click "Choose an image" to upload a file from your device. The tool accepts all common image formats including PNG, JPG, GIF, and WebP. Once loaded, the original dimensions are displayed and the width and height fields are pre-filled with the current pixel values. Enter your desired width or height. If "Keep aspect ratio" is checked (the default), changing one dimension automatically calculates the other to prevent stretching or squishing. Uncheck it if you need specific non-proportional dimensions. Select your output format -- PNG for lossless quality, JPG for smaller photo files, or WebP for the best balance of quality and size. Click "Resize" to process the image, preview the result, and click "Download" to save it.</p>

        <h2>How Browser-Based Image Resizing Works</h2>
        <p>This tool uses the HTML5 Canvas API to resize images entirely within your browser. When you click "Resize," the uploaded image is drawn onto an invisible canvas element at your specified dimensions. The browser's rendering engine handles the pixel interpolation -- scaling the original image data up or down to fit the target size. The canvas content is then exported as a data URL in your chosen format (PNG, JPG, or WebP) at 92% quality for lossy formats. Because everything runs locally, your images are never uploaded to any server, and the tool works offline after the page has loaded.</p>

        <h2>Choosing the Right Dimensions</h2>
        <ul>
          <li><strong>Social media profile pictures:</strong> Most platforms recommend 400x400 to 800x800 pixels for profile images. Instagram posts work best at 1080x1080, while Facebook cover photos use 820x312.</li>
          <li><strong>Website thumbnails:</strong> Common thumbnail sizes range from 150x150 to 300x300 pixels. For blog post featured images, 1200x630 pixels is a widely used standard that also works well for social sharing previews.</li>
          <li><strong>Email attachments:</strong> Resize large photos down to 1024 pixels on the longest side to keep email file sizes manageable without sacrificing too much visual quality.</li>
          <li><strong>Printing:</strong> For high-quality prints, aim for at least 300 pixels per inch (PPI). A 4x6 inch print needs a minimum of 1200x1800 pixels.</li>
        </ul>

        <h2>Output Format Guide</h2>
        <ul>
          <li><strong>PNG</strong> -- Lossless compression that preserves every pixel. Best for graphics, logos, screenshots, and images with text or sharp edges. Produces larger files than JPG or WebP.</li>
          <li><strong>JPG</strong> -- Lossy compression optimized for photographs. Produces much smaller files than PNG at the cost of some fine detail. The standard choice for web photos and email attachments.</li>
          <li><strong>WebP</strong> -- A modern format that offers both lossy and lossless compression with smaller file sizes than JPG and PNG. Supported by all modern browsers. The best option for web performance.</li>
        </ul>

        <h3>Will resizing an image reduce its file size?</h3>
        <p>Yes, in most cases. Reducing an image's dimensions decreases the number of pixels that need to be stored, which directly reduces file size. For example, scaling a 4000x3000 photo down to 1200x900 can reduce a 5 MB JPG to under 500 KB. Switching to a more efficient format like WebP during the resize can save even more space.</p>

        <h3>What does "Keep aspect ratio" mean?</h3>
        <p>Aspect ratio is the proportional relationship between an image's width and height. A 1920x1080 image has a 16:9 aspect ratio. When "Keep aspect ratio" is enabled, changing the width automatically adjusts the height (and vice versa) to maintain this proportion. This prevents the image from appearing stretched or squished. Disable it only when you specifically need non-proportional dimensions, such as cropping a landscape photo into a square.</p>

        <h3>Is there a limit to how large I can make an image?</h3>
        <p>You can scale an image up to any dimensions, but enlarging a small image will not add detail -- the browser interpolates (guesses) new pixel values between existing ones, which can make the image appear blurry or soft. For best results, only scale images down or keep them close to their original size. If you need a larger version of an image, start with the highest-resolution original available.</p>
      </section>
      <RelatedTools current="/image-resizer" />
    </div>
  );
}

export default ImageResizer;
