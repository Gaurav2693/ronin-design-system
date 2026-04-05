import { useState, useRef, useEffect } from "react";
import { Helmet } from "./Helmet";
import { WidgetCard, WidgetHeader, StateLabel, StatusDot, teal, green, mono } from "./WidgetCard";
import { animateIn, staggerIn } from "./anim";

type CardState = "idle" | "streaming" | "complete";

const AGENTS = [
  { name: "RONIN", accentColor: "#0DEEF3" },
  { name: "Dead Shifu", accentColor: "#A855F7" },
  { name: "Samurai", accentColor: "#34D399" },
];

function getAgentState(state: CardState, i: number) {
  if (state === "idle") {
    return i === 0
      ? { dot: "#FB923C", pulsing: false, glow: false, text: <><span style={{ color: "rgba(255,255,255,0.55)" }}>Active · </span><span style={{ color: teal }}>Gate 05</span></> }
      : { dot: green, pulsing: false, glow: false, text: <span style={{ color: "rgba(255,255,255,0.55)" }}>{i === 1 ? "Taste · Director" : "Standby"}</span> };
  }
  if (state === "streaming") {
    return i === 0
      ? { dot: teal, pulsing: true, glow: true, text: <><span style={{ color: "rgba(255,255,255,0.55)" }}>Active · </span><span style={{ color: teal }}>Gate 06</span></> }
      : { dot: green, pulsing: false, glow: false, text: <span style={{ color: "rgba(255,255,255,0.55)" }}>{i === 1 ? "Taste · Director" : "Standby"}</span> };
  }
  return { dot: green, pulsing: false, glow: true, text: <span style={{ color: "rgba(255,255,255,0.55)" }}>{i === 0 ? "Complete · Gate 08" : "Complete"}</span> };
}

function AgentHQCard({ state, selectedSeat, onSelectSeat }: { state: CardState; selectedSeat: number; onSelectSeat: (i: number) => void }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const filledSegments = state === "idle" ? 3 : state === "streaming" ? 4 : 6;

  useEffect(() => {
    staggerIn(progressRef.current, { stagger: 50, from: { opacity: 0, transform: "scaleX(0)" } });
  }, [state]);

  useEffect(() => {
    animateIn(detailRef.current, { from: { opacity: 0, transform: "translateY(6px)" } });
  }, [selectedSeat]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <StateLabel label={state === "idle" ? "IDLE" : state === "streaming" ? "STREAMING" : "COMPLETE"} active={state === "streaming"} />
      <WidgetCard style={{ width: 340 }}>
        <WidgetHeader icon="settings" title="AGENT HQ" showControls />
        <div className="flex flex-col" style={{ gap: 6 }}>
          {AGENTS.map((agent, i) => {
            const as = getAgentState(state, i);
            const sel = selectedSeat === i;
            return (
              <div
                key={agent.name}
                onClick={() => onSelectSeat(i)}
                className="flex items-center justify-between"
                style={{
                  height: 44, padding: "0 8px", borderRadius: 8, cursor: "pointer",
                  backgroundColor: sel ? "rgba(255,255,255,0.04)" : "transparent",
                  border: sel ? `1px solid ${agent.accentColor}33` : "1px solid transparent",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Helmet size={28} accentColor={agent.accentColor} glowColor={as.pulsing ? agent.accentColor : undefined} pulsing={as.pulsing} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{agent.name}</span>
                </div>
                <div style={{ fontSize: 11 }}>{as.text}</div>
              </div>
            );
          })}
        </div>
        <div ref={progressRef} className="flex" style={{ gap: 3, marginTop: 10, marginBottom: 10 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-1" style={{
              height: 4, borderRadius: 2, opacity: 0, transformOrigin: "left",
              backgroundColor: i < filledSegments ? teal : "rgba(255,255,255,0.06)",
              boxShadow: i < filledSegments ? `0 0 4px ${teal}44` : undefined,
            }} />
          ))}
        </div>
        <div className="flex items-center gap-1.5" style={{ paddingLeft: 4 }}>
          <StatusDot color={state === "idle" ? green : state === "streaming" ? teal : green} pulsing={state === "streaming"} glow={state === "streaming"} />
          <span style={{ color: teal, fontFamily: mono, fontSize: 11, fontStyle: state === "streaming" ? "italic" : undefined }}>
            {state === "idle" ? "RONIN · Idle" : state === "streaming" ? "Thinking..." : "Cycle complete — 8/8 gates passed."}
          </span>
        </div>
        {selectedSeat >= 0 && (
          <div ref={detailRef} style={{
            marginTop: 10, padding: "8px 10px", borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div className="flex items-center gap-3">
              <Helmet size={40} accentColor={AGENTS[selectedSeat].accentColor} glowColor={AGENTS[selectedSeat].accentColor} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{AGENTS[selectedSeat].name}</div>
                <div style={{ fontSize: 10, color: AGENTS[selectedSeat].accentColor, fontFamily: mono, marginTop: 2 }}>
                  Seat {String(selectedSeat + 1).padStart(2, "0")} · {AGENTS[selectedSeat].accentColor}
                </div>
              </div>
            </div>
          </div>
        )}
      </WidgetCard>
    </div>
  );
}

export default function AgentHQShowcase() {
  const [seats, setSeats] = useState([0, 0, 0]);
  return (
    <div className="flex items-start justify-center gap-6 flex-wrap">
      <style>{`@keyframes helmetPulse { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 6px #0DEEF3); } 50% { opacity: 0.6; filter: drop-shadow(0 0 2px #0DEEF344); } }`}</style>
      {(["idle", "streaming", "complete"] as CardState[]).map((state, si) => (
        <AgentHQCard key={state} state={state} selectedSeat={seats[si]}
          onSelectSeat={(i) => setSeats((prev) => { const n = [...prev]; n[si] = i; return n; })} />
      ))}
    </div>
  );
}
