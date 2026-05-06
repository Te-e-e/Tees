import './GalleryCard.css';

export default function GalleryCard({ project, onClick }) {
  const { title, category, image_url, tags = [], image_before_url } = project;

  return (
    <div className="gallery-card masonry-item" onClick={() => onClick?.(project)} id={`project-${project.id}`}>
      <div className="gallery-card-image-wrap">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="gallery-card-image"
            loading="lazy"
          />
        ) : (
          <div className="gallery-card-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        {image_before_url && (
          <div className="gallery-card-compare-badge" title="Before/After available">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
        )}
        <div className="gallery-card-overlay">
          <span className="gallery-card-view">View Project</span>
        </div>
      </div>
      <div className="gallery-card-info">
        <h3 className="gallery-card-title">{title}</h3>
        <span className="gallery-card-category">{category}</span>
        {tags.length > 0 && (
          <div className="gallery-card-tags">
            {tags.map((tag) => (
              <span key={tag} className="gallery-card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
