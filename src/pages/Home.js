import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import './Home.css';

const categories = [
  {
    label: 'Calculators',
    id: 'calculators',
    icon: '🔢',
    tools: [
      { name: 'Age Calculator', description: 'Exact age in years, months, days, hours & minutes.', path: '/age-calculator' },
      { name: 'Percentage Calculator', description: 'Percentages, increases, decreases & differences.', path: '/percentage-calculator' },
      { name: 'BMI Calculator', description: 'Body Mass Index with weight category.', path: '/bmi-calculator' },
      { name: 'Tip Calculator', description: 'Tips & bill splitting for any group size.', path: '/tip-calculator' },
      { name: 'Loan Calculator', description: 'Monthly payments, interest & total loan cost.', path: '/loan-calculator' },
      { name: 'Discount Calculator', description: 'Sale prices, savings & final cost with tax.', path: '/discount-calculator' },
      { name: 'GPA Calculator', description: 'Grade point average from courses & credits.', path: '/gpa-calculator' },
    ],
  },
  {
    label: 'Converters',
    id: 'converters',
    icon: '🔄',
    tools: [
      { name: 'Unit Converter', description: 'Length, weight, temperature, volume & speed.', path: '/unit-converter' },
      { name: 'Case Converter', description: 'Uppercase, lowercase, title case, camelCase & more.', path: '/case-converter' },
      { name: 'Color Converter', description: 'Convert between HEX, RGB & HSL formats.', path: '/color-converter' },
      { name: 'Base64 Encoder / Decoder', description: 'Encode text to Base64 or decode back to plain text.', path: '/base64' },
      { name: 'URL Encoder / Decoder', description: 'Encode or decode URLs and query strings.', path: '/url-encoder' },
      { name: 'HTML Entity Encoder', description: 'Encode or decode HTML entities.', path: '/html-entity-encoder' },
    ],
  },
  {
    label: 'Generators',
    id: 'generators',
    icon: '⚡',
    tools: [
      { name: 'Password Generator', description: 'Secure random passwords with strength meter.', path: '/password-generator' },
      { name: 'Random Number Generator', description: 'Random numbers in any range, with or without duplicates.', path: '/random-number-generator' },
      { name: 'Lorem Ipsum Generator', description: 'Placeholder text in paragraphs, sentences or words.', path: '/lorem-ipsum' },
      { name: 'QR Code Generator', description: 'Create QR codes for URLs, text & more.', path: '/qr-code-generator' },
    ],
  },
  {
    label: 'Text & Data',
    id: 'text-data',
    icon: '📝',
    tools: [
      { name: 'Word Counter', description: 'Words, characters, sentences & reading time.', path: '/word-counter' },
      { name: 'JSON Formatter', description: 'Format, validate & minify JSON with error detection.', path: '/json-formatter' },
      { name: 'Date Difference', description: 'Exact time between two dates in days, weeks & months.', path: '/date-difference-calculator' },
      { name: 'Markdown Preview', description: 'Write Markdown and see rendered output live.', path: '/markdown-preview' },
      { name: 'Regex Tester', description: 'Test regex patterns with real-time highlighting.', path: '/regex-tester' },
      { name: 'Countdown Timer', description: 'Count down to any date with live updates.', path: '/countdown-timer' },
      { name: 'Timestamp Converter', description: 'Convert Unix timestamps to dates & back.', path: '/timestamp-converter' },
      { name: 'CSS Gradient Generator', description: 'Create gradients & copy the CSS code.', path: '/css-gradient-generator' },
    ],
  },
];

function Home() {
  return (
    <div>
      <Seo title="Free Online Calculators & Tools" description="QuickCalc offers free online calculators, converters, and generators. Age calculator, BMI calculator, unit converter, password generator, and more." />
      <h1>Free Online Calculators & Tools</h1>
      <p className="subtitle">Fast, free, and easy-to-use tools for everyday calculations.</p>

      {categories.map((cat) => (
        <section key={cat.label} id={cat.id} className="tool-category">
          <h2 className="category-heading">{cat.icon} {cat.label}</h2>
          <div className="tools-grid">
            {cat.tools.map((tool) => (
              <Link to={tool.path} key={tool.path} className="tool-card">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-link">Use tool &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Home;
