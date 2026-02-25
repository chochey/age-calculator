import Seo from '../components/Seo';

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <Seo title="Privacy Policy – QuickCalcs" description="QuickCalcs privacy policy. Learn how we handle your data when you use our free online calculators and tools." />
      <h1>Privacy Policy</h1>
      <p className="legal-date">Last updated: February 24, 2025</p>

      <h2>Introduction</h2>
      <p>QuickCalcs ("we", "us", or "our") operates the website quickcalcs.net. This Privacy Policy explains how we collect, use, and protect information when you use our free online tools and calculators.</p>

      <h2>Information We Collect</h2>
      <h3>Data You Provide</h3>
      <p>All calculations and tool inputs are processed entirely in your browser. We do not collect, store, or transmit the data you enter into our tools. Your inputs never leave your device.</p>

      <h3>Automatically Collected Information</h3>
      <p>When you visit our site, we may automatically collect:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Pages visited and time spent</li>
        <li>Referring website</li>
        <li>Device type and screen size</li>
      </ul>

      <h2>Cookies and Advertising</h2>
      <p>We use Google AdSense to display advertisements on our site. Google AdSense may use cookies and similar technologies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>
      <p>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. For more information, see <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's advertising privacy policy</a>.</p>

      <h2>Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>Google AdSense</strong> — for displaying advertisements</li>
        <li><strong>Vercel</strong> — for website hosting</li>
        <li><strong>Cloudflare</strong> — for DNS and security</li>
      </ul>

      <h2>Data Security</h2>
      <p>Since all tool calculations happen in your browser, your data is inherently secure — it never reaches our servers. We use HTTPS to encrypt all communication between your browser and our website.</p>

      <h2>Children's Privacy</h2>
      <p>Our website is not directed at children under 13. We do not knowingly collect personal information from children.</p>

      <h2>Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request deletion of your data</li>
        <li>Opt out of personalized advertising</li>
        <li>Lodge a complaint with a data protection authority</li>
      </ul>

      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at privacy@quickcalcs.net.</p>
    </div>
  );
}

export default PrivacyPolicy;
