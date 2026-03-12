import { useState, useRef } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import { UserCircle, Upload, Save, CheckCircle } from 'lucide-react';

export default function ProfileSettings({ profile, setProfile }) {
  const [name, setName] = useState(profile?.name || "Agent_727");
  const [avatar, setAvatar] = useState(profile?.avatar || null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile({ name, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">PROFILE SETTINGS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0">
        <WidgetCard title="AGENT IDENTIFICATION" className="p-6">
          <div className="flex flex-col gap-6">
            
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] p-[1px] shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                <div className="w-full h-full bg-[#070711] rounded-full overflow-hidden grid place-items-center">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={48} className="text-[#e2e8f0]" />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xs text-[#94a3b8] tracking-widest font-mono">BIOMETRIC IMPRINT</div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#1e293b] hover:bg-black/50 border border-[#1e293b] hover:border-[#06b6d4] text-[#06b6d4] px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-colors flex items-center gap-2"
                >
                  <Upload size={14} /> UPLOAD NEW
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-[#1c1c30]"></div>

            {/* Name Section */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#94a3b8] tracking-widest font-mono">CALL SIGN / AGENT NAME</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="bg-black/40 border border-[#1c1c30] rounded-lg py-3 px-4 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all font-bold tracking-widest"
              />
            </div>

            {/* Save Action */}
            <div className="pt-4 flex items-center gap-4">
              <button 
                onClick={handleSave}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 py-3 px-8 rounded-lg text-[#070711] font-bold tracking-widest text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
              >
                <Save size={16} className="text-[#070711]" /> SAVE CHANGES
              </button>
              {saved && (
                <span className="text-[#22c55e] text-xs font-bold tracking-widest flex items-center gap-2 animate-fade-in">
                  <CheckCircle size={14} /> SAVED
                </span>
              )}
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
