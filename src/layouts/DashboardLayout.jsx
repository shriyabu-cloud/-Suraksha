import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout({ children, activeNav, setActiveNav, onSignOut }) {
  return (
    <div className="flex h-screen w-screen bg-background text-text-main font-mono overflow-hidden selection:bg-accent-purple/30 relative">
      <div className="absolute inset-0 bg-[url('linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)')] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
      
      {/* Glow Particles/Background soft styling */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7c3aed]/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>

      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      
      <div className="flex-1 flex flex-col min-w-0 z-0">
        <Navbar onSignOut={onSignOut} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
