import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">QuickCalc</Link>
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
