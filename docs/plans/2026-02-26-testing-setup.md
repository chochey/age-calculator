# Full Coverage Testing Setup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up a complete testing infrastructure with smoke tests for all 75 tools, functional/interaction tests for representative components, and easy-to-run scripts.

**Architecture:** Co-located test files (`*.test.js`) alongside source files. A shared `test-utils.js` provides a custom `render` wrapped with `MemoryRouter`. Jest coverage thresholds enforced via `package.json`. Three test layers per component: smoke, functional, interaction.

**Tech Stack:** Jest (via CRA), React Testing Library, @testing-library/user-event, @testing-library/jest-dom

---

### Task 1: Update `package.json` with test scripts and coverage config

**Files:**
- Modify: `package.json`

**Step 1: Add test scripts and Jest coverage config**

Add `test:coverage` and `test:ci` scripts, plus a `jest` config block for coverage thresholds:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "NODE_OPTIONS=--openssl-legacy-provider react-scripts build",
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "react-scripts test --coverage --watchAll=false --ci",
    "eject": "react-scripts eject"
  },
  "jest": {
    "coverageThresholds": {
      "global": {
        "statements": 80,
        "branches": 75,
        "functions": 80,
        "lines": 80
      }
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!src/index.js",
      "!src/reportWebVitals.js",
      "!src/setupTests.js"
    ]
  }
}
```

**Step 2: Verify scripts parse correctly**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && node -e "console.log(JSON.parse(require('fs').readFileSync('package.json','utf8')).scripts)"`
Expected: prints the scripts object with the new entries

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add test:coverage and test:ci scripts with coverage thresholds"
```

---

### Task 2: Create shared test utilities

**Files:**
- Create: `src/test-utils.js`

**Step 1: Write test-utils.js**

This file re-exports everything from `@testing-library/react` but overrides `render` to wrap components in `MemoryRouter`, since every page component needs a router context.

```js
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(ui, { route = '/', ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { renderWithRouter as render };
```

**Step 2: Verify file exists**

Run: `ls src/test-utils.js`
Expected: file listed

**Step 3: Commit**

```bash
git add src/test-utils.js
git commit -m "chore: add shared test-utils with MemoryRouter wrapper"
```

---

### Task 3: Replace placeholder App.test.js

**Files:**
- Modify: `src/App.test.js`

**Step 1: Write the App smoke test**

Replace the CRA placeholder with a real test that verifies the app renders and the layout is present:

```js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// App includes its own BrowserRouter, so we test it directly (no MemoryRouter wrapper)
// We need to mock BrowserRouter to avoid double-router issues in tests

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <actual.MemoryRouter>{children}</actual.MemoryRouter>,
  };
});

test('renders the app with QuickCalcs header', () => {
  render(<App />);
  expect(screen.getByText('QuickCalcs')).toBeInTheDocument();
});

test('renders the homepage by default', () => {
  render(<App />);
  expect(screen.getByText(/free online tools/i)).toBeInTheDocument();
});
```

**Step 2: Run the test**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="App.test" --watchAll=false`
Expected: 2 tests PASS

**Step 3: Commit**

```bash
git add src/App.test.js
git commit -m "test: replace CRA placeholder with real App smoke tests"
```

---

### Task 4: Create smoke tests for all 75 page components

**Files:**
- Create: `src/pages/pages.smoke.test.js`

**Step 1: Write the batch smoke test file**

This file imports every page component and verifies each renders without crashing. Uses a data-driven approach to keep it DRY:

