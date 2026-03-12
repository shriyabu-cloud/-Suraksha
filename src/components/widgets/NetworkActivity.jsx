import { useEffect, useState } from 'react';
import WidgetCard from './WidgetCard';

export default function NetworkActivity() {
  const [points, setPoints] = useState(Array.from({length: 40}, () => Math.random() * 30 + 10));

  useEffect(() => {
    const t = setInterval(() => {
      setPoints(p => [...p.slice(1), Math.random() * 40 + (Math.random() > 0.8 ? 50 : 10)]);
    }, 400);
    return () => clearInterval(t);
  }, []);

  const max = 100;
  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / 39) * 100} ${100 - (p / max) * 100}`).join(" ");

  return (
    <WidgetCard title="REAL-TIME OT TRAFFIC" className="flex-1">
      <div className="absolute top-2 right-4 flex items-center gap-2 text-[9px] text-[#94a3b8]">
        <span className="w-2 h-0.5 bg-[#8b5cf6]"></span> Normal 
        <span className="w-2 h-0.5 bg-[#06b6d4] ml-2"></span> Encrypted
      </div>
      <div className="h-full w-full relative overflow-hidden mt-6">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradAct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-line">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <path d={`${pathData} L 100 100 L 0 100 Z`} fill="url(#gradAct)" />
          <path d={pathData} fill="none" stroke="#8b5cf6" strokeWidth="1.5" style={{ filter: "url(#glow-line)" }} className="transition-all duration-300 linear" />
          
          {/* Animated vertical scanning line */}
          <line x1="80" y1="0" x2="80" y2="100" stroke="#06b6d4" strokeWidth="0.5" className="animate-[pulse_2s_infinite]" />
          <polygon points="78,0 82,0 80,4" fill="#06b6d4" />
        </svg>

        {/* X axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-[#475569] font-mono">
          <span>-60s</span>
          <span>-30s</span>
          <span>NOW</span>
        </div>
      </div>
    </WidgetCard>
  );
}
