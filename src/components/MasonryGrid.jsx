import { useState, useMemo } from 'react';
import GalleryCard from './GalleryCard';
import './MasonryGrid.css';

const CATEGORIES = [
  { key: 'Weapon', label: 'WEAPONS', num: '01' },
  { key: 'Character', label: 'CHARACTERS', num: '02' },
  { key: 'Prop', label: 'MISCELLANEOUS', num: '03' },
];

export default function MasonryGrid({ projects, onProjectClick }) {
  const [openCategory, setOpenCategory] = useState(null);

  // Group projects by category and pick a representative image
  const categoryData = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const items = projects.filter((p) => p.category === cat.key);
      const thumb = items.find((p) => p.image_url)?.image_url || null;
      return { ...cat, count: items.length, thumb, items };
    });
  }, [projects]);

  // When a category is open, show its individual projects
  if (openCategory) {
    const cat = categoryData.find((c) => c.key === openCategory);
    return (
      <div className="masonry-section">
        <button className="gallery-back-btn" onClick={() => setOpenCategory(null)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>

        {cat?.items.length === 0 ? (
          <div className="masonry-empty">
            <p>No projects found in this category yet.</p>
          </div>
        ) : (
          <div className="masonry-individual-grid">
            {cat?.items.map((project, i) => (
              <GalleryCard
                key={project.id}
                project={project}
                onClick={onProjectClick}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default: Bento category overview
  return (
    <div className="masonry-section">
      <div className="bento-grid">
        {categoryData.map((cat, i) => (
          <div
            key={cat.key}
            className={`bento-card bento-card-${i + 1}`}
            onClick={() => setOpenCategory(cat.key)}
          >
            <div className="bento-card-inner">
              {/* Top metadata */}
              <div className="bento-card-top">
                <span className="bento-num">/{cat.num}</span>
                <span className="bento-count">{cat.count} assets</span>
              </div>

              {/* Thumbnail */}
              {cat.thumb ? (
                <div className="bento-thumb-wrap">
                  <img src={cat.thumb} alt={cat.label} className="bento-thumb" loading="lazy" />
                </div>
              ) : (
                <div className="bento-thumb-wrap bento-thumb-empty">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}

              {/* Bottom info */}
              <div className="bento-card-bottom">
                <span className="bento-label">// Featured Project</span>
                <h3 className="bento-title">{cat.label}</h3>
                <span className="bento-cta">Click to open gallery &gt;&gt;</span>
              </div>

              {/* Bottom accent line */}
              <div className="bento-accent-line" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
