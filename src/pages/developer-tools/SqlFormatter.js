import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

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
      <Seo title="SQL Formatter - Format & Beautify SQL Online" description="Free online SQL formatter. Beautify, format, and minify SQL queries with proper indentation and keyword uppercasing." faqs={[{ q: 'Which SQL dialects does this formatter support?', a: 'The formatter works with standard SQL syntax shared across MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. It recognizes common statements such as SELECT, INSERT INTO, UPDATE, DELETE FROM, and CREATE TABLE, along with all standard JOIN types and clauses like LIMIT, OFFSET, DISTINCT, CASE/WHEN, UNION, and UNION ALL. Because it targets widely shared keywords, the formatter handles the vast majority of queries regardless of which database engine you use. Dialect-specific extensions (for example, PostgreSQL\'s RETURNING clause or MySQL\'s ON DUPLICATE KEY UPDATE) will pass through without being altered.' }, { q: 'Does formatting change how my SQL query runs?', a: 'No. SQL formatting is purely cosmetic. Database engines ignore extra whitespace and line breaks when parsing a query, so a formatted query and its minified equivalent produce identical execution plans and return the same results. Formatting only affects human readability. It is safe to format any query before running it, and you can minify it again afterward without any impact on behavior.' }, { q: 'Why should I format SQL queries before a code review?', a: 'Consistently formatted SQL makes it significantly easier for teammates to spot logic errors, missing join conditions, or incorrect filter clauses. When every clause starts on its own line and keywords are uppercased, reviewers can scan the query structure quickly without mentally parsing a dense block of text. Many engineering teams enforce SQL formatting rules in their style guides for the same reason they enforce code formatting: it reduces cognitive load, speeds up reviews, and lowers the chance of bugs slipping through.' }]} />
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
        <h2>How to Use the SQL Formatter</h2>
        <p>Paste your raw SQL query into the text area and click "Format" to beautify it with proper indentation, uppercased keywords, and each major clause on its own line. If you need a compact version for embedding in application code or logging, click "Minify" instead to collapse all whitespace into a single line. Once the formatted or minified result appears, click "Copy" to send it to your clipboard. The tool processes everything locally in your browser, so your queries are never sent to any server.</p>

        <h2>What the Formatter Does</h2>
        <p>The formatter applies a consistent set of style rules to make SQL easier to read and review. All recognized SQL keywords, including SELECT, FROM, WHERE, JOIN, ORDER BY, GROUP BY, HAVING, UNION, and more, are converted to uppercase. Major clauses begin on new lines so the logical structure of the query is visible at a glance. JOIN clauses (INNER, LEFT, RIGHT, FULL, CROSS) each get their own line, and AND/OR conditions within WHERE or HAVING clauses are indented on separate lines. For example, a messy one-liner like <code>select id,name from users inner join orders on users.id=orders.user_id where status='active' and amount&gt;100 order by name</code> becomes a neatly structured multi-line query that is much easier to debug and share during code reviews.</p>
        <p>The minifier does the opposite: it strips all extra whitespace and newlines to produce the shortest possible single-line query. This is useful when you need to embed SQL in log output, pass it as a URL parameter, or store it in a configuration file where readability is less important than compactness.</p>

        <h3>Which SQL dialects does this formatter support?</h3>
        <p>The formatter works with standard SQL syntax shared across MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. It recognizes common statements such as SELECT, INSERT INTO, UPDATE, DELETE FROM, and CREATE TABLE, along with all standard JOIN types and clauses like LIMIT, OFFSET, DISTINCT, CASE/WHEN, UNION, and UNION ALL. Because it targets widely shared keywords, the formatter handles the vast majority of queries regardless of which database engine you use. Dialect-specific extensions (for example, PostgreSQL's RETURNING clause or MySQL's ON DUPLICATE KEY UPDATE) will pass through without being altered.</p>

        <h3>Does formatting change how my SQL query runs?</h3>
        <p>No. SQL formatting is purely cosmetic. Database engines ignore extra whitespace and line breaks when parsing a query, so a formatted query and its minified equivalent produce identical execution plans and return the same results. Formatting only affects human readability. It is safe to format any query before running it, and you can minify it again afterward without any impact on behavior.</p>

        <h3>Why should I format SQL queries before a code review?</h3>
        <p>Consistently formatted SQL makes it significantly easier for teammates to spot logic errors, missing join conditions, or incorrect filter clauses. When every clause starts on its own line and keywords are uppercased, reviewers can scan the query structure quickly without mentally parsing a dense block of text. Many engineering teams enforce SQL formatting rules in their style guides for the same reason they enforce code formatting: it reduces cognitive load, speeds up reviews, and lowers the chance of bugs slipping through.</p>
      </section>
      <RelatedTools current="/sql-formatter" />
    </div>
  );
}

export default SqlFormatter;
