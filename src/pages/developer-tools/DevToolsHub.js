import CategoryHub from '../../components/CategoryHub';

const tools = [
  { name: 'Diff Checker', description: 'Compare two texts and see differences highlighted.', path: '/diff-checker' },
  { name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-384 & SHA-512 hashes.', path: '/hash-generator' },
  { name: 'JWT Decoder', description: 'Decode JSON Web Tokens to inspect header & payload.', path: '/jwt-decoder' },
  { name: 'Chmod Calculator', description: 'Linux file permissions in numeric & symbolic notation.', path: '/chmod-calculator' },
  { name: 'SQL Formatter', description: 'Format, beautify & minify SQL queries.', path: '/sql-formatter' },
  { name: 'Cron Expression Builder', description: 'Visual cron schedule builder with descriptions.', path: '/cron-expression-builder' },
  { name: 'Box Shadow Generator', description: 'Create CSS box shadows visually & copy the code.', path: '/box-shadow-generator' },
  { name: 'JSON to CSV Converter', description: 'Convert JSON data to CSV format & download.', path: '/json-to-csv' },
  { name: 'CSV to JSON Converter', description: 'Convert CSV data to JSON format & download.', path: '/csv-to-json' },
  { name: 'IP Address Lookup', description: 'Find your public IP address instantly.', path: '/ip-lookup' },
  { name: 'Subnet Calculator', description: 'Network address, subnet mask & host range.', path: '/subnet-calculator' },
  { name: 'Meta Tag Generator', description: 'Generate SEO meta tags with Google preview.', path: '/meta-tag-generator' },
  { name: 'Screen Resolution Checker', description: 'Live screen size, DPR & viewport info.', path: '/screen-resolution' },
  { name: 'Color Blindness Simulator', description: 'Simulate color vision deficiencies on any color.', path: '/color-blindness-simulator' },
  { name: 'JSON Validator', description: 'Validate JSON syntax with detailed error messages.', path: '/json-validator' },
  { name: 'HTML Formatter', description: 'Format, beautify & minify HTML code.', path: '/html-formatter' },
];

const faqs = [
  {
    q: 'Are these developer tools free to use?',
    a: 'Yes. Every tool on this page is completely free with no usage limits, no sign-up required, and no watermarks or restrictions on the output. You can use them as often as you need for personal or commercial projects.',
  },
  {
    q: 'Is my data safe when I use browser-based developer tools?',
    a: 'Absolutely. All processing happens directly in your browser using client-side JavaScript. Your code, tokens, queries, and other input never leave your device -- nothing is sent to a server, stored in a database, or logged anywhere. Your data stays entirely under your control.',
  },
  {
    q: 'Can I use these tools on mobile devices?',
    a: 'Yes. The tools are fully responsive and work on phones and tablets as well as desktop browsers. While some tasks like writing SQL or inspecting JWTs are easier on a larger screen, every tool is functional on mobile for quick checks on the go.',
  },
];

function DevToolsHub() {
  return (
    <CategoryHub
      title="Free Online Developer Tools - JSON, SQL, Hash, JWT & More"
      description="16 free developer tools for formatting, encoding, hashing, debugging, and web development. JSON, SQL, JWT, chmod, cron, subnet, and more -- all in your browser."
      intro="14 free browser-based developer tools for formatting, encoding, hashing, and debugging."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Free Developer Tools</h2>
        <p>
          This collection brings together 16 essential developer utilities that cover the most
          common tasks you encounter during day-to-day coding. Whether you need to format a messy
          SQL query, decode a JWT to inspect its claims, generate cryptographic hashes for integrity
          checks, or convert data between JSON and CSV, you will find a dedicated tool here that
          handles the job in seconds. Each utility is designed around a single, focused purpose so
          you can get in, complete your task, and move on without distraction. The tools span
          several areas of development -- from networking helpers like subnet calculators and IP
          lookups to front-end aids like box shadow generators and color blindness simulators. We
          built them to be fast, accurate, and straightforward so that both seasoned engineers and
          newcomers can rely on them with equal confidence.
        </p>

        <h2>Browser-Based Development Workflow</h2>
        <p>
          Running these tools directly in the browser removes the friction of installing CLI
          programs, managing dependencies, or switching between terminal windows. You do not need to
          remember obscure command flags or pipe output between utilities -- just open a page, paste
          your input, and get results instantly. Because everything executes client-side, there is
          no network latency for processing and no risk of sensitive data leaving your machine. This
          makes browser-based tools especially useful when you are working on a locked-down
          corporate laptop where installing software requires IT approval, or when you need a quick
          answer from a phone or tablet while away from your main workstation. Bookmarking the tools
          you use most gives you a lightweight, portable development toolkit that is always one click
          away, regardless of which device or operating system you happen to be using at the time.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Are these developer tools free to use?</h3>
        <p>
          Yes. Every tool on this page is completely free with no usage limits, no sign-up required,
          and no watermarks or restrictions on the output. You can use them as often as you need for
          personal or commercial projects.
        </p>

        <h3>Is my data safe when I use browser-based developer tools?</h3>
        <p>
          Absolutely. All processing happens directly in your browser using client-side JavaScript.
          Your code, tokens, queries, and other input never leave your device -- nothing is sent to
          a server, stored in a database, or logged anywhere. Your data stays entirely under your
          control.
        </p>

        <h3>Can I use these tools on mobile devices?</h3>
        <p>
          Yes. The tools are fully responsive and work on phones and tablets as well as desktop
          browsers. While some tasks like writing SQL or inspecting JWTs are easier on a larger
          screen, every tool is functional on mobile for quick checks on the go.
        </p>
      </section>
    </CategoryHub>
  );
}

export default DevToolsHub;
