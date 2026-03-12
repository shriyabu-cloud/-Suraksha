import { useState, useEffect } from 'react';
import WidgetCard from '../components/widgets/WidgetCard';
import CounterWidget from '../components/widgets/CounterWidget';
import ProtocolMonitor from '../components/widgets/ProtocolMonitor';
import AlertPanel from '../components/widgets/AlertPanel';
import MLAnomalyBox from '../components/widgets/MLAnomalyBox';
import NetworkActivity from '../components/widgets/NetworkActivity';
import LogsViewer from '../components/widgets/LogsViewer';

export default function Dashboard() {
  const [pkts, setPkts] = useState(2847293);
  const [alertMode, setAlertMode] = useState(false); // Toggle for demo

  useEffect(() => {
    const t = setInterval(() => setPkts(p => p + Math.floor(Math.random() * 80 + 40)), 200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      
      {/* Demo Controls */}
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">OVERVIEW <span className="text-[#8b5cf6] font-mono text-sm ml-2">[{alertMode ? "DEFCON 2" : "DEFCON 5"}]</span></h2>
        <button 
          onClick={() => setAlertMode(!alertMode)}
          className={`cyber-button text-xs ${alertMode 
            ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : 'bg-[#ef4444]/10 border-[#ef4444] text-[#ef4444] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'}`}
        >
          {alertMode ? "SIMULATE SAFE STATE" : "SIMULATE RED ALERT"}
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 shrink-0">
        <CounterWidget label="ACTIVE THREATS" value={alertMode ? "3 CRITICAL" : "0 DETECTED"} sub={alertMode ? "+2 this hour" : "All clear"} color={alertMode ? "red" : "green"} />
        <CounterWidget label="DEVICES ONLINE" value="24 / 26" sub="2 offline" color="warning" />
        <CounterWidget label="PACKETS / SEC" value={`${(Math.random() * 500 + 3800).toFixed(0)}`} sub="Baseline: 3,800" color="purple" />
        <CounterWidget label="ANOMALY SCORE" value={alertMode ? "87 / 100" : "12 / 100"} sub={alertMode ? "ML confidence 96%" : "Normal ops"} color={alertMode ? "red" : "green"} />
        <CounterWidget label="PROTOCOL VIOLATIONS" value={alertMode ? "14 today" : "0 today"} sub="FC-05 misuse" color={alertMode ? "warning" : "green"} />
        <CounterWidget label="MEAN TIME DETECT" value="4.2 sec" sub="↓ improving" color="blue" />
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Left Col: Alerts & Network */}
        <div className="xl:col-span-8 flex flex-col gap-5">
          <AlertPanel isAlert={alertMode} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 p-1">
            <NetworkActivity />
            <ProtocolMonitor />
          </div>
        </div>

        {/* Right Col: ML & Logs */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <MLAnomalyBox isAlert={alertMode} />
          <LogsViewer />
        </div>

      </div>
    </div>
  );
}
