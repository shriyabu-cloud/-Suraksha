import { useState } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Download, Filter } from 'lucide-react';

const ALERTS = [
  { id: 1, sev: "CRITICAL", title: "Force Coil on Safety Relay — PLC-03", src: "192.168.10.88", dst: "192.168.10.33", cmd: "FC-05", mitre: "T0836", time: "14:31:58", risk: "Emergency shutoff valve state may change — physical damage possible.", fix: "1) Verify physical valve state. 2) Isolate switch port for .10.88. 3) Review access logs." },
  { id: 2, sev: "CRITICAL", title: "Mass Register Write — SCADA-01", src: "192.168.10.88", dst: "192.168.10.12", cmd: "FC-16", mitre: "T0831", time: "14:31:51", risk: "18 holding registers overwritten — setpoint tampering detected.", fix: "1) Compare registers to backup. 2) Roll back changed values. 3) Isolate rogue device." },
  { id: 3, sev: "HIGH", title: "Modbus Reconnaissance Sweep", src: "192.168.10.88", dst: "10.0/24", cmd: "FC-01", mitre: "T0846", time: "14:28:45", risk: "Unknown device polling all coil addresses — mapping plant topology.", fix: "1) Identify device at .10.88. 2) Check MAC vendor. 3) Verify asset registry." },
  { id: 4, sev: "HIGH", title: "Cross-Zone OPC-UA Browse", src: "192.168.10.88", dst: "HMI-01", cmd: "OPC-UA", mitre: "T0830", time: "14:29:12", risk: "Level 3 device browsing Level 1 HMI — Purdue model violation.", fix: "1) Enforce DMZ firewall rules. 2) Review HMI access control list." },
  { id: 5, sev: "MEDIUM", title: "DNP3 Unsolicited Response Flood", src: "RTU-07", dst: "SCADA-01", cmd: "DNP3", mitre: "T0814", time: "14:22:03", risk: "RTU sending 300% above baseline unsolicited responses — possible DoS.", fix: "1) Check RTU-07 health. 2) Reduce unsolicited reporting rate in device config." },
  { id: 6, sev: "LOW", title: "New Unwhitelisted Device Appeared", src: "192.168.10.88", dst: "—", cmd: "ARP", mitre: "T0845", time: "14:28:01", risk: "Unwhitelisted MAC detected. Vendor: Unknown.", fix: "1) Identify device physically. 2) Add to registry or isolate the port." },
];