```js
import { render, screen } from '../test-utils';

// Import all page components
import Home from './Home';
import AgeCalculator from './AgeCalculator';
import PercentageCalculator from './PercentageCalculator';
import WordCounter from './WordCounter';
import BmiCalculator from './BmiCalculator';
import TipCalculator from './TipCalculator';
import CaseConverter from './CaseConverter';
import DateDifference from './DateDifference';
import RandomGenerator from './RandomGenerator';
import JsonFormatter from './JsonFormatter';
import ColorConverter from './ColorConverter';
import PasswordGenerator from './PasswordGenerator';
import UnitConverter from './UnitConverter';
import LoanCalculator from './LoanCalculator';
import Base64Tool from './Base64Tool';
import LoremIpsum from './LoremIpsum';
import QrGenerator from './QrGenerator';
import CountdownTimer from './CountdownTimer';
import UrlEncoder from './UrlEncoder';
import MarkdownPreview from './MarkdownPreview';
import RegexTester from './RegexTester';
import GradientGenerator from './GradientGenerator';
import TimestampConverter from './TimestampConverter';
import DiscountCalculator from './DiscountCalculator';
import HtmlEntityTool from './HtmlEntityTool';
import GpaCalculator from './GpaCalculator';
import DiffChecker from './DiffChecker';
import HashGenerator from './HashGenerator';
import JwtDecoder from './JwtDecoder';
import ImageResizer from './ImageResizer';
import ImageCompressor from './ImageCompressor';
import ChmodCalculator from './ChmodCalculator';
import InvoiceGenerator from './InvoiceGenerator';
import ColorPalette from './ColorPalette';
import SqlFormatter from './SqlFormatter';
import CronBuilder from './CronBuilder';
import AspectRatioCalc from './AspectRatioCalc';
import NumberBaseConverter from './NumberBaseConverter';
import SalaryCalculator from './SalaryCalculator';
import BoxShadowGenerator from './BoxShadowGenerator';
import ElectricityCostCalc from './ElectricityCostCalc';
import Stopwatch from './Stopwatch';
import ScientificNotation from './ScientificNotation';
import CharacterMap from './CharacterMap';
import MortgageCalculator from './MortgageCalculator';
import CompoundInterestCalc from './CompoundInterestCalc';
import CalorieCalculator from './CalorieCalculator';
import TimeZoneConverter from './TimeZoneConverter';
import JsonToCsv from './JsonToCsv';
import TextToBinary from './TextToBinary';
import FuelCostCalculator from './FuelCostCalculator';
import BmrCalculator from './BmrCalculator';
import HexToRgb from './HexToRgb';
import CsvToJson from './CsvToJson';
import IpLookup from './IpLookup';
import RomanNumeralConverter from './RomanNumeralConverter';
import TypingSpeedTest from './TypingSpeedTest';
import PomodoroTimer from './PomodoroTimer';
import PaceCalculator from './PaceCalculator';
import GradeCalculator from './GradeCalculator';
import SubnetCalculator from './SubnetCalculator';
import SavingsGoalCalc from './SavingsGoalCalc';
import AverageCalculator from './AverageCalculator';
import CoinFlip from './CoinFlip';
import DiceRoller from './DiceRoller';
import AreaCalculator from './AreaCalculator';
import PxToRemConverter from './PxToRemConverter';
import TextRepeater from './TextRepeater';
import ProportionCalculator from './ProportionCalculator';
import FlashcardMaker from './FlashcardMaker';
import MetaTagGenerator from './MetaTagGenerator';
import WhitespaceRemover from './WhitespaceRemover';
import ColorBlindnessSimulator from './ColorBlindnessSimulator';
import FrequencyCounter from './FrequencyCounter';
import ProfitMarginCalc from './ProfitMarginCalc';
import ScreenResolution from './ScreenResolution';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const pages = [
  { name: 'Home', Component: Home, heading: /quickcalcs|free online tools/i },
  { name: 'AgeCalculator', Component: AgeCalculator, heading: /age calculator/i },
  { name: 'PercentageCalculator', Component: PercentageCalculator, heading: /percentage calculator/i },
  { name: 'WordCounter', Component: WordCounter, heading: /word counter/i },
  { name: 'BmiCalculator', Component: BmiCalculator, heading: /bmi calculator/i },
  { name: 'TipCalculator', Component: TipCalculator, heading: /tip calculator/i },
  { name: 'CaseConverter', Component: CaseConverter, heading: /case converter/i },
  { name: 'DateDifference', Component: DateDifference, heading: /date difference/i },
  { name: 'RandomGenerator', Component: RandomGenerator, heading: /random number/i },
  { name: 'JsonFormatter', Component: JsonFormatter, heading: /json formatter/i },
  { name: 'ColorConverter', Component: ColorConverter, heading: /color converter/i },
  { name: 'PasswordGenerator', Component: PasswordGenerator, heading: /password generator/i },
  { name: 'UnitConverter', Component: UnitConverter, heading: /unit converter/i },
  { name: 'LoanCalculator', Component: LoanCalculator, heading: /loan calculator/i },
  { name: 'Base64Tool', Component: Base64Tool, heading: /base64/i },
  { name: 'LoremIpsum', Component: LoremIpsum, heading: /lorem ipsum/i },
  { name: 'QrGenerator', Component: QrGenerator, heading: /qr code/i },
  { name: 'CountdownTimer', Component: CountdownTimer, heading: /countdown/i },
  { name: 'UrlEncoder', Component: UrlEncoder, heading: /url encoder/i },
  { name: 'MarkdownPreview', Component: MarkdownPreview, heading: /markdown/i },
  { name: 'RegexTester', Component: RegexTester, heading: /regex/i },
  { name: 'GradientGenerator', Component: GradientGenerator, heading: /gradient/i },
  { name: 'TimestampConverter', Component: TimestampConverter, heading: /timestamp/i },
  { name: 'DiscountCalculator', Component: DiscountCalculator, heading: /discount/i },
  { name: 'HtmlEntityTool', Component: HtmlEntityTool, heading: /html entit/i },
  { name: 'GpaCalculator', Component: GpaCalculator, heading: /gpa/i },
  { name: 'DiffChecker', Component: DiffChecker, heading: /diff checker/i },
  { name: 'HashGenerator', Component: HashGenerator, heading: /hash/i },
  { name: 'JwtDecoder', Component: JwtDecoder, heading: /jwt/i },
  { name: 'ImageResizer', Component: ImageResizer, heading: /image resiz/i },
  { name: 'ImageCompressor', Component: ImageCompressor, heading: /image compress/i },
  { name: 'ChmodCalculator', Component: ChmodCalculator, heading: /chmod/i },
  { name: 'InvoiceGenerator', Component: InvoiceGenerator, heading: /invoice/i },
  { name: 'ColorPalette', Component: ColorPalette, heading: /color palette/i },
  { name: 'SqlFormatter', Component: SqlFormatter, heading: /sql/i },
  { name: 'CronBuilder', Component: CronBuilder, heading: /cron/i },
  { name: 'AspectRatioCalc', Component: AspectRatioCalc, heading: /aspect ratio/i },
  { name: 'NumberBaseConverter', Component: NumberBaseConverter, heading: /number base/i },
  { name: 'SalaryCalculator', Component: SalaryCalculator, heading: /salary/i },
  { name: 'BoxShadowGenerator', Component: BoxShadowGenerator, heading: /box shadow/i },
  { name: 'ElectricityCostCalc', Component: ElectricityCostCalc, heading: /electricity/i },
  { name: 'Stopwatch', Component: Stopwatch, heading: /stopwatch/i },
  { name: 'ScientificNotation', Component: ScientificNotation, heading: /scientific notation/i },
  { name: 'CharacterMap', Component: CharacterMap, heading: /character map/i },
  { name: 'MortgageCalculator', Component: MortgageCalculator, heading: /mortgage/i },
  { name: 'CompoundInterestCalc', Component: CompoundInterestCalc, heading: /compound interest/i },
  { name: 'CalorieCalculator', Component: CalorieCalculator, heading: /calorie/i },
  { name: 'TimeZoneConverter', Component: TimeZoneConverter, heading: /time zone/i },
  { name: 'JsonToCsv', Component: JsonToCsv, heading: /json to csv/i },
  { name: 'TextToBinary', Component: TextToBinary, heading: /text to binary/i },
  { name: 'FuelCostCalculator', Component: FuelCostCalculator, heading: /fuel cost/i },
  { name: 'BmrCalculator', Component: BmrCalculator, heading: /bmr/i },
  { name: 'HexToRgb', Component: HexToRgb, heading: /hex to rgb/i },
  { name: 'CsvToJson', Component: CsvToJson, heading: /csv to json/i },
  { name: 'IpLookup', Component: IpLookup, heading: /ip lookup/i },
  { name: 'RomanNumeralConverter', Component: RomanNumeralConverter, heading: /roman numeral/i },
  { name: 'TypingSpeedTest', Component: TypingSpeedTest, heading: /typing speed/i },
  { name: 'PomodoroTimer', Component: PomodoroTimer, heading: /pomodoro/i },
  { name: 'PaceCalculator', Component: PaceCalculator, heading: /pace calculator/i },
  { name: 'GradeCalculator', Component: GradeCalculator, heading: /grade calculator/i },
  { name: 'SubnetCalculator', Component: SubnetCalculator, heading: /subnet/i },
  { name: 'SavingsGoalCalc', Component: SavingsGoalCalc, heading: /savings goal/i },
  { name: 'AverageCalculator', Component: AverageCalculator, heading: /average/i },
  { name: 'CoinFlip', Component: CoinFlip, heading: /coin flip/i },
  { name: 'DiceRoller', Component: DiceRoller, heading: /dice roller/i },
  { name: 'AreaCalculator', Component: AreaCalculator, heading: /area calculator/i },
  { name: 'PxToRemConverter', Component: PxToRemConverter, heading: /px to rem/i },
  { name: 'TextRepeater', Component: TextRepeater, heading: /text repeater/i },
  { name: 'ProportionCalculator', Component: ProportionCalculator, heading: /proportion/i },
  { name: 'FlashcardMaker', Component: FlashcardMaker, heading: /flashcard/i },
  { name: 'MetaTagGenerator', Component: MetaTagGenerator, heading: /meta tag/i },
  { name: 'WhitespaceRemover', Component: WhitespaceRemover, heading: /whitespace/i },
  { name: 'ColorBlindnessSimulator', Component: ColorBlindnessSimulator, heading: /color blindness/i },
  { name: 'FrequencyCounter', Component: FrequencyCounter, heading: /frequency/i },
  { name: 'ProfitMarginCalc', Component: ProfitMarginCalc, heading: /profit margin/i },
  { name: 'ScreenResolution', Component: ScreenResolution, heading: /screen resolution/i },
  { name: 'PrivacyPolicy', Component: PrivacyPolicy, heading: /privacy policy/i },
  { name: 'TermsOfService', Component: TermsOfService, heading: /terms of service/i },
];

describe('Page smoke tests', () => {
  test.each(pages)('$name renders without crashing', ({ Component, heading }) => {
    render(<Component />);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });
});
```

