import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function validateIpv4(ip) {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d{1,3}$/.test(p)) return false;
    const n = parseInt(p, 10);
    return n >= 0 && n <= 255 && String(n) === p;
  });
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function intToIp(num) {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join('.');
}

function intToBinary(num) {
  return [
    ((num >>> 24) & 255).toString(2).padStart(8, '0'),
    ((num >>> 16) & 255).toString(2).padStart(8, '0'),
    ((num >>> 8) & 255).toString(2).padStart(8, '0'),
    (num & 255).toString(2).padStart(8, '0'),
  ].join('.');
}

function calcSubnet(ip, cidr) {
  const prefix = parseInt(cidr, 10);
  const ipInt = ipToInt(ip);
  const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalHosts = Math.pow(2, 32 - prefix);
  let usableHosts, firstHost, lastHost;

  if (prefix === 32) {
    usableHosts = 1;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(networkInt);
  } else if (prefix === 31) {
    usableHosts = 2;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  } else {
    usableHosts = totalHosts - 2;
    firstHost = intToIp((networkInt + 1) >>> 0);
    lastHost = intToIp((broadcastInt - 1) >>> 0);
  }

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    subnetMaskBinary: intToBinary(maskInt),
    wildcardMask: intToIp(wildcardInt),
    firstUsable: firstHost,
    lastUsable: lastHost,
    totalHosts,
    usableHosts,
    cidr: prefix,
  };
}

const cidrReference = [
  { cidr: '/32', mask: '255.255.255.255', hosts: 1, desc: 'Single host' },
  { cidr: '/31', mask: '255.255.255.254', hosts: 2, desc: 'Point-to-point link' },
  { cidr: '/30', mask: '255.255.255.252', hosts: 2, desc: 'Smallest usable' },
  { cidr: '/29', mask: '255.255.255.248', hosts: 6, desc: 'Small segment' },
  { cidr: '/28', mask: '255.255.255.240', hosts: 14, desc: '16 addresses' },
  { cidr: '/27', mask: '255.255.255.224', hosts: 30, desc: '32 addresses' },
  { cidr: '/26', mask: '255.255.255.192', hosts: 62, desc: '64 addresses' },
  { cidr: '/25', mask: '255.255.255.128', hosts: 126, desc: '128 addresses' },
  { cidr: '/24', mask: '255.255.255.0', hosts: 254, desc: 'Class C' },
  { cidr: '/23', mask: '255.255.254.0', hosts: 510, desc: '2 Class C\'s' },
  { cidr: '/22', mask: '255.255.252.0', hosts: 1022, desc: '4 Class C\'s' },
  { cidr: '/21', mask: '255.255.248.0', hosts: 2046, desc: '8 Class C\'s' },
  { cidr: '/20', mask: '255.255.240.0', hosts: 4094, desc: '16 Class C\'s' },
  { cidr: '/16', mask: '255.255.0.0', hosts: 65534, desc: 'Class B' },
  { cidr: '/12', mask: '255.240.0.0', hosts: 1048574, desc: 'Private (172.16/12)' },
  { cidr: '/8', mask: '255.0.0.0', hosts: 16777214, desc: 'Class A' },
  { cidr: '/0', mask: '0.0.0.0', hosts: 4294967294, desc: 'Default route' },
];

