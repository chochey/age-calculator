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
        <h2>How to Use the IP Lookup Tool</h2>
        <p>Click "Find My IP" to instantly discover the public IP address your device is using to reach the internet. The tool makes a quick call to a lightweight API that returns your address, then displays it along with its type (IPv4 or IPv6) and whether it falls within a private or public range. You can copy the result with one click. If you want to inspect a specific address instead, enter it in the "Look Up a Specific IP" field below and click "Look Up." The tool validates the format and identifies the address type and private-range status without sending the address to any third-party geolocation service.</p>

        <h2>How IP Addresses Work</h2>
        <p>An IP (Internet Protocol) address is a numeric identifier assigned to every device on a network that uses the Internet Protocol. It serves two purposes: identifying the host interface and providing a location for routing packets across interconnected networks. <strong>IPv4</strong> addresses are 32-bit numbers written as four decimal octets separated by periods, like <code>192.168.1.1</code>, supporting roughly 4.3 billion unique addresses. <strong>IPv6</strong> addresses expand to 128 bits written as eight groups of four hexadecimal digits separated by colons, such as <code>2001:0db8:85a3::8a2e:0370:7334</code>, providing a virtually inexhaustible address space.</p>
        <p>Your internet service provider assigns a <strong>public IP</strong> to your router, and this is the address websites and online services see when you connect. Inside your home or office network, your router assigns <strong>private IPs</strong> from reserved ranges defined by RFC 1918: <code>10.0.0.0/8</code> for large networks, <code>172.16.0.0/12</code> for medium networks, and <code>192.168.0.0/16</code> for typical home networks. Network Address Translation (NAT) maps these private addresses to the single public IP when traffic leaves your local network.</p>

        <h3>Why would I need to know my public IP address?</h3>
        <p>Knowing your public IP is essential for several common tasks: setting up port forwarding or remote desktop access, configuring firewall and security group rules that whitelist your address, verifying that a VPN connection is active and routing traffic through the expected server, troubleshooting connectivity issues with your ISP, and hosting game servers or other peer-to-peer services that require external clients to connect to your network. It is also useful for confirming whether your ISP has assigned a static or dynamic address.</p>

        <h3>What is the difference between a public and a private IP address?</h3>
        <p>A public IP address is globally unique and routable across the internet, meaning any device on the internet can potentially send packets to it. A private IP address is used only within a local area network and is not routable on the public internet. Multiple organizations can reuse the same private ranges without conflict because routers do not forward private-range traffic beyond the local network boundary. When a device with a private IP needs to reach the internet, NAT on the router translates the private source address to the router's public IP before sending the packet out.</p>

        <h3>How can I tell if my IP address is IPv4 or IPv6?</h3>
        <p>IPv4 addresses are easy to recognize: four groups of decimal numbers from 0 to 255, separated by dots, like <code>8.8.8.8</code>. IPv6 addresses are longer and use hexadecimal digits separated by colons, such as <code>2607:f8b0:4004:0800::200e</code>. When you click "Find My IP," this tool automatically detects which protocol version your connection used and labels the result accordingly. Most modern networks support both protocols through a mechanism called dual stack, where your device receives both an IPv4 and an IPv6 address, and the operating system chooses which to use based on availability and preference settings.</p>
      </section>
      <RelatedTools current="/ip-lookup" />
    </div>
  );
}

export default IpLookup;
