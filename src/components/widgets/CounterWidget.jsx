export default function CounterWidget({ label, value, sub, color = "purple" }) {
  const colors = {
    purple: { text: "text-[#8b5cf6]", bg: "bg-[#7c3aed]/20", border: "border-[#7c3aed]" },
    blue: { text: "text-[#22d3ee]", bg: "bg-[#06b6d4]/20", border: "border-[#06b6d4]" },
    green: { text: "text-[#22c55e]", bg: "bg-[#22c55e]/20", border: "border-[#22c55e]" },
    warning: { text: "text-[#f59e0b]", bg: "bg-[#f59e0b]/20", border: "border-[#f59e0b]" },
    red: { text: "text-[#ef4444]", bg: "bg-[#ef4444]/20", border: "border-[#ef4444]" },
  };

  const c = colors[color] || colors.purple;

  return (
    <div className={`glass-panel p-4 relative overflow-hidden border-t-2 border-t-solid ${c.border.replace('border-', 'border-t-')}`}>
      <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-50 ${c.bg}`}></div>
      <div className="text-[9px] text-text-muted tracking-[0.15em] mb-2 relative z-10">{label}</div>
      <div className={`text-xl font-bold mb-1 relative z-10 drop-shadow-[0_0_8px_currentColor] ${c.text}`}>{value}</div>
      <div className="text-[10px] text-text-muted relative z-10">{sub}</div>
    </div>
  );
}
