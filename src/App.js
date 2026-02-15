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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
