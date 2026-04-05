import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, StatusDot, mono, green } from "./WidgetCard";
import { animateIn, tickUp } from "./anim";

type CostState = "zero" | "ticking" | "final" | "warning";

const config: Record<CostState, { dot: string; value: string; valueColor: string; sub?: string; subColor?: string; pulsing?: boolean }> = {
  zero: { dot: "rgba(255,255,255,0.2)", value: "$0.0000", valueColor: "rgba(255,255,255,0.28)" },
  ticking: { dot: green, value: "$0.0353", valueColor: "rgba(255,255,255,0.88)", pulsing: true },
  final: { dot: green, value: "$0.1247", valueColor: "rgba(255,255,255,0.88)", sub: "session complete", subColor: "rgba(255,255,255,0.28)" },
  warning: { dot: "#F5C200", value: "$0.8921", valueColor: "#F5C200", sub: "approaching limit", subColor: "rgba(245,194,0,0.55)" },
};

function CostCard({ state }: { state: CostState }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const c = config[state];

  useEffect(() => { animateIn(numRef.current, { from: { opacity: 0, transform: "translateY(8px)" } }); }, [state]);

  useEffect(() => {
    if (state !== "ticking" || !arrowRef.current) return;
    const anim = tickUp(arrowRef.current);
    return () => { anim?.cancel(); };
  }, [state]);

  return (
    <WidgetCard style={{ width: 200 }}>
      <WidgetHeader icon="dollar" title="COST" iconColor={c.dot}
        right={<StatusDot color={c.dot} pulsing={c.pulsing} glow={c.pulsing} />} />
      <div className="flex items-baseline gap-1" style={{ paddingLeft: 2 }}>
        <span ref={numRef} style={{ fontSize: 24, fontWeight: 600, color: c.valueColor, fontFamily: mono, fontVariantNumeric: "tabular-nums", opacity: 0 }}>{c.value}</span>
        {state === "ticking" && <span ref={arrowRef} style={{ fontSize: 12, color: green }}>↑</span>}
      </div>
      {c.sub && <span style={{ fontSize: 9, color: c.subColor, marginTop: 4, display: "block", paddingLeft: 2 }}>{c.sub}</span>}
    </WidgetCard>
  );
}

export function CostWidgetSection() {
  const states: CostState[] = ["zero", "ticking", "final", "warning"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "ticking"} />
          <CostCard state={s} />
        </div>
      ))}
    </div>
  );
}
