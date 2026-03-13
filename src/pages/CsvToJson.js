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
        <p>Paste your CSV data into the input area or click "Load Sample" to try a pre-filled example. Click "Convert" and the tool parses the first row as column headers, then turns every subsequent row into a JSON object whose keys match those headers. The output appears as a prettily formatted JSON array that you can copy to your clipboard or download directly as a <code>.json</code> file. A small counter above the output tells you exactly how many rows and columns were processed.</p>

        <h2>Parsing Rules and Type Detection</h2>
        <p>The converter follows RFC 4180 conventions for CSV parsing. Quoted fields that contain commas, newlines, or double-quote characters are handled correctly. For instance, a value like <code>"San Francisco, CA"</code> is treated as a single field rather than being split at the comma. Escaped quotes inside a quoted field use the doubled-quote convention: <code>"She said ""hello"""</code> becomes <code>She said "hello"</code> in the JSON output. Duplicate header names are rejected with a clear error message to prevent ambiguous data.</p>
        <p>Values are automatically cast to their most appropriate JSON type. Pure numeric strings become JSON numbers, the literals <code>true</code> and <code>false</code> become booleans, and <code>null</code> is preserved as a JSON null. Everything else remains a string. This means the resulting JSON is well-typed and ready to be consumed by an API, database import script, or front-end application without additional processing.</p>

        <h3>What is the difference between CSV and JSON formats?</h3>
        <p>CSV (Comma-Separated Values) stores data as plain-text rows and columns, making it easy to open in spreadsheet software like Excel or Google Sheets. JSON (JavaScript Object Notation) represents data as nested key-value pairs and arrays, making it the standard format for web APIs and modern applications. CSV is flat and compact but cannot express hierarchical relationships, while JSON supports nesting and mixed types. Converting from CSV to JSON is a common step when migrating spreadsheet data into a web application or preparing payloads for a REST API.</p>

        <h3>Can I convert a CSV file with thousands of rows?</h3>
        <p>Yes. The converter processes data entirely in your browser using JavaScript, so there is no file-size limit imposed by a server. Performance depends on your device's memory and processing power, but modern browsers handle tens of thousands of rows without issue. For extremely large datasets (hundreds of thousands of rows), you may experience a brief delay while the JSON string is generated and rendered in the output area. In those cases, using the "Download .json" button is faster than copying to the clipboard.</p>

        <h3>Is my CSV data sent to a server for conversion?</h3>
        <p>No. Every step of the parsing and conversion happens locally in your browser. Your data never leaves your device, which makes this tool safe for proprietary datasets, personally identifiable information, financial records, or any other sensitive content. When you close or refresh the page, the data is discarded entirely.</p>
      </section>
      <RelatedTools current="/csv-to-json" />
    </div>
  );
}

export default CsvToJson;
