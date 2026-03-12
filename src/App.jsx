import { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Discovery from "./pages/Discovery";
import AlertFeed from "./pages/AlertFeed";
import ProtocolAnalysis from "./pages/ProtocolAnalysis";
import DeviceRegistry from "./pages/DeviceRegistry";
import IncidentResponse from "./pages/IncidentResponse";
import MLAnomalyEngine from "./pages/MLAnomalyEngine";
import Login from "./pages/Login";
import ProfileSettings from "./pages/ProfileSettings";
import SecuritySettings from "./pages/SecuritySettings";
import OTIDS from "./pages/OTIDS";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Global Profile State
  const [profile, setProfile] = useState({
    name: "Agent_727",
    avatar: null
  });

  const location = useLocation();

  const handleLogin = () => {
    setIsAuth(true);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 2500);
  };

  if (!isAuth) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <DashboardLayout activeNav={location.pathname.substring(1) || 'dashboard'} onSignOut={() => setIsAuth(false)} profile={profile}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/otids" element={<OTIDS />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/alerts" element={<AlertFeed />} />
          <Route path="/protocol" element={<ProtocolAnalysis />} />
          <Route path="/devices" element={<DeviceRegistry />} />
          <Route path="/incident" element={<IncidentResponse />} />
          <Route path="/ml" element={<MLAnomalyEngine />} />
          <Route path="/profile" element={<ProfileSettings profile={profile} setProfile={setProfile} />} />
          <Route path="/security" element={<SecuritySettings />} />
          <Route path="*" element={
            <div className="h-full grid place-items-center opacity-30">
              <div className="text-center font-mono">
                <h2 className="text-xl text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] mb-2">MODULE OFFLINE</h2>
                <p className="text-xs text-[#94a3b8] tracking-widest">Awaiting uplink...</p>
              </div>
            </div>
          } />
        </Routes>
      </DashboardLayout>

      {/* Welcome Toast Popup */}
      {showWelcome && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-[rgba(18,18,30,0.9)] border border-[#8b5cf6]/50 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] backdrop-blur-xl p-4 flex items-center gap-4 relative">
            <button onClick={() => setShowWelcome(false)} className="absolute top-2 right-2 text-[#94a3b8] hover:text-white transition-colors">
              ✕
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] p-[1px]">
               <div className="w-full h-full bg-[#070711] rounded-full grid place-items-center overflow-hidden">
                 {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover"/> : <span className="text-[#e2e8f0] font-bold text-lg">{profile.name.charAt(0)}</span>}
               </div>
            </div>
            <div>
              <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] tracking-widest">WELCOME AGENT</div>
              <div className="text-[10px] text-[#e2e8f0] font-mono">Uplink established.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}