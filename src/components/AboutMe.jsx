import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="about-title">About Me</h2>
        <div className="title-underline"></div>
        
        <div className="about-grid">
          <div className="about-terminal-panel">
            <div className="terminal-header">
              <span className="terminal-prompt">~</span> /ocean/profile.txt
            </div>
            <div className="terminal-body">
              <p>
                Five years deep in the currents. I'm <span className="highlight-primary">tee</span>, a 3D artist specialising in <span className="highlight-secondary">game asset creation</span> - from low-poly stylised props to high-fidelity hero pieces.
              </p>
              <br />
              <p>
                I build characters, weapons, vehicles and entire worlds for indie studios, Roblox creators and clients chasing that cinematic edge. Optimised topology. Clean UVs. Textures that breathe.
              </p>
              <br />
              <p>
                If you can dream it in polygons - <span className="highlight-accent">I'll render it.</span>
              </p>
            </div>
          </div>
          
          <div className="about-toolkit">
            <div className="toolkit-header">// TOOLKIT</div>
            <div className="toolkit-cards">
              
              <div className="toolkit-card">
                <div className="toolkit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div className="toolkit-info">
                  <h3>BLENDER</h3>
                  <p>Modeling · Sculpting · Rigging</p>
                </div>
              </div>

              <div className="toolkit-card">
                <div className="toolkit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                </div>
                <div className="toolkit-info">
                  <h3>SUBSTANCE PAINTER</h3>
                  <p>Texturing · PBR Materials</p>
                </div>
              </div>

              <div className="toolkit-card">
                <div className="toolkit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M6 12h4"></path>
                    <path d="M8 10v4"></path>
                    <circle cx="15" cy="13" r="1"></circle>
                    <circle cx="18" cy="11" r="1"></circle>
                  </svg>
                </div>
                <div className="toolkit-info">
                  <h3>ROBLOX STUDIO</h3>
                  <p>World Building · Assets</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
