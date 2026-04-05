import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, teal, mono } from "./WidgetCard";
import { pulseLoop } from "./anim";

type MemState = "empty" | "filling" | "full";

function Bar({ label, percent, pulsing, score, delay = 0 }: { label: string; percent: number; pulsing?: boolean; score?: string; delay?: number }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    fillRef.current.animate(
      [{ width: "0%" }, { width: `${percent}%` }],
      { duration: 800, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    );
  }, [percent, delay]);

  useEffect(() => {
    if (!pulsing || !dotRef.current) return;
    const anim = pulseLoop(dotRef.current);
    return () => { anim?.cancel(); };
  }, [pulsing]);

  return (
    <div className="flex items-center gap-3" style={{ height: 28 }}>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", width: 52, flexShrink: 0 }}>{label}</span>
      <div className="flex-1 relative" style={{ height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div ref={fillRef} style={{
          height: "100%", borderRadius: 3, width: 0,
          background: percent > 0 ? `linear-gradient(90deg, ${teal}, #0AAFB3)` : "transparent",
          position: "relative",
        }}>
          {pulsing && percent > 0 && (
            <span ref={dotRef} className="absolute right-0 top-1/2 -translate-y-1/2" style={{
              width: 6, height: 6, borderRadius: "50%", backgroundColor: teal, boxShadow: `0 0 6px ${teal}`,
            }} />
          )}
        </div>
      </div>
      {score && <span style={{ fontSize: 10, fontFamily: mono, color: teal, width: 28, textAlign: "right", flexShrink: 0 }}>{score}</span>}
    </div>
  );
}

function MemoryCard({ state }: { state: MemState }) {
  const d = { empty: { c: 0, d: 0 }, filling: { c: 40, d: 20 }, full: { c: 92, d: 78 } }[state];
  return (
    <WidgetCard style={{ width: 280 }}>
      <WidgetHeader icon="brain" title="MEMORY" />
      <div className="flex flex-col gap-1">
        <Bar label="Craft" percent={d.c} pulsing={state === "filling"} score={state === "full" ? "0.94" : undefined} delay={100} />
        <Bar label="Density" percent={d.d} pulsing={state === "filling"} score={state === "full" ? "0.78" : undefined} delay={200} />
      </div>
    </WidgetCard>
  );
}

export function MemoryBarWidget() {
  const states: MemState[] = ["empty", "filling", "full"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "filling"} />
          <MemoryCard state={s} />
        </div>
      ))}
    </div>
  );
}
