import { useEffect, useState, useRef } from 'react';
import WidgetCard from './WidgetCard';

const BOOT_LOGS = [
  "INITIALIZING SENTINEL MODULE...",
  "LOADING ML BASELINE MODELS [OK]",
  "ESTABLISHING PROMISCUOUS MODE ENI0 [OK]",
  "COMMENCING DEEP PACKET INSPECTION",
  "AWAITING EVENTS..."
];

const RAND_LOGS = [
  "TCP [SYN] 192.168.10.12 -> 192.168.10.4",
  "OPC-UA BrowseRequest [ObjectNode]",
  "ARP Broadcast Who-has 192.168.10.1",
  "Modbus TCP FC-03 Read Registers",
  "DNP3 Link Status Request",
];

export default function LogsViewer() {
  const [logs, setLogs] = useState(BOOT_LOGS);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date().toISOString().split('T')[1].slice(0, 11);
      const msg = RAND_LOGS[Math.floor(Math.random() * RAND_LOGS.length)];
      setLogs(p => [...p.slice(-40), `[${now}] ${msg}`]);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <WidgetCard title="RAW INGRESS FEED" className="flex-1">
      <div 
        ref={scrollRef}
        className="h-full bg-black/50 border border-[#1e293b] rounded-lg p-3 overflow-y-auto font-mono text-[9px] text-[#06b6d4] drop-shadow-[0_0_2px_rgba(6,182,212,0.5)]"
      >
        <div className="flex flex-col justify-end min-h-full">
          {logs.map((L, i) => (
            <div key={i} className="mb-1 leading-relaxed opacity-90">{L}</div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