**Step 2: Run the smoke tests**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="pages.smoke" --watchAll=false`
Expected: 75 tests PASS (some may need heading regex adjustments — fix any that fail)

**Step 3: Commit**

```bash
git add src/pages/pages.smoke.test.js
git commit -m "test: add smoke tests for all 75 page components"
```

---

### Task 5: Create shared component tests (Layout, Seo, RelatedTools)

**Files:**
- Create: `src/components/Layout.test.js`
- Create: `src/components/Seo.test.js`
- Create: `src/components/RelatedTools.test.js`

**Step 1: Write Layout.test.js**

```js
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import Layout from './Layout';

test('renders header with QuickCalcs logo', () => {
  render(<Layout />);
  expect(screen.getByText('QuickCalcs')).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<Layout />);
  expect(screen.getByText('Calculators')).toBeInTheDocument();
  expect(screen.getByText('Converters')).toBeInTheDocument();
  expect(screen.getByText('Generators')).toBeInTheDocument();
  expect(screen.getByText('Dev Tools')).toBeInTheDocument();
});

test('renders footer with copyright and links', () => {
  render(<Layout />);
  expect(screen.getByText(/quickcalcs\. free online tools/i)).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Service')).toBeInTheDocument();
});
```

**Step 2: Write Seo.test.js**

```js
import { render } from '../test-utils';
import Seo from './Seo';