const SEV_MAP = {
  CRITICAL: { color: "text-[#ef4444]", bg: "bg-[#ef4444]/10", border: "border-[#ef4444]/40", icon: <ShieldAlert size={16} /> },
  HIGH: { color: "text-[#f97316]", bg: "bg-[#f97316]/10", border: "border-[#f97316]/40", icon: <AlertTriangle size={16} /> },
  MEDIUM: { color: "text-[#eab308]", bg: "bg-[#eab308]/10", border: "border-[#eab308]/40", icon: <AlertCircle size={16} /> },
  LOW: { color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/40", icon: <Info size={16} /> },
};

export default function AlertFeed() {
  const [selected, setSelected] = useState(ALERTS[0]);

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">ALERT FEED</h2>
        <div className="flex gap-3">
          <button className="cyber-button text-xs flex items-center gap-2 bg-black/40 border-[#1c1c30] text-[#94a3b8] hover:text-[#22d3ee] hover:border-[#22d3ee]/50">
            <Filter size={14} /> FILTER BY SEVERITY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 items-start">
        
        {/* Left Col: Master Record List */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          {ALERTS.map(a => {
            const S = SEV_MAP[a.sev];
            const isSel = selected && selected.id === a.id;
            return (
              <div 
                key={a.id} 
                className={`glass-panel cursor-pointer flex gap-4 p-4 transition-all duration-300 ${isSel ? `border-l-4 border-l-[${S.color.replace('text-[', '').replace(']', '')}] bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.05)]` : 'hover:bg-black/40'}`}
                onClick={() => setSelected(a)}
              >
                <div className={`mt-1 flex-shrink-0 ${S.color} ${a.sev === 'CRITICAL' ? 'animate-pulse' : ''}`}>{S.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-bold text-[#e2e8f0] tracking-wide">{a.title}</div>
                    <div className="text-[10px] bg-black/50 border border-[#1e293b] text-[#94a3b8] px-2 py-0.5 rounded font-mono">{a.time}</div>
                  </div>
                  <div className="flex gap-2 text-xs mb-3">
                    <span className={`px-2 py-0.5 rounded ${S.bg} ${S.color} border ${S.border} font-bold text-[10px] tracking-widest`}>{a.sev}</span>
                    <span className="px-2 py-0.5 rounded bg-[#7c3aed]/20 text-[#22d3ee] border border-[#7c3aed]/40 text-[10px] tracking-widest font-bold font-mono">MITRE: {a.mitre}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#94a3b8] font-mono border-t border-[#1e293b]/50 pt-3">
                    <span className="text-[#8b5cf6]">{a.src}</span>
                    <span className="text-[#475569]">➔</span>
                    <span className="text-[#06b6d4]">{a.dst}</span>
                    <span className="ml-auto bg-[#1e293b] px-2 rounded-sm text-white">CMD: {a.cmd}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Details Pane */}
        {selected && (
          <div className="xl:col-span-5 sticky top-6">
            <WidgetCard title="INCIDENT DOSSIER" className="min-h-[500px]" status={selected.sev === 'CRITICAL' ? 'critical' : selected.sev === 'HIGH' ? 'warning' : 'normal'}>
              
              <div className="mb-6 flex items-start gap-4">
                <div className={`p-4 rounded-xl border ${SEV_MAP[selected.sev].bg} ${SEV_MAP[selected.sev].border} ${SEV_MAP[selected.sev].color} shadow-inner`}>
                  {SEV_MAP[selected.sev].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#e2e8f0] leading-tight mb-2">{selected.title}</h3>
                  <div className="text-xs text-[#94a3b8] tracking-widest font-mono">EVENT ID: #{selected.id.toString().padStart(6, '0')}</div>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <div className="text-[9px] text-[#06b6d4] tracking-widest mb-2 border-b border-[#1c1c30] pb-1 font-bold">PHYSICAL RISK ANALYSIS</div>
                  <p className="text-sm text-[#e2e8f0] leading-relaxed bg-[#1e293b]/30 p-4 rounded-lg border border-[#1c1c30]">{selected.risk}</p>
                </div>

                <div>
                  <div className="text-[9px] text-[#22c55e] tracking-widest mb-2 border-b border-[#1c1c30] pb-1 font-bold">RECOMMENDED REMEDIATION</div>
                  <div className="bg-[#22c55e]/5 p-4 rounded-lg border border-[#22c55e]/30 space-y-2">
                    {selected.fix.split(') ').map((step, i) => {
                      if (!step) return null;
                      const num = step.charAt(0);
                      const text = step.substring(1).trim();
                      if (isNaN(parseInt(num))) return <div key={i} className="text-sm text-[#e2e8f0]">{step}</div>;
                      return (
                        <div key={i} className="flex gap-3 text-sm">
                          <span className="text-[#22c55e] font-bold">{num}.</span>
                          <span className="text-[#e2e8f0]">{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1c1c30]">
                  <div>
                    <div className="text-[10px] text-[#94a3b8] mb-1">SOURCE</div>
                    <div className="text-xs text-[#8b5cf6] font-mono bg-black/40 p-2 rounded">{selected.src}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#94a3b8] mb-1">DESTINATION</div>
                    <div className="text-xs text-[#06b6d4] font-mono bg-black/40 p-2 rounded">{selected.dst}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-[#8b5cf6]/20 border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/40 text-xs py-3 rounded-lg font-bold tracking-widest transition-all flex justify-center items-center gap-2">
                  <Download size={14} /> DOWNLOAD PCAP
                </button>
                <button className="flex-1 bg-[#1e293b] border border-[#1c1c30] text-[#94a3b8] hover:text-white text-xs py-3 rounded-lg font-bold tracking-widest transition-all">
                  SUPPRESS ALERT
                </button>
              </div>

            </WidgetCard>
          </div>
        )}
      </div>
    </div>
  );
}
