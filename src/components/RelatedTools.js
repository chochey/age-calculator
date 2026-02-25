import { Link } from 'react-router-dom';

const allTools = {
  '/age-calculator': 'Age Calculator',
  '/percentage-calculator': 'Percentage Calculator',
  '/bmi-calculator': 'BMI Calculator',
  '/tip-calculator': 'Tip Calculator',
  '/loan-calculator': 'Loan Calculator',
  '/discount-calculator': 'Discount Calculator',
  '/gpa-calculator': 'GPA Calculator',
  '/aspect-ratio-calculator': 'Aspect Ratio Calculator',
  '/salary-calculator': 'Salary Calculator',
  '/electricity-cost-calculator': 'Electricity Cost Calculator',
  '/unit-converter': 'Unit Converter',
  '/case-converter': 'Case Converter',
  '/color-converter': 'Color Converter',
  '/base64': 'Base64 Encoder / Decoder',
  '/url-encoder': 'URL Encoder / Decoder',
  '/html-entity-encoder': 'HTML Entity Encoder',
  '/number-base-converter': 'Number Base Converter',
  '/scientific-notation-converter': 'Scientific Notation Converter',
  '/password-generator': 'Password Generator',
  '/random-number-generator': 'Random Number Generator',
  '/lorem-ipsum': 'Lorem Ipsum Generator',
  '/qr-code-generator': 'QR Code Generator',
  '/invoice-generator': 'Invoice Generator',
  '/color-palette-generator': 'Color Palette Generator',
  '/diff-checker': 'Diff Checker',
  '/hash-generator': 'Hash Generator',
  '/jwt-decoder': 'JWT Decoder',
  '/chmod-calculator': 'Chmod Calculator',
  '/sql-formatter': 'SQL Formatter',
  '/cron-expression-builder': 'Cron Expression Builder',
  '/box-shadow-generator': 'Box Shadow Generator',
  '/image-resizer': 'Image Resizer',
  '/image-compressor': 'Image Compressor',
  '/word-counter': 'Word Counter',
  '/json-formatter': 'JSON Formatter',
  '/date-difference-calculator': 'Date Difference Calculator',
  '/markdown-preview': 'Markdown Preview',
  '/regex-tester': 'Regex Tester',
  '/countdown-timer': 'Countdown Timer',
  '/timestamp-converter': 'Timestamp Converter',
  '/css-gradient-generator': 'CSS Gradient Generator',
  '/stopwatch': 'Stopwatch',
  '/character-map': 'Character Map',
  '/mortgage-calculator': 'Mortgage Calculator',
  '/compound-interest-calculator': 'Compound Interest Calculator',
  '/calorie-calculator': 'Calorie Calculator',
  '/time-zone-converter': 'Time Zone Converter',
  '/json-to-csv': 'JSON to CSV Converter',
  '/text-to-binary': 'Text to Binary Converter',
  '/fuel-cost-calculator': 'Fuel Cost Calculator',
  '/bmr-calculator': 'BMR Calculator',
  '/hex-to-rgb': 'HEX to RGB Converter',
  '/csv-to-json': 'CSV to JSON Converter',
  '/ip-lookup': 'IP Address Lookup',
  '/roman-numeral-converter': 'Roman Numeral Converter',
};

