import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">QuickCalc</Link>
          <nav>
            <Link to="/age-calculator">Age</Link>
            <Link to="/percentage-calculator">Percentage</Link>
            <Link to="/word-counter">Word Counter</Link>
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
