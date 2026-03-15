import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';

// Pages (root level)
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Calculators
import CalculatorsHub from './pages/calculators/CalculatorsHub';
import AgeCalculator from './pages/calculators/AgeCalculator';
import PercentageCalculator from './pages/calculators/PercentageCalculator';
import BmiCalculator from './pages/calculators/BmiCalculator';
import TipCalculator from './pages/calculators/TipCalculator';
import LoanCalculator from './pages/calculators/LoanCalculator';
import DiscountCalculator from './pages/calculators/DiscountCalculator';
import GpaCalculator from './pages/calculators/GpaCalculator';
import AspectRatioCalc from './pages/calculators/AspectRatioCalc';
import SalaryCalculator from './pages/calculators/SalaryCalculator';
import ElectricityCostCalc from './pages/calculators/ElectricityCostCalc';
import MortgageCalculator from './pages/calculators/MortgageCalculator';
import CompoundInterestCalc from './pages/calculators/CompoundInterestCalc';
import CalorieCalculator from './pages/calculators/CalorieCalculator';
import FuelCostCalculator from './pages/calculators/FuelCostCalculator';
import BmrCalculator from './pages/calculators/BmrCalculator';
import PaceCalculator from './pages/calculators/PaceCalculator';
import GradeCalculator from './pages/calculators/GradeCalculator';
import SavingsGoalCalc from './pages/calculators/SavingsGoalCalc';
import AverageCalculator from './pages/calculators/AverageCalculator';
import AreaCalculator from './pages/calculators/AreaCalculator';
import ProportionCalculator from './pages/calculators/ProportionCalculator';
import ProfitMarginCalc from './pages/calculators/ProfitMarginCalc';
import BodyFatCalculator from './pages/calculators/BodyFatCalculator';
import InflationCalculator from './pages/calculators/InflationCalculator';
import SleepCalculator from './pages/calculators/SleepCalculator';
import UnitPriceCalculator from './pages/calculators/UnitPriceCalculator';

// Converters
import ConvertersHub from './pages/converters/ConvertersHub';
import UnitConverter from './pages/converters/UnitConverter';
import CaseConverter from './pages/converters/CaseConverter';
import ColorConverter from './pages/converters/ColorConverter';
import Base64Tool from './pages/converters/Base64Tool';
import UrlEncoder from './pages/converters/UrlEncoder';
import HtmlEntityTool from './pages/converters/HtmlEntityTool';
import NumberBaseConverter from './pages/converters/NumberBaseConverter';
import ScientificNotation from './pages/converters/ScientificNotation';
import TimeZoneConverter from './pages/converters/TimeZoneConverter';
import TextToBinary from './pages/converters/TextToBinary';
import HexToRgb from './pages/converters/HexToRgb';
import RomanNumeralConverter from './pages/converters/RomanNumeralConverter';
import PxToRemConverter from './pages/converters/PxToRemConverter';

// Generators
import GeneratorsHub from './pages/generators/GeneratorsHub';
import PasswordGenerator from './pages/generators/PasswordGenerator';
import RandomGenerator from './pages/generators/RandomGenerator';
import LoremIpsum from './pages/generators/LoremIpsum';
import QrGenerator from './pages/generators/QrGenerator';
import InvoiceGenerator from './pages/generators/InvoiceGenerator';
import ColorPalette from './pages/generators/ColorPalette';

// Developer Tools
import DevToolsHub from './pages/developer-tools/DevToolsHub';
import DiffChecker from './pages/developer-tools/DiffChecker';
import HashGenerator from './pages/developer-tools/HashGenerator';
import JwtDecoder from './pages/developer-tools/JwtDecoder';
import ChmodCalculator from './pages/developer-tools/ChmodCalculator';
import SqlFormatter from './pages/developer-tools/SqlFormatter';
import CronBuilder from './pages/developer-tools/CronBuilder';
import BoxShadowGenerator from './pages/developer-tools/BoxShadowGenerator';
import JsonToCsv from './pages/developer-tools/JsonToCsv';
import CsvToJson from './pages/developer-tools/CsvToJson';
import IpLookup from './pages/developer-tools/IpLookup';
import SubnetCalculator from './pages/developer-tools/SubnetCalculator';
import MetaTagGenerator from './pages/developer-tools/MetaTagGenerator';
import ScreenResolution from './pages/developer-tools/ScreenResolution';
import ColorBlindnessSimulator from './pages/developer-tools/ColorBlindnessSimulator';

