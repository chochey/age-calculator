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
        <p>Paste a JSON array of objects into the input area, or click "Load Sample" to try a pre-filled example that includes nested objects. Click "Convert" and the tool collects every unique field name across all objects to build the CSV header row, then writes one data row per object. The output displays with a row and column count, and you can either copy the CSV text to your clipboard or download it as a ready-to-open <code>.csv</code> file. Everything runs in your browser, so no data is ever uploaded to a server.</p>

        <h2>Handling Nested Objects and Arrays</h2>
        <p>Real-world JSON frequently contains nested structures that have no direct equivalent in a flat CSV format. This converter automatically flattens nested objects using dot-notation keys. For example, an input like <code>{`{"user": {"name": "Alice", "address": {"city": "Denver"}}}`}</code> produces columns named <code>user.name</code> and <code>user.address.city</code>. Nested arrays are serialized as JSON strings within their CSV cell so that no data is lost. Fields that appear in some objects but not others are filled with empty values, keeping every row aligned to the same set of columns.</p>
        <p>Special characters in field values are handled according to CSV conventions. If a value contains a comma, a double quote, or a newline, it is automatically wrapped in quotes and any internal double quotes are escaped by doubling them. This ensures the resulting CSV can be parsed correctly by Excel, Google Sheets, LibreOffice Calc, Python's csv module, and any other standards-compliant reader.</p>

        <h3>What JSON structure does this tool expect?</h3>
        <p>The input must be a JSON array where each element is an object, like <code>[{`{"name":"Alice","age":30}`}, {`{"name":"Bob","age":25}`}]</code>. Each object represents one row and its keys become column headers. If objects have different sets of keys, the converter merges all keys into a unified header and fills missing values with blanks. Primitive array elements, single objects (not wrapped in an array), or non-object array items will trigger a descriptive error message explaining what format is expected.</p>

        <h3>Can I open the downloaded CSV file in Excel or Google Sheets?</h3>
        <p>Yes. The downloaded <code>.csv</code> file uses UTF-8 encoding and standard comma delimiters, which both Microsoft Excel and Google Sheets recognize natively. In Excel, you can open the file directly or use the "Data &gt; From Text/CSV" import wizard if you need to specify encoding options. In Google Sheets, go to File &gt; Import &gt; Upload and select the file. Columns will automatically align with the headers generated by the converter.</p>

        <h3>Is there a limit to how much JSON I can convert?</h3>
        <p>There is no hard limit imposed by the tool because all processing happens client-side in your browser. The practical limit depends on your device's available memory and processing speed. Arrays with several thousand objects and moderate nesting depth convert in under a second on most modern devices. For very large datasets (tens of thousands of rows or deeply nested structures), the conversion may take a few seconds. Using the "Download .csv" button avoids rendering the entire output in the text area, which can be faster for large results.</p>
      </section>
      <RelatedTools current="/json-to-csv" />
    </div>
  );
}

export default JsonToCsv;
