import { useState } from 'react';
import Seo from '../components/Seo';

const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
  'DROP TABLE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN',
  'ON', 'AS', 'IN', 'NOT', 'NULL', 'IS', 'LIKE', 'BETWEEN', 'EXISTS', 'UNION', 'UNION ALL',
  'LIMIT', 'OFFSET', 'DISTINCT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC'];

function formatSql(sql) {
  let result = sql.trim();

  // Normalize whitespace
  result = result.replace(/\s+/g, ' ');

  // Uppercase keywords
  keywords.forEach((kw) => {
    const regex = new RegExp('\\b' + kw.replace(' ', '\\s+') + '\\b', 'gi');
    result = result.replace(regex, kw);
  });

  // Add newlines before major clauses
  const majorClauses = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'LIMIT', 'UNION', 'UNION ALL'];
  majorClauses.forEach((clause) => {
    const regex = new RegExp('\\b(' + clause.replace(' ', '\\s+') + ')\\b', 'g');
    result = result.replace(regex, '\n' + clause);
  });

  // Newlines before JOINs
  const joinTypes = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN'];
  joinTypes.forEach((jt) => {
    const regex = new RegExp('\\b(' + jt.replace(' ', '\\s+') + ')\\b', 'g');
    result = result.replace(regex, '\n' + jt);
  });

  // Indent after SELECT, WHERE, SET, etc.
  const lines = result.split('\n').map((l) => l.trim()).filter(Boolean);
  const formatted = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();
    if (upper.startsWith('SELECT') || upper.startsWith('FROM') || upper.startsWith('WHERE') ||
        upper.startsWith('ORDER BY') || upper.startsWith('GROUP BY') || upper.startsWith('HAVING') ||
        upper.startsWith('INSERT') || upper.startsWith('VALUES') || upper.startsWith('UPDATE') ||
        upper.startsWith('SET') || upper.startsWith('DELETE') || upper.startsWith('LIMIT') ||
        upper.startsWith('UNION') || upper.match(/JOIN\b/)) {
      formatted.push(line);
    } else {
      formatted.push('  ' + line);
    }
  }

  // Add AND/OR on new indented lines
  let finalResult = formatted.join('\n');
  finalResult = finalResult.replace(/\s+(AND)\s+/g, '\n  AND ');
  finalResult = finalResult.replace(/\s+(OR)\s+/g, '\n  OR ');

  return finalResult.trim();
}

function minifySql(sql) {
  return sql.replace(/\s+/g, ' ').replace(/\s*([,()])\s*/g, '$1').trim();
}

function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => setOutput(formatSql(input));
  const minify = () => setOutput(minifySql(input));
  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Seo title="SQL Formatter - Format & Beautify SQL Online" description="Free online SQL formatter. Beautify, format, and minify SQL queries with proper indentation and keyword uppercasing." />
      <h1>SQL Formatter</h1>
      <p className="subtitle">Format, beautify, and minify SQL queries.</p>

      <textarea
        className="word-textarea code-textarea"
        placeholder="Paste your SQL query here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        spellCheck={false}
      />

      <div className="json-buttons" style={{ marginTop: '0.75rem' }}>
        <button onClick={format} className="form-btn">Format</button>
        <button onClick={minify} className="form-btn secondary">Minify</button>
      </div>

      {output && (
        <div className="converted-output" style={{ marginTop: '1rem' }}>
          <div className="output-header">
            <strong>Result</strong>
            <button onClick={copy} className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <textarea className="word-textarea code-textarea" value={output} readOnly rows={10} spellCheck={false} />
        </div>
      )}

      <section className="info-section">
        <h2>SQL Formatting Rules</h2>
        <ul>
          <li>SQL keywords are uppercased (SELECT, FROM, WHERE, etc.)</li>
          <li>Major clauses start on new lines</li>
          <li>AND/OR conditions are indented on separate lines</li>
          <li>JOINs are placed on their own lines</li>
        </ul>

        <h2>Supported SQL</h2>
        <p>Works with standard SQL syntax including SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, and JOIN queries. Supports MySQL, PostgreSQL, SQLite, and SQL Server syntax.</p>
      </section>
    </div>
  );
}

export default SqlFormatter;
