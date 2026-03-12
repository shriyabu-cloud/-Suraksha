import WidgetCard from './WidgetCard';

const PROTOCOLS = [
  { name: "Modbus TCP", pct: 62, color: "#8b5cf6", shadow: "rgba(139,92,246,0.5)" },
  { name: "OPC-UA", pct: 24, color: "#06b6d4", shadow: "rgba(6,182,212,0.5)" },
  { name: "DNP3", pct: 10, color: "#22c55e", shadow: "rgba(34,197,94,0.5)" },
  { name: "Unknown", pct: 4, color: "#ef4444", shadow: "rgba(239,68,68,0.5)" },
];

export default function ProtocolMonitor() {
  return (
    <WidgetCard title="PROTOCOL DISTRIBUTION" className="flex-1">
      <div className="flex flex-col justify-center h-full gap-5 mt-2">
        {PROTOCOLS.map((p, i) => (
          <div key={i}>
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-[#e2e8f0] font-medium leading-none">{p.name}</span>
              <span className="text-[10px] font-bold" style={{ color: p.color, textShadow: `0 0 10px ${p.shadow}` }}>{p.pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative" 
                style={{ width: `${p.pct}%`, backgroundColor: p.color, boxShadow: `0 0 10px ${p.shadow}` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 blur-[2px]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
