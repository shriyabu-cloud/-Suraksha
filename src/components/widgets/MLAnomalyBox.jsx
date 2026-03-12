import WidgetCard from './WidgetCard';
import { Activity } from 'lucide-react';

export default function MLAnomalyBox({ isAlert }) {
  const feats = [
    { n: "Write cmds/min", c: isAlert ? "800" : "12", b: "14", d: isAlert ? "+5600%" : "-14%" },
    { n: "FC-16 usage", c: isAlert ? "18" : "0", b: "0", d: isAlert ? "∞" : "0" },
    { n: "Source IPs", c: isAlert ? "2" : "1", b: "1", d: isAlert ? "+100%" : "0" },
  ];

  return (
    <WidgetCard title="AI ISOLATION FOREST" status={isAlert ? "critical" : "normal"} className="shrink-0 h-[21rem]">
      <div className={`flex items-center gap-3 p-3 rounded-lg border mb-4 ${isAlert ? 'bg-[#ef4444]/10 border-[#ef4444]/30' : 'bg-[#1e293b]/50 border-[#1c1c30]'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAlert ? 'bg-[#ef4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' : 'bg-[#22c55e]/20 text-[#22c55e]'}`}>
          <Activity size={16} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-[#94a3b8] tracking-widest">Target: PLC-03</div>
          <div className="flex justify-between items-baseline">
            <div className={`text-xl font-bold ${isAlert ? 'text-[#ef4444] drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'text-[#22c55e]'}`}>
              {isAlert ? '0.94' : '0.12'}
            </div>
            <div className="text-[10px] text-[#94a3b8]">/ 1.0 SCORE</div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black/30 rounded-lg border border-[#1c1c30] p-3 overflow-hidden">
        <div className="text-[9px] text-[#94a3b8] tracking-widest mb-3 border-b border-[#1c1c30] pb-2">FEATURE IMPORTANCE MATRIX</div>
        
        <div className="grid grid-cols-[1fr_40px_40px_50px] gap-2 mb-2 text-[8px] text-[#475569] tracking-widest">
          <div>VECTOR</div>
          <div className="text-right">NOW</div>
          <div className="text-right">BASE</div>
          <div className="text-right">DELTA</div>
        </div>
        
        <div className="space-y-3">
          {feats.map((f, i) => (
            <div key={i} className="grid grid-cols-[1fr_40px_40px_50px] gap-2 items-center">
              <div className="text-[10px] text-[#e2e8f0] truncate">{f.n}</div>
              <div className={`text-[10px] text-right font-mono ${isAlert ? 'text-white' : 'text-[#e2e8f0]'}`}>{f.c}</div>
              <div className="text-[10px] text-[#94a3b8] text-right">{f.b}</div>
              <div className={`text-[10px] font-bold text-right ${isAlert && i < 2 ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
