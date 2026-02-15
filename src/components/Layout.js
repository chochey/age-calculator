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
