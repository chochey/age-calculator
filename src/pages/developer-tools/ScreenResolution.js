import { useState, useEffect, useCallback } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
        faqs={[{ q: 'What is the difference between screen resolution and viewport size?', a: 'Screen resolution is the total pixel area of your entire monitor, while the browser viewport is the visible content area inside your browser window after subtracting the address bar, bookmarks bar, tab bar, and any OS-level taskbar. On a 1920 x 1080 screen, your viewport might be 1920 x 937 in a maximized Chrome window because the browser chrome and Windows taskbar consume the remaining pixels. Web developers target viewport dimensions when building responsive layouts because that is the actual space available for rendering page content.' }, { q: 'Why does my screen resolution look different from my monitor\'s advertised specs?', a: 'Operating systems often apply display scaling to make text and UI elements more readable on high-resolution screens. A 4K monitor (3840 x 2160 physical pixels) set to 150% scaling reports a CSS resolution of 2560 x 1440 to the browser, with a device pixel ratio of 1.5. The physical pixels are still all in use -- they render more detail per CSS pixel -- but the reported CSS resolution is lower. Check the "Physical Pixels" value on this page to see the actual hardware resolution of your display.' }, { q: 'How can I use this information for web design or development?', a: 'Knowing common viewport sizes helps you set responsive CSS breakpoints that serve appropriate layouts to each device. The DPR tells you whether to provide 2x or 3x image assets for sharp rendering. The aspect ratio informs video and image cropping decisions. If you are filing a bug report for a web application, copying all the screen info from this page gives the development team everything they need to reproduce layout issues on a matching display configuration.' }]}
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
        <h2>How to Use the Screen Resolution Checker</h2>
        <p>There is nothing to configure -- simply visit this page and your screen information is detected automatically. The tool reads your display properties through standard browser APIs and shows your screen resolution in CSS pixels, the browser viewport size, device pixel ratio, physical pixel resolution, available screen area, aspect ratios, color depth, orientation, and device type classification. All values update in real time when you resize your browser window or rotate a mobile device, so you can test different configurations without reloading the page. Use the "Copy All Info" button to copy every measurement to your clipboard in a formatted text block, making it easy to paste into a bug report, design document, or support ticket.</p>

        <h2>How the Screen Resolution Checker Works</h2>
        <p>The tool queries the browser's window.screen object for the total screen dimensions, available screen area (excluding OS taskbars), color depth, and pixel depth. It reads window.innerWidth and window.innerHeight for the browser viewport size, and window.devicePixelRatio for the DPR. Physical pixel resolution is calculated by multiplying CSS dimensions by the device pixel ratio. Aspect ratios are derived by dividing both dimensions by their greatest common divisor. The device type classification uses viewport width breakpoints: under 768px for mobile, 768 to 1023px for tablet, and 1024px and above for desktop. A resize event listener ensures everything stays current as you adjust your browser.</p>

        <h2>CSS Pixels vs Physical Pixels</h2>
        <p>Modern displays, especially Apple Retina screens and high-DPI Windows laptops, use a Device Pixel Ratio (DPR) greater than 1. This means multiple physical hardware pixels render each CSS pixel. For example, a MacBook with a 1440 x 900 CSS resolution and a DPR of 2 actually has 2880 x 1800 physical pixels, producing crisper text and images. Understanding this distinction matters when preparing images for the web -- serving a 2x resolution asset ensures it looks sharp on high-DPI screens rather than appearing blurry.</p>

        <h3>What is the difference between screen resolution and viewport size?</h3>
        <p>Screen resolution is the total pixel area of your entire monitor, while the browser viewport is the visible content area inside your browser window after subtracting the address bar, bookmarks bar, tab bar, and any OS-level taskbar. On a 1920 x 1080 screen, your viewport might be 1920 x 937 in a maximized Chrome window because the browser chrome and Windows taskbar consume the remaining pixels. Web developers target viewport dimensions when building responsive layouts because that is the actual space available for rendering page content.</p>

        <h3>Why does my screen resolution look different from my monitor's advertised specs?</h3>
        <p>Operating systems often apply display scaling to make text and UI elements more readable on high-resolution screens. A 4K monitor (3840 x 2160 physical pixels) set to 150% scaling reports a CSS resolution of 2560 x 1440 to the browser, with a device pixel ratio of 1.5. The physical pixels are still all in use -- they render more detail per CSS pixel -- but the reported CSS resolution is lower. Check the "Physical Pixels" value on this page to see the actual hardware resolution of your display.</p>

        <h3>How can I use this information for web design or development?</h3>
        <p>Knowing common viewport sizes helps you set responsive CSS breakpoints that serve appropriate layouts to each device. The DPR tells you whether to provide 2x or 3x image assets for sharp rendering. The aspect ratio informs video and image cropping decisions. If you are filing a bug report for a web application, copying all the screen info from this page gives the development team everything they need to reproduce layout issues on a matching display configuration.</p>
      </section>

      <RelatedTools current="/screen-resolution" />
    </div>
  );
}

export default ScreenResolution;
