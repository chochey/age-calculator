import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import './Home.css';

const categories = [
  {
    label: 'Calculators',
    id: 'calculators',
    icon: '🔢',
    hub: '/calculators',
    tools: [
      { name: 'Age Calculator', description: 'Exact age in years, months, days, hours & minutes.', path: '/age-calculator' },
      { name: 'Percentage Calculator', description: 'Percentages, increases, decreases & differences.', path: '/percentage-calculator' },
      { name: 'BMI Calculator', description: 'Body Mass Index with weight category.', path: '/bmi-calculator' },
      { name: 'Tip Calculator', description: 'Tips & bill splitting for any group size.', path: '/tip-calculator' },
      { name: 'Loan Calculator', description: 'Monthly payments, interest & total loan cost.', path: '/loan-calculator' },
      { name: 'Discount Calculator', description: 'Sale prices, savings & final cost with tax.', path: '/discount-calculator' },
      { name: 'GPA Calculator', description: 'Grade point average from courses & credits.', path: '/gpa-calculator' },
      { name: 'Aspect Ratio Calculator', description: 'Calculate & resize dimensions proportionally.', path: '/aspect-ratio-calculator' },
      { name: 'Salary Calculator', description: 'Convert between annual, monthly, weekly & hourly pay.', path: '/salary-calculator' },
      { name: 'Electricity Cost Calculator', description: 'Estimate appliance running costs per day, month & year.', path: '/electricity-cost-calculator' },
      { name: 'Mortgage Calculator', description: 'Monthly payments, total interest & amortization schedule.', path: '/mortgage-calculator' },
      { name: 'Compound Interest Calculator', description: 'See how savings & investments grow over time.', path: '/compound-interest-calculator' },
      { name: 'Calorie Calculator', description: 'Daily calorie needs based on age, gender & activity.', path: '/calorie-calculator' },
      { name: 'Fuel Cost Calculator', description: 'Estimate gas costs for any trip distance.', path: '/fuel-cost-calculator' },
      { name: 'BMR Calculator', description: 'Basal metabolic rate with two equations.', path: '/bmr-calculator' },
      { name: 'Pace Calculator', description: 'Running pace, time & distance calculator.', path: '/pace-calculator' },
      { name: 'Grade Calculator', description: 'Weighted grades & final exam score needed.', path: '/grade-calculator' },
      { name: 'Savings Goal Calculator', description: 'Monthly savings needed to reach your goal.', path: '/savings-goal-calculator' },
      { name: 'Average Calculator', description: 'Mean, median, mode, range & more.', path: '/average-calculator' },
      { name: 'Area Calculator', description: 'Area & perimeter for rectangles, circles, triangles & more.', path: '/area-calculator' },
      { name: 'Proportion Calculator', description: 'Solve proportions & find the missing value.', path: '/proportion-calculator' },
      { name: 'Profit Margin Calculator', description: 'Margin, markup & revenue from cost and price.', path: '/profit-margin-calculator' },
      { name: 'Body Fat Calculator', description: 'Body fat percentage using the U.S. Navy method.', path: '/body-fat-calculator' },
      { name: 'Inflation Calculator', description: 'See how money value changes over time with inflation.', path: '/inflation-calculator' },
      { name: 'Sleep Calculator', description: 'Find ideal bedtimes & wake times based on sleep cycles.', path: '/sleep-calculator' },
      { name: 'Unit Price Calculator', description: 'Compare product prices to find the best deal.', path: '/unit-price-calculator' },
      { name: 'Standard Deviation Calculator', description: 'Calculate standard deviation, variance & more.', path: '/standard-deviation-calculator' },
      { name: 'Sales Tax Calculator', description: 'Calculate sales tax and total price for any state.', path: '/sales-tax-calculator' },
      { name: 'TDEE Calculator', description: 'Total daily energy expenditure based on activity level.', path: '/tdee-calculator' },
      { name: 'Due Date Calculator', description: 'Estimate your pregnancy due date and milestones.', path: '/due-date-calculator' },
      { name: 'Square Footage Calculator', description: 'Calculate area in sq ft for rooms and projects.', path: '/square-footage-calculator' },
    ],
  },
  {
    label: 'Converters',
    id: 'converters',
    icon: '🔄',
    hub: '/converters',
    tools: [
      { name: 'Unit Converter', description: 'Length, weight, temperature, volume & speed.', path: '/unit-converter' },
      { name: 'Case Converter', description: 'Uppercase, lowercase, title case, camelCase & more.', path: '/case-converter' },
      { name: 'Color Converter', description: 'Convert between HEX, RGB & HSL formats.', path: '/color-converter' },
      { name: 'Base64 Encoder / Decoder', description: 'Encode text to Base64 or decode back to plain text.', path: '/base64' },
      { name: 'URL Encoder / Decoder', description: 'Encode or decode URLs and query strings.', path: '/url-encoder' },
      { name: 'HTML Entity Encoder', description: 'Encode or decode HTML entities.', path: '/html-entity-encoder' },
      { name: 'Number Base Converter', description: 'Convert between binary, decimal, hex & octal.', path: '/number-base-converter' },
      { name: 'Scientific Notation Converter', description: 'Convert numbers to & from scientific notation.', path: '/scientific-notation-converter' },
      { name: 'Time Zone Converter', description: 'Convert times between any time zones worldwide.', path: '/time-zone-converter' },
      { name: 'Text to Binary Converter', description: 'Convert text to binary, hex, octal & decimal.', path: '/text-to-binary' },
      { name: 'HEX to RGB Converter', description: 'Convert hex color codes to RGB & HSL.', path: '/hex-to-rgb' },
      { name: 'Roman Numeral Converter', description: 'Convert numbers to & from Roman numerals.', path: '/roman-numeral-converter' },
      { name: 'PX to REM Converter', description: 'Convert between px, rem & em CSS units.', path: '/px-to-rem' },
      { name: 'Temperature Converter', description: 'Convert between Fahrenheit, Celsius & Kelvin.', path: '/temperature-converter' },
      { name: 'Lbs to Kg Converter', description: 'Convert between pounds and kilograms instantly.', path: '/lbs-to-kg' },
      { name: 'Inches to CM Converter', description: 'Convert between inches and centimeters.', path: '/inches-to-cm' },
    ],
  },
  {
    label: 'Generators',
    id: 'generators',
    icon: '⚡',
    hub: '/generators',
    tools: [
      { name: 'Password Generator', description: 'Secure random passwords with strength meter.', path: '/password-generator' },
      { name: 'Random Number Generator', description: 'Random numbers in any range, with or without duplicates.', path: '/random-number-generator' },
      { name: 'Lorem Ipsum Generator', description: 'Placeholder text in paragraphs, sentences or words.', path: '/lorem-ipsum' },
      { name: 'QR Code Generator', description: 'Create QR codes for URLs, text & more.', path: '/qr-code-generator' },
      { name: 'Invoice Generator', description: 'Create & print professional invoices. No sign-up.', path: '/invoice-generator' },
      { name: 'Color Palette Generator', description: 'Generate harmonious color schemes from any color.', path: '/color-palette-generator' },
      { name: 'UUID Generator', description: 'Generate unique UUIDs (v4) with one click.', path: '/uuid-generator' },
      { name: 'Test Data Generator', description: 'Generate realistic fake data for testing.', path: '/test-data-generator' },
    ],
  },
  {
    label: 'Developer Tools',
    id: 'dev-tools',
    icon: '🛠️',
    hub: '/developer-tools',
    tools: [
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
    ],
  },
  {
    label: 'Image Tools',
    id: 'image-tools',
    icon: '🖼️',
    hub: '/image-tools',
    tools: [
      { name: 'Image Resizer', description: 'Resize images to custom dimensions. PNG, JPG & WebP.', path: '/image-resizer' },
      { name: 'Image Compressor', description: 'Reduce image file size with adjustable quality.', path: '/image-compressor' },
      { name: 'Image Cropper', description: 'Crop images to custom dimensions in your browser.', path: '/image-cropper' },
      { name: 'Image to Base64', description: 'Convert images to Base64 encoded strings.', path: '/image-to-base64' },
    ],
  },
  {
    label: 'Text & Data',
    id: 'text-data',
    icon: '📝',
    hub: '/text-tools',
    tools: [
      { name: 'Word Counter', description: 'Words, characters, sentences & reading time.', path: '/word-counter' },
      { name: 'JSON Formatter', description: 'Format, validate & minify JSON with error detection.', path: '/json-formatter' },
      { name: 'Date Difference', description: 'Exact time between two dates in days, weeks & months.', path: '/date-difference-calculator' },
      { name: 'Markdown Preview', description: 'Write Markdown and see rendered output live.', path: '/markdown-preview' },
      { name: 'Regex Tester', description: 'Test regex patterns with real-time highlighting.', path: '/regex-tester' },
      { name: 'Countdown Timer', description: 'Count down to any date with live updates.', path: '/countdown-timer' },
      { name: 'Timestamp Converter', description: 'Convert Unix timestamps to dates & back.', path: '/timestamp-converter' },
      { name: 'CSS Gradient Generator', description: 'Create gradients & copy the CSS code.', path: '/css-gradient-generator' },
      { name: 'Stopwatch', description: 'Precise stopwatch with lap timing & splits.', path: '/stopwatch' },
      { name: 'Character Map', description: 'Browse & copy special characters, symbols & emoji.', path: '/character-map' },
      { name: 'Typing Speed Test', description: 'Test your WPM typing speed & accuracy.', path: '/typing-speed-test' },
      { name: 'Pomodoro Timer', description: 'Productivity timer with work & break intervals.', path: '/pomodoro-timer' },
      { name: 'Text Repeater', description: 'Repeat any text multiple times with separators.', path: '/text-repeater' },
      { name: 'Coin Flip', description: 'Flip a virtual coin with history & statistics.', path: '/coin-flip' },
      { name: 'Dice Roller', description: 'Roll any dice — d4, d6, d8, d10, d12, d20 & d100.', path: '/dice-roller' },
      { name: 'Flashcard Maker', description: 'Create & study flashcards with keyboard shortcuts.', path: '/flashcard-maker' },
      { name: 'Whitespace Remover', description: 'Clean extra spaces, tabs & blank lines from text.', path: '/whitespace-remover' },
      { name: 'Frequency Counter', description: 'Count word & character frequency with export.', path: '/frequency-counter' },
      { name: 'Readability Checker', description: 'Flesch-Kincaid & other readability scores for any text.', path: '/readability-checker' },
      { name: 'Date Calculator', description: 'Add or subtract days from any date & count business days.', path: '/date-calculator' },
      { name: 'Text Compare', description: 'Compare two texts side by side and see differences.', path: '/text-compare' },
      { name: 'Emoji Picker', description: 'Browse & copy emojis by category with one click.', path: '/emoji-picker' },
    ],
  },
];

function Home() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase().trim();

  const allTools = q
    ? categories.flatMap((cat) =>
        cat.tools.filter(
          (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        )
      )
    : null;

  return (
    <div>
      <Seo title="Free Online Calculators & Tools" description="QuickCalc offers free online calculators, converters, and generators. Age calculator, BMI calculator, unit converter, password generator, and more." />
      <h1>Free Online Calculators & Tools</h1>
      <p className="subtitle">Fast, free, and easy-to-use tools for everyday calculations.</p>

      <div className="search-wrapper">
        <input
          type="text"
          className="search-bar"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {allTools ? (
        allTools.length > 0 ? (
          <div className="tools-grid">
            {allTools.map((tool) => (
              <Link to={tool.path} key={tool.path} className="tool-card">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-link">Use tool &rarr;</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-results">No tools found for "{query}"</p>
        )
      ) : (
        categories.map((cat) => (
          <section key={cat.label} id={cat.id} className="tool-category">
            <Link to={cat.hub} className="category-heading-link">
              <h2 className="category-heading">{cat.icon} {cat.label} <span className="category-arrow">&rarr;</span></h2>
            </Link>
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
        ))
      )}
    </div>
  );
}

export default Home;
