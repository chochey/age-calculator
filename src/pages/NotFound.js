import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | QuickCalcs"
        description="The page you're looking for doesn't exist. Browse our collection of 97+ free online calculators, converters, and tools."
      />

      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.5rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
          The page you're looking for doesn't exist or has been moved.
          Try one of our popular tools below.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <Link to="/age-calculator" style={linkStyle}>Age Calculator</Link>
          <Link to="/bmi-calculator" style={linkStyle}>BMI Calculator</Link>
          <Link to="/percentage-calculator" style={linkStyle}>Percentage Calculator</Link>
          <Link to="/password-generator" style={linkStyle}>Password Generator</Link>
          <Link to="/unit-converter" style={linkStyle}>Unit Converter</Link>
          <Link to="/json-formatter" style={linkStyle}>JSON Formatter</Link>
        </div>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: '#4f46e5',
            color: '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Back to Homepage
        </Link>
      </div>
    </>
  );
}

const linkStyle = {
  padding: '0.5rem 1rem',
  background: '#eef2ff',
  color: '#4f46e5',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 600,
};

export default NotFound;
