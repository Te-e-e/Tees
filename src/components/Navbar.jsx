import { Link, useLocation } from 'react-router-dom';
import ThemeIcon from './ThemeIcon';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <ThemeIcon size={32} opacity={0.9} />
          <span className="navbar-title">Kitsune<span className="navbar-title-accent">Studio</span></span>
        </Link>

        <div className="navbar-links">
          {isHome ? (
            <>
              <button className="navbar-link" onClick={() => scrollTo('gallery')}>Gallery</button>
              <button className="navbar-link" onClick={() => scrollTo('pricing')}>Pricing</button>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link">Home</Link>
            </>
          )}
          <Link to="/login" className="navbar-link navbar-link-admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