test('updates document title', () => {
  render(<Seo title="Test Title" description="Test desc" />);
  expect(document.title).toBe('Test Title | QuickCalc');
});

test('updates meta description', () => {
  // Create the meta tag if it doesn't exist in the test DOM
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'description');
  document.head.appendChild(meta);

  render(<Seo title="Title" description="My description" />);
  expect(document.querySelector('meta[name="description"]').getAttribute('content')).toBe('My description');

  document.head.removeChild(meta);
});
```

**Step 3: Write RelatedTools.test.js**

```js
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import RelatedTools from './RelatedTools';

test('renders related tools section', () => {
  render(<RelatedTools current="/age-calculator" />);
  expect(screen.getByText(/related tools/i)).toBeInTheDocument();
});

test('does not show the current tool in related links', () => {
  render(<RelatedTools current="/age-calculator" />);
  const links = screen.getAllByRole('link');
  const hrefs = links.map(l => l.getAttribute('href'));
  expect(hrefs).not.toContain('/age-calculator');
});
```

**Step 4: Run the component tests**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="components/" --watchAll=false`
Expected: all PASS

**Step 5: Commit**

```bash
git add src/components/Layout.test.js src/components/Seo.test.js src/components/RelatedTools.test.js
git commit -m "test: add tests for Layout, Seo, and RelatedTools components"
```

