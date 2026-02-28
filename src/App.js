import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgeCalculator from './pages/AgeCalculator';
import PercentageCalculator from './pages/PercentageCalculator';
import WordCounter from './pages/WordCounter';
import BmiCalculator from './pages/BmiCalculator';
import TipCalculator from './pages/TipCalculator';
import CaseConverter from './pages/CaseConverter';
import DateDifference from './pages/DateDifference';
import RandomGenerator from './pages/RandomGenerator';
import JsonFormatter from './pages/JsonFormatter';
import ColorConverter from './pages/ColorConverter';
import PasswordGenerator from './pages/PasswordGenerator';
import UnitConverter from './pages/UnitConverter';
import LoanCalculator from './pages/LoanCalculator';
import Base64Tool from './pages/Base64Tool';
import LoremIpsum from './pages/LoremIpsum';
import QrGenerator from './pages/QrGenerator';
import CountdownTimer from './pages/CountdownTimer';
import UrlEncoder from './pages/UrlEncoder';
import MarkdownPreview from './pages/MarkdownPreview';
import RegexTester from './pages/RegexTester';
import GradientGenerator from './pages/GradientGenerator';
import TimestampConverter from './pages/TimestampConverter';
import DiscountCalculator from './pages/DiscountCalculator';
import HtmlEntityTool from './pages/HtmlEntityTool';
import GpaCalculator from './pages/GpaCalculator';
import DiffChecker from './pages/DiffChecker';
import HashGenerator from './pages/HashGenerator';
import JwtDecoder from './pages/JwtDecoder';
import ImageResizer from './pages/ImageResizer';
import ImageCompressor from './pages/ImageCompressor';
import ChmodCalculator from './pages/ChmodCalculator';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ColorPalette from './pages/ColorPalette';
import SqlFormatter from './pages/SqlFormatter';
import CronBuilder from './pages/CronBuilder';
import AspectRatioCalc from './pages/AspectRatioCalc';
import NumberBaseConverter from './pages/NumberBaseConverter';
import SalaryCalculator from './pages/SalaryCalculator';
import BoxShadowGenerator from './pages/BoxShadowGenerator';
import ElectricityCostCalc from './pages/ElectricityCostCalc';
import Stopwatch from './pages/Stopwatch';
import ScientificNotation from './pages/ScientificNotation';
import CharacterMap from './pages/CharacterMap';
import MortgageCalculator from './pages/MortgageCalculator';
import CompoundInterestCalc from './pages/CompoundInterestCalc';
import CalorieCalculator from './pages/CalorieCalculator';
import TimeZoneConverter from './pages/TimeZoneConverter';
import JsonToCsv from './pages/JsonToCsv';
import TextToBinary from './pages/TextToBinary';
import FuelCostCalculator from './pages/FuelCostCalculator';
import BmrCalculator from './pages/BmrCalculator';
import HexToRgb from './pages/HexToRgb';
import CsvToJson from './pages/CsvToJson';
import IpLookup from './pages/IpLookup';
import RomanNumeralConverter from './pages/RomanNumeralConverter';
import TypingSpeedTest from './pages/TypingSpeedTest';
import PomodoroTimer from './pages/PomodoroTimer';
import PaceCalculator from './pages/PaceCalculator';
import GradeCalculator from './pages/GradeCalculator';
import SubnetCalculator from './pages/SubnetCalculator';
import SavingsGoalCalc from './pages/SavingsGoalCalc';
import AverageCalculator from './pages/AverageCalculator';
import CoinFlip from './pages/CoinFlip';
import DiceRoller from './pages/DiceRoller';
import AreaCalculator from './pages/AreaCalculator';
import PxToRemConverter from './pages/PxToRemConverter';
import TextRepeater from './pages/TextRepeater';
import ProportionCalculator from './pages/ProportionCalculator';
import FlashcardMaker from './pages/FlashcardMaker';
import MetaTagGenerator from './pages/MetaTagGenerator';
import WhitespaceRemover from './pages/WhitespaceRemover';
import ColorBlindnessSimulator from './pages/ColorBlindnessSimulator';
import FrequencyCounter from './pages/FrequencyCounter';
import ProfitMarginCalc from './pages/ProfitMarginCalc';
import ScreenResolution from './pages/ScreenResolution';
import BodyFatCalculator from './pages/BodyFatCalculator';
import InflationCalculator from './pages/InflationCalculator';
import SleepCalculator from './pages/SleepCalculator';
import ReadabilityChecker from './pages/ReadabilityChecker';
import UnitPriceCalculator from './pages/UnitPriceCalculator';
import DateCalculator from './pages/DateCalculator';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="age-calculator" element={<AgeCalculator />} />
          <Route path="percentage-calculator" element={<PercentageCalculator />} />
          <Route path="word-counter" element={<WordCounter />} />
          <Route path="bmi-calculator" element={<BmiCalculator />} />
          <Route path="tip-calculator" element={<TipCalculator />} />
          <Route path="case-converter" element={<CaseConverter />} />
          <Route path="date-difference-calculator" element={<DateDifference />} />
          <Route path="random-number-generator" element={<RandomGenerator />} />
          <Route path="json-formatter" element={<JsonFormatter />} />
          <Route path="color-converter" element={<ColorConverter />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="unit-converter" element={<UnitConverter />} />
          <Route path="loan-calculator" element={<LoanCalculator />} />
          <Route path="base64" element={<Base64Tool />} />
          <Route path="lorem-ipsum" element={<LoremIpsum />} />
          <Route path="qr-code-generator" element={<QrGenerator />} />
          <Route path="countdown-timer" element={<CountdownTimer />} />
          <Route path="url-encoder" element={<UrlEncoder />} />
          <Route path="markdown-preview" element={<MarkdownPreview />} />
          <Route path="regex-tester" element={<RegexTester />} />
          <Route path="css-gradient-generator" element={<GradientGenerator />} />
          <Route path="timestamp-converter" element={<TimestampConverter />} />
          <Route path="discount-calculator" element={<DiscountCalculator />} />
          <Route path="html-entity-encoder" element={<HtmlEntityTool />} />
          <Route path="gpa-calculator" element={<GpaCalculator />} />
          <Route path="diff-checker" element={<DiffChecker />} />
          <Route path="hash-generator" element={<HashGenerator />} />
          <Route path="jwt-decoder" element={<JwtDecoder />} />
          <Route path="image-resizer" element={<ImageResizer />} />
          <Route path="image-compressor" element={<ImageCompressor />} />
          <Route path="chmod-calculator" element={<ChmodCalculator />} />
          <Route path="invoice-generator" element={<InvoiceGenerator />} />
          <Route path="color-palette-generator" element={<ColorPalette />} />
          <Route path="sql-formatter" element={<SqlFormatter />} />
          <Route path="cron-expression-builder" element={<CronBuilder />} />
          <Route path="aspect-ratio-calculator" element={<AspectRatioCalc />} />
          <Route path="number-base-converter" element={<NumberBaseConverter />} />
          <Route path="salary-calculator" element={<SalaryCalculator />} />
          <Route path="box-shadow-generator" element={<BoxShadowGenerator />} />
          <Route path="electricity-cost-calculator" element={<ElectricityCostCalc />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="scientific-notation-converter" element={<ScientificNotation />} />
          <Route path="character-map" element={<CharacterMap />} />
          <Route path="mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="compound-interest-calculator" element={<CompoundInterestCalc />} />
          <Route path="calorie-calculator" element={<CalorieCalculator />} />
          <Route path="time-zone-converter" element={<TimeZoneConverter />} />
          <Route path="json-to-csv" element={<JsonToCsv />} />
          <Route path="text-to-binary" element={<TextToBinary />} />
          <Route path="fuel-cost-calculator" element={<FuelCostCalculator />} />
          <Route path="bmr-calculator" element={<BmrCalculator />} />
          <Route path="hex-to-rgb" element={<HexToRgb />} />
          <Route path="csv-to-json" element={<CsvToJson />} />
          <Route path="ip-lookup" element={<IpLookup />} />
          <Route path="roman-numeral-converter" element={<RomanNumeralConverter />} />
          <Route path="typing-speed-test" element={<TypingSpeedTest />} />
          <Route path="pomodoro-timer" element={<PomodoroTimer />} />
          <Route path="pace-calculator" element={<PaceCalculator />} />
          <Route path="grade-calculator" element={<GradeCalculator />} />
          <Route path="subnet-calculator" element={<SubnetCalculator />} />
          <Route path="savings-goal-calculator" element={<SavingsGoalCalc />} />
          <Route path="average-calculator" element={<AverageCalculator />} />
          <Route path="coin-flip" element={<CoinFlip />} />
          <Route path="dice-roller" element={<DiceRoller />} />
          <Route path="area-calculator" element={<AreaCalculator />} />
          <Route path="px-to-rem" element={<PxToRemConverter />} />
          <Route path="text-repeater" element={<TextRepeater />} />
          <Route path="proportion-calculator" element={<ProportionCalculator />} />
          <Route path="flashcard-maker" element={<FlashcardMaker />} />
          <Route path="meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="whitespace-remover" element={<WhitespaceRemover />} />
          <Route path="color-blindness-simulator" element={<ColorBlindnessSimulator />} />
          <Route path="frequency-counter" element={<FrequencyCounter />} />
          <Route path="profit-margin-calculator" element={<ProfitMarginCalc />} />
          <Route path="screen-resolution" element={<ScreenResolution />} />
          <Route path="body-fat-calculator" element={<BodyFatCalculator />} />
          <Route path="inflation-calculator" element={<InflationCalculator />} />
          <Route path="sleep-calculator" element={<SleepCalculator />} />
          <Route path="readability-checker" element={<ReadabilityChecker />} />
          <Route path="unit-price-calculator" element={<UnitPriceCalculator />} />
          <Route path="date-calculator" element={<DateCalculator />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
