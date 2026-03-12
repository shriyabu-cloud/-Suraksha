import { useState } from 'react';
import Logo from '../components/Logo';
import { ShieldAlert, Fingerprint, Lock, Loader2 } from 'lucide-react';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500); // simulate auth delay
  };

  return (
    <div className="h-screen w-screen bg-[#070711] text-text-main font-mono overflow-hidden relative flex items-center justify-center selection:bg-accent-purple/30">
      {/* Background grids and glows */}
      <div className="absolute inset-0 bg-[url('linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)')] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
      
      <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-[#7c3aed]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
         <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-[#22d3ee] mb-8"></div>
         <div className="w-[1px] h-32 bg-gradient-to-t from-transparent to-[#8b5cf6] mt-[400px]"></div>
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-[rgba(18,18,30,0.7)] border border-[#1e293b] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-slide-in overflow-hidden p-8 flex flex-col items-center">
        
        {/* Glow behind logo */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#22d3ee]/20 blur-[50px] rounded-full"></div>

        <Logo className="w-24 h-24 mb-4 drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]" />
        
        <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] mb-1 text-center">
           SENITAL
        </h1>
        <div className="text-[10px] text-[#06b6d4] tracking-[0.3em] uppercase font-bold mb-8 text-center text-shadow-sm">
           Secure Agent Login
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
           <div className="relative group">
              <Fingerprint size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#06b6d4] transition-colors" />
              <input 
                 type="text" 
                 required
                 placeholder="AGENT ID" 
                 defaultValue="Agent_727"
                 className="w-full bg-black/40 border border-[#1c1c30] rounded-lg py-3 pl-11 pr-4 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all placeholder:text-[#94a3b8]/50 tracking-widest font-bold"
              />
           </div>
           
           <div className="relative group">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#8b5cf6] transition-colors" />
              <input 
                 type="password" 
                 required
                 placeholder="PASSPHRASE" 
                 defaultValue="***********"
                 className="w-full bg-black/40 border border-[#1c1c30] rounded-lg py-3 pl-11 pr-4 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all placeholder:text-[#94a3b8]/50 tracking-widest font-bold font-mono"
              />
           </div>

           <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 py-3 rounded-lg text-[#070711] font-bold tracking-widest text-sm flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
           >
              {loading ? (
                <><Loader2 size={18} className="animate-spin text-[#070711]" /> DECRYPTING...</>
              ) : (
                <><ShieldAlert size={18} className="text-[#070711]" /> INITIATE UPLINK</>
              )}
           </button>
        </form>

        <div className="mt-8 pt-4 w-full border-t border-[#1e293b] flex justify-between items-center text-[9px] text-[#94a3b8] font-mono">
           <span>UNAUTHORIZED ACCESS PROHIBITED</span>
           <span>v3.4.0</span>
        </div>
      </div>
    </div>
  );
}
