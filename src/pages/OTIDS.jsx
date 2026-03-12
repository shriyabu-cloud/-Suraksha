import { useState, useEffect } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { Activity, ShieldAlert, Cpu, Network, Zap, WifiOff } from 'lucide-react';

export default function OTIDS() {
  const [pkts, setPkts] = useState(2847293);
  const [pps, setPps] = useState(3800);
  const [alertMode, setAlertMode] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const step = Math.floor(Math.random() * 80 + 40);
      setPkts(p => p + step);
      setPps(3800 + Math.floor(Math.random() * 500) * (alertMode ? 2.5 : 1));
    }, 200);
    return () => clearInterval(t);
  }, [alertMode]);

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      
      {/* Demo Controls */}
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">OT-IDS MONITOR <span className="text-[#8b5cf6] font-mono text-sm ml-2">[{alertMode ? "DEFCON 2" : "DEFCON 5"}]</span></h2>
        <button 
          onClick={() => setAlertMode(!alertMode)}
          className={`cyber-button text-xs ${alertMode 
            ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : 'bg-[#ef4444]/10 border-[#ef4444] text-[#ef4444] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'}`}
        >
          {alertMode ? "SIMULATE SAFE STATE" : "SIMULATE RED ALERT"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1">
        
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-5">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0 h-40">
             <WidgetCard title="PACKET MONITOR" className="p-4 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-[30px]"></div>
                <div className="text-[10px] text-[#94a3b8] tracking-widest mb-1">TOTAL INGRESS (LAST 24H)</div>
                <div className="font-mono text-3xl font-bold text-[#e2e8f0] mb-3">{pkts.toLocaleString()} <span className="text-sm text-[#06b6d4]">PKTS</span></div>
                <div className="flex items-center gap-2">
                   <Activity size={16} className={alertMode ? "text-[#ef4444] animate-bounce" : "text-[#22c55e]"} />
                   <div className={`font-mono font-bold tracking-widest text-sm ${alertMode ? 'text-[#ef4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-[#22c55e]'}`}>{pps.toLocaleString()} PKT/S</div>
                </div>
             </WidgetCard>
             
             <WidgetCard title="ALERT SEVERITY METER" className="p-4 flex flex-col justify-center">
                <div className="flex justify-between text-[10px] font-bold tracking-widest mb-2">
                  <span className={!alertMode ? "text-[#22c55e] drop-shadow-[0_0_5px_#22c55e]" : "text-[#94a3b8]"}>SAFE</span>
                  <span className={alertMode ? "text-[#ef4444] drop-shadow-[0_0_5px_#ef4444]" : "text-[#94a3b8]"}>CRITICAL</span>
                </div>
                <div className="w-full h-8 bg-[#1e293b] rounded-lg overflow-hidden flex shadow-inner relative">
                  {/* Indicator notch */}
                  <div className={`absolute top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_white] z-10 transition-all duration-1000 ${alertMode ? 'left-[90%]' : 'left-[15%]'}`}></div>
                  
                  <div className="w-1/3 h-full bg-gradient-to-r from-[#22c55e] to-[#84cc16] opacity-70"></div>
                  <div className="w-1/3 h-full bg-gradient-to-r from-[#eab308] to-[#f97316] opacity-70"></div>
                  <div className="w-1/3 h-full bg-gradient-to-r from-[#ef4444] to-[#b91c1c] opacity-70"></div>
                </div>
             </WidgetCard>
           </div>

           <WidgetCard title="TRAFFIC GRAPH (MB/S)" className="flex-1 min-h-[250px] p-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
               <div className="absolute inset-0 flex items-end px-4 pb-8 pt-12">
                  <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <defs>
                       <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor={alertMode ? "#ef4444" : "#06b6d4"} stopOpacity="0.5" />
                         <stop offset="100%" stopColor={alertMode ? "#ef4444" : "#06b6d4"} stopOpacity="0" />
                       </linearGradient>
                     </defs>
                     {alertMode ? (
                        <>
                          <path d="M0,80 Q5,60 10,75 T20,70 T30,20 T40,60 T50,15 T60,50 T70,10 T80,45 T90,5 T100,30 L100,100 L0,100 Z" fill="url(#lineGlow)" />
                          <path d="M0,80 Q5,60 10,75 T20,70 T30,20 T40,60 T50,15 T60,50 T70,10 T80,45 T90,5 T100,30" fill="none" stroke="#ef4444" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        </>
                     ) : (
                        <>
                          <path d="M0,80 Q10,75 20,82 T40,78 T60,85 T80,75 T100,80 L100,100 L0,100 Z" fill="url(#lineGlow)" />
                          <path d="M0,80 Q10,75 20,82 T40,78 T60,85 T80,75 T100,80" fill="none" stroke="#06b6d4" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-[pulse_4s_infinite]" />
                        </>
                     )}
                     
                     {/* Scanning scanning line */}
                     <line x1="0" y1="0" x2="0" y2="100" stroke={alertMode ? "rgba(239,68,68,0.5)" : "rgba(6,182,212,0.5)"} strokeWidth="1">
                       <animate attributeName="x1" values="0;100;0" dur="4s" repeatCount="indefinite" />
                       <animate attributeName="x2" values="0;100;0" dur="4s" repeatCount="indefinite" />
                     </line>
                  </svg>
               </div>
               
               {/* Y-Axis Labels */}
               <div className="absolute left-2 top-10 bottom-8 flex flex-col justify-between text-[10px] text-[#94a3b8] font-mono">
                 <span>1000</span>
                 <span>500</span>
                 <span>0</span>
               </div>
           </WidgetCard>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-64 shrink-0">
             <WidgetCard title="THREAT DETECTION PANEL" className="p-0 overflow-y-auto">
               <div className="flex flex-col">
                 <div className="p-3 border-b border-[#1c1c30] flex items-center gap-3 bg-[#141423] group cursor-pointer hover:bg-[#1e293b] transition-colors">
                   <ShieldAlert size={16} className="text-[#ef4444]" />
                   <div>
                      <div className="text-xs font-bold text-[#e2e8f0]">DNP3 Malformed Packet</div>
                      <div className="text-[10px] text-[#94a3b8] font-mono">14:22:03 • 192.168.10.45</div>
                   </div>
                   <div className="ml-auto text-[10px] bg-[#ef4444]/20 text-[#ef4444] px-2 py-0.5 rounded font-bold">CRIT</div>
                 </div>
                 <div className="p-3 border-b border-[#1c1c30] flex items-center gap-3 bg-[#141423] group cursor-pointer hover:bg-[#1e293b] transition-colors">
                   <Activity size={16} className="text-[#f59e0b]" />
                   <div>
                      <div className="text-xs font-bold text-[#e2e8f0]">Unusual Modbus Read Coils</div>
                      <div className="text-[10px] text-[#94a3b8] font-mono">14:15:44 • PLC-03</div>
                   </div>
                   <div className="ml-auto text-[10px] bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded font-bold">WARN</div>
                 </div>
                 <div className="p-3 border-b border-[#1c1c30] flex items-center gap-3 bg-[#141423] group cursor-pointer hover:bg-[#1e293b] transition-colors">
                   <Network size={16} className="text-[#22c55e]" />
                   <div>
                      <div className="text-xs font-bold text-[#e2e8f0]">New Host Discovered</div>
                      <div className="text-[10px] text-[#94a3b8] font-mono">13:50:12 • 10.0.4.55</div>
                   </div>
                   <div className="ml-auto text-[10px] bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded font-bold">INFO</div>
                 </div>
                 <div className="p-3 flex items-center gap-3 bg-[#141423] group cursor-pointer hover:bg-[#1e293b] transition-colors">
                   <WifiOff size={16} className="text-[#f59e0b]" />
                   <div>
                      <div className="text-xs font-bold text-[#e2e8f0]">HMI Disconnect</div>
                      <div className="text-[10px] text-[#94a3b8] font-mono">10:05:00 • HMI-01</div>
                   </div>
                   <div className="ml-auto text-[10px] bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded font-bold">WARN</div>
                 </div>
               </div>
             </WidgetCard>
             
             <WidgetCard title="PROTOCOL ACTIVITY" className="p-4 flex flex-col justify-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] tracking-widest font-bold mb-1">
                      <span className="text-[#06b6d4]">MODBUS TCP</span>
                      <span className="text-[#e2e8f0]">45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden"><div className="w-[45%] h-full bg-[#06b6d4]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] tracking-widest font-bold mb-1">
                      <span className="text-[#8b5cf6]">DNP3</span>
                      <span className="text-[#e2e8f0]">30%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden"><div className="w-[30%] h-full bg-[#8b5cf6]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] tracking-widest font-bold mb-1">
                      <span className="text-[#22c55e]">OPC-UA</span>
                      <span className="text-[#e2e8f0]">15%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden"><div className="w-[15%] h-full bg-[#22c55e]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] tracking-widest font-bold mb-1">
                      <span className="text-[#f59e0b]">MQTT / OTHER</span>
                      <span className="text-[#e2e8f0]">10%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden"><div className="w-[10%] h-full bg-[#f59e0b]"></div></div>
                  </div>
                </div>
             </WidgetCard>
           </div>

        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <WidgetCard title="INTRUSION LOG FEED" className="flex-1 overflow-hidden flex flex-col">
             <div className="bg-black/40 flex-1 p-3 overflow-y-auto space-y-1 font-mono text-[10px] border-t border-[#1c1c30]">
                {Array.from({length: 20}).map((_, i) => (
                   <div key={i} className={`flex gap-3 hover:bg-[#141423] p-1 rounded transition-colors ${i === 0 && alertMode ? 'text-[#ef4444] font-bold' : (i < 3 ? 'text-[#e2e8f0]' : 'text-[#94a3b8]')}`}>
                      <span className="shrink-0 opacity-50">14:{(22-i).toString().padStart(2, '0')}:{(i*7 % 60).toString().padStart(2, '0')}</span>
                      <span className="break-all">{
                        i === 0 && alertMode ? '[IDS] MULTIPLE FAILED AUTH ATTEMPTS DNP3' :
                        i % 5 === 0 ? '[TCP] Connection Reset by Peer 192.168.1.5' :
                        i % 3 === 0 ? '[MODBUS] Function Code 0x03 Read Holding Registers' :
                        '[IDS] Routine Signature Match Verified'
                      }</span>
                   </div>
                ))}
             </div>
          </WidgetCard>
          
          <WidgetCard title="SUSPICIOUS TIMELINE" className="h-72 p-4 overflow-y-auto">
             <div className="relative pl-4 space-y-6">
               <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1e293b]"></div>
               
               <div className="relative">
                 <div className={`absolute -left-[14px] top-1 w-3 h-3 rounded-full border-2 border-[#070711] ${alertMode ? 'bg-[#ef4444] shadow-[0_0_8px_#ef4444]' : 'bg-[#eab308]'}`}></div>
                 <div className="text-xs text-[#e2e8f0] font-bold mb-1">Unauthorized PLC Write</div>
                 <div className="text-[10px] text-[#94a3b8] font-mono mb-1">14:22:03 • 192.168.10.45</div>
                 <div className="text-[10px] text-[#8b5cf6] bg-[#8b5cf6]/10 px-2 py-0.5 rounded w-fit">Mitigation Pending</div>
               </div>

               <div className="relative">
                 <div className="absolute -left-[14px] top-1 w-3 h-3 rounded-full border-2 border-[#070711] bg-[#06b6d4]"></div>
                 <div className="text-xs text-[#e2e8f0] font-bold mb-1">Port Scan Detected</div>
                 <div className="text-[10px] text-[#94a3b8] font-mono mb-1">11:05:11 • External IP</div>
                 <div className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded w-fit">Blocked at Edge</div>
               </div>

               <div className="relative">
                 <div className="absolute -left-[14px] top-1 w-3 h-3 rounded-full border-2 border-[#070711] bg-[#06b6d4]"></div>
                 <div className="text-xs text-[#e2e8f0] font-bold mb-1">Admin Login Failed</div>
                 <div className="text-[10px] text-[#94a3b8] font-mono mb-1">08:14:59 • VPN Gateway</div>
                 <div className="text-[10px] text-[#94a3b8] bg-white/5 px-2 py-0.5 rounded w-fit">Logged to SIEM</div>
               </div>
             </div>
          </WidgetCard>
        </div>

      </div>
    </div>
  );
}
