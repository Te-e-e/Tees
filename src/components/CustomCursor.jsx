import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const lastPos = useRef({ x: -100, y: -100 });
  const [isHidden, setIsHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHidden) setIsHidden(false);
      
      const { clientX, clientY } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Trail Logic: Spawn a bubble every 25px of movement
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 25) {
        lastPos.current = { x: clientX, y: clientY };
        const id = Date.now() + Math.random();
        
        // Randomize bubble size and drift direction slightly
        const size = Math.random() * 4 + 3; // 3px to 7px
        const driftX = (Math.random() - 0.5) * 20; 
        
        setTrail(prev => [...prev.slice(-20), { id, x: clientX, y: clientY, size, driftX }]);
        
        setTimeout(() => {
          setTrail(prev => prev.filter(b => b.id !== id));
        }, 1000);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHidden]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, .gallery-card, .toggle, .ba-slider, .category-tab, .modal-close');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      document.body.classList.add('is-touch-device');
    }
  }, []);

  return (
    <>
      {/* Trail Bubbles */}
      {trail.map(b => (
        <div 
          key={b.id}
          className="trail-bubble"
          style={{ 
            left: b.x, 
            top: b.y,
            width: b.size,
            height: b.size,
            '--driftX': `${b.driftX}px`
          }}
        />
      ))}

      {/* Main Bubble Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor-bubble ${isHovering ? 'hovering' : ''} ${isHidden ? 'hidden' : ''}`}
      />
    </>
  );
}
