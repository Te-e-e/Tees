export default function ThemeIcon({ className = '' }) {
  return (
    <svg 
      className={`theme-icon ${className}`} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 12h4l2-4 4 8 4-8 2 4h4" />
    </svg>
  );
}
