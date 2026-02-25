import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        // Check for escaped quote (double quote)
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }

  // If still in quotes at end of line, the CSV is malformed
  if (inQuotes) {
    throw new Error('Malformed CSV: unclosed quoted field detected.');
  }

  fields.push(current);
  return fields;
}

function csvToJson(csvText) {
  const rawLines = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split into lines, handling quoted fields that may contain newlines
  const lines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < rawLines.length; i++) {
    const ch = rawLines[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      currentLine += ch;
    } else if (ch === '\n' && !inQuotes) {
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += ch;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine);
  }

  if (lines.length === 0) {
    throw new Error('CSV data is empty.');
  }

  if (lines.length === 1) {
    throw new Error('CSV must have at least a header row and one data row.');
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());

  if (headers.length === 0 || headers.every((h) => h === '')) {
    throw new Error('No valid headers found in the first row.');
  }

  const duplicateHeaders = headers.filter((h, i) => headers.indexOf(h) !== i);
  if (duplicateHeaders.length > 0) {
    throw new Error('Duplicate headers detected: ' + [...new Set(duplicateHeaders)].join(', '));
  }

  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const val = j < values.length ? values[j] : '';
      // Auto-detect numbers and booleans
      if (val === '') {
        obj[headers[j]] = '';
      } else if (val === 'true') {
        obj[headers[j]] = true;
      } else if (val === 'false') {
        obj[headers[j]] = false;
      } else if (val === 'null') {
        obj[headers[j]] = null;
      } else if (!isNaN(val) && val.trim() !== '') {
        obj[headers[j]] = Number(val);
      } else {
        obj[headers[j]] = val;
      }
    }
    result.push(obj);
  }

  return result;
}

const sampleCsv = `name,age,city,occupation
Alice,30,"New York",Engineer
Bob,25,"San Francisco",Designer
Charlie,35,"Chicago, IL",Manager
Diana,28,"Los Angeles","Data Scientist"
Eve,32,Seattle,Developer`;

function CsvToJson() {
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
    setRowCount(0);
    setColCount(0);

    if (!input.trim()) {
      setError('Please paste some CSV data.');
      return;
    }

    try {
      const jsonResult = csvToJson(input);
      const formatted = JSON.stringify(jsonResult, null, 2);
      setOutput(formatted);
      setRowCount(jsonResult.length);
      setColCount(Object.keys(jsonResult[0] || {}).length);
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

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(sampleCsv);
    setOutput('');
    setError('');
    setCopied(false);
    setRowCount(0);
    setColCount(0);
  };

  return (
    <div>
      <Seo title="CSV to JSON Converter - Convert CSV to JSON Online" description="Free CSV to JSON converter. Paste CSV data and instantly convert to JSON format. Download as .json file or copy to clipboard." />
      <h1>CSV to JSON Converter</h1>
      <p className="subtitle">Paste CSV data with headers and convert it to JSON format.</p>

      <textarea
        className="word-textarea"
        placeholder={'Paste your CSV data here...\n\nExample:\nname,age,city\nAlice,30,New York\nBob,25,San Francisco'}
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
            <strong>JSON Output</strong>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{rowCount} rows, {colCount} columns</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={copyOutput} className="copy-btn">
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
              <button onClick={downloadJson} className="copy-btn">
                Download .json
              </button>
            </div>
          </div>
          <textarea
            className="word-textarea"
            value={output}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      )}

      <section className="info-section">
        <h2>How to Use the CSV to JSON Converter</h2>
        <p>Paste your CSV data into the input area and click "Convert". The first row of your CSV is automatically detected as column headers and used as JSON property names. Each subsequent row becomes a JSON object in the resulting array. You can copy the output to your clipboard or download it as a .json file.</p>

        <h2>Quoted Fields and Special Characters</h2>
        <p>This converter correctly handles quoted fields that contain commas, newlines, or double quotes. For example, a field like <code>"Chicago, IL"</code> will be parsed as a single value rather than being split at the comma. Double quotes inside quoted fields can be escaped by doubling them: <code>"She said ""hello"""</code>.</p>

        <h2>Automatic Type Detection</h2>
        <p>Numeric values are automatically converted to JSON numbers, <code>true</code> and <code>false</code> become booleans, and <code>null</code> is preserved as a JSON null value. All other values remain as strings. This ensures the resulting JSON is well-typed and ready for use in applications.</p>

        <h2>What is CSV?</h2>
        <p>CSV (Comma-Separated Values) is a simple, widely-used file format for storing tabular data. Each row is on a separate line, and columns are separated by commas. CSV files are commonly exported from spreadsheet software like Microsoft Excel, Google Sheets, and databases.</p>

        <h2>What is JSON?</h2>
        <p>JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. JSON is the dominant format for APIs and web applications, making CSV-to-JSON conversion a common need for developers and data analysts.</p>

        <h2>Common Use Cases</h2>
        <ul>
          <li>Converting spreadsheet exports to API-compatible JSON format</li>
          <li>Preparing data for import into web applications or databases</li>
          <li>Transforming CSV log files into structured JSON for analysis</li>
          <li>Converting data between systems that use different formats</li>
          <li>Creating JSON fixture data from CSV spreadsheets for testing</li>
        </ul>
      </section>
      <RelatedTools current="/csv-to-json" />
    </div>
  );
}

export default CsvToJson;
