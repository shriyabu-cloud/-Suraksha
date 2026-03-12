import WidgetCard from '../components/widgets/WidgetCard';

const FC_MATRIX = [
  { fc: "FC-01", name: "Read Coil Status", count: "14,200", src: 3, risk: "LOW", ok: true },
  { fc: "FC-02", name: "Read Discrete Inputs", count: "5,430", src: 4, risk: "LOW", ok: true },
  { fc: "FC-03", name: "Read Holding Registers", count: "8,900", src: 2, risk: "LOW", ok: true },
  { fc: "FC-04", name: "Read Input Registers", count: "3,210", src: 2, risk: "LOW", ok: true },
  { fc: "FC-05", name: "Force Single Coil", count: "3", src: 1, risk: "CRITICAL", ok: false },
  { fc: "FC-16", name: "Write Multiple Registers", count: "18", src: 1, risk: "CRITICAL", ok: false },
];

export default function ProtocolAnalysis() {
  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">PROTOCOL ANALYSIS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 shrink-0">
        {[
          { name: "Modbus TCP", pct: 62, stats: "14.2k packets/min", color: "#8b5cf6", shadow: "rgba(139,92,246,0.3)" },
          { name: "OPC-UA", pct: 24, stats: "5.8k packets/min", color: "#06b6d4", shadow: "rgba(6,182,212,0.3)" },
          { name: "DNP3", pct: 14, stats: "3.2k packets/min", color: "#22c55e", shadow: "rgba(34,197,94,0.3)" },
        ].map(p => (
           <WidgetCard key={p.name} title={`PROTOCOL: ${p.name.toUpperCase()}`}>
              <div className="text-3xl font-bold mb-1" style={{ color: p.color, textShadow: `0 0 15px ${p.shadow}` }}>{p.pct}%</div>
              <div className="text-xs text-[#94a3b8]">{p.stats}</div>
              <div className="h-2 w-full bg-[#1e293b] rounded-full mt-4 overflow-hidden">
                 <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color, boxShadow: `0 0 10px ${p.shadow}` }}></div>
              </div>
           </WidgetCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        <WidgetCard title="MODBUS FUNCTION CODE MATRIX (LAST 24H)" className="flex-1">
          <div className="w-full h-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#1c1c30] text-[10px] text-[#94a3b8] tracking-widest bg-black/20">
                  <th className="p-3 font-medium">FC</th>
                  <th className="p-3 font-medium">NAME</th>
                  <th className="p-3 font-medium text-right">COUNT</th>
                  <th className="p-3 font-medium text-center">SRC IPS</th>
                  <th className="p-3 font-medium">RISK</th>
                  <th className="p-3 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {FC_MATRIX.map((r, i) => (
                  <tr key={i} className={`border-b border-[#1c1c30] hover:bg-[#141423] transition-colors ${!r.ok ? 'bg-[#ef4444]/10 hover:bg-[#ef4444]/20' : ''}`}>
                    <td className="p-3 text-xs font-bold text-[#8b5cf6] font-mono">{r.fc}</td>
                    <td className="p-3 text-xs text-[#e2e8f0]">{r.name}</td>
                    <td className="p-3 text-xs text-[#94a3b8] text-right font-mono">{r.count}</td>
                    <td className="p-3 text-xs text-[#94a3b8] text-center">{r.src}</td>
                    <td className="p-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-widest ${r.ok ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#ef4444] text-white shadow-[0_0_8px_#ef4444] animate-pulse-fast'}`}>
                        {r.risk}
                      </span>
                    </td>
                    <td className="p-3 text-xs font-bold font-mono tracking-widest">
                      {r.ok ? <span className="text-[#22c55e]">✓ OK</span> : <span className="text-[#ef4444]">⚠ ALERT</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetCard>

        <WidgetCard title="COMMUNICATION SEQUENCE PATTERNS" className="flex-1">
           <div className="space-y-4 pt-2">
             <div className="text-[10px] text-[#94a3b8] tracking-widest border-b border-[#1c1c30] pb-2 mb-4">ACTIVE ATTACK PATTERN DETECTED</div>
             {[
               ["14:28:01", ".10.88 → Network", "ARP broadcast — device discovery", "#f59e0b"],
               ["14:28:45", ".10.88 → PLC-03", "FC-01 poll coils 0x0000–0x00FF", "#f59e0b"],
               ["14:29:12", ".10.88 → HMI-01", "OPC-UA browse all node IDs", "#f97316"],
               ["14:31:44", ".10.88 → PLC-03", "FC-05 coil:0x0048 — Force Single Coil", "#ef4444"],
               ["14:31:51", ".10.88 → PLC-03", "FC-16 regs:0x0010–0x001E (18 regs)", "#ef4444"],
               ["14:31:58", ".10.88 → PLC-03", "FC-05 repeat — write-verify pattern", "#ef4444"],
             ].map(([t, src, cmd, c], i) => (
               <div key={i} className="flex gap-4 items-start relative before:absolute before:left-[4.5rem] before:top-4 before:bottom-[-1rem] before:w-0.5 before:bg-[#1c1c30] last:before:hidden">
                 <div className="text-[10px] text-[#94a3b8] font-mono mt-0.5 w-14 shrink-0 text-right">{t}</div>
                 <div className="relative z-10 w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}` }}></div>
                 <div className="flex-1 bg-black/40 border border-[#1c1c30] p-3 rounded-lg">
                   <div className="text-xs font-bold font-mono mb-1" style={{ color: c }}>{src}</div>
                   <div className="text-xs text-[#e2e8f0]">{cmd}</div>
                 </div>
               </div>
             ))}
           </div>
        </WidgetCard>
      </div>
    </div>
  );
}
