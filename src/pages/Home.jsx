import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useSiteContent } from '../hooks/useSiteContent';
import ThemeIcon from '../components/ThemeIcon';
import MasonryGrid from '../components/MasonryGrid';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PricingCard from '../components/PricingCard';
import AboutMe from '../components/AboutMe';
import './Home.css';

export default function Home() {
  const { projects, loading: projectsLoading } = useProjects(true);
  const { content, loading: contentLoading } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState(null);

  const heroTitle = content.hero_title || 'Crafting Digital Worlds';
  const heroSubtitle = content.hero_subtitle || '3D Artist & Environment Designer';
  const heroBio = content.hero_bio || 'Specializing in game-ready assets, stylized environments, and photorealistic renders.';

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-gradient-1" />
          <div className="hero-gradient-2" />
          <div className="hero-grid-lines" />
        </div>

        <div className="hero-mask-left kitsune-float">
          <ThemeIcon size={220} opacity={0.04} />
        </div>
        <div className="hero-mask-right kitsune-float" style={{ animationDelay: '3s' }}>
          <ThemeIcon size={160} opacity={0.03} />
        </div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-in-up">
            <ThemeIcon size={18} opacity={0.8} />
            <span>3D Portfolio</span>
          </div>
          <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-shimmer">{heroTitle}</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {heroSubtitle}
          </p>
          <p className="hero-bio animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {heroBio}
          </p>
          <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn btn-primary" onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Commission Pricing
            </button>
          </div>
        </div>

        <div className="hero-scroll-hint animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>

      {/* ─── About Me ─────────────────────────────────────── */}
      <AboutMe />

      {/* ─── Gallery ──────────────────────────────────────── */}
      <section className="section" id="gallery">
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--seafoam-light)', fontSize: '0.95rem', opacity: 0.8 }}>// 03 / WORKS</span>
            <h2 className="about-title" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Projects</h2>
            <div className="title-underline"></div>
          </div>

          {projectsLoading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading projects...</p>
            </div>
          ) : (
            <MasonryGrid projects={projects} onProjectClick={setSelectedProject} />
          )}
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────── */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--seafoam-light)', fontSize: '0.95rem', opacity: 0.8 }}>// 02 / RATES</span>
            <h2 className="about-title" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Pricing</h2>
            <div className="title-underline"></div>
          </div>

          <div className="pricing-grid">
            <PricingCard
              planNum="01"
              name="LOW POLY"
              subtitle="Stylised · Optimised"
              price="$10 - $20"
              priceSub="per asset · varies by complexity"
              features={['Game-ready topology', 'Basic texturing', 'Mobile / Roblox optimised', '1-3 day turnaround']}
              accentClass="card-teal-light"
            />
            <PricingCard
              planNum="02"
              name="MID POLY"
              subtitle="Balanced · Versatile"
              price="$20 - $40"
              priceSub="per asset · varies by complexity"
              features={['Refined geometry', 'PBR textures', 'UV unwrapped', '3-5 day turnaround']}
              accentClass="card-seafoam"
              isPopular={true}
            />
            <PricingCard
              planNum="03"
              name="REALISTIC"
              subtitle="Hero · Cinematic"
              price="$50 - $100"
              priceSub="per asset · varies by complexity"
              features={['High-fidelity meshes', '4K PBR materials', 'Detailed normals & maps', '5-10 day turnaround']}
              accentClass="card-oceanic"
            />
          </div>

          <div className="tos-section">
            <div className="tos-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              // TERMS OF SERVICE
            </div>
            <div className="tos-grid">
              <div className="tos-item">
                <span className="tos-num">01</span>
                <span className="tos-text">Unlimited revisions until the vision is met.</span>
              </div>
              <div className="tos-item">
                <span className="tos-num">02</span>
                <span className="tos-text">No refunds once the product is delivered.</span>
              </div>
              <div className="tos-item">
                <span className="tos-num">03</span>
                <span className="tos-text">Payment is due upon completion.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Project Modal ────────────────────────────────── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {selectedProject.image_before_url && selectedProject.image_url ? (
              <div className="project-modal-frame">
                <BeforeAfterSlider
                  beforeSrc={selectedProject.image_before_url}
                  afterSrc={selectedProject.image_url}
                  beforeLabel="Wireframe"
                  afterLabel="Final Render"
                />
              </div>
            ) : selectedProject.image_url ? (
              <div className="project-modal-frame">
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="project-modal-image"
                />
              </div>
            ) : null}

            <div className="project-modal-body">
              <span className="gallery-card-category">{selectedProject.category}</span>
              <h2 className="project-modal-title">{selectedProject.title}</h2>
              {selectedProject.description && (
                <p className="project-modal-desc">{selectedProject.description}</p>
              )}
              {selectedProject.tags?.length > 0 && (
                <div className="gallery-card-tags" style={{ marginTop: '1rem' }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="gallery-card-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
