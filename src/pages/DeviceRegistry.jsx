import { useState } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { Search, Shield, ShieldAlert, Cpu, Network } from 'lucide-react';

const REGISTRY = [
  { id: "DEV-1033", mac: "00:1B:1B:44:A2:1F", ip: "192.168.10.33", type: "PLC", vendor: "Siemens S7-1500", zone: "Level 1 (Control)", lastSeen: "2 secs ago", status: "online", alerts: 1 },
  { id: "DEV-1012", mac: "00:A0:45:11:00:2B", ip: "192.168.10.12", type: "SCADA", vendor: "ABB System 800xA", zone: "Level 2 (Supervisory)", lastSeen: "5 secs ago", status: "online", alerts: 0 },
  { id: "DEV-UN88", mac: "00:50:56:C0:00:08", ip: "192.168.10.88", type: "Unknown", vendor: "VMware, Inc.", zone: "Level 1 (Control)", lastSeen: "1 sec ago", status: "compromised", alerts: 6 },
  { id: "DEV-1045", mac: "00:10:8C:00:1F:B2", ip: "192.168.10.45", type: "RTU", vendor: "Schneider Electric", zone: "Level 1 (Control)", lastSeen: "12 secs ago", status: "online", alerts: 0 },
  { id: "DEV-1020", mac: "00:0C:29:9A:14:3E", ip: "192.168.10.20", type: "HMI", vendor: "Rockwell Auto", zone: "Level 2 (Supervisory)", lastSeen: "1 min ago", status: "offline", alerts: 0 },
  { id: "FW-1001", mac: "00:90:7F:3E:12:AA", ip: "192.168.10.1", type: "Firewall", vendor: "Palo Alto Networks", zone: "Level 3 (Operations)", lastSeen: "0 secs ago", status: "online", alerts: 0 },
];

export default function DeviceRegistry() {
  const [search, setSearch] = useState("");

  const filtered = REGISTRY.filter(d => 
    Object.values(d).some(v => v.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">DEVICE REGISTRY</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8]" />
          <input 
             type="text" 
             placeholder="Search registry..." 
             className="bg-black/40 border border-[#1c1c30] rounded-lg py-2 pl-9 pr-4 text-xs w-64 text-[#e2e8f0] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all placeholder:text-[#94a3b8]/50"
             value={search}
             onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
         <WidgetCard className="py-3 px-4 flex items-center justify-between border-b-2 border-[#22d3ee]">
            <div>
               <div className="text-[10px] text-[#94a3b8] tracking-widest">TOTAL AUTHORIZED</div>
               <div className="text-xl font-bold text-[#22d3ee]">142</div>
            </div>
            <Shield size={24} className="text-[#22d3ee]/50" />
         </WidgetCard>
         <WidgetCard className="py-3 px-4 flex items-center justify-between border-b-2 border-[#22c55e]">
            <div>
               <div className="text-[10px] text-[#94a3b8] tracking-widest">ACTIVE ONLINE</div>
               <div className="text-xl font-bold text-[#22c55e]">138</div>
            </div>
            <Network size={24} className="text-[#22c55e]/50" />
         </WidgetCard>
         <WidgetCard className="py-3 px-4 flex items-center justify-between border-b-2 border-[#f59e0b]">
            <div>
               <div className="text-[10px] text-[#94a3b8] tracking-widest">OFFLINE / UNREACHABLE</div>
               <div className="text-xl font-bold text-[#f59e0b]">4</div>
            </div>
            <Cpu size={24} className="text-[#f59e0b]/50" />
         </WidgetCard>
         <WidgetCard className="py-3 px-4 flex items-center justify-between border-b-2 border-[#ef4444] bg-[#ef4444]/5">
            <div>
               <div className="text-[10px] text-[#94a3b8] tracking-widest text-[#ef4444]">UNWHITELISTED / ROGUE</div>
               <div className="text-xl font-bold text-[#ef4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">1</div>
            </div>
            <ShieldAlert size={24} className="text-[#ef4444] animate-pulse" />
         </WidgetCard>
      </div>

      <WidgetCard className="flex-1 min-h-[400px]">
         <div className="w-full h-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr className="border-b border-[#1c1c30] text-[10px] text-[#94a3b8] tracking-widest bg-black/20">
                     <th className="p-4 font-medium">DEVICE ID</th>
                     <th className="p-4 font-medium">IP & MAC</th>
                     <th className="p-4 font-medium">TYPE & VENDOR</th>
                     <th className="p-4 font-medium">PURDUE ZONE</th>
                     <th className="p-4 font-medium">LAST SEEN</th>
                     <th className="p-4 font-medium text-right">STATUS</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#1c1c30]">
                  {filtered.map(d => (
                     <tr key={d.id} className={`hover:bg-[#141423] transition-colors ${d.status === 'compromised' ? 'bg-[#ef4444]/10 hover:bg-[#ef4444]/20' : ''}`}>
                        <td className="p-4">
                           <div className={`text-xs font-bold font-mono ${d.status === 'compromised' ? 'text-[#ef4444]' : 'text-[#e2e8f0]'}`}>{d.id}</div>
                           {d.alerts > 0 && <div className="text-[9px] text-[#ef4444] mt-1 bg-[#ef4444]/20 inline-block px-1 rounded font-bold">{d.alerts} ALERTS</div>}
                        </td>
                        <td className="p-4">
                           <div className="text-xs text-[#06b6d4] font-mono mb-1">{d.ip}</div>
                           <div className="text-[10px] text-[#94a3b8] font-mono">{d.mac}</div>
                        </td>
                        <td className="p-4">
                           <div className="text-xs text-[#e2e8f0] mb-1">{d.type}</div>
                           <div className="text-[10px] text-[#94a3b8]">{d.vendor}</div>
                        </td>
                        <td className="p-4">
                           <div className="text-xs text-[#94a3b8]">{d.zone}</div>
                        </td>
                        <td className="p-4">
                           <div className="text-xs text-[#94a3b8] font-mono">{d.lastSeen}</div>
                        </td>
                        <td className="p-4 text-right">
                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-widest border
                              ${d.status === 'online' ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]' : 
                                d.status === 'offline' ? 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]' : 
                                'bg-[#ef4444] border-[#ef4444] text-white shadow-[0_0_10px_#ef4444] animate-pulse-fast'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'online' ? 'bg-[#22c55e]' : d.status === 'offline' ? 'bg-[#f59e0b]' : 'bg-white'}`}></span>
                              {d.status.toUpperCase()}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filtered.length === 0 && (
            <div className="text-center text-[#94a3b8] text-xs py-10 tracking-widest italic opacity-50">
               NO DEVICES MATCH SEARCH QUERY
            </div>
         )}
      </WidgetCard>
    </div>
  );
}