---

### Task 6: Deep tests — AgeCalculator (simple calculator pattern)

**Files:**
- Create: `src/pages/AgeCalculator.test.js`

**Step 1: Write comprehensive AgeCalculator tests**

This demonstrates the full test pattern for a simple calculator: smoke, functional, interaction, edge cases.

```js
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import AgeCalculator from './AgeCalculator';

describe('AgeCalculator', () => {
  test('renders heading and form', () => {
    render(<AgeCalculator />);
    expect(screen.getByText(/age calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate age/i })).toBeInTheDocument();
  });

  test('does not show results initially', () => {
    render(<AgeCalculator />);
    expect(screen.queryByText(/total months/i)).not.toBeInTheDocument();
  });

  test('calculates and displays age when form is submitted', async () => {
    const user = userEvent.setup();
    render(<AgeCalculator />);

    const input = screen.getByLabelText(/date of birth/i);
    await user.clear(input);
    await user.type(input, '2000-01-01');
    await user.click(screen.getByRole('button', { name: /calculate age/i }));

    expect(screen.getByText(/total months/i)).toBeInTheDocument();
    expect(screen.getByText(/total weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/total days/i)).toBeInTheDocument();
    expect(screen.getByText(/total hours/i)).toBeInTheDocument();
    expect(screen.getByText(/total minutes/i)).toBeInTheDocument();
    expect(screen.getByText(/days until next birthday/i)).toBeInTheDocument();
  });

  test('displays years label in results', async () => {
    const user = userEvent.setup();
    render(<AgeCalculator />);

    const input = screen.getByLabelText(/date of birth/i);
    await user.clear(input);
    await user.type(input, '2000-01-01');
    await user.click(screen.getByRole('button', { name: /calculate age/i }));

    expect(screen.getByText('years')).toBeInTheDocument();
    expect(screen.getByText('months')).toBeInTheDocument();
    expect(screen.getByText('days')).toBeInTheDocument();
  });

  test('renders info section', () => {
    render(<AgeCalculator />);
    expect(screen.getByText(/how to use the age calculator/i)).toBeInTheDocument();
  });

  test('renders related tools', () => {
    render(<AgeCalculator />);
    expect(screen.getByText(/related tools/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run the test**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="AgeCalculator.test" --watchAll=false`
Expected: all PASS

**Step 3: Commit**

```bash
git add src/pages/AgeCalculator.test.js
git commit -m "test: add full coverage tests for AgeCalculator"
```

---

### Task 7: Deep tests — WordCounter (real-time analysis pattern)

**Files:**
- Create: `src/pages/WordCounter.test.js`

**Step 1: Write comprehensive WordCounter tests**

This demonstrates testing real-time text analysis with no submit button.

