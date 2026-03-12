export default function WidgetCard({ title, children, className = "", status = "normal" }) {
  const statusColors = {
    normal: "border-borderBright",
    warning: "border-alert-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    critical: "border-alert-red/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-[pulse_2s_infinite]"
  };

  return (
    <div className={`glass-panel p-4 flex flex-col ${statusColors[status]} ${className}`}>
      {title && (
        <div className="text-[10px] text-text-muted tracking-[0.2em] font-bold mb-3 uppercase drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
          {title}
        </div>
      )}
      <div className="flex-1 relative min-h-0 max-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
