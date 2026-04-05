import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, teal } from "./WidgetCard";
import { scaleIn, animateIn } from "./anim";

type BriefState = "draft" | "locked";

function Pill({ label, color }: { label: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    scaleIn(ref.current, 200);
  }, []);

  return (
    <span
      ref={ref}
      style={{
        fontSize: 9,
        fontWeight: 600,
        color,
        backgroundColor: `${color}12`,
        border: `1px solid ${color}30`,
        borderRadius: 10,
        padding: "1px 7px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

function BriefCardInner({ state }: { state: BriefState }) {
  const isDraft = state === "draft";
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;
    animateIn(borderRef.current, { from: { opacity: 0, transform: "translateX(-6px)" } });
  }, []);

  return (
    <WidgetCard style={{ width: 320 }}>
      <WidgetHeader
        icon="fileText"
        title="BRIEF"
        right={!isDraft ? <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>Mar 29</span> : undefined}
      />
      <div
        ref={borderRef}
        style={{
          borderLeft: isDraft ? "2px dashed #F5C200" : `2px solid ${teal}`,
          paddingLeft: 10,
          marginLeft: 2,
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: isDraft ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.88)",
          }}>
            Ship Phase B cards
          </span>
          <Pill label={state} color={isDraft ? "#F5C200" : teal} />
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Wire Forge SSE · Business Director</span>
      </div>
    </WidgetCard>
  );
}

export function BriefCardSection() {
  return (
    <div className="flex gap-4 justify-center">
      {(["draft", "locked"] as BriefState[]).map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "locked"} />
          <BriefCardInner state={s} />
        </div>
      ))}
    </div>
  );
}
