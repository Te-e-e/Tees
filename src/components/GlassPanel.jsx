export default function GlassPanel({ children, className = '', style = {}, glow = false }) {
  return (
    <div
      className={`glass ${className}`}
      style={{
        padding: 'var(--space-xl)',
        boxShadow: glow ? 'var(--shadow-glow)' : 'var(--shadow-card)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
