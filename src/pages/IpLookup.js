import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function IpLookup() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [manualIp, setManualIp] = useState('');

  const fetchIp = async () => {
    setError('');
    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch IP address. Please try again.');
      }
      const data = await response.json();
      setIp(data.ip);
      setHasSearched(true);
    } catch (e) {
      setError(e.message || 'Could not retrieve your IP address. Check your internet connection.');
      setIp('');
    } finally {
      setLoading(false);
    }
  };

  const handleManualLookup = (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);

    const trimmed = manualIp.trim();
    if (!trimmed) {
      setError('Please enter an IP address.');
      return;
    }

    // Basic IPv4 validation
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Basic IPv6 validation (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

    if (!ipv4Regex.test(trimmed) && !ipv6Regex.test(trimmed)) {
      setError('Please enter a valid IPv4 or IPv6 address.');
      return;
    }

    if (ipv4Regex.test(trimmed)) {
      const parts = trimmed.split('.').map(Number);
      if (parts.some((p) => p > 255)) {
        setError('Invalid IPv4 address: each octet must be between 0 and 255.');
        return;
      }
    }

    setIp(trimmed);
    setHasSearched(true);
  };

  const copyIp = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIpType = (address) => {
    if (!address) return '';
    if (address.includes(':')) return 'IPv6';
    return 'IPv4';
  };

  const getPrivateStatus = (address) => {
    if (!address || address.includes(':')) return null;
    const parts = address.split('.').map(Number);
    if (parts[0] === 10) return 'Private (10.0.0.0/8)';
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return 'Private (172.16.0.0/12)';
    if (parts[0] === 192 && parts[1] === 168) return 'Private (192.168.0.0/16)';
    if (parts[0] === 127) return 'Loopback (127.0.0.0/8)';
    return 'Public';
  };

  return (
    <div>
      <Seo title="What Is My IP Address - IP Lookup Tool" description="Free IP address lookup tool. Find your public IP address instantly. Learn about IPv4, IPv6, and public vs private IP addresses." />
      <h1>What Is My IP Address</h1>
      <p className="subtitle">Discover your public IP address or look up any IP.</p>

      <div className="form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={fetchIp} className="form-btn" disabled={loading}>
          {loading ? 'Finding...' : 'Find My IP'}
        </button>

        {!hasSearched && !loading && !error && (
          <p style={{ textAlign: 'center', opacity: 0.7, margin: 0 }}>
            Click the button to discover your public IP address
          </p>
        )}
      </div>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

      {ip && (
        <div className="results" style={{ marginTop: '1.25rem' }}>
          <div className="primary-result">
            <span className="age-number" style={{ fontFamily: 'Consolas, monospace', wordBreak: 'break-all' }}>{ip}</span>
            <span className="age-label">{getIpType(ip)} Address</span>
            {getPrivateStatus(ip) && (
              <span className="age-label" style={{ opacity: 0.7, fontSize: '0.85rem' }}>{getPrivateStatus(ip)}</span>
            )}
          </div>
          <button onClick={copyIp} className="copy-btn" style={{ marginTop: '0.75rem' }}>
            {copied ? 'Copied!' : 'Copy IP Address'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Look Up a Specific IP</h3>
        <form onSubmit={handleManualLookup} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter an IP address (e.g., 8.8.8.8)"
            value={manualIp}
            onChange={(e) => setManualIp(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #333', background: '#1a1a2e', color: '#fff', fontSize: '1rem' }}
            spellCheck={false}
          />
          <button type="submit" className="form-btn">Look Up</button>
        </form>
      </div>

      <section className="info-section">
        <h2>What Is an IP Address?</h2>
        <p>An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main purposes: identifying the host or network interface, and providing the location of the host in the network for routing purposes.</p>

        <h2>IPv4 vs IPv6</h2>
        <p><strong>IPv4</strong> addresses are 32-bit numbers typically written as four decimal octets separated by periods (e.g., <code>192.168.1.1</code>). IPv4 supports approximately 4.3 billion unique addresses, which has proven insufficient for the growing number of internet-connected devices.</p>
        <p><strong>IPv6</strong> addresses are 128-bit numbers written as eight groups of four hexadecimal digits separated by colons (e.g., <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>). IPv6 provides a virtually unlimited address space, supporting approximately 340 undecillion unique addresses.</p>

        <h2>Public vs Private IP Addresses</h2>
        <p><strong>Public IP addresses</strong> are globally unique and routable on the internet. Your ISP assigns a public IP to your router, which is the address visible to websites and online services. This is the address shown when you click "Find My IP" above.</p>
        <p><strong>Private IP addresses</strong> are used within local networks and are not directly accessible from the internet. Common private ranges include:</p>
        <ul>
          <li><code>10.0.0.0</code> to <code>10.255.255.255</code> (10.0.0.0/8) - Large networks</li>
          <li><code>172.16.0.0</code> to <code>172.31.255.255</code> (172.16.0.0/12) - Medium networks</li>
          <li><code>192.168.0.0</code> to <code>192.168.255.255</code> (192.168.0.0/16) - Home networks</li>
        </ul>

        <h2>Why Would I Need to Know My IP Address?</h2>
        <ul>
          <li>Troubleshooting network connectivity issues</li>
          <li>Setting up remote access to your home network</li>
          <li>Configuring firewalls and security rules</li>
          <li>Verifying VPN connections are working correctly</li>
          <li>Setting up game servers or other hosted services</li>
          <li>Checking if your ISP has assigned a new IP address</li>
        </ul>
      </section>
      <RelatedTools current="/ip-lookup" />
    </div>
  );
}

export default IpLookup;
