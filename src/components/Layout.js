import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">QuickCalc</Link>
          <nav>
            <Link to="/">All Tools</Link>
            <Link to="/age-calculator">Age</Link>
            <Link to="/percentage-calculator">Percentage</Link>
            <Link to="/bmi-calculator">BMI</Link>
            <Link to="/tip-calculator">Tip</Link>
            <Link to="/word-counter">Words</Link>
            <Link to="/case-converter">Case</Link>
            <Link to="/date-difference-calculator">Dates</Link>
            <Link to="/random-number-generator">Random</Link>
            <Link to="/json-formatter">JSON</Link>
            <Link to="/color-converter">Colors</Link>
            <Link to="/password-generator">Password</Link>
            <Link to="/unit-converter">Units</Link>
            <Link to="/loan-calculator">Loan</Link>
            <Link to="/base64">Base64</Link>
            <Link to="/lorem-ipsum">Lorem Ipsum</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} QuickCalc. Free online tools.</p>
      </footer>
    </div>
  );
}

export default Layout;
