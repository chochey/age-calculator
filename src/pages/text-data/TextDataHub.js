import CategoryHub from '../../components/CategoryHub';

const tools = [
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
];

const faqs = [
  { q: 'Do these tools work offline?', a: 'Once the page has loaded, most of these tools will continue to work even if you lose your internet connection because all processing happens in your browser with JavaScript. However, you will need a connection to load the page initially.' },
  { q: 'Is my text stored or sent to a server?', a: 'No. Every tool on this page runs entirely on the client side. The text you type or paste is processed in your browser and never transmitted anywhere. When you close the tab, the data is gone unless you explicitly copy or export it.' },
  { q: 'Can I use these tools on my phone?', a: 'Yes. All 22 tools are fully responsive and work on phones, tablets, and desktops. The interfaces adapt to smaller screens so you can count words, format JSON, test regex patterns, and run timers from any device without installing an app.' },
];

function TextDataHub() {
  return (
    <CategoryHub
      title="Free Online Text & Data Tools - Format, Analyze & Transform"
      description="22 free text and data tools. Word counter, JSON formatter, regex tester, markdown preview, timers, and more. Format, analyze, and transform text instantly in your browser."
      intro="22 free tools to format, analyze, count, time, and transform text and data."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Text & Data Tools</h2>
        <p>
          This collection spans 22 browser-based utilities that cover a wide range of text, data, and
          productivity tasks. On the text side, you will find a word counter for quick document
          statistics, a whitespace remover to clean up messy copy, a frequency counter that tallies
          every word and character, and a readability checker that scores your writing with
          Flesch-Kincaid and other established formulas. For structured data, the JSON formatter
          validates and pretty-prints payloads while the regex tester lets you build and debug patterns
          against live input. Developers and writers can preview Markdown in real time, convert Unix
          timestamps, and generate CSS gradients with instant code output. The collection also includes
          everyday utilities -- a countdown timer, stopwatch, Pomodoro timer, coin flip, dice roller,
          typing speed test, flashcard maker, and a character map for finding special symbols. Every
          tool runs client-side, loads in under a second, and requires no sign-up or software install.
        </p>

        <h2>Productivity and Workflow</h2>
        <p>
          These tools are designed to slot into your existing workflow without friction. Writers can
          paste a draft into the word counter to check length, run it through the readability checker
          to gauge clarity, and clean up stray whitespace -- all in the same browser session. Developers
          debugging an API response can format the JSON, test a regex extraction pattern, and convert a
          timestamp from the payload without switching applications. Students preparing for exams can
          build flashcard decks and use the Pomodoro timer to structure focused study sessions, then
          take a typing speed test as a break. Because every tool shares the same lightweight interface,
          there is virtually no learning curve when you move from one to the next. Bookmark the ones you
          use most, or keep this hub page handy as a single entry point. Since nothing is uploaded or
          stored remotely, you can work confidently with drafts, credentials, configuration files, and
          any other sensitive text without worrying about data leaking to a third party.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Do these tools work offline?</h3>
        <p>
          Once the page has loaded, most of these tools will continue to work even if you lose your
          internet connection because all processing happens in your browser with JavaScript. However,
          you will need a connection to load the page initially.
        </p>

        <h3>Is my text stored or sent to a server?</h3>
        <p>
          No. Every tool on this page runs entirely on the client side. The text you type or paste is
          processed in your browser and never transmitted anywhere. When you close the tab, the data
          is gone unless you explicitly copy or export it.
        </p>

        <h3>Can I use these tools on my phone?</h3>
        <p>
          Yes. All 22 tools are fully responsive and work on phones, tablets, and desktops. The
          interfaces adapt to smaller screens so you can count words, format JSON, test regex patterns,
          and run timers from any device without installing an app.
        </p>
      </section>
    </CategoryHub>
  );
}

export default TextDataHub;