// Image Tools
import ImageToolsHub from './pages/image-tools/ImageToolsHub';
import ImageResizer from './pages/image-tools/ImageResizer';
import ImageCompressor from './pages/image-tools/ImageCompressor';

// Text & Data Tools
import TextDataHub from './pages/text-data/TextDataHub';
import WordCounter from './pages/text-data/WordCounter';
import JsonFormatter from './pages/text-data/JsonFormatter';
import DateDifference from './pages/text-data/DateDifference';
import MarkdownPreview from './pages/text-data/MarkdownPreview';
import RegexTester from './pages/text-data/RegexTester';
import CountdownTimer from './pages/text-data/CountdownTimer';
import TimestampConverter from './pages/text-data/TimestampConverter';
import GradientGenerator from './pages/text-data/GradientGenerator';
import Stopwatch from './pages/text-data/Stopwatch';
import CharacterMap from './pages/text-data/CharacterMap';
import TypingSpeedTest from './pages/text-data/TypingSpeedTest';
import PomodoroTimer from './pages/text-data/PomodoroTimer';
import TextRepeater from './pages/text-data/TextRepeater';
import CoinFlip from './pages/text-data/CoinFlip';
import DiceRoller from './pages/text-data/DiceRoller';
import FlashcardMaker from './pages/text-data/FlashcardMaker';
import WhitespaceRemover from './pages/text-data/WhitespaceRemover';
import FrequencyCounter from './pages/text-data/FrequencyCounter';
import ReadabilityChecker from './pages/text-data/ReadabilityChecker';
import DateCalculator from './pages/text-data/DateCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Calculators */}
          <Route path="calculators" element={<CalculatorsHub />} />
          <Route path="age-calculator" element={<AgeCalculator />} />
          <Route path="percentage-calculator" element={<PercentageCalculator />} />
          <Route path="bmi-calculator" element={<BmiCalculator />} />
          <Route path="tip-calculator" element={<TipCalculator />} />
          <Route path="loan-calculator" element={<LoanCalculator />} />
          <Route path="discount-calculator" element={<DiscountCalculator />} />
          <Route path="gpa-calculator" element={<GpaCalculator />} />
          <Route path="aspect-ratio-calculator" element={<AspectRatioCalc />} />
          <Route path="salary-calculator" element={<SalaryCalculator />} />
          <Route path="electricity-cost-calculator" element={<ElectricityCostCalc />} />
          <Route path="mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="compound-interest-calculator" element={<CompoundInterestCalc />} />
          <Route path="calorie-calculator" element={<CalorieCalculator />} />
          <Route path="fuel-cost-calculator" element={<FuelCostCalculator />} />
          <Route path="bmr-calculator" element={<BmrCalculator />} />
          <Route path="pace-calculator" element={<PaceCalculator />} />
          <Route path="grade-calculator" element={<GradeCalculator />} />
          <Route path="savings-goal-calculator" element={<SavingsGoalCalc />} />
          <Route path="average-calculator" element={<AverageCalculator />} />
          <Route path="area-calculator" element={<AreaCalculator />} />
          <Route path="proportion-calculator" element={<ProportionCalculator />} />
          <Route path="profit-margin-calculator" element={<ProfitMarginCalc />} />
          <Route path="body-fat-calculator" element={<BodyFatCalculator />} />
          <Route path="inflation-calculator" element={<InflationCalculator />} />
          <Route path="sleep-calculator" element={<SleepCalculator />} />
          <Route path="unit-price-calculator" element={<UnitPriceCalculator />} />

          {/* Converters */}
          <Route path="converters" element={<ConvertersHub />} />
          <Route path="unit-converter" element={<UnitConverter />} />
          <Route path="case-converter" element={<CaseConverter />} />
          <Route path="color-converter" element={<ColorConverter />} />
          <Route path="base64" element={<Base64Tool />} />
          <Route path="url-encoder" element={<UrlEncoder />} />
          <Route path="html-entity-encoder" element={<HtmlEntityTool />} />
          <Route path="number-base-converter" element={<NumberBaseConverter />} />
          <Route path="scientific-notation-converter" element={<ScientificNotation />} />
          <Route path="time-zone-converter" element={<TimeZoneConverter />} />
          <Route path="text-to-binary" element={<TextToBinary />} />
          <Route path="hex-to-rgb" element={<HexToRgb />} />
          <Route path="roman-numeral-converter" element={<RomanNumeralConverter />} />
          <Route path="px-to-rem" element={<PxToRemConverter />} />

          {/* Generators */}
          <Route path="generators" element={<GeneratorsHub />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="random-number-generator" element={<RandomGenerator />} />
          <Route path="lorem-ipsum" element={<LoremIpsum />} />
          <Route path="qr-code-generator" element={<QrGenerator />} />
          <Route path="invoice-generator" element={<InvoiceGenerator />} />
          <Route path="color-palette-generator" element={<ColorPalette />} />

          {/* Developer Tools */}
          <Route path="developer-tools" element={<DevToolsHub />} />
          <Route path="diff-checker" element={<DiffChecker />} />
          <Route path="hash-generator" element={<HashGenerator />} />
          <Route path="jwt-decoder" element={<JwtDecoder />} />
          <Route path="chmod-calculator" element={<ChmodCalculator />} />
          <Route path="sql-formatter" element={<SqlFormatter />} />
          <Route path="cron-expression-builder" element={<CronBuilder />} />
          <Route path="box-shadow-generator" element={<BoxShadowGenerator />} />
          <Route path="json-to-csv" element={<JsonToCsv />} />
          <Route path="csv-to-json" element={<CsvToJson />} />
          <Route path="ip-lookup" element={<IpLookup />} />
          <Route path="subnet-calculator" element={<SubnetCalculator />} />
          <Route path="meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="screen-resolution" element={<ScreenResolution />} />
          <Route path="color-blindness-simulator" element={<ColorBlindnessSimulator />} />

          {/* Image Tools */}
          <Route path="image-tools" element={<ImageToolsHub />} />
          <Route path="image-resizer" element={<ImageResizer />} />
          <Route path="image-compressor" element={<ImageCompressor />} />

          {/* Text & Data Tools */}
          <Route path="text-tools" element={<TextDataHub />} />
          <Route path="word-counter" element={<WordCounter />} />
          <Route path="json-formatter" element={<JsonFormatter />} />
          <Route path="date-difference-calculator" element={<DateDifference />} />
          <Route path="markdown-preview" element={<MarkdownPreview />} />
          <Route path="regex-tester" element={<RegexTester />} />
          <Route path="countdown-timer" element={<CountdownTimer />} />
          <Route path="timestamp-converter" element={<TimestampConverter />} />
          <Route path="css-gradient-generator" element={<GradientGenerator />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="character-map" element={<CharacterMap />} />
          <Route path="typing-speed-test" element={<TypingSpeedTest />} />
          <Route path="pomodoro-timer" element={<PomodoroTimer />} />
          <Route path="text-repeater" element={<TextRepeater />} />
          <Route path="coin-flip" element={<CoinFlip />} />
          <Route path="dice-roller" element={<DiceRoller />} />
          <Route path="flashcard-maker" element={<FlashcardMaker />} />
          <Route path="whitespace-remover" element={<WhitespaceRemover />} />
          <Route path="frequency-counter" element={<FrequencyCounter />} />
          <Route path="readability-checker" element={<ReadabilityChecker />} />
          <Route path="date-calculator" element={<DateCalculator />} />

          {/* Legal */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
