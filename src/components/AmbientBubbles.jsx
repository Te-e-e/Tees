import { useMemo } from 'react';

export default function AmbientBubbles({ count = 25 }) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 4 + Math.random() * 12;
      const left = Math.random() * 100;
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 20;
      const opacity = 0.1 + Math.random() * 0.3;

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity,
        },
      };
    });
  }, [count]);

  return (
    <div className="ambient-bubbles-container" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span key={bubble.id} className="ambient-bubble" style={bubble.style} />
      ))}
    </div>
  );
}