const related = {
  '/age-calculator': ['/date-difference-calculator', '/countdown-timer', '/percentage-calculator'],
  '/percentage-calculator': ['/discount-calculator', '/tip-calculator', '/loan-calculator'],
  '/bmi-calculator': ['/unit-converter', '/percentage-calculator', '/salary-calculator'],
  '/tip-calculator': ['/percentage-calculator', '/discount-calculator', '/salary-calculator'],
  '/loan-calculator': ['/percentage-calculator', '/discount-calculator', '/salary-calculator'],
  '/discount-calculator': ['/percentage-calculator', '/tip-calculator', '/loan-calculator'],
  '/gpa-calculator': ['/percentage-calculator', '/salary-calculator', '/age-calculator'],
  '/aspect-ratio-calculator': ['/image-resizer', '/unit-converter', '/percentage-calculator'],
  '/salary-calculator': ['/loan-calculator', '/electricity-cost-calculator', '/percentage-calculator'],
  '/electricity-cost-calculator': ['/salary-calculator', '/unit-converter', '/percentage-calculator'],
  '/unit-converter': ['/scientific-notation-converter', '/number-base-converter', '/percentage-calculator'],
  '/case-converter': ['/word-counter', '/character-map', '/url-encoder'],
  '/color-converter': ['/color-palette-generator', '/css-gradient-generator', '/box-shadow-generator'],
  '/base64': ['/url-encoder', '/html-entity-encoder', '/hash-generator'],
  '/url-encoder': ['/base64', '/html-entity-encoder', '/qr-code-generator'],
  '/html-entity-encoder': ['/url-encoder', '/base64', '/character-map'],
  '/number-base-converter': ['/scientific-notation-converter', '/hash-generator', '/chmod-calculator'],
  '/scientific-notation-converter': ['/number-base-converter', '/unit-converter', '/percentage-calculator'],
  '/password-generator': ['/hash-generator', '/random-number-generator', '/qr-code-generator'],
  '/random-number-generator': ['/password-generator', '/lorem-ipsum', '/percentage-calculator'],
  '/lorem-ipsum': ['/word-counter', '/markdown-preview', '/random-number-generator'],
  '/qr-code-generator': ['/url-encoder', '/password-generator', '/base64'],
  '/invoice-generator': ['/discount-calculator', '/salary-calculator', '/percentage-calculator'],
  '/color-palette-generator': ['/color-converter', '/css-gradient-generator', '/box-shadow-generator'],
  '/diff-checker': ['/json-formatter', '/regex-tester', '/word-counter'],
  '/hash-generator': ['/base64', '/password-generator', '/jwt-decoder'],
  '/jwt-decoder': ['/base64', '/hash-generator', '/json-formatter'],
  '/chmod-calculator': ['/number-base-converter', '/cron-expression-builder', '/hash-generator'],
  '/sql-formatter': ['/json-formatter', '/regex-tester', '/diff-checker'],
  '/cron-expression-builder': ['/chmod-calculator', '/timestamp-converter', '/regex-tester'],
  '/box-shadow-generator': ['/css-gradient-generator', '/color-palette-generator', '/color-converter'],
  '/image-resizer': ['/image-compressor', '/aspect-ratio-calculator', '/qr-code-generator'],
  '/image-compressor': ['/image-resizer', '/aspect-ratio-calculator', '/unit-converter'],
  '/word-counter': ['/case-converter', '/lorem-ipsum', '/character-map'],
  '/json-formatter': ['/sql-formatter', '/diff-checker', '/regex-tester'],
  '/date-difference-calculator': ['/age-calculator', '/countdown-timer', '/timestamp-converter'],
  '/markdown-preview': ['/lorem-ipsum', '/word-counter', '/diff-checker'],
  '/regex-tester': ['/diff-checker', '/json-formatter', '/sql-formatter'],
  '/countdown-timer': ['/stopwatch', '/date-difference-calculator', '/age-calculator'],
  '/timestamp-converter': ['/date-difference-calculator', '/countdown-timer', '/cron-expression-builder'],
  '/css-gradient-generator': ['/box-shadow-generator', '/color-palette-generator', '/color-converter'],
  '/stopwatch': ['/countdown-timer', '/date-difference-calculator', '/timestamp-converter'],
  '/character-map': ['/case-converter', '/html-entity-encoder', '/word-counter'],
  '/mortgage-calculator': ['/loan-calculator', '/compound-interest-calculator', '/salary-calculator'],
  '/compound-interest-calculator': ['/mortgage-calculator', '/loan-calculator', '/salary-calculator'],
  '/calorie-calculator': ['/bmi-calculator', '/unit-converter', '/age-calculator'],
  '/time-zone-converter': ['/timestamp-converter', '/date-difference-calculator', '/countdown-timer'],
  '/json-to-csv': ['/json-formatter', '/sql-formatter', '/diff-checker'],
  '/text-to-binary': ['/number-base-converter', '/base64', '/hash-generator'],
  '/fuel-cost-calculator': ['/electricity-cost-calculator', '/unit-converter', '/salary-calculator'],
  '/bmr-calculator': ['/calorie-calculator', '/bmi-calculator', '/unit-converter'],
  '/hex-to-rgb': ['/color-converter', '/color-palette-generator', '/css-gradient-generator'],
  '/csv-to-json': ['/json-to-csv', '/json-formatter', '/sql-formatter'],
  '/ip-lookup': ['/hash-generator', '/password-generator', '/url-encoder'],
  '/roman-numeral-converter': ['/number-base-converter', '/scientific-notation-converter', '/text-to-binary'],
};

function RelatedTools({ current }) {
  const paths = related[current];
  if (!paths) return null;

  return (
    <div className="related-tools">
      <h3>Related Tools</h3>
      <div className="related-grid">
        {paths.map((path) => (
          <Link to={path} key={path} className="related-card">
            {allTools[path]}
            <span>&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedTools;
