export default function Logo({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#8b5cf6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="blue-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#22d3ee" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      
      {/* Base Outline: White stroke inside cyber styling */}
      <path 
        d="M 25 25 L 75 25 L 85 45 L 80 75 L 60 90 L 40 90 L 20 75 L 15 45 Z" 
        stroke="white" 
        strokeWidth="2" 
        style={{ filter: 'url(#blue-glow)' }}
      />
      
      {/* Inner Panels */}
      <path 
        d="M 30 30 L 70 30 L 78 45 L 72 70 L 58 83 L 42 83 L 28 70 L 22 45 Z" 
        stroke="url(#cyber-grad)" 
        strokeWidth="1" 
        fill="rgba(20,20,35,0.6)"
      />

      {/* Eyes: Purple Glow */}
      <polygon 
        points="30,45 45,40 45,50 35,52" 
        fill="none" 
        stroke="#8b5cf6"
        strokeWidth="2"
        style={{ filter: "url(#purple-glow)" }}
      />
      <polygon 
        points="70,45 55,40 55,50 65,52" 
        fill="none" 
        stroke="#22d3ee"
        strokeWidth="2"
        style={{ filter: "url(#blue-glow)" }}
      />

      {/* Vent / Mouth Grille */}
      <path 
        d="M 40 68 L 60 68 M 42 74 L 58 74 M 45 80 L 55 80" 
        stroke="#8b5cf6" 
        strokeWidth="2" 
        strokeLinecap="round"
        style={{ filter: "url(#purple-glow)" }}
      />

      {/* Forehead V */}
      <path d="M 40 35 L 50 45 L 60 35" stroke="#22d3ee" strokeWidth="2" style={{ filter: "url(#blue-glow)" }} fill="none" />
      
      {/* Outer nodes */}
      <circle cx="15" cy="45" r="3" fill="white" style={{ filter: "url(#blue-glow)" }} />
      <circle cx="85" cy="45" r="3" fill="white" style={{ filter: "url(#purple-glow)" }} />
    </svg>
  );
}
