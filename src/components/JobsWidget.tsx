import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, StatusDot, teal, green, mono } from "./WidgetCard";
import { animateIn } from "./anim";

type JobState = "idle" | "running" | "complete";

function JobsCard({ state }: { state: JobState }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const dotColor = state === "idle" ? "rgba(255,255,255,0.2)" : state === "running" ? teal : green;

  useEffect(() => {
    animateIn(contentRef.current, { from: { opacity: 0, transform: "translateX(-6px)" } });
  }, [state]);

  return (
    <WidgetCard style={{ width: 240 }}>
      <WidgetHeader icon="zap" title="JOBS" iconColor={dotColor} />
      <div ref={contentRef} style={{ paddingLeft: 2, opacity: 0 }}>
        {state === "idle" && (
          <div className="flex items-center gap-1.5">
            <StatusDot color="rgba(255,255,255,0.15)" />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: mono }}>no active jobs</span>
          </div>
        )}
        {state === "running" && (
          <>
            <div className="flex items-center gap-1.5">
              <StatusDot color={teal} pulsing glow />
              <span style={{ fontSize: 11, color: teal, fontFamily: mono }}>running</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, paddingLeft: 14 }}>Generate Chart.tsx</div>
          </>
        )}
        {state === "complete" && (
          <>
            <div className="flex items-center gap-1.5">
              <StatusDot color={green} />
              <span style={{ fontSize: 11, color: green, fontFamily: mono }}>3 completed</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: mono, marginTop: 4, paddingLeft: 14 }}>0 failed</div>
          </>
        )}
      </div>
    </WidgetCard>
  );
}

export function JobsWidgetSection() {
  const states: JobState[] = ["idle", "running", "complete"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "running"} />
          <JobsCard state={s} />
        </div>
      ))}
    </div>
  );
}
