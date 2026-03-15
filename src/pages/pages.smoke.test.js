import { render, screen } from '../test-utils';

// Pages (root level)
import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

// Calculators
import AgeCalculator from './calculators/AgeCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import BmiCalculator from './calculators/BmiCalculator';
import TipCalculator from './calculators/TipCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import DiscountCalculator from './calculators/DiscountCalculator';
import GpaCalculator from './calculators/GpaCalculator';
import AspectRatioCalc from './calculators/AspectRatioCalc';
import SalaryCalculator from './calculators/SalaryCalculator';
import ElectricityCostCalc from './calculators/ElectricityCostCalc';
import MortgageCalculator from './calculators/MortgageCalculator';
import CompoundInterestCalc from './calculators/CompoundInterestCalc';
import CalorieCalculator from './calculators/CalorieCalculator';
import FuelCostCalculator from './calculators/FuelCostCalculator';
import BmrCalculator from './calculators/BmrCalculator';
import PaceCalculator from './calculators/PaceCalculator';
import GradeCalculator from './calculators/GradeCalculator';
import SavingsGoalCalc from './calculators/SavingsGoalCalc';
import AverageCalculator from './calculators/AverageCalculator';
import AreaCalculator from './calculators/AreaCalculator';
import ProportionCalculator from './calculators/ProportionCalculator';
import ProfitMarginCalc from './calculators/ProfitMarginCalc';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import InflationCalculator from './calculators/InflationCalculator';
import SleepCalculator from './calculators/SleepCalculator';
import UnitPriceCalculator from './calculators/UnitPriceCalculator';

// Converters
import UnitConverter from './converters/UnitConverter';
import CaseConverter from './converters/CaseConverter';
import ColorConverter from './converters/ColorConverter';
import Base64Tool from './converters/Base64Tool';
import UrlEncoder from './converters/UrlEncoder';
import HtmlEntityTool from './converters/HtmlEntityTool';
import NumberBaseConverter from './converters/NumberBaseConverter';
import ScientificNotation from './converters/ScientificNotation';
import TimeZoneConverter from './converters/TimeZoneConverter';
import TextToBinary from './converters/TextToBinary';
import HexToRgb from './converters/HexToRgb';
import RomanNumeralConverter from './converters/RomanNumeralConverter';
import PxToRemConverter from './converters/PxToRemConverter';

// Generators
import PasswordGenerator from './generators/PasswordGenerator';
import RandomGenerator from './generators/RandomGenerator';
import LoremIpsum from './generators/LoremIpsum';
import QrGenerator from './generators/QrGenerator';
import InvoiceGenerator from './generators/InvoiceGenerator';
import ColorPalette from './generators/ColorPalette';

// Developer Tools
import DiffChecker from './developer-tools/DiffChecker';
import HashGenerator from './developer-tools/HashGenerator';
import JwtDecoder from './developer-tools/JwtDecoder';
import ChmodCalculator from './developer-tools/ChmodCalculator';
import SqlFormatter from './developer-tools/SqlFormatter';
import CronBuilder from './developer-tools/CronBuilder';
import BoxShadowGenerator from './developer-tools/BoxShadowGenerator';
import JsonToCsv from './developer-tools/JsonToCsv';
import CsvToJson from './developer-tools/CsvToJson';
import IpLookup from './developer-tools/IpLookup';
import SubnetCalculator from './developer-tools/SubnetCalculator';
import MetaTagGenerator from './developer-tools/MetaTagGenerator';
import ScreenResolution from './developer-tools/ScreenResolution';
import ColorBlindnessSimulator from './developer-tools/ColorBlindnessSimulator';

// Image Tools
import ImageResizer from './image-tools/ImageResizer';
import ImageCompressor from './image-tools/ImageCompressor';

// Text & Data Tools
import WordCounter from './text-data/WordCounter';
import JsonFormatter from './text-data/JsonFormatter';
import DateDifference from './text-data/DateDifference';
import MarkdownPreview from './text-data/MarkdownPreview';
import RegexTester from './text-data/RegexTester';
import CountdownTimer from './text-data/CountdownTimer';
import TimestampConverter from './text-data/TimestampConverter';
import GradientGenerator from './text-data/GradientGenerator';
import Stopwatch from './text-data/Stopwatch';
import CharacterMap from './text-data/CharacterMap';
import TypingSpeedTest from './text-data/TypingSpeedTest';
import PomodoroTimer from './text-data/PomodoroTimer';
import TextRepeater from './text-data/TextRepeater';
import CoinFlip from './text-data/CoinFlip';
import DiceRoller from './text-data/DiceRoller';
import FlashcardMaker from './text-data/FlashcardMaker';
import WhitespaceRemover from './text-data/WhitespaceRemover';
import FrequencyCounter from './text-data/FrequencyCounter';
import ReadabilityChecker from './text-data/ReadabilityChecker';
import DateCalculator from './text-data/DateCalculator';

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
  { name: 'BodyFatCalculator', Component: BodyFatCalculator, heading: /body fat calculator/i },
  { name: 'InflationCalculator', Component: InflationCalculator, heading: /inflation calculator/i },
  { name: 'SleepCalculator', Component: SleepCalculator, heading: /sleep calculator/i },
  { name: 'ReadabilityChecker', Component: ReadabilityChecker, heading: /readability score checker/i },
  { name: 'UnitPriceCalculator', Component: UnitPriceCalculator, heading: /unit price calculator/i },
  { name: 'DateCalculator', Component: DateCalculator, heading: /date calculator/i },
  { name: 'PrivacyPolicy', Component: PrivacyPolicy, heading: /privacy policy/i },
  { name: 'TermsOfService', Component: TermsOfService, heading: /terms of service/i },
];

describe('Page smoke tests', () => {
  test.each(pages)('$name renders without crashing', ({ Component, heading }) => {
    render(<Component />);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});
