import { Activity, Shield, Clock, Database, Globe, Network, Server, TerminalSquare, LayoutGrid, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", id: 'dashboard' },
  { icon: Globe, label: "Discovery", id: 'discovery' },
  { icon: Shield, label: "OT-IDS Monitor", id: 'otids' },
  { icon: Activity, label: "Alert Feed", id: 'alerts', count: 6 },
  { icon: Network, label: "Protocol Analysis", id: 'protocol' },
  { icon: Server, label: "Device Registry", id: 'devices' },
  { icon: TerminalSquare, label: "Incident Response", id: 'incident' },
  { icon: Database, label: "ML Anomaly Engine", id: 'ml' },
];

export default function Sidebar({ activeNav = 'dashboard', setActiveNav }) {
  return (
    <div className="w-64 min-w-[16rem] bg-background border-r border-[#1e293b] flex flex-col h-full shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      {/* Brand area */}
      <div className="p-6 border-b border-[#1e293b] flex items-center gap-4">
        <Logo className="w-14 h-14 shrink-0 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
        <div>
          <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]">SENITAL</h1>
          <div className="text-[10px] text-[#06b6d4] tracking-[0.2em] uppercase font-semibold">Cyber Defense</div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive 
                  ? 'bg-[#7c3aed]/15 border border-[#7c3aed]/30 shadow-[inset_0_0_12px_rgba(124,58,237,0.1)]' 
                  : 'hover:bg-[rgba(20,20,35,0.7)] border border-transparent'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7c3aed] to-[#06b6d4] shadow-[0_0_10px_#7c3aed]" />
              )}
              <Icon size={18} className={`${isActive ? 'text-[#22d3ee] drop-shadow-[0_0_5px_#22d3ee]' : 'text-text-muted group-hover:text-text-main transition-colors'} shrink-0`} />
              <span className={`text-sm tracking-wide font-medium ${isActive ? 'text-text-main drop-shadow-[0_0_2px_#ffffff]' : 'text-text-muted group-hover:text-text-main'}`}>
                {item.label}
              </span>
              {item.count && (
                <span className="ml-auto bg-[#ef4444] border border-[#ef4444]/50 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse-fast">
                  {item.count}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-[#1e293b] bg-black/20">
        <div className="p-3 rounded-lg border border-[#7c3aed]/20 bg-[#7c3aed]/5 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
           <div className="text-xs text-[#94a3b8] tracking-widest mb-1">SYSTEM STATUS</div>
           <div className="flex justify-between items-center text-sm">
             <span className="text-[#22c55e] font-bold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse"></span>
               ONLINE
             </span>
             <span className="text-[#94a3b8] text-[10px]">v3.4.0</span>
           </div>
        </div>
      </div>
    </div>
  );
}
