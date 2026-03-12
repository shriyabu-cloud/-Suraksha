import WidgetCard from '../components/widgets/WidgetCard';
import { AlertOctagon, Terminal, Play, CheckCircle2 } from 'lucide-react';

export default function IncidentResponse() {
  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">INCIDENT RESPONSE PORTAL</h2>
        <div className="bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444] px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse">
           <AlertOctagon size={16} /> ACTIVE INCIDENT #047
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 items-start">
        
        {/* Left Col: Automation Playbooks */}
        <div className="xl:col-span-8 flex flex-col gap-5">
          <WidgetCard title="RECOMMENDED PLAYBOOK: TRITON-PATTERN CONTAINMENT" className="flex-shrink-0 border-l-4 border-l-[#8b5cf6]">
             <div className="space-y-4">
                {[
                   { step: 1, action: "Identify Rogue Asset (MAC: 00:50:56:C0:00:08)", status: "COMPLETED", auto: true },
                   { step: 2, action: "Upload PCAP to Forensics Sandbox", status: "COMPLETED", auto: true },
                   { step: 3, action: "Physically Verify Valve State on PLC-03", status: "PENDING_MANUAL", auto: false },
                   { step: 4, action: "Issue Port Shutdown command to Switch-01 (Port 22)", status: "AWAITING_EXECUTION", auto: true },
                ].map(p => (
                   <div key={p.step} className={`p-4 rounded-lg flex items-center justify-between border transition-all ${p.status === 'COMPLETED' ? 'bg-[#22c55e]/5 border-[#22c55e]/20' : p.status === 'PENDING_MANUAL' ? 'bg-[#f59e0b]/5 border-[#f59e0b]/20' : 'bg-black/40 border-[#1c1c30] hover:border-[#8b5cf6]/50'}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${p.status === 'COMPLETED' ? 'bg-[#22c55e]/20 text-[#22c55e]' : p.status === 'PENDING_MANUAL' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'bg-[#1e293b] text-[#94a3b8]'}`}>
                            {p.status === 'COMPLETED' ? <CheckCircle2 size={16} /> : p.step}
                         </div>
                         <div>
                            <div className="text-sm font-bold text-[#e2e8f0]">{p.action}</div>
                            <div className="text-[10px] text-[#94a3b8] font-mono mt-1">Mode: {p.auto ? "AUTOMATED SCRIPT" : "MANUAL INTERVENTION"}</div>
                         </div>
                      </div>
                      {p.status === 'COMPLETED' && <div className="text-[#22c55e] text-xs font-bold tracking-widest font-mono">100%</div>}
                      {p.status === 'PENDING_MANUAL' && <button className="bg-[#f59e0b]/10 border border-[#f59e0b]/50 text-[#f59e0b] px-3 py-1 rounded text-[10px] font-bold tracking-widest hover:bg-[#f59e0b]/20 transition-colors">MARK RESOLVED</button>}
                      {p.status === 'AWAITING_EXECUTION' && <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded shadow-[0_0_15px_rgba(239,68,68,0.5)] text-[10px] font-bold tracking-widest flex items-center gap-2 transition-all"><Play size={12}/> EXECUTE</button>}
                   </div>
                ))}
             </div>
          </WidgetCard>

          <WidgetCard title="ACTIVE FORENSIC SHELL" className="flex-1 min-h-[300px]">
             <div className="h-full bg-[#070711] rounded-lg border border-[#1e293b] p-4 font-mono text-xs flex flex-col">
                <div className="text-[#94a3b8] mb-4 flex items-center gap-2"><Terminal size={14}/> <span>root@senital-soar:~# ./contain_port.sh --switch 192.168.10.2 --port 22</span></div>
                <div className="text-[#06b6d4] mb-1">Authenticating to Switch-01 (192.168.10.2)... SUCCESS</div>
                <div className="text-[#06b6d4] mb-1">Retrieving interface status... Port 22 is UP (VLAN 10)</div>
                <div className="text-[#06b6d4] mb-1">Sending admin-down command...</div>
                <div className="mt-auto flex items-center gap-2 text-[#94a3b8]">
                   <span>root@senital-soar:~#</span>
                   <span className="w-2 h-4 bg-[#06b6d4] animate-pulse"></span>
                </div>
             </div>
          </WidgetCard>
        </div>

        {/* Right Col: Timeline */}
        <div className="xl:col-span-4 flex flex-col gap-5">
           <WidgetCard title="INCIDENT CHRONOLOGY" className="flex-1">
              <div className="space-y-6 pt-4 ml-4">
                 {[
                    { time: "14:28:01", ev: "Unrecognized MAC detected on subnet", type: "system" },
                    { time: "14:28:45", ev: "Suspicious Modbus scanning activity", type: "system" },
                    { time: "14:31:51", ev: "Mass Register Write detected", type: "alert" },
                    { time: "14:32:00", ev: "ML Engine triggers Incident #047", type: "alert" },
                    { time: "14:32:05", ev: "Agent_727 viewed Incident Dossier", type: "user" },
                    { time: "14:35:12", ev: "Automated Sandbox Analysis generated P-CAP report", type: "system" },
                    { time: "NOW", ev: "Awaiting Port Isolation approval", type: "pending" }
                 ].map((e, i, arr) => (
                    <div key={i} className="relative before:absolute before:left-[-1.125rem] before:top-4 before:bottom-[-2rem] before:w-px before:bg-[#1e293b] last:before:hidden flex gap-4 items-start">
                       <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 relative z-10 left-[-1.4rem] ${e.type === 'alert' ? 'bg-[#ef4444] shadow-[0_0_8px_#ef4444]' : e.type === 'user' ? 'bg-[#8b5cf6]' : e.type === 'pending' ? 'bg-[#f59e0b] animate-pulse' : 'bg-[#06b6d4]'}`}></div>
                       <div className="-ml-6">
                          <div className="text-[10px] text-[#94a3b8] font-mono mb-0.5">{e.time}</div>
                          <div className={`text-xs ${e.type === 'alert' ? 'text-[#ef4444] font-bold' : e.type === 'pending' ? 'text-[#f59e0b]' : 'text-[#e2e8f0]'}`}>{e.ev}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </WidgetCard>
        </div>
      </div>
    </div>
  );
}
