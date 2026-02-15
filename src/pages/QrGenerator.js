import { useState } from 'react';
import Seo from '../components/Seo';

function QrGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
    if (!text.trim()) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text.trim())}`);
  };

  const download = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div>
      <Seo title="QR Code Generator - Create QR Codes Free" description="Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, and more. Download as PNG instantly." />
      <h1>QR Code Generator</h1>
      <p className="subtitle">Generate QR codes for URLs, text, or any data instantly.</p>

      <div className="form">
        <div className="input-group">
          <label>Text or URL</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" />
        </div>
        <div className="input-group">
          <label>Size: {size}x{size}px</label>
          <input type="range" min="100" max="500" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} className="range-input" />
        </div>
        <button onClick={generate} className="form-btn">Generate QR Code</button>
      </div>

      {qrUrl && (
        <div className="qr-result">
          <img src={qrUrl} alt="QR Code" className="qr-image" />
          <button onClick={download} className="form-btn" style={{ marginTop: '0.75rem' }}>Download PNG</button>
        </div>
      )}

      <section className="info-section">
        <h2>What is a QR Code?</h2>
        <p>A QR (Quick Response) code is a two-dimensional barcode that can store URLs, text, contact info, and more. Smartphones can scan QR codes instantly using their camera to open links or save information.</p>

        <h2>Common Uses</h2>
        <ul>
          <li>Share website URLs and landing pages</li>
          <li>Link to app downloads</li>
          <li>Share Wi-Fi network credentials</li>
          <li>Digital business cards and contact info</li>
        </ul>
      </section>
    </div>
  );
}

export default QrGenerator;
