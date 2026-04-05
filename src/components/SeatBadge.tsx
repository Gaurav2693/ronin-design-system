import { useRef, useEffect } from "react";
import { Helmet } from "./Helmet";
import { WidgetCard, WidgetHeader, StateLabel } from "./WidgetCard";
import { scaleIn } from "./anim";

type BadgeState = "default" | "active" | "offline";

const seats = [
  { letter: "G", label: "operator", accent: "#0DEEF3" },
  { letter: "A", label: "architect", accent: "#A855F7" },
  { letter: "B", label: "director", accent: "#34D399" },
];

function Badge({ seat, state, delay = 0 }: { seat: typeof seats[0]; state: BadgeState; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = state === "active";
  const isOffline = state === "offline";

  useEffect(() => {
    scaleIn(ref.current, delay);
  }, [delay]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2" style={{ opacity: 0 }}>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 44, height: 44,
          backgroundColor: isActive ? `${seat.accent}0D` : "#1A1F2E",
          border: `1px solid ${isActive ? `${seat.accent}44` : "rgba(255,255,255,0.08)"}`,
          boxShadow: isActive ? `0 0 16px ${seat.accent}22` : undefined,
          opacity: isOffline ? 0.35 : 1,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Helmet size={26} accentColor={isOffline ? "rgba(255,255,255,0.2)" : seat.accent}
          glowColor={isActive ? seat.accent : undefined} />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ fontSize: 11, fontWeight: 600, color: isOffline ? "rgba(255,255,255,0.28)" : isActive ? seat.accent : "rgba(255,255,255,0.88)" }}>{seat.letter}</span>
        <span style={{ fontSize: 9, color: isOffline ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)" }}>{seat.label}</span>
      </div>
    </div>
  );
}

export function SeatBadgeWidget() {
  const states: BadgeState[] = ["default", "active", "offline"];
  return (
    <div className="flex flex-col gap-4 items-center">
      <WidgetCard style={{ width: 280 }}>
        <WidgetHeader icon="users" title="SEATS" />
        <div className="flex items-start justify-center gap-6">
          {seats.map((s, i) => <Badge key={s.letter} seat={s} state={i === 0 ? "active" : "default"} delay={i * 80} />)}
        </div>
      </WidgetCard>
      <div className="flex gap-4">
        {states.map((state) => (
          <div key={state} className="flex flex-col gap-1.5 items-center">
            <StateLabel label={state} active={state === "active"} />
            <WidgetCard style={{ padding: 10 }} delay={0.1}>
              <div className="flex items-start justify-center gap-5">
                {seats.map((s, i) => <Badge key={s.letter} seat={s} state={state} delay={i * 60} />)}
              </div>
            </WidgetCard>
          </div>
        ))}
      </div>
    </div>
  );
}
