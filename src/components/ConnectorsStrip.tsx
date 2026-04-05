import { useRef, useEffect } from "react";
import { StateLabel, StatusDot } from "./WidgetCard";
import { staggerIn } from "./anim";

type ConnState = "disconnected" | "connected" | "active";

const connectors = [
  { name: "Figma", brand: "#A259FF" },
  { name: "Blender", brand: "#E87D0D" },
  { name: "Gmail", brand: "#EA4335" },
  { name: "Cal", brand: "#4285F4" },
  { name: "Notion", brand: "rgba(255,255,255,0.8)" },
];

function Strip({ state, activeIdx = 0 }: { state: ConnState; activeIdx?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    staggerIn(ref.current, { stagger: 50, from: { opacity: 0, transform: "translateY(4px)" } });
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4"
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {connectors.map((c, i) => {
        const isActive = state === "active" && i === activeIdx;
        const dot = state === "disconnected" ? "rgba(255,255,255,0.2)" : c.brand;
        const nameColor = state === "disconnected" ? "rgba(255,255,255,0.28)" : isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.55)";

        return (
          <div key={c.name} className="flex items-center gap-1.5" style={{ opacity: 0 }}>
            <StatusDot color={dot} size={8} pulsing={isActive} glow={isActive} />
            <span style={{ fontSize: 11, color: nameColor }}>{c.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ConnectorsStripSection() {
  return (
    <div className="flex flex-col gap-4 items-center">
      {(["disconnected", "connected", "active"] as ConnState[]).map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "active"} />
          <Strip state={s} />
        </div>
      ))}
    </div>
  );
}
