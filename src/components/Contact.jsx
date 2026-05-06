import './Contact.css';

export default function Contact() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a small toast notification here
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'monospace', color: 'var(--seafoam-light)', fontSize: '0.95rem', opacity: 0.8 }}>// 04 / TRANSMIT</span>
          <h2 className="about-title" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Contact Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-card-top">
              <span className="contact-label">// EMAIL</span>
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
            </div>
            <div className="contact-value">neon.golld@gmail.com</div>
            <button className="contact-copy-btn" onClick={() => handleCopy('neon.golld@gmail.com')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              COPY
            </button>
          </div>

          {/* Discord Card */}
          <div className="contact-card">
            <div className="contact-card-top">
              <span className="contact-label">// DISCORD</span>
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </div>
            <div className="contact-value">tee.v</div>
            <button className="contact-copy-btn" onClick={() => handleCopy('tee.v')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              COPY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
