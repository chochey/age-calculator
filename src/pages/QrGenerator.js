import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the QR Code Generator</h2>
        <p>Enter the text, URL, or data you want to encode into the "Text or URL" field. For a website link, type the full address including https:// (e.g., https://quickcalcs.net). Adjust the size slider to control the output resolution -- 200x200 pixels is suitable for on-screen display, while 400x400 or 500x500 pixels is better for print materials. Click "Generate QR Code" to create the image. The QR code appears below with a "Download PNG" button that saves the image directly to your device. You can then embed the QR code in documents, flyers, business cards, presentations, or website pages.</p>

        <h2>What Is a QR Code and How Does It Work?</h2>
        <p>A QR (Quick Response) code is a two-dimensional matrix barcode that stores information in a grid of black and white squares. Unlike traditional one-dimensional barcodes that hold only a few dozen characters, QR codes can encode up to 4,296 alphanumeric characters or 7,089 numeric digits. The data is distributed across the grid using a specific encoding pattern, and built-in error correction allows the code to remain scannable even if up to 30% of it is damaged or obscured. Smartphones and tablets can read QR codes instantly using their built-in camera -- no special app is required on modern iOS and Android devices.</p>

        <h2>What Can You Encode in a QR Code?</h2>
        <ul>
          <li><strong>Website URLs:</strong> The most common use case. Encode a link like https://quickcalcs.net and anyone who scans the code is taken directly to that page.</li>
          <li><strong>Plain text:</strong> Encode a message, instruction, or note up to several thousand characters long.</li>
          <li><strong>Email addresses:</strong> Use the format mailto:name@example.com to let scanners open a pre-addressed email draft.</li>
          <li><strong>Phone numbers:</strong> Use the format tel:+15551234567 to let scanners initiate a phone call with one tap.</li>
          <li><strong>Wi-Fi credentials:</strong> Use the format WIFI:T:WPA;S:NetworkName;P:Password;; to let scanners connect to a Wi-Fi network without typing the password manually.</li>
          <li><strong>SMS messages:</strong> Use the format smsto:+15551234567:Your message here to open a pre-filled text message on the scanner's device.</li>
          <li><strong>Geographic coordinates:</strong> Use the format geo:40.7128,-74.0060 to open a map application at a specific location.</li>
        </ul>

        <h2>Tips for QR Code Best Practices</h2>
        <ul>
          <li>Always test your QR code by scanning it with a phone before printing or sharing it.</li>
          <li>Ensure sufficient contrast between the code and its background. Dark modules on a light background work best.</li>
          <li>Leave a quiet zone (white border) around the QR code -- at least the width of four modules -- so scanners can detect the code boundaries.</li>
          <li>For print materials, use a size of at least 2 cm x 2 cm (about 0.8 x 0.8 inches) to ensure reliable scanning from a reasonable distance.</li>
        </ul>

        <h3>What size should my QR code be?</h3>
        <p>For on-screen use (websites, emails, presentations), 200x200 to 300x300 pixels works well. For printed materials like business cards or flyers, use at least 300x300 pixels and ensure the printed size is no smaller than 2 cm on each side. For large-format printing like posters or banners, generate a larger code (400-500 pixels) and scale it up as needed -- QR codes remain scannable at any print size as long as the modules stay sharp.</p>

        <h3>Do QR codes expire?</h3>
        <p>Static QR codes like those generated by this tool do not expire. The data is encoded directly in the image, so the code will work forever as long as the encoded content (such as a URL) remains active. If the linked website goes offline, the QR code will still scan but will lead to a dead page. Dynamic QR codes (which use a redirect service) can expire if the service is discontinued, but this generator produces static codes with no external dependencies.</p>

        <h3>Can I customize the appearance of my QR code?</h3>
        <p>This generator produces standard black-and-white QR codes, which offer the highest scan reliability. If you need custom colors, embedded logos, or branded designs, you can use the downloaded PNG as a base and modify it in an image editor. Keep in mind that reducing contrast or covering too many modules with a logo can make the code unscannable, so always test the final design before distributing it.</p>
      </section>
      <RelatedTools current="/qr-code-generator" />
    </div>
  );
}

export default QrGenerator;