function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setCopied('');

    const trimmedIp = ip.trim();
    if (!trimmedIp) {
      setError('Please enter an IP address.');
      return;
    }
    if (!validateIpv4(trimmedIp)) {
      setError('Invalid IPv4 address. Each octet must be 0-255 with no leading zeros.');
      return;
    }

    const prefix = parseInt(cidr, 10);
    if (isNaN(prefix) || prefix < 0 || prefix > 32) {
      setError('CIDR prefix must be between 0 and 32.');
      return;
    }

    setResult(calcSubnet(trimmedIp, prefix));
  };

  const copyValue = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  const handleQuickCalc = (cidrStr) => {
    const prefix = cidrStr.replace('/', '');
    setCidr(prefix);
    const trimmedIp = ip.trim();
    if (trimmedIp && validateIpv4(trimmedIp)) {
      setError('');
      setResult(calcSubnet(trimmedIp, parseInt(prefix, 10)));
    }
  };

  return (
    <div>
      <Seo title="Subnet Calculator - QuickCalcs" description="Free online subnet calculator. Calculate network address, broadcast address, subnet mask, and host range from any IP address and CIDR prefix." />
      <h1>Subnet Calculator</h1>
      <p className="subtitle">Calculate subnet details from IP address and CIDR prefix.</p>

      <form onSubmit={handleCalculate} className="form">
        <div className="input-row">
          <div className="input-group" style={{ flex: 3 }}>
            <label>IP Address</label>
            <input
              type="text"
              placeholder="192.168.1.0"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="input-group" style={{ flex: 1, minWidth: '100px' }}>
            <label>CIDR Prefix</label>
            <select
              className="select-input"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
            >
              {Array.from({ length: 33 }, (_, i) => (
                <option key={i} value={i}>/{i}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="results">
          <div className="primary-result" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <span className="age-number" style={{ fontSize: '1.5rem', fontFamily: 'Consolas, monospace' }}>
              {result.networkAddress}/{result.cidr}
            </span>
            <span className="age-label" style={{ margin: 0 }}>Network</span>
          </div>

          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value" style={{ fontSize: '1.1rem', fontFamily: 'Consolas, monospace' }}>{result.networkAddress}</span>
              <span className="detail-label">Network Address</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ fontSize: '1.1rem', fontFamily: 'Consolas, monospace' }}>{result.broadcastAddress}</span>
              <span className="detail-label">Broadcast Address</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ fontSize: '1.1rem', fontFamily: 'Consolas, monospace' }}>{result.firstUsable}</span>
              <span className="detail-label">First Usable Host</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ fontSize: '1.1rem', fontFamily: 'Consolas, monospace' }}>{result.lastUsable}</span>
              <span className="detail-label">Last Usable Host</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.totalHosts.toLocaleString()}</span>
              <span className="detail-label">Total Hosts</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{result.usableHosts.toLocaleString()}</span>
              <span className="detail-label">Usable Hosts</span>
            </div>
          </div>

          <div className="hash-results">
            <div className="hash-row">
              <div className="hash-header">
                <strong>Subnet Mask (Dotted Decimal)</strong>
                <button onClick={() => copyValue('mask', result.subnetMask)} className="copy-btn">
                  {copied === 'mask' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value" style={{ fontSize: '0.95rem' }}>{result.subnetMask}</code>
            </div>
            <div className="hash-row">
              <div className="hash-header">
                <strong>Subnet Mask (Binary)</strong>
                <button onClick={() => copyValue('maskBin', result.subnetMaskBinary)} className="copy-btn">
                  {copied === 'maskBin' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value" style={{ fontSize: '0.95rem' }}>{result.subnetMaskBinary}</code>
            </div>
            <div className="hash-row">
              <div className="hash-header">
                <strong>Wildcard Mask</strong>
                <button onClick={() => copyValue('wildcard', result.wildcardMask)} className="copy-btn">
                  {copied === 'wildcard' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="hash-value" style={{ fontSize: '0.95rem' }}>{result.wildcardMask}</code>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: '#0f172a' }}>Quick CIDR Reference</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>CIDR</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Subnet Mask</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#475569' }}>Usable Hosts</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {cidrReference.map((row) => (
                <tr
                  key={row.cidr}
                  onClick={() => handleQuickCalc(row.cidr)}
                  style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#eef2ff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: '#4f46e5', fontFamily: 'Consolas, monospace' }}>{row.cidr}</td>
                  <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'Consolas, monospace', color: '#475569' }}>{row.mask}</td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>{row.hosts.toLocaleString()}</td>
                  <td style={{ padding: '0.5rem 0.75rem', color: '#64748b' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Click any row to apply that CIDR prefix to your IP address.</p>
      </div>

      <RelatedTools current="/subnet-calculator" />

      <div className="info-section">
        <h2>How to Use the Subnet Calculator</h2>
        <p>Enter any valid IPv4 address in the IP Address field and select a CIDR prefix length from the dropdown. Click "Calculate" and the tool instantly returns the network address, broadcast address, first and last usable host, subnet mask in both dotted-decimal and binary notation, the wildcard mask, and total versus usable host counts. You can also click any row in the Quick CIDR Reference table below to apply that prefix length to your current IP address and see updated results immediately.</p>

        <h2>Understanding CIDR Notation and Subnetting</h2>
        <p>CIDR (Classless Inter-Domain Routing) notation pairs an IP address with a prefix length written after a slash, such as <code>192.168.1.0/24</code>. The prefix length indicates how many of the 32 bits in an IPv4 address belong to the network portion. The remaining bits identify individual hosts. A /24 prefix means 24 network bits and 8 host bits, yielding 256 total addresses (254 usable after subtracting the network and broadcast addresses).</p>
        <p>Subnetting divides a larger network into smaller, more manageable segments called subnets. This reduces the size of broadcast domains, improves security by isolating traffic between departments or services, and makes IP address allocation more efficient. For example, splitting a /24 network into four /26 subnets gives each segment 62 usable addresses, which may be a better fit for smaller office floors or VLANs than a single flat network.</p>
        <p>The <strong>subnet mask</strong> uses contiguous 1-bits for the network portion and 0-bits for the host portion (e.g., <code>255.255.255.0</code> for /24). The <strong>wildcard mask</strong> is its bitwise inverse (<code>0.0.0.255</code>) and is used in Cisco ACLs and OSPF configurations. The <strong>network address</strong> is the first address in the range with all host bits set to 0, and the <strong>broadcast address</strong> is the last with all host bits set to 1.</p>

        <h3>What is the difference between /24, /16, and /8 subnets?</h3>
        <p>These prefixes represent increasingly large networks. A /24 subnet has a mask of <code>255.255.255.0</code> and provides 254 usable host addresses, suitable for a small office or a single VLAN. A /16 subnet uses <code>255.255.0.0</code> and offers 65,534 usable hosts, commonly seen in medium-to-large campus networks. A /8 subnet with <code>255.0.0.0</code> supports over 16 million hosts and corresponds to the entire <code>10.0.0.0/8</code> private range used in large enterprise and cloud environments. Choosing the right prefix size prevents wasted addresses and keeps broadcast traffic under control.</p>

        <h3>What are private IP address ranges and when should I use them?</h3>
        <p>RFC 1918 reserves three address blocks for private use: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, and <code>192.168.0.0/16</code>. These addresses are not routable on the public internet, so they can be used freely inside local networks without coordination with an ISP. Home routers typically assign addresses from the <code>192.168.x.x</code> range, while enterprises often use <code>10.x.x.x</code> for its larger address space. Devices on private networks reach the internet through Network Address Translation (NAT), which maps private addresses to a shared public IP.</p>

        <h3>What is a /31 subnet and why is it used for point-to-point links?</h3>
        <p>A /31 subnet contains exactly two addresses with no network or broadcast address, as defined in RFC 3021. This makes it ideal for point-to-point connections between two routers where only two IP addresses are needed. Before /31 support, engineers used /30 subnets for the same purpose, but that wastes two of the four addresses on network and broadcast. Using /31 subnets conserves IP space, which is especially valuable in large service-provider networks with thousands of router-to-router links.</p>
      </div>
    </div>
  );
}

export default SubnetCalculator;
