import { useEffect, useState, useRef } from 'react';
import { Bell, Search, UserCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NOTIFICATIONS = [
  { id: 1, time: "14:32:07", msg: "Force Coil on Safety Relay", dev: "PLC-03", proto: "Modbus TCP", sev: "CRITICAL" },
  { id: 2, time: "14:31:51", msg: "Mass Register Write Detected", dev: "SCADA-01", proto: "Modbus", sev: "CRITICAL" },
  { id: 3, time: "14:28:45", msg: "Modbus Reconnaissance Sweep", dev: "192.168.10.88", proto: "Modbus", sev: "HIGH" },
  { id: 4, time: "14:22:03", msg: "DNP3 Unsolicited Response Flood", dev: "RTU-07", proto: "DNP3", sev: "MEDIUM" },
];

export default function Navbar({ onSignOut, profile }) {
  const [time, setTime] = useState(new Date());
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  const timeStr = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' });
  const dateStr = time.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div className="h-16 bg-[#12121e]/80 border-b border-[#1c1c30] flex items-center justify-between px-6 shrink-0 relative z-10 backdrop-blur-md">
      
      {/* Left side: Context/Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-widest text-[#e2e8f0] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]">GLOBAL DASHBOARD</h2>
        <div className="h-4 w-px bg-[#1e293b]"></div>
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"></span>
          <span className="text-xs text-[#22c55e] tracking-widest group-hover:drop-shadow-[0_0_5px_#22c55e]">SYSTEM SECURE</span>
        </div>
      </div>

      {/* Right side: Tools */}
      <div className="flex items-center gap-6">
        
        {/* Clock */}
        <div className="text-right flex flex-col justify-center">
          <div className="text-xs text-[#22d3ee] tracking-widest font-bold font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{timeStr}</div>
          <div className="text-[10px] text-[#94a3b8] tracking-widest">{dateStr}</div>
        </div>

        <div className="h-6 w-px bg-[#1e293b]"></div>

        {/* Global Search */}
        <div className="relative group flex items-center">
          <Search size={16} className="absolute left-3 text-[#94a3b8] group-hover:text-[#06b6d4] transition-colors" />
          <input type="text" placeholder="Trace IP, Device, Protocol..." className="bg-black/40 border border-[#1c1c30] rounded-md py-1.5 pl-9 pr-4 text-xs w-64 text-[#e2e8f0] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all placeholder:text-[#94a3b8]/50" />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="p-2 rounded-lg hover:bg-[#141423] transition-colors relative group"
          >
            <Bell size={20} className="text-[#94a3b8] group-hover:text-[#e2e8f0]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444] border-2 border-[#070711] animate-pulse"></span>
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div className="absolute right-0 mt-2 w-96 bg-[rgba(18,18,30,0.95)] border border-[#1c1c30] rounded-xl shadow-panel overflow-hidden animate-slide-in backdrop-blur-xl">
              <div className="p-3 border-b border-[#1c1c30] bg-black/20 flex justify-between items-center">
                <span className="text-xs font-bold tracking-wider text-[#e2e8f0]">SOC LOG FEED</span>
                <span className="text-[10px] bg-[#ef4444]/20 text-[#ef4444] px-2 py-0.5 rounded border border-[#ef4444]/30">4 NEW</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="p-3 border-b border-[#1e293b]/50 hover:bg-[#141423] cursor-pointer flex gap-3 group transition-colors">
                    <AlertTriangle size={16} className={n.sev === 'CRITICAL' ? 'text-[#ef4444] shrink-0 drop-shadow-[0_0_5px_#ef4444]' : 'text-[#f59e0b] shrink-0 drop-shadow-[0_0_5px_#f59e0b]'} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-bold ${n.sev === 'CRITICAL' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{n.sev}</span>
                        <span className="text-[9px] text-[#94a3b8] font-mono">{n.time}</span>
                      </div>
                      <div className="text-sm font-medium text-[#e2e8f0] mb-1 truncate">{n.msg}</div>
                      <div className="flex gap-2 text-[10px]">
                        <span className="text-[#22d3ee] bg-[#06b6d4]/10 px-1.5 rounded">{n.dev}</span>
                        <span className="text-[#94a3b8] bg-white/5 px-1.5 rounded">{n.proto}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-black/30 border-t border-[#1c1c30] text-center">
                <button onClick={() => { navigate('/alerts'); setShowNotif(false); }} className="text-[10px] text-[#8b5cf6] hover:text-white transition-colors tracking-widest font-bold">VIEW ALL ALERTS</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#1e293b]"></div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowProfile(!showProfile)}>
            <div className="text-right">
              <div className="text-xs font-bold text-[#e2e8f0] group-hover:text-[#22d3ee] transition-colors">{profile?.name || "Agent"}</div>
              <div className="text-[9px] text-[#94a3b8] tracking-widest">Secure Access</div>
            </div>
            <div className="w-9 h-9 rounded bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] p-[1px] shadow-[0_0_10px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow">
              <div className="w-full h-full bg-[#070711] rounded grid place-items-center overflow-hidden">
                {profile?.avatar ? (
                  <img src={profile.avatar} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <UserCircle size={20} className="text-[#e2e8f0]" />
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-[rgba(18,18,30,0.95)] border border-[#1c1c30] rounded-xl shadow-panel overflow-hidden animate-slide-in backdrop-blur-xl z-50">
              <div className="p-4 border-b border-[#1c1c30] bg-black/20 flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] p-[1px] mb-2">
                    <div className="w-full h-full bg-[#070711] rounded-full overflow-hidden grid place-items-center">
                      {profile?.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : <UserCircle size={24} className="text-[#e2e8f0]" />}
                    </div>
                 </div>
                 <div className="text-sm font-bold text-[#e2e8f0] tracking-wider mb-1">{profile?.name || "Agent"}</div>
                 <div className="text-[10px] text-[#06b6d4] tracking-widest">admin@senital.gov</div>
              </div>
              <div className="py-2">
                <button onClick={() => { navigate('/profile'); setShowProfile(false); }} className="w-full text-left px-5 py-2.5 text-xs text-[#e2e8f0] hover:bg-[#141423] hover:text-[#22d3ee] transition-colors">Profile settings</button>
                <button onClick={() => { navigate('/security'); setShowProfile(false); }} className="w-full text-left px-5 py-2.5 text-xs text-[#e2e8f0] hover:bg-[#141423] hover:text-[#22d3ee] transition-colors flex justify-between items-center">
                  Security settings
                  <span className="bg-[#ef4444]/20 border border-[#ef4444]/50 text-[#ef4444] px-1.5 py-0.5 rounded text-[8px] font-bold shadow-[0_0_5px_rgba(239,68,68,0.5)]">1 ALERT</span>
                </button>
              </div>
              <div className="p-3 border-t border-[#1c1c30] bg-black/20">
                <button 
                  onClick={onSignOut}
                  className="w-full bg-[#1e293b] hover:bg-black/50 hover:border-[#1c1c30] hover:text-white border border-[#1e293b] text-[#94a3b8] text-xs py-2 rounded-lg font-bold tracking-widest transition-colors shadow-inner"
                >
                  SIGN OUT
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