```js
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import WordCounter from './WordCounter';

describe('WordCounter', () => {
  test('renders heading and textarea', () => {
    render(<WordCounter />);
    expect(screen.getByText(/word counter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/paste or type/i)).toBeInTheDocument();
  });

  test('shows zero counts initially', () => {
    render(<WordCounter />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(4);
  });

  test('counts words in real time', async () => {
    const user = userEvent.setup();
    render(<WordCounter />);

    const textarea = screen.getByPlaceholderText(/paste or type/i);
    await user.type(textarea, 'Hello world foo bar');

    expect(screen.getByText('4')).toBeInTheDocument(); // 4 words
  });

  test('counts characters with and without spaces', async () => {
    const user = userEvent.setup();
    render(<WordCounter />);

    const textarea = screen.getByPlaceholderText(/paste or type/i);
    await user.type(textarea, 'Hi there');

    expect(screen.getByText('8')).toBeInTheDocument(); // 8 chars
    expect(screen.getByText('7')).toBeInTheDocument(); // 7 chars no spaces
  });

  test('counts sentences', async () => {
    const user = userEvent.setup();
    render(<WordCounter />);

    const textarea = screen.getByPlaceholderText(/paste or type/i);
    await user.type(textarea, 'Hello. World!');

    expect(screen.getByText('2')).toBeInTheDocument(); // 2 sentences
  });

  test('displays reading time', async () => {
    const user = userEvent.setup();
    render(<WordCounter />);

    const textarea = screen.getByPlaceholderText(/paste or type/i);
    await user.type(textarea, 'word ');

    expect(screen.getByText(/sec/)).toBeInTheDocument();
  });
});
```

**Step 2: Run the test**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="WordCounter.test" --watchAll=false`
Expected: all PASS

**Step 3: Commit**

```bash
git add src/pages/WordCounter.test.js
git commit -m "test: add full coverage tests for WordCounter"
```

---

### Task 8: Deep tests — BmiCalculator (multi-mode interaction pattern)

**Files:**
- Create: `src/pages/BmiCalculator.test.js`

**Step 1: Write comprehensive BmiCalculator tests**

This demonstrates testing a component with unit toggle and multiple input modes.

```js
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import BmiCalculator from './BmiCalculator';

describe('BmiCalculator', () => {
  test('renders heading and imperial mode by default', () => {
    render(<BmiCalculator />);
    expect(screen.getByText(/bmi calculator/i)).toBeInTheDocument();
    expect(screen.getByText('Imperial (lb/ft)')).toBeInTheDocument();
    expect(screen.getByText('Metric (kg/cm)')).toBeInTheDocument();
  });

  test('shows imperial inputs by default', () => {
    render(<BmiCalculator />);
    expect(screen.getByText('Height (ft)')).toBeInTheDocument();
    expect(screen.getByText('Weight (lb)')).toBeInTheDocument();
  });

  test('switches to metric inputs', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.click(screen.getByText('Metric (kg/cm)'));

    expect(screen.getByText('Height (cm)')).toBeInTheDocument();
    expect(screen.getByText('Weight (kg)')).toBeInTheDocument();
  });

  test('calculates BMI in imperial mode', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    // 5'10", 160 lbs => BMI ~22.9 (Normal weight)
    await user.type(screen.getByPlaceholderText('5'), '5');
    await user.type(screen.getByPlaceholderText('10'), '10');
    await user.type(screen.getByPlaceholderText('160'), '160');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText('22.9')).toBeInTheDocument();
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('calculates BMI in metric mode', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.click(screen.getByText('Metric (kg/cm)'));
    await user.type(screen.getByPlaceholderText('178'), '178');
    await user.type(screen.getByPlaceholderText('73'), '73');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText('23.0')).toBeInTheDocument();
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('shows BMI scale after calculation', async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.type(screen.getByPlaceholderText('5'), '5');
    await user.type(screen.getByPlaceholderText('10'), '10');
    await user.type(screen.getByPlaceholderText('160'), '160');
    await user.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText(/underweight/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
    expect(screen.getByText(/overweight/i)).toBeInTheDocument();
    expect(screen.getByText(/obese/i)).toBeInTheDocument();
  });

  test('does not show results initially', () => {
    render(<BmiCalculator />);
    expect(screen.queryByText('Normal weight')).not.toBeInTheDocument();
  });
});
```

**Step 2: Run the test**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="BmiCalculator.test" --watchAll=false`
Expected: all PASS

**Step 3: Commit**

```bash
git add src/pages/BmiCalculator.test.js
git commit -m "test: add full coverage tests for BmiCalculator"
```

---

### Task 9: Deep tests — PercentageCalculator (multi-form pattern)

