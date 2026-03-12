import WidgetCard from './WidgetCard';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function AlertPanel({ isAlert }) {
  return (
    <WidgetCard 
      status={isAlert ? "critical" : "normal"}
      className={`h-40 shrink-0 transition-all duration-500 overflow-hidden relative ${isAlert ? 'bg-[#ef4444]/5' : 'bg-[#22c55e]/5'}`}
    >
      {/* Background Pulse Pattern */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-[url('linear-gradient(45deg,rgba(0,0,0,0)_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_100%')] bg-[length:40px_40px] ${isAlert ? 'animate-[gridScroll_2s_linear_infinite]' : ''}`}></div>

      <div className="flex h-full items-center justify-between z-10 relative px-4">
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-xl border ${isAlert ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.5)]'}`}>
            {isAlert ? <AlertTriangle size={40} className="animate-pulse-fast" /> : <CheckCircle size={40} />}
          </div>
          <div>
            <div className={`text-xs font-bold tracking-[0.3em] mb-1 ${isAlert ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>
              {isAlert ? 'THREAT LEVEL: CRITICAL' : 'THREAT LEVEL: NOMINAL'}
            </div>
            <h3 className={`text-2xl lg:text-3xl font-bold tracking-wider ${isAlert ? 'text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-[#e2e8f0]'}`}>
              {isAlert ? 'PLC OWR-16 FORCED OVERRIDE' : 'ALL SYSTEMS OPERATIONAL'}
            </h3>
            {isAlert && (
              <div className="flex gap-4 mt-3">
                <span className="text-xs bg-[#ef4444]/20 text-[#ffbaba] px-2 py-1 border border-[#ef4444]/50 rounded font-bold">T0831 - Execution</span>
                <span className="text-xs text-[#94a3b8] font-mono mt-1">Source: 192.168.10.88</span>
              </div>
            )}
          </div>
        </div>

        {isAlert && (
          <div className="text-right flex flex-col items-end">
            <div className="text-[#ef4444] font-mono text-xl font-bold animate-[pulse_1s_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">ACTION REQ</div>
            <div className="text-[10px] text-[#94a3b8] tracking-widest mt-1 mb-3">AUTO-CONTAINMENT FAILED</div>
            <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold px-4 py-2 rounded shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all">
              EMERGENCY ISOLATE
            </button>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
