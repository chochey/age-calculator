import { useState, useEffect, useCallback } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w, h) {
  if (!w || !h) return 'N/A';
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

function getDeviceType(viewportWidth) {
  if (viewportWidth < 768) return 'Mobile';
  if (viewportWidth < 1024) return 'Tablet';
  return 'Desktop';
}

function getOrientation(w, h) {
  if (w === h) return 'Square';
  return w > h ? 'Landscape' : 'Portrait';
}

const commonResolutions = [
  { name: 'HD (720p)', width: 1280, height: 720, ratio: '16:9' },
  { name: 'Full HD (1080p)', width: 1920, height: 1080, ratio: '16:9' },
  { name: 'QHD (1440p)', width: 2560, height: 1440, ratio: '16:9' },
  { name: '4K UHD', width: 3840, height: 2160, ratio: '16:9' },
  { name: '5K', width: 5120, height: 2880, ratio: '16:9' },
  { name: '8K UHD', width: 7680, height: 4320, ratio: '16:9' },
  { name: 'WXGA', width: 1366, height: 768, ratio: '683:384' },
  { name: 'WUXGA', width: 1920, height: 1200, ratio: '8:5' },
  { name: 'iPad (10th gen)', width: 2160, height: 1620, ratio: '4:3' },
  { name: 'MacBook Air 13"', width: 2560, height: 1664, ratio: '40:26' },
  { name: 'iPhone 15 Pro', width: 1179, height: 2556, ratio: '393:852' },
  { name: 'Ultrawide QHD', width: 3440, height: 1440, ratio: '43:18' },
];

function ScreenResolution() {
  const getScreenInfo = useCallback(() => ({
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
    orientation: getOrientation(window.innerWidth, window.innerHeight),
    screenOrientation: getOrientation(window.screen.width, window.screen.height),
  }), []);

  const [info, setInfo] = useState(getScreenInfo);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setInfo(getScreenInfo());
    };

    window.addEventListener('resize', handleResize);

    const mql = window.matchMedia('(orientation: portrait)');
    const handleOrientationChange = () => {
      setInfo(getScreenInfo());
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleOrientationChange);
      }
    };
  }, [getScreenInfo]);

  const deviceType = getDeviceType(info.viewportWidth);
  const screenAspectRatio = getAspectRatio(info.screenWidth, info.screenHeight);
  const viewportAspectRatio = getAspectRatio(info.viewportWidth, info.viewportHeight);
  const effectiveResolution = `${Math.round(info.screenWidth * info.devicePixelRatio)} x ${Math.round(info.screenHeight * info.devicePixelRatio)}`;

  const buildCopyText = () => {
    const lines = [
      'Screen Resolution Info',
      '======================',
      `Screen Resolution: ${info.screenWidth} x ${info.screenHeight}`,
      `Physical Pixels: ${effectiveResolution}`,
      `Screen Aspect Ratio: ${screenAspectRatio}`,
      `Available Screen Area: ${info.availWidth} x ${info.availHeight}`,
      `Browser Viewport: ${info.viewportWidth} x ${info.viewportHeight}`,
      `Viewport Aspect Ratio: ${viewportAspectRatio}`,
      `Device Pixel Ratio: ${info.devicePixelRatio}`,
      `Color Depth: ${info.colorDepth}-bit`,
      `Pixel Depth: ${info.pixelDepth}-bit`,
      `Orientation: ${info.orientation}`,
      `Device Type: ${deviceType}`,
    ];
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildCopyText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const matchesScreen = (res) => {
    return (
      (res.width === info.screenWidth && res.height === info.screenHeight) ||
      (res.height === info.screenWidth && res.width === info.screenHeight)
    );
  };

  return (
    <div>
      <Seo
        title="Screen Resolution Checker - QuickCalcs"
        description="Check your screen resolution, viewport size, device pixel ratio, and more. Free online screen info tool."
      />
      <h1>Screen Resolution Checker</h1>
      <p className="subtitle">View your screen resolution and device display information in real time.</p>

      <div className="results" style={{ marginTop: '1.25rem' }}>
        <div className="primary-result" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <span className="age-number">{info.screenWidth} x {info.screenHeight}</span>
          <span className="age-label" style={{ marginRight: 0 }}>Screen Resolution (CSS Pixels)</span>
          <span className="age-label" style={{ marginRight: 0, fontSize: '0.85rem', opacity: 0.7 }}>
            {deviceType} &middot; {info.orientation}
          </span>
        </div>

        <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="detail-card highlight">
            <span className="detail-value">{info.viewportWidth} x {info.viewportHeight}</span>
            <span className="detail-label">Browser Viewport</span>
          </div>
          <div className="detail-card highlight">
            <span className="detail-value">{info.devicePixelRatio}x</span>
            <span className="detail-label">Device Pixel Ratio</span>
          </div>
          <div className="detail-card highlight">
            <span className="detail-value">{effectiveResolution}</span>
            <span className="detail-label">Physical Pixels</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{info.availWidth} x {info.availHeight}</span>
            <span className="detail-label">Available Screen Area</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{screenAspectRatio}</span>
            <span className="detail-label">Screen Aspect Ratio</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{viewportAspectRatio}</span>
            <span className="detail-label">Viewport Aspect Ratio</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{info.colorDepth}-bit</span>
            <span className="detail-label">Color Depth</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{info.orientation}</span>
            <span className="detail-label">Orientation</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{deviceType}</span>
            <span className="detail-label">Device Type</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleCopy} className="copy-btn">
            {copied ? 'Copied!' : 'Copy All Info'}
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: '0.95rem', margin: '1.5rem 0 0.5rem' }}>Common Resolutions</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          overflow: 'hidden',
          fontSize: '0.9rem',
        }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Resolution</th>
              <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Aspect Ratio</th>
              <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Megapixels</th>
            </tr>
          </thead>
          <tbody>
            {commonResolutions.map((res) => {
              const isMatch = matchesScreen(res);
              return (
                <tr
                  key={res.name}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    background: isMatch ? '#eef2ff' : 'transparent',
                  }}
                >
                  <td style={{ padding: '0.55rem 0.75rem', fontWeight: isMatch ? 700 : 400, color: isMatch ? '#4f46e5' : '#0f172a' }}>
                    {res.name}
                    {isMatch && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', background: '#4f46e5', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Your screen</span>}
                  </td>
                  <td style={{ padding: '0.55rem 0.75rem', textAlign: 'center', fontFamily: "'Consolas', monospace", color: '#475569' }}>
                    {res.width} x {res.height}
                  </td>
                  <td style={{ padding: '0.55rem 0.75rem', textAlign: 'center', color: '#475569' }}>
                    {res.ratio}
                  </td>
                  <td style={{ padding: '0.55rem 0.75rem', textAlign: 'center', color: '#475569' }}>
                    {((res.width * res.height) / 1000000).toFixed(1)} MP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="info-section">
        <h2>About Screen Resolution</h2>
        <p>Screen resolution refers to the number of pixels displayed on your screen, expressed as width by height (e.g., 1920 x 1080). A higher resolution means more pixels are packed into the display, resulting in sharper text and images. Understanding your screen resolution helps when designing websites, choosing wallpapers, or selecting the right display settings.</p>

        <h2>CSS Pixels vs Physical Pixels</h2>
        <p>Modern devices often have a Device Pixel Ratio (DPR) greater than 1, meaning multiple physical hardware pixels are used to render a single CSS pixel. For example, a device with a 1920 x 1080 CSS resolution and a DPR of 2 actually has a physical resolution of 3840 x 2160. This produces sharper, more detailed graphics on high-DPI or Retina displays.</p>

        <h2>Viewport vs Screen Resolution</h2>
        <p>Your screen resolution is the total pixel count of your monitor, while the browser viewport is the visible area within your browser window. The viewport can be smaller than your screen resolution due to browser toolbars, the operating system taskbar, and window sizing. Web developers use viewport dimensions to create responsive layouts that adapt to different screen sizes.</p>

        <h2>What Are Common Screen Resolutions?</h2>
        <ul>
          <li><strong>1920 x 1080 (Full HD / 1080p)</strong> -- The most widely used desktop monitor resolution</li>
          <li><strong>2560 x 1440 (QHD / 1440p)</strong> -- Popular for gaming monitors and productivity displays</li>
          <li><strong>3840 x 2160 (4K UHD)</strong> -- High-end monitors and modern TVs</li>
          <li><strong>1366 x 768</strong> -- Common on budget laptops and older notebooks</li>
          <li><strong>2560 x 1600</strong> -- Standard for many modern 13-inch and 14-inch laptops</li>
        </ul>

        <h2>Mobile, Tablet, or Desktop?</h2>
        <p>Device type classification is based on the browser viewport width. Viewports under 768px are typically mobile phones, 768px to 1023px are tablets, and 1024px and above are desktops. These breakpoints are commonly used in responsive web design to deliver optimal layouts for each device category.</p>
      </section>

      <RelatedTools current="/screen-resolution" />
    </div>
  );
}

export default ScreenResolution;