**Files:**
- Create: `src/pages/PercentageCalculator.test.js`

**Step 1: Write comprehensive PercentageCalculator tests**

This demonstrates testing a component with multiple independent forms on one page.

```js
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import PercentageCalculator from './PercentageCalculator';

describe('PercentageCalculator', () => {
  test('renders heading and all four calculator sections', () => {
    render(<PercentageCalculator />);
    expect(screen.getByText(/percentage calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/what is x% of y\?/i)).toBeInTheDocument();
    expect(screen.getByText(/x is what % of y\?/i)).toBeInTheDocument();
    expect(screen.getByText(/percentage change/i)).toBeInTheDocument();
    expect(screen.getByText(/increase \/ decrease by %/i)).toBeInTheDocument();
  });

  test('calculates X% of Y', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    // First form: "What is X% of Y?" — inputs[0]=X, inputs[1]=Y
    await user.type(inputs[0], '25');
    await user.type(inputs[1], '200');

    const buttons = screen.getAllByRole('button', { name: /calculate/i });
    await user.click(buttons[0]);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('calculates X is what % of Y', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    // Second form: inputs[2]=X, inputs[3]=Y
    await user.type(inputs[2], '50');
    await user.type(inputs[3], '200');

    const buttons = screen.getAllByRole('button', { name: /calculate/i });
    await user.click(buttons[1]);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('calculates percentage change', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    // Third form: inputs[4]=from, inputs[5]=to
    await user.type(inputs[4], '100');
    await user.type(inputs[5], '150');

    const buttons = screen.getAllByRole('button', { name: /calculate/i });
    await user.click(buttons[2]);

    expect(screen.getByText('+50%')).toBeInTheDocument();
  });

  test('calculates increase/decrease by percent', async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    // Fourth form: inputs[6]=value, inputs[7]=percent
    await user.type(inputs[6], '100');
    await user.type(inputs[7], '10');

    const buttons = screen.getAllByRole('button', { name: /calculate/i });
    await user.click(buttons[3]);

    expect(screen.getByText(/110/)).toBeInTheDocument();
    expect(screen.getByText(/90/)).toBeInTheDocument();
  });
});
```

**Step 2: Run the test**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --testPathPattern="PercentageCalculator.test" --watchAll=false`
Expected: all PASS

**Step 3: Commit**

```bash
git add src/pages/PercentageCalculator.test.js
git commit -m "test: add full coverage tests for PercentageCalculator"
```

---

### Task 10: Run full test suite and verify coverage

**Step 1: Run all tests**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --watchAll=false`
Expected: all test suites PASS

**Step 2: Run with coverage report**

Run: `cd c:/Users/Blue/Desktop/Repos/age-calculator && npx react-scripts test --coverage --watchAll=false`
Expected: coverage report printed, all tests pass

**Step 3: Fix any failing tests**

If any tests fail, investigate and fix. Common issues:
- Heading regex doesn't match the component's actual `<h1>` text
- Components that use APIs not available in jsdom (Canvas, Audio) may need mocks in `setupTests.js`
- Components with timers (Pomodoro, Stopwatch, Countdown) may need `jest.useFakeTimers()`

**Step 4: Final commit**

```bash
git add -A
git commit -m "test: complete testing infrastructure with full smoke + deep tests"
```

---

## Usage After Setup

**Run tests in watch mode (during development):**
```bash
npm test
```

**Run a single test file:**
```bash
npm test -- --testPathPattern="AgeCalculator.test"
```

**Run full coverage report:**
```bash
npm run test:coverage
```

**Run in CI (exits after completion):**
```bash
npm run test:ci
```

## Adding Tests for New Tools

When you create a new tool (e.g., `src/pages/NewTool.js`):

1. Add an entry to the `pages` array in `src/pages/pages.smoke.test.js`
2. Create `src/pages/NewTool.test.js` co-located with the component
3. Follow the three-layer pattern:
   - **Smoke:** renders heading, form elements present
   - **Functional:** submit with valid input, verify output values
   - **Interaction:** test edge cases, invalid input, mode switches
4. Run `npm run test:coverage` to verify coverage thresholds are met
