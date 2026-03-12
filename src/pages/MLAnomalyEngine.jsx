import WidgetCard from '../components/widgets/WidgetCard';
import { Activity, BrainCircuit, Target, Zap } from 'lucide-react';

export default function MLAnomalyEngine() {
  return (
    <div className="flex flex-col gap-5 min-h-full pb-8">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <h2 className="text-xl font-bold tracking-widest text-[#e2e8f0]">ML ANOMALY ENGINE</h2>
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest font-bold">
           <span className="text-[#94a3b8]">MODEL: ISOLATION FOREST v3.2</span>
           <span className="text-[#22c55e] border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-1 rounded">TRAINING: ACTIVE (ONLINE)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 shrink-0">
        <WidgetCard className="p-4 flex gap-4 items-center">
           <div className="p-3 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-xl"><BrainCircuit size={28}/></div>
           <div>
              <div className="text-[10px] text-[#94a3b8] tracking-widest">ACTIVE MODELS</div>
              <div className="text-xl font-bold text-[#e2e8f0]">4 <span className="text-xs font-normal text-[#8b5cf6]">ENSEMBLE</span></div>
           </div>
        </WidgetCard>
        <WidgetCard className="p-4 flex gap-4 items-center">
           <div className="p-3 bg-[#06b6d4]/20 text-[#06b6d4] rounded-xl"><Target size={28}/></div>
           <div>
              <div className="text-[10px] text-[#94a3b8] tracking-widest">RECALL PRECISION</div>
              <div className="text-xl font-bold text-[#e2e8f0]">99.4% <span className="text-xs font-normal text-[#06b6d4]">+0.2%</span></div>
           </div>
        </WidgetCard>
        <WidgetCard className="p-4 flex gap-4 items-center">
           <div className="p-3 bg-[#f59e0b]/20 text-[#f59e0b] rounded-xl"><Activity size={28}/></div>
           <div>
              <div className="text-[10px] text-[#94a3b8] tracking-widest">DEVIATION THRESHOLD</div>
              <div className="text-xl font-bold text-[#e2e8f0]">3.2 σ <span className="text-xs font-normal text-[#f59e0b]">SIGMA</span></div>
           </div>
        </WidgetCard>
        <WidgetCard className="p-4 flex gap-4 items-center border-[#ef4444]/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
           <div className="p-3 bg-[#ef4444]/20 text-[#ef4444] rounded-xl animate-pulse"><Zap size={28}/></div>
           <div>
              <div className="text-[10px] text-[#ef4444] tracking-widest font-bold">ANOMALIES (24H)</div>
              <div className="text-xl font-bold text-[#ef4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">12</div>
           </div>
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 items-start">
        
        {/* Main Details Area */}
        <div className="xl:col-span-8 flex flex-col gap-5 h-full">
           <WidgetCard title="RECENT ANOMALIES (LAST 24H)" className="flex-1">
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead>
                     <tr className="border-b border-[#1c1c30] text-[10px] text-[#94a3b8] tracking-widest">
                       <th className="pb-3 px-4">TIME</th>
                       <th className="pb-3 px-4">TYPE</th>
                       <th className="pb-3 px-4">SOURCE</th>
                       <th className="pb-3 px-4">CONFIDENCE</th>
                       <th className="pb-3 px-4">STATUS</th>
                     </tr>
                   </thead>
                   <tbody className="text-[#e2e8f0] font-mono text-xs">
                     <tr className="border-b border-[#1c1c30]/50 hover:bg-[#141423]">
                       <td className="py-3 px-4 text-[#94a3b8]">14:22:03</td>
                       <td className="py-3 px-4 text-[#ef4444]">Volumetric Peak</td>
                       <td className="py-3 px-4">192.168.10.45</td>
                       <td className="py-3 px-4"><span className="text-[#ef4444]">98.2%</span></td>
                       <td className="py-3 px-4"><span className="bg-[#ef4444]/20 text-[#ef4444] px-2 py-0.5 rounded border border-[#ef4444]/30">ISOLATED</span></td>
                     </tr>
                     <tr className="border-b border-[#1c1c30]/50 hover:bg-[#141423]">
                       <td className="py-3 px-4 text-[#94a3b8]">12:05:41</td>
                       <td className="py-3 px-4 text-[#f59e0b]">Unusual Payload Size</td>
                       <td className="py-3 px-4">10.0.4.12</td>
                       <td className="py-3 px-4"><span className="text-[#f59e0b]">84.5%</span></td>
                       <td className="py-3 px-4"><span className="bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded border border-[#f59e0b]/30">ANALYZING</span></td>
                     </tr>
                     <tr className="hover:bg-[#141423]">
                       <td className="py-3 px-4 text-[#94a3b8]">08:14:19</td>
                       <td className="py-3 px-4 text-[#06b6d4]">Timing Deviation</td>
                       <td className="py-3 px-4">PLC-02</td>
                       <td className="py-3 px-4"><span className="text-[#06b6d4]">67.1%</span></td>
                       <td className="py-3 px-4"><span className="bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded border border-[#22c55e]/30">RESOLVED</span></td>
                     </tr>
                   </tbody>
                 </table>
              </div>
           </WidgetCard>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-48">
             <WidgetCard title="MODEL STATUS" className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse"></div>
                  <span className="text-sm font-bold text-[#22c55e] tracking-widest">ONLINE & LEARNING</span>
                </div>
                <div className="text-xs text-[#94a3b8] font-mono space-y-1">
                  <div>Epoch: 14592</div>
                  <div>Learning Rate: 0.001 (Adaptive)</div>
                  <div>Optimizer: AdamW</div>
                  <div className="text-[#06b6d4] mt-2">Latest checkpoint: 14m ago</div>
                </div>
             </WidgetCard>
             <WidgetCard title="LAST DETECTION LOG" className="p-4 bg-black/40 overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
                <div className="font-mono text-[10px] text-[#ef4444] space-y-1 opacity-80">
                  <div>&gt; ALGO_EVENT: Outlier detected</div>
                  <div>&gt; VECTOR_HASH: 0x8F2A...</div>
                  <div>&gt; Calculating distance metric...</div>
                  <div>&gt; Dist=4.22 (Threshold=3.0)</div>
                  <div className="text-[#f59e0b]">&gt; Flagging for SOC review...</div>
                  <div className="animate-pulse">&gt; Awaiting manual intervention_</div>
                </div>
             </WidgetCard>
           </div>
        </div>

        {/* Feature Importance & Confidence */}
        <div className="xl:col-span-4 flex flex-col gap-5 h-full">
           <WidgetCard title="FEATURE IMPORTANCE EXPLAINER" className="flex-1">
              <div className="space-y-4">
                 <div className="text-[10px] text-[#94a3b8] mb-4">Top factors contributing to recent anomaly detection:</div>
                 {[
                    { feat: 'Payload Length StdDev', score: 92, color: '#ef4444' },
                    { feat: 'Unusual Function Code', score: 84, color: '#f59e0b' },
                    { feat: 'Inter-arrival Time Variance', score: 68, color: '#06b6d4' },
                    { scale: 'Request-Response Ratio', score: 45, color: '#22c55e' },
                    { scale: 'Packet Header Flags', score: 12, color: '#8b5cf6' }
                 ].map((f, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-[10px] font-bold tracking-widest text-[#e2e8f0] mb-1">
                          <span>{f.feat || f.scale}</span>
                          <span style={{color: f.color}}>{f.score}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${f.score}%`, backgroundColor: f.color, boxShadow: `0 0 10px ${f.color}80` }}></div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#1c1c30]">
                 <div className="text-[10px] tracking-widest text-[#94a3b8] mb-2 font-bold">ANOMALY EXPLANATION & CONFIDENCE</div>
                 <div className="text-xs text-[#e2e8f0] mb-4">The isolation forest model detected significant deviation in packet inter-arrival times, strongly suggesting an automated beaconing mechanism.</div>
                 
                 <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold text-[#ef4444] drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">96.8<span className="text-xl text-[#ef4444]/60">%</span></div>
                    <div className="mb-2 w-full h-8 flex items-end gap-1">
                       {Array.from({length: 20}).map((_, i) => (
                          <div key={i} className="flex-1 bg-[#ef4444] transition-all" style={{ height: i < 19 ? `${20 + Math.random()*80}%` : '100%', opacity: i < 19 ? 0.3 : 1, boxShadow: i === 19 ? '0 0 10px #ef4444' : 'none' }}></div>
                       ))}
                    </div>
                 </div>
              </div>
           </WidgetCard>
        </div>
      </div>
    </div>
  );
}
