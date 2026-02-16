import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">QuickCalcs</Link>
          <nav className="header-nav">
            <button onClick={() => scrollTo('calculators')}>Calculators</button>
            <button onClick={() => scrollTo('converters')}>Converters</button>
            <button onClick={() => scrollTo('generators')}>Generators</button>
            <button onClick={() => scrollTo('dev-tools')}>Dev Tools</button>
            <button onClick={() => scrollTo('image-tools')}>Image</button>
            <button onClick={() => scrollTo('text-data')}>Text & Data</button>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} QuickCalcs. Free online tools.</p>
      </footer>
    </div>
  );
}

export default Layout;
