import { Link } from 'react-router-dom';
import './Home.css';

const tools = [
  {
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes.',
    path: '/age-calculator',
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and differences easily.',
    path: '/percentage-calculator',
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and estimate reading time.',
    path: '/word-counter',
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and see your weight category.',
    path: '/bmi-calculator',
  },
  {
    name: 'Tip Calculator',
    description: 'Calculate tips and split the bill between any number of people.',
    path: '/tip-calculator',
  },
  {
    name: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, camelCase, and more.',
    path: '/case-converter',
  },
  {
    name: 'Date Difference Calculator',
    description: 'Find the exact time between any two dates in days, weeks, and months.',
    path: '/date-difference-calculator',
  },
  {
    name: 'Random Number Generator',
    description: 'Generate random numbers in any range with or without duplicates.',
    path: '/random-number-generator',
  },
  {
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and minify JSON data with syntax error detection.',
    path: '/json-formatter',
  },
  {
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, and HSL formats.',
    path: '/color-converter',
  },
  {
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character types.',
    path: '/password-generator',
  },
  {
    name: 'Unit Converter',
    description: 'Convert between units of length, weight, temperature, volume, and speed.',
    path: '/unit-converter',
  },
  {
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and total cost of any loan.',
    path: '/loan-calculator',
  },
  {
    name: 'Base64 Encoder / Decoder',
    description: 'Encode text to Base64 or decode Base64 strings back to plain text.',
    path: '/base64',
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in paragraphs, sentences, or words.',
    path: '/lorem-ipsum',
  },
];

function Home() {
  return (
    <div>
      <h1>Free Online Calculators & Tools</h1>
      <p className="subtitle">Fast, free, and easy-to-use tools for everyday calculations.</p>

      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.path} className="tool-card">
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
            <span className="tool-link">Use tool &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
