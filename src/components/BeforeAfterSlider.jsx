import { useState, useRef, useCallback } from 'react';
import './BeforeAfterSlider.css';

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updatePosition(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging.current) {
      updatePosition(e.clientX);
    }
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleTouchStart = (e) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging.current) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  if (!beforeSrc || !afterSrc) return null;

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After (bottom layer) */}
      <div className="ba-image-wrap ba-after">
        <img src={afterSrc} alt={afterLabel} className="ba-image" draggable={false} />
        <span className="ba-label ba-label-after">{afterLabel}</span>
      </div>

      {/* Before (clipped top layer) */}
      <div
        className="ba-image-wrap ba-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeLabel} className="ba-image" draggable={false} />
        <span className="ba-label ba-label-before">{beforeLabel}</span>
      </div>

      {/* Divider line */}
      <div className="ba-divider" style={{ left: `${position}%` }}>
        <div className="ba-handle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9,6 3,12 9,18" />
            <polyline points="15,6 21,12 15,18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
