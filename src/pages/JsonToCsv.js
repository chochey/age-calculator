import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, fullKey));
    } else if (Array.isArray(value)) {
      result[fullKey] = JSON.stringify(value);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

function escapeCSVField(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function jsonToCsv(jsonArray) {
  if (!Array.isArray(jsonArray)) {
    throw new Error('Input must be a JSON array of objects. Got: ' + typeof jsonArray);
  }
  if (jsonArray.length === 0) {
    throw new Error('JSON array is empty. Provide at least one object.');
  }

  // Flatten all objects
  const flatRows = jsonArray.map((item, index) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error(`Item at index ${index} is not an object. Each element must be a JSON object.`);
    }
    return flattenObject(item);
  });

  // Collect all unique headers in order of appearance
  const headerSet = new Set();
  for (const row of flatRows) {
    for (const key of Object.keys(row)) {
      headerSet.add(key);
    }
  }
  const headers = Array.from(headerSet);

  // Build CSV
  const headerLine = headers.map(escapeCSVField).join(',');
  const dataLines = flatRows.map((row) =>
    headers.map((h) => escapeCSVField(row[h] !== undefined ? row[h] : '')).join(',')
  );

  return [headerLine, ...dataLines].join('\n');
}

function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [colCount, setColCount] = useState(0);

  const convert = () => {
    setError('');
    setOutput('');
    setCopied(false);

    if (!input.trim()) {
      setError('Please paste some JSON data.');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const csv = jsonToCsv(parsed);
      setOutput(csv);

      // Count stats
      const lines = csv.split('\n');
      setRowCount(lines.length - 1); // exclude header
      setColCount(lines[0].split(',').length);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    const sample = JSON.stringify([
      { name: "Alice", age: 30, address: { city: "New York", state: "NY" } },
      { name: "Bob", age: 25, address: { city: "San Francisco", state: "CA" } },
      { name: "Charlie", age: 35, address: { city: "Chicago", state: "IL" } }
    ], null, 2);
    setInput(sample);
    setOutput('');
    setError('');
  };

  return (
    <div>
      <Seo title="JSON to CSV Converter - Convert JSON to CSV Online" description="Free JSON to CSV converter. Paste JSON data and instantly convert to CSV format. Download as .csv file or copy to clipboard." />
      <h1>JSON to CSV Converter</h1>
      <p className="subtitle">Paste a JSON array of objects and convert it to CSV format.</p>

      <textarea
        className="word-textarea"
        placeholder={'Paste your JSON array here...\n\nExample:\n[\n  { "name": "Alice", "age": 30 },\n  { "name": "Bob", "age": 25 }\n]'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        spellCheck={false}
      />

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={convert} className="form-btn">Convert</button>
        <button onClick={loadSample} className="form-btn" style={{ opacity: 0.8 }}>Load Sample</button>
      </div>

      {error && <p className="error" style={{ marginTop: '0.75rem' }}>{error}</p>}

      {output && (
        <div className="converted-output" style={{ marginTop: '1.25rem' }}>
          <div className="output-header">
            <strong>CSV Output</strong>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{rowCount} rows, {colCount} columns</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={copyOutput} className="copy-btn">
                {copied ? 'Copied!' : 'Copy CSV'}
              </button>
              <button onClick={downloadCsv} className="copy-btn">
                Download .csv
              </button>
            </div>
          </div>
          <textarea
            className="word-textarea"
            value={output}
            readOnly
            rows={10}
            spellCheck={false}
          />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the JSON to CSV Converter</h2>
        <p>Paste a JSON array of objects into the input area and click "Convert". The tool will automatically detect all field names from the JSON objects and use them as CSV column headers. The resulting CSV can be copied to your clipboard or downloaded as a .csv file.</p>

        <h2>Nested Object Support</h2>
        <p>This converter handles nested JSON objects by flattening them using dot notation. For example, an object like <code>{`{"address": {"city": "NYC"}}`}</code> will produce a column named <code>address.city</code> with the value "NYC". Nested arrays are serialized as JSON strings.</p>

        <h2>What is CSV?</h2>
        <p>CSV (Comma-Separated Values) is a plain text format for storing tabular data. Each line represents a row, and fields within each row are separated by commas. CSV files can be opened in spreadsheet applications like Microsoft Excel, Google Sheets, and LibreOffice Calc.</p>

        <h2>Common Use Cases</h2>
        <ul>
          <li>Converting API responses to spreadsheet-friendly format</li>
          <li>Exporting data from web applications for analysis</li>
          <li>Migrating data between systems that support different formats</li>
          <li>Creating reports from JSON data sources</li>
          <li>Importing data into databases or spreadsheet tools</li>
        </ul>
      </section>
      <RelatedTools current="/json-to-csv" />
    </div>
  );
}

export default JsonToCsv;
