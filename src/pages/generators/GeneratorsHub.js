import CategoryHub from '../../components/CategoryHub';

const tools = [
  { name: 'Password Generator', description: 'Secure random passwords with strength meter.', path: '/password-generator' },
  { name: 'Random Number Generator', description: 'Random numbers in any range, with or without duplicates.', path: '/random-number-generator' },
  { name: 'Lorem Ipsum Generator', description: 'Placeholder text in paragraphs, sentences or words.', path: '/lorem-ipsum' },
  { name: 'QR Code Generator', description: 'Create QR codes for URLs, text & more.', path: '/qr-code-generator' },
  { name: 'Invoice Generator', description: 'Create & print professional invoices. No sign-up.', path: '/invoice-generator' },
  { name: 'Color Palette Generator', description: 'Generate harmonious color schemes from any color.', path: '/color-palette-generator' },
];

const faqs = [
  {
    q: 'Are these generators safe to use for sensitive data like passwords?',
    a: 'Yes. All of our generators run entirely inside your browser using JavaScript. Nothing you type or generate is ever sent to a server. Password generation relies on the Web Crypto API, the same cryptographically secure random source that browsers use internally, so the output is suitable for real-world accounts and secrets.',
  },
  {
    q: 'Do I need to create an account or install anything?',
    a: 'No. Every generator on this page works instantly in any modern browser -- desktop or mobile -- with no sign-up, no download, and no payment. Simply open the tool you need, adjust the settings, and copy or download your result.',
  },
  {
    q: 'Can I use the generated content for commercial projects?',
    a: 'Absolutely. Passwords, random numbers, lorem ipsum text, QR codes, invoices, and color palettes you create here are yours to use however you like, including in commercial work. There are no usage limits or licensing restrictions on the output.',
  },
];

function GeneratorsHub() {
  return (
    <CategoryHub
      title="Free Online Generators - Passwords, QR Codes, Colors & More"
      description="6 free online generators for passwords, random numbers, QR codes, invoices, lorem ipsum text, and color palettes. No sign-up required."
      intro="6 free generators for passwords, random numbers, QR codes, invoices, and more."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Free Online Generators</h2>
        <p>
          Generators save time by producing content, data, or assets you would otherwise
          have to build from scratch. This collection covers six of the most common
          generation tasks people run into during everyday work. Need a strong password
          for a new account? The password generator creates one in a click and scores its
          strength so you know it will hold up. Building a prototype and need placeholder
          copy? The lorem ipsum tool delivers paragraphs, sentences, or individual words
          on demand. Designers can pull cohesive color palettes from a single starting
          hue, while developers and marketers can produce QR codes that link to any URL
          or block of text. Freelancers and small business owners can assemble
          professional invoices without signing up for billing software, and anyone
          running a simulation or raffle can grab random numbers in any range with or
          without duplicates. Every tool is free, fast, and designed to get you back to
          your real work as quickly as possible.
        </p>

        <h2>Security and Privacy</h2>
        <p>
          Privacy is built into the way these generators work, not bolted on as an
          afterthought. Every tool on this page runs entirely client-side -- that means
          all processing happens in your browser using JavaScript, and no data is
          transmitted to our servers or any third party. When you generate a password, the
          browser's Web Crypto API supplies the randomness, so the result is
          cryptographically secure and never leaves your device. The same principle
          applies to every other generator: random numbers are computed locally, QR codes
          are rendered in the browser, invoices are assembled in memory and exported
          straight to your printer or PDF viewer, and color palettes are calculated on the
          spot. We do not log inputs, store outputs, or set tracking cookies tied to what
          you create. You can verify this yourself by opening your browser's network
          inspector while using any tool -- you will see zero outbound requests carrying
          your data. Your generated content stays yours and yours alone.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Are these generators safe to use for sensitive data like passwords?</h3>
        <p>
          Yes. All of our generators run entirely inside your browser using JavaScript.
          Nothing you type or generate is ever sent to a server. Password generation
          relies on the Web Crypto API, the same cryptographically secure random source
          that browsers use internally, so the output is suitable for real-world accounts
          and secrets.
        </p>

        <h3>Do I need to create an account or install anything?</h3>
        <p>
          No. Every generator on this page works instantly in any modern browser --
          desktop or mobile -- with no sign-up, no download, and no payment. Simply open
          the tool you need, adjust the settings, and copy or download your result.
        </p>

        <h3>Can I use the generated content for commercial projects?</h3>
        <p>
          Absolutely. Passwords, random numbers, lorem ipsum text, QR codes, invoices,
          and color palettes you create here are yours to use however you like, including
          in commercial work. There are no usage limits or licensing restrictions on the
          output.
        </p>
      </section>
    </CategoryHub>
  );
}

export default GeneratorsHub;
