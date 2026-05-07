import ThemeIcon from './ThemeIcon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <ThemeIcon size={28} opacity={0.6} />
            <span className="footer-title">Tee</span>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Tee. Crafted with passion.
          </p>
          <div className="footer-links">
            <a href="mailto:neon.golld@gmail.com" className="footer-link">Contact</a>
            <span className="footer-divider">·</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
            <span className="footer-divider">·</span>
            <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="footer-link">ArtStation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
