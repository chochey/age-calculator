import CategoryHub from '../../components/CategoryHub';

const tools = [
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
];

const faqs = [
  { q: 'Are these converters accurate for professional use?', a: 'Yes. Each converter uses standard formulas and widely accepted conversion factors. Unit conversions follow the International System of Units, color conversions use established mathematical models, and encoding tools comply with their respective specifications such as RFC 4648 for Base64 and RFC 3986 for URL encoding.' },
  { q: 'Do my conversions get stored or sent to a server?', a: 'No. Every conversion runs entirely in your browser using JavaScript. Your input data never leaves your device, and nothing is logged or transmitted to a remote server. You can verify this by using the tools while disconnected from the internet.' },
  { q: 'Can I use these converters on my phone or tablet?', a: 'Absolutely. All 16 converters are fully responsive and work on any modern browser regardless of screen size. The interface adapts to smaller displays so you get the same functionality on a phone as you would on a desktop computer.' },
];

function ConvertersHub() {
  return (
    <CategoryHub
      title="Free Online Converters - Units, Text, Colors & Data"
      description="16 free online converters for units, text, colors, numbers, and encoding. Convert between measurement systems, color formats, number bases, and more."
      intro="16 free converters for units, text, colors, numbers, and encoding formats."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Free Online Converters</h2>
        <p>
          This collection brings together 13 converters that cover the most common
          conversion tasks people run into day to day. On the measurement side you
          can switch between metric and imperial units for length, weight, temperature,
          volume, and speed. For developers and designers there are dedicated tools for
          color formats -- HEX, RGB, and HSL -- as well as CSS unit conversions between
          px, rem, and em. Text and data encoding is covered too, with converters for
          Base64, URL encoding, HTML entities, and raw text-to-binary translation. Number
          enthusiasts will find tools for switching between binary, decimal, hexadecimal,
          and octal bases, converting to and from scientific notation, and working with
          Roman numerals. A time zone converter rounds out the set, letting you translate
          times across any region in the world. Every tool runs instantly in your browser
          with no sign-up required and no data sent to a server.
        </p>

        <h2>When You Need a Converter</h2>
        <p>
          Converters save time whenever you move between systems, formats, or standards.
          If you are following a recipe from another country, the unit converter handles
          cups to milliliters or Fahrenheit to Celsius in a single step. Web developers
          regularly need to encode query strings, escape HTML for safe display, or translate
          a designer's hex color into an RGB value they can plug into a style sheet. Students
          working through computer science assignments often convert between number bases
          or toggle text into its binary representation to understand how data is stored at
          a low level. Writers and editors reach for the case converter to quickly reformat
          headings or variable names without retyping them. And anyone scheduling meetings
          across offices in different countries benefits from a reliable time zone converter
          that accounts for daylight saving differences. Rather than searching for a different
          site for each task, you can handle all of these conversions from one place.
        </p>

        <h2>Frequently Asked Questions</h2>
        <h3>Are these converters accurate for professional use?</h3>
        <p>
          Yes. Each converter uses standard formulas and widely accepted conversion factors.
          Unit conversions follow the International System of Units, color conversions use
          established mathematical models, and encoding tools comply with their respective
          specifications such as RFC 4648 for Base64 and RFC 3986 for URL encoding.
        </p>
        <h3>Do my conversions get stored or sent to a server?</h3>
        <p>
          No. Every conversion runs entirely in your browser using JavaScript. Your input
          data never leaves your device, and nothing is logged or transmitted to a remote
          server. You can verify this by using the tools while disconnected from the internet.
        </p>
        <h3>Can I use these converters on my phone or tablet?</h3>
        <p>
          Absolutely. All 16 converters are fully responsive and work on any modern browser
          regardless of screen size. The interface adapts to smaller displays so you get the
          same functionality on a phone as you would on a desktop computer.
        </p>
      </section>
    </CategoryHub>
  );
}

export default ConvertersHub;
