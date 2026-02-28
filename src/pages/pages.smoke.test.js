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
  { name: 'Home', Component: Home, heading: /free online calculators & tools/i },
  { name: 'AgeCalculator', Component: AgeCalculator, heading: /age calculator/i },
  { name: 'PercentageCalculator', Component: PercentageCalculator, heading: /percentage calculator/i },
  { name: 'WordCounter', Component: WordCounter, heading: /word counter/i },
  { name: 'BmiCalculator', Component: BmiCalculator, heading: /bmi calculator/i },
  { name: 'TipCalculator', Component: TipCalculator, heading: /tip calculator/i },
  { name: 'CaseConverter', Component: CaseConverter, heading: /case converter/i },
  { name: 'DateDifference', Component: DateDifference, heading: /date difference calculator/i },
  { name: 'RandomGenerator', Component: RandomGenerator, heading: /random number generator/i },
  { name: 'JsonFormatter', Component: JsonFormatter, heading: /json formatter & validator/i },
  { name: 'ColorConverter', Component: ColorConverter, heading: /color picker & converter/i },
  { name: 'PasswordGenerator', Component: PasswordGenerator, heading: /password generator/i },
  { name: 'UnitConverter', Component: UnitConverter, heading: /unit converter/i },
  { name: 'LoanCalculator', Component: LoanCalculator, heading: /loan calculator/i },
  { name: 'Base64Tool', Component: Base64Tool, heading: /base64 encoder \/ decoder/i },
  { name: 'LoremIpsum', Component: LoremIpsum, heading: /lorem ipsum generator/i },
  { name: 'QrGenerator', Component: QrGenerator, heading: /qr code generator/i },
  { name: 'CountdownTimer', Component: CountdownTimer, heading: /countdown timer/i },
  { name: 'UrlEncoder', Component: UrlEncoder, heading: /url encoder \/ decoder/i },
  { name: 'MarkdownPreview', Component: MarkdownPreview, heading: /markdown preview/i },
  { name: 'RegexTester', Component: RegexTester, heading: /regex tester/i },
  { name: 'GradientGenerator', Component: GradientGenerator, heading: /css gradient generator/i },
  { name: 'TimestampConverter', Component: TimestampConverter, heading: /timestamp converter/i },
  { name: 'DiscountCalculator', Component: DiscountCalculator, heading: /discount calculator/i },
  { name: 'HtmlEntityTool', Component: HtmlEntityTool, heading: /html entity encoder \/ decoder/i },
  { name: 'GpaCalculator', Component: GpaCalculator, heading: /gpa calculator/i },
  { name: 'DiffChecker', Component: DiffChecker, heading: /diff checker/i },
  { name: 'HashGenerator', Component: HashGenerator, heading: /hash generator/i },
  { name: 'JwtDecoder', Component: JwtDecoder, heading: /jwt decoder/i },
  { name: 'ImageResizer', Component: ImageResizer, heading: /image resizer/i },
  { name: 'ImageCompressor', Component: ImageCompressor, heading: /image compressor/i },
  { name: 'ChmodCalculator', Component: ChmodCalculator, heading: /chmod calculator/i },
  { name: 'InvoiceGenerator', Component: InvoiceGenerator, heading: /invoice generator/i },
  { name: 'ColorPalette', Component: ColorPalette, heading: /color palette generator/i },
  { name: 'SqlFormatter', Component: SqlFormatter, heading: /sql formatter/i },
  { name: 'CronBuilder', Component: CronBuilder, heading: /cron expression builder/i },
  { name: 'AspectRatioCalc', Component: AspectRatioCalc, heading: /aspect ratio calculator/i },
  { name: 'NumberBaseConverter', Component: NumberBaseConverter, heading: /number base converter/i },
  { name: 'SalaryCalculator', Component: SalaryCalculator, heading: /salary calculator/i },
  { name: 'BoxShadowGenerator', Component: BoxShadowGenerator, heading: /box shadow generator/i },
  { name: 'ElectricityCostCalc', Component: ElectricityCostCalc, heading: /electricity cost calculator/i },
  { name: 'Stopwatch', Component: Stopwatch, heading: /stopwatch/i },
  { name: 'ScientificNotation', Component: ScientificNotation, heading: /scientific notation converter/i },
  { name: 'CharacterMap', Component: CharacterMap, heading: /character map/i },
  { name: 'MortgageCalculator', Component: MortgageCalculator, heading: /mortgage calculator/i },
  { name: 'CompoundInterestCalc', Component: CompoundInterestCalc, heading: /compound interest calculator/i },
  { name: 'CalorieCalculator', Component: CalorieCalculator, heading: /calorie calculator/i },
  { name: 'TimeZoneConverter', Component: TimeZoneConverter, heading: /time zone converter/i },
  { name: 'JsonToCsv', Component: JsonToCsv, heading: /json to csv converter/i },
  { name: 'TextToBinary', Component: TextToBinary, heading: /text to binary converter/i },
  { name: 'FuelCostCalculator', Component: FuelCostCalculator, heading: /fuel cost calculator/i },
  { name: 'BmrCalculator', Component: BmrCalculator, heading: /bmr calculator/i },
  { name: 'HexToRgb', Component: HexToRgb, heading: /hex to rgb converter/i },
  { name: 'CsvToJson', Component: CsvToJson, heading: /csv to json converter/i },
  { name: 'IpLookup', Component: IpLookup, heading: /what is my ip address/i },
  { name: 'RomanNumeralConverter', Component: RomanNumeralConverter, heading: /roman numeral converter/i },
  { name: 'TypingSpeedTest', Component: TypingSpeedTest, heading: /typing speed test/i },
  { name: 'PomodoroTimer', Component: PomodoroTimer, heading: /pomodoro timer/i },
  { name: 'PaceCalculator', Component: PaceCalculator, heading: /pace calculator/i },
  { name: 'GradeCalculator', Component: GradeCalculator, heading: /grade calculator/i },
  { name: 'SubnetCalculator', Component: SubnetCalculator, heading: /subnet calculator/i },
  { name: 'SavingsGoalCalc', Component: SavingsGoalCalc, heading: /savings goal calculator/i },
  { name: 'AverageCalculator', Component: AverageCalculator, heading: /average calculator/i },
  { name: 'CoinFlip', Component: CoinFlip, heading: /coin flip/i },
  { name: 'DiceRoller', Component: DiceRoller, heading: /dice roller/i },
  { name: 'AreaCalculator', Component: AreaCalculator, heading: /area calculator/i },
  { name: 'PxToRemConverter', Component: PxToRemConverter, heading: /px to rem converter/i },
  { name: 'TextRepeater', Component: TextRepeater, heading: /text repeater/i },
  { name: 'ProportionCalculator', Component: ProportionCalculator, heading: /proportion calculator/i },
  { name: 'FlashcardMaker', Component: FlashcardMaker, heading: /flashcard maker/i },
  { name: 'MetaTagGenerator', Component: MetaTagGenerator, heading: /meta tag generator/i },
  { name: 'WhitespaceRemover', Component: WhitespaceRemover, heading: /whitespace remover/i },
  { name: 'ColorBlindnessSimulator', Component: ColorBlindnessSimulator, heading: /color blindness simulator/i },
  { name: 'FrequencyCounter', Component: FrequencyCounter, heading: /frequency counter/i },
  { name: 'ProfitMarginCalc', Component: ProfitMarginCalc, heading: /profit margin calculator/i },
  { name: 'ScreenResolution', Component: ScreenResolution, heading: /screen resolution checker/i },
  { name: 'PrivacyPolicy', Component: PrivacyPolicy, heading: /privacy policy/i },
  { name: 'TermsOfService', Component: TermsOfService, heading: /terms of service/i },
];

describe('Page smoke tests', () => {
  test.each(pages)('$name renders without crashing', ({ Component, heading }) => {
    render(<Component />);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});
