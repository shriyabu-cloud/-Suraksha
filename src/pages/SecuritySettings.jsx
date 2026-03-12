import { useState } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { ShieldCheck, KeyRound, MonitorSmartphone, History } from 'lucide-react';

export default function SecuritySettings() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (newPw === confirmPw && newPw.length > 0) {
      setSaved(true);
      setTimeout(() => { setSaved(false); setCurrentPw(''); setNewPw(''); setConfirmPw(''); }, 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">SECURITY SETTINGS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <WidgetCard title="AUTHENTICATION MANAGEMENT" className="p-6">
             <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#94a3b8] tracking-widest font-mono">CURRENT PASSPHRASE</label>
                  <input type="password" required value={currentPw} onChange={e => setCurrentPw(e.target.value)} className="bg-black/40 border border-[#1c1c30] rounded-lg py-2.5 px-3 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#06b6d4] transition-all font-mono" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#94a3b8] tracking-widest font-mono">NEW PASSPHRASE</label>
                  <input type="password" required value={newPw} onChange={e => setNewPw(e.target.value)} className="bg-black/40 border border-[#1c1c30] rounded-lg py-2.5 px-3 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#8b5cf6] transition-all font-mono" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#94a3b8] tracking-widest font-mono">CONFIRM PASSPHRASE</label>
                  <input type="password" required value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className="bg-black/40 border border-[#1c1c30] rounded-lg py-2.5 px-3 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#8b5cf6] transition-all font-mono" />
                </div>
                
                <div className="pt-2 flex items-center gap-4">
                  <button type="submit" className="bg-[#1e293b] hover:bg-black/50 border border-[#1e293b] hover:border-[#8b5cf6] text-[#8b5cf6] px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest transition-colors flex items-center gap-2">
                    <KeyRound size={14} /> UPDATE KEY
                  </button>
                  {saved && <span className="text-[#22c55e] text-xs font-bold tracking-widest animate-fade-in">PASSPHRASE UPDATED</span>}
                </div>
             </form>
          </WidgetCard>

          <WidgetCard title="ACTIVE SESSION" className="p-6 flex items-center gap-4">
             <div className="p-3 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-xl text-[#06b6d4]">
               <MonitorSmartphone size={24} />
             </div>
             <div>
               <div className="text-sm font-bold text-[#e2e8f0] mb-1">Senital Command Interface (Web)</div>
               <div className="text-[10px] text-[#94a3b8] font-mono tracking-widest">IP: 192.168.1.144 • LOCATION: LOCAL_SECURE</div>
               <div className="text-[10px] text-[#22c55e] mt-1 font-bold tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_5px_#22c55e]"></span> CURRENTLY ACTIVE
               </div>
             </div>
          </WidgetCard>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
           <WidgetCard title="ACCOUNT STATUS" className="p-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444]">
                 <ShieldCheck size={32} className="shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                 <div>
                    <div className="text-sm font-bold tracking-widest mb-1">SECURITY WARNING</div>
                    <div className="text-xs text-white/70 leading-relaxed">Mandatory passphrase rotation required in 4 days per Directive 8.2. Failure to update will result in automated account lockout.</div>
                 </div>
              </div>
           </WidgetCard>

           <WidgetCard title="LOGIN HISTORY" className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-[10px] text-[#94a3b8] tracking-widest font-mono">
                <History size={14} /> RECENT ACCESS LOGS
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                 {[
                   { t: 'Today, 14:22', ip: '192.168.1.144', st: 'SUCCESS' },
                   { t: 'Yesterday, 08:15', ip: '192.168.1.144', st: 'SUCCESS' },
                   { t: 'Oct 24, 21:03', ip: '10.0.0.88', st: 'FAILED' },
                   { t: 'Oct 23, 09:41', ip: '192.168.1.144', st: 'SUCCESS' },
                 ].map((log, i) => (
                   <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-[#141423] border border-transparent hover:border-[#1c1c30] transition-colors">
                      <div>
                        <div className="text-xs font-bold text-[#e2e8f0]">{log.t}</div>
                        <div className="text-[10px] text-[#94a3b8] font-mono">{log.ip}</div>
                      </div>
                      <div className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${log.st === 'SUCCESS' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}>
                        {log.st}
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
