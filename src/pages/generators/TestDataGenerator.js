import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const FIRST_NAMES = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Andrew', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Joshua', 'Emily', 'Kenneth', 'Donna'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com', 'icloud.com', 'mail.com', 'fastmail.com', 'zoho.com', 'aol.com'];
const STREET_NAMES = ['Main', 'Oak', 'Maple', 'Cedar', 'Elm', 'Pine', 'Washington', 'Lake', 'Hill', 'Park', 'Walnut', 'Sunset', 'River', 'Spring', 'Highland', 'Meadow', 'Forest', 'Bridge', 'Valley', 'Church'];
const STREET_TYPES = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Ct', 'Pl', 'Cir'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Jacksonville', 'San Jose', 'Columbus', 'Charlotte', 'Indianapolis', 'Denver', 'Seattle', 'Nashville', 'Portland', 'Memphis'];
const STATES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
const AREA_CODES = ['212', '310', '312', '404', '415', '503', '512', '602', '617', '702', '713', '718', '773', '804', '813', '832', '847', '901', '917', '972'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName() {
  return pick(FIRST_NAMES) + ' ' + pick(LAST_NAMES);
}

function generateEmail() {
  const first = pick(FIRST_NAMES).toLowerCase();
  const last = pick(LAST_NAMES).toLowerCase();
  const sep = pick(['.', '_', '']);
  const num = Math.random() > 0.5 ? randInt(1, 99) : '';
  return first + sep + last + num + '@' + pick(DOMAINS);
}

function generatePhone() {
  const area = pick(AREA_CODES);
  const mid = String(randInt(200, 999));
  const end = String(randInt(1000, 9999));
  return '(' + area + ') ' + mid + '-' + end;
}

function generateAddress() {
  const num = randInt(100, 9999);
  return num + ' ' + pick(STREET_NAMES) + ' ' + pick(STREET_TYPES) + ', ' + pick(CITIES) + ', ' + pick(STATES) + ' ' + String(randInt(10000, 99999));
}

function generateDate() {
  const year = randInt(1970, 2026);
  const month = String(randInt(1, 12)).padStart(2, '0');
  const day = String(randInt(1, 28)).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function generateNumber() {
  return randInt(1, 100000);
}

const FIELD_GENERATORS = {
  name: generateName,
  email: generateEmail,
  phone: generatePhone,
  address: generateAddress,
  date: generateDate,
  number: generateNumber,
};

function generateRecords(fields, count) {
  return Array.from({ length: count }, () => {
    const record = {};
    fields.forEach((field) => {
      record[field] = FIELD_GENERATORS[field]();
    });
    return record;
  });
}

function toCSV(records, fields) {
  const header = fields.join(',');
  const rows = records.map((r) => fields.map((f) => {
    const val = String(r[f]);
    return val.includes(',') || val.includes('"') ? '"' + val.replace(/"/g, '""') + '"' : val;
  }).join(','));
  return [header, ...rows].join('\n');
}

function TestDataGenerator() {
  const [fields, setFields] = useState({ name: true, email: true, phone: false, address: false, date: false, number: false });
  const [quantity, setQuantity] = useState(10);
  const [format, setFormat] = useState('json');
  const [output, setOutput] = useState('');
  const [records, setRecords] = useState([]);
  const [copied, setCopied] = useState(false);

  const activeFields = Object.entries(fields).filter(([, v]) => v).map(([k]) => k);

  const generate = () => {
    if (activeFields.length === 0) return;
    const count = Math.max(1, Math.min(50, quantity));
    const data = generateRecords(activeFields, count);
    setRecords(data);
    if (format === 'json') {
      setOutput(JSON.stringify(data, null, 2));
    } else {
      setOutput(toCSV(data, activeFields));
    }
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleField = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <Seo title="Test Data Generator - Create Fake Names, Emails & Addresses" description="Generate realistic fake test data instantly. Create random names, emails, phone numbers, addresses, dates, and numbers. Export as JSON or CSV for development and testing." faqs={[{ q: 'Is the generated data real or fake?', a: 'All data is entirely fake and randomly generated in your browser. Names, emails, phone numbers, and addresses are assembled from predefined lists and random values. None of it corresponds to real people or locations, making it safe for testing and development.' }, { q: 'Can I use this data for database testing?', a: 'Yes. The generated data is ideal for seeding development databases, testing form validation, building UI prototypes, and running automated tests. Export as JSON for APIs or CSV for spreadsheet and database imports.' }, { q: 'How many records can I generate at once?', a: 'You can generate up to 50 records per batch. For larger datasets, simply generate multiple batches and combine the output. Each generation produces completely new random data.' }]} />
      <h1>Test Data Generator</h1>
      <p className="subtitle">Generate realistic fake data for development and testing.</p>

      <div className="form">
        <div className="input-group">
          <label>Select Fields</label>
          <div className="checkbox-group">
            {Object.keys(FIELD_GENERATORS).map((field) => (
              <label key={field} className="checkbox-label">
                <input type="checkbox" checked={fields[field]} onChange={() => toggleField(field)} />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Quantity (1-50)</label>
          <input type="number" min="1" max="50" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-input" />
        </div>

        <div className="input-group">
          <label>Output Format</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="radio" name="format" value="json" checked={format === 'json'} onChange={() => setFormat('json')} />
              JSON
            </label>
            <label className="checkbox-label">
              <input type="radio" name="format" value="csv" checked={format === 'csv'} onChange={() => setFormat('csv')} />
              CSV
            </label>
          </div>
        </div>

        <button onClick={generate} className="form-btn" disabled={activeFields.length === 0}>Generate Test Data</button>
        {activeFields.length === 0 && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>Select at least one field.</p>}
      </div>

      {output && (
        <div className="results">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong>{records.length} Record{records.length > 1 ? 's' : ''} ({format.toUpperCase()})</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '400px', overflowY: 'auto', fontSize: '0.85rem' }}>{output}</pre>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Test Data Generator</h2>
        <ol>
          <li>Check the boxes for the data fields you need: name, email, phone, address, date, or number. You can select any combination.</li>
          <li>Set the quantity of records to generate, from 1 to 50 per batch.</li>
          <li>Choose your preferred output format: JSON for APIs and JavaScript applications, or CSV for spreadsheets and database imports.</li>
          <li>Click "Generate Test Data" to create your dataset instantly.</li>
          <li>Click "Copy" to copy the entire output to your clipboard, ready to paste into your project.</li>
        </ol>

        <h2>How the Generator Works</h2>
        <p>This tool assembles realistic-looking fake data by combining elements from curated lists. Names are built by pairing random first names with random last names drawn from the most common names in the United States. Email addresses combine name fragments with popular email domains and optional numeric suffixes. Phone numbers use real US area codes paired with randomly generated subscriber numbers. Addresses combine random street numbers, street names, street types, cities, states, and ZIP codes. All generation happens entirely in your browser — no data is sent to any server, and no external libraries are used. The result is lightweight, privacy-safe test data you can generate offline.</p>

        <h2>When to Use Fake Test Data</h2>
        <ul>
          <li>Seeding development and staging databases with realistic sample records</li>
          <li>Testing form validation, input parsing, and error handling logic</li>
          <li>Building UI prototypes and demos with populated content</li>
          <li>Running automated test suites that require varied input data</li>
          <li>Creating sample datasets for documentation and tutorials</li>
          <li>Load testing APIs and services with diverse payloads</li>
        </ul>

        <h3>Is the generated data real or fake?</h3>
        <p>All data is entirely fake and randomly generated in your browser. Names, emails, phone numbers, and addresses are assembled from predefined lists and random values. None of it corresponds to real people or locations, making it safe for testing and development.</p>

        <h3>Can I use this data for database testing?</h3>
        <p>Yes. The generated data is ideal for seeding development databases, testing form validation, building UI prototypes, and running automated tests. Export as JSON for APIs or CSV for spreadsheet and database imports.</p>

        <h3>How many records can I generate at once?</h3>
        <p>You can generate up to 50 records per batch. For larger datasets, simply generate multiple batches and combine the output. Each generation produces completely new random data.</p>
      </section>
      <RelatedTools current="/test-data-generator" />
    </div>
  );
}

export default TestDataGenerator;
