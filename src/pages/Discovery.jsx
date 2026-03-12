import { useState, useEffect } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { Search, Loader2, TerminalSquare } from 'lucide-react';

const MOCK_DEVICES = [
  { ip: "192.168.10.33", proto: "Modbus TCP", type: "PLC (Siemens S7)", state: "secure" },
  { ip: "192.168.10.12", proto: "OPC-UA", type: "SCADA Server", state: "secure" },
  { ip: "192.168.10.88", proto: "Unknown", type: "Unknown Device", state: "rogue" },
  { ip: "192.168.10.45", proto: "DNP3", type: "RTU", state: "secure" },
  { ip: "192.168.10.20", proto: "Modbus TCP", type: "HMI Panel", state: "secure" }
];

export default function Discovery() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState([]);
  const [logs, setLogs] = useState([]);
  const [sweepLogs, setSweepLogs] = useState([
    { id: 1, time: "12:41:02", dev: "PLC-01", ip: "192.168.0.4", proto: "MODBUS", stat: "OK" },
    { id: 2, time: "12:41:05", dev: "RTU-02", ip: "192.168.0.8", proto: "DNP3", stat: "OK" },
    { id: 3, time: "12:41:09", dev: "SENSOR-01", ip: "192.168.0.12", proto: "OPC-UA", stat: "WARNING" }
  ]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setDevices([]);
    setLogs(["[SYSTEM] Initiating subnet sweep...", "[ARP] Broadcasting requests on 192.168.10.0/24"]);
    
    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += Math.floor(Math.random() * 5) + 2;
      
      if (currentProg >= 100) {
        currentProg = 100;
        setScanning(false);
        clearInterval(interval);
        setLogs(prev => [...prev.slice(-15), "[SYSTEM] Scan complete. 5 hosts up."]);
      }
      setProgress(currentProg);

      const devIndex = Math.floor(currentProg / 20) - 1;
      if (devIndex >= 0 && devIndex < MOCK_DEVICES.length && devices.length === devIndex) {
        const found = MOCK_DEVICES[devIndex];
        setDevices(prev => [...prev, found]);
        setLogs(prev => [...prev.slice(-15), `[DISCOVERED] ${found.ip} (${found.mac}) - ${found.type}`]);
      }
      
      if (Math.random() > 0.5) {
        setLogs(prev => [...prev.slice(-15), `[SNIFF] Waiting for response on IP .${Math.floor(Math.random() * 255)}`]);
      }

    }, 300);
  };

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">NETWORK DISCOVERY</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${scanning ? 'bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse' : 'bg-[#1e293b]'}`}></span>
            <span className={`text-[10px] font-bold tracking-widest ${scanning ? 'text-[#22c55e]' : 'text-[#94a3b8]'}`}>{scanning ? 'ACTIVE' : 'IDLE'}</span>
          </div>
          <button 
            onClick={scanning ? () => {} : startScan}
            className={`cyber-button text-xs flex items-center gap-2 ${scanning ? 'bg-[#06b6d4]/20 border-[#06b6d4] text-[#06b6d4] cursor-not-allowed' : 'bg-[#7c3aed]/20 border-[#7c3aed] text-white hover:bg-[#7c3aed]/40 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]'}`}
          >
            {scanning ? (
              <><Loader2 size={14} className="animate-spin" /> SCANNING SUBNET...</>
            ) : (
              <><Search size={14} /> INITIATE SWEEP</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1">
        <div className="xl:col-span-4 flex flex-col gap-5">
           
           <WidgetCard title="SCAN STATUS" className="p-4 shrink-0 font-mono text-xs">
              <div className="space-y-2 text-[#e2e8f0]">
                <div className={`flex items-center gap-2 transition-opacity ${scanning ? 'opacity-100' : 'opacity-30'}`}>
                  {scanning ? <Loader2 size={14} className="animate-spin text-[#06b6d4]" /> : <div className="w-3.5 h-3.5 border border-[#1e293b] rounded"></div>}
                  Initializing scan...
                </div>
                <div className={`flex items-center gap-2 transition-opacity ${(scanning && progress > 20) ? 'opacity-100' : 'opacity-30'}`}>
                  {(scanning && progress > 20) ? <Loader2 size={14} className="animate-spin text-[#8b5cf6]" /> : <div className="w-3.5 h-3.5 border border-[#1e293b] rounded"></div>}
                  Searching network...
                </div>
                <div className={`flex items-center gap-2 transition-opacity ${(scanning && progress > 50) ? 'opacity-100' : 'opacity-30'}`}>
                  {(scanning && progress > 50) ? <Loader2 size={14} className="animate-spin text-[#06b6d4]" /> : <div className="w-3.5 h-3.5 border border-[#1e293b] rounded"></div>}
                  Waiting for device...
                </div>
              </div>
           </WidgetCard>
          <WidgetCard title="ACTIVE RADAR" className="h-64 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
             <div className="w-40 h-40 rounded-full border border-[#06b6d4]/30 relative flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
               <div className="w-20 h-20 rounded-full border border-[#06b6d4]/20"></div>
               <div className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] absolute"></div>
               {scanning && (
                 <div className="absolute inset-0 rounded-full w-full h-full border-r-2 border-[#06b6d4] animate-[spin_2s_linear_infinite]"
                      style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.1) 360deg)' }}></div>
               )}
               {devices.map((d, i) => (
                 <div key={i} className={`absolute w-1.5 h-1.5 rounded-full ${d.state === 'rogue' ? 'bg-[#ef4444] shadow-[0_0_5px_#ef4444]' : 'bg-[#22c55e] shadow-[0_0_5px_#22c55e]'}`}
                      style={{ top: `${20 + Math.random()*60}%`, left: `${20 + Math.random()*60}%` }}></div>
               ))}
             </div>
             <div className="absolute bottom-4 right-4 text-[10px] text-[#06b6d4] tracking-widest font-mono">
                FOV: 192.168.10.0/24
             </div>
          </WidgetCard>

          <WidgetCard 
            title={
              <div className="flex justify-between items-center w-full pr-4">
                <span>SWEEP LOGS</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
                    <span className="text-[10px] text-[#06b6d4] tracking-widest font-bold">ACTIVE</span>
                  </div>
                  <button onClick={() => setSweepLogs([])} className="text-[10px] text-[#94a3b8] hover:text-[#ef4444] transition-colors border border-transparent hover:border-[#ef4444]/50 px-2 py-0.5 rounded cursor-pointer">
                    CLEAR LOGS
                  </button>
                </div>
              </div>
            } 
            className="min-h-[250px] flex-1"
          >
             <div className="h-full bg-[rgba(10,10,18,0.6)] rounded border border-[#1c1c30] p-1 shadow-[inset_0_0_15px_rgba(6,182,212,0.05)] overflow-hidden flex flex-col relative">
                <div className="grid grid-cols-5 gap-4 px-3 py-2 border-b border-[#1c1c30] text-[9px] tracking-widest text-[#94a3b8] font-bold shrink-0">
                  <div>TIME</div>
                  <div>DEVICE</div>
                  <div>IP</div>
                  <div>PROTOCOL</div>
                  <div className="text-right">STATUS</div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 p-2 font-mono text-[10px]">
                  {sweepLogs.map((log) => (
                    <div key={log.id} className="grid grid-cols-5 gap-4 px-2 py-1.5 hover:bg-[#141423] rounded transition-colors group">
                       <div className="text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors">{log.time}</div>
                       <div className="text-[#e2e8f0] font-bold">{log.dev}</div>
                       <div className="text-[#06b6d4]">{log.ip}</div>
                       <div className="text-[#8b5cf6]">{log.proto}</div>
                       <div className="text-right">
                         <span className={`font-bold ${log.stat === 'OK' ? 'text-[#22c55e]' : log.stat === 'WARNING' ? 'text-[#f59e0b]' : 'text-[#ef4444]'}`}>
                           {log.stat}
                         </span>
                       </div>
                    </div>
                  ))}
                  {sweepLogs.length === 0 && (
                    <div className="text-center text-[#94a3b8] mt-8 tracking-widest italic opacity-50">
                      LOG FEED EMPTY
                    </div>
                  )}
                </div>
             </div>
          </WidgetCard>
        </div>

        <div className="xl:col-span-8 flex flex-col gap-5">
          <WidgetCard title="SCAN PROGRESS" className="h-28 shrink-0 justify-center">
             <div className="flex justify-between text-xs font-bold text-[#e2e8f0] mb-2 tracking-widest">
               <span>{scanning ? 'IN PROGRESS' : (progress === 100 ? 'COMPLETED' : 'STANDBY')}</span>
               <span className="text-[#06b6d4]">{progress}%</span>
             </div>
             <div className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
               <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all duration-300" style={{ width: `${progress}%` }}>
                 <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:10px_10px] animate-[gridScroll_1s_linear_infinite]"></div>
               </div>
             </div>
          </WidgetCard>

          <WidgetCard title="DISCOVERED HOSTS" className="flex-1">
             <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-[#1c1c30] text-[10px] tracking-widest text-[#94a3b8]">
                <div>DEVICE</div>
                <div>IP ADDRESS</div>
                <div>PROTOCOL</div>
                <div className="text-right">STATUS</div>
             </div>
             
             <div className="overflow-y-auto mt-2 space-y-2 pb-4">
                {devices.map((dev, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-4 px-4 py-3 rounded-lg border items-center animate-slide-in ${dev.state === 'rogue' ? 'bg-[#ef4444]/10 border-[#ef4444]/40 hover:bg-[#ef4444]/20' : 'bg-black/20 border-[#1c1c30] hover:bg-black/40 hover:border-[#1e293b]'}`}>
                     <div className="text-xs text-[#22d3ee] flex items-center gap-2"><TerminalSquare size={12} /> {dev.type}</div>
                     <div className="font-mono text-xs text-[#e2e8f0] font-bold">{dev.ip}</div>
                     <div className="font-mono text-[10px] text-[#94a3b8] tracking-widest bg-white/5 px-2 py-0.5 rounded w-fit">{dev.proto}</div>
                     <div className="text-right">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${dev.state === 'rogue' ? 'bg-[#ef4444] text-white shadow-[0_0_10px_#ef4444] animate-pulse-fast' : 'bg-[#22c55e]/20 text-[#22c55e]'}`}>
                         {dev.state.toUpperCase()}
                       </span>
                     </div>
                  </div>
                ))}
                {devices.length === 0 && !scanning && progress === 0 && (
                  <div className="text-center text-[#94a3b8] text-xs py-10 tracking-widest italic opacity-50">
                    AWAITING SCAN COMMAND
                  </div>
                )}
             </div>
          </WidgetCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0">
             <WidgetCard title="PROTOCOL DETECTION" className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-[#1c1c30] rounded p-3 flex flex-col gap-2">
                     <div className="text-[10px] text-[#94a3b8] tracking-widest">MODBUS TCP</div>
                     <div className="text-lg font-bold text-[#06b6d4]">{devices.filter(d => d.proto.includes('Modbus')).length}</div>
                  </div>
                  <div className="bg-black/40 border border-[#1c1c30] rounded p-3 flex flex-col gap-2">
                     <div className="text-[10px] text-[#94a3b8] tracking-widest">DNP3</div>
                     <div className="text-lg font-bold text-[#f59e0b]">{devices.filter(d => d.proto.includes('DNP3')).length}</div>
                  </div>
                  <div className="bg-black/40 border border-[#1c1c30] rounded p-3 flex flex-col gap-2">
                     <div className="text-[10px] text-[#94a3b8] tracking-widest">OPC-UA</div>
                     <div className="text-lg font-bold text-[#8b5cf6]">{devices.filter(d => d.proto.includes('OPC-UA')).length}</div>
                  </div>
                  <div className="bg-black/40 border border-[#1c1c30] rounded p-3 flex flex-col gap-2">
                     <div className="text-[10px] text-[#94a3b8] tracking-widest">UNKNOWN</div>
                     <div className="text-lg font-bold text-[#ef4444] drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">{devices.filter(d => d.proto.includes('Unknown')).length}</div>
                  </div>
                </div>
             </WidgetCard>

             <WidgetCard title="NETWORK TOPOLOGY NODES" className="p-4 font-mono text-[10px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-black/40 rounded border border-[#1e293b]">
                     <span className="text-[#e2e8f0]">Node 1 (Gateway)</span>
                     <span className="text-[#22c55e]">UP</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 rounded border border-[#1e293b]">
                     <span className="text-[#e2e8f0]">Node 2 (Switch A)</span>
                     <span className="text-[#22c55e]">UP</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 rounded border border-[#1e293b]">
                     <span className="text-[#e2e8f0]">Node 3 (Switch B)</span>
                     <span className="text-[#ef4444] animate-pulse">DOWN</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 rounded border border-[#1e293b]">
                     <span className="text-[#e2e8f0]">Node 4 (DMZ Router)</span>
                     <span className="text-[#f59e0b]">LATENCY</span>
                  </div>
                </div>
             </WidgetCard>
          </div>
        </div>
      </div>
    </div>
  );
}
