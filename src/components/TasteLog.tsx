import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, teal, mono } from "./WidgetCard";
import { staggerIn } from "./anim";

type TasteState = "day1" | "day30" | "day90";

interface Pattern {
  dim: string;
  value: string;
  confidence: number;
  dots: number;
}

const data: Record<TasteState, Pattern[]> = {
  day1: [{ dim: "spacing", value: "unknown", confidence: 0.12, dots: 1 }],
  day30: [
    { dim: "spacing", value: "8px-scale", confidence: 0.45, dots: 2 },
    { dim: "naming", value: "kebab-case", confidence: 0.78, dots: 3 },
    { dim: "components", value: "functional", confidence: 0.62, dots: 3 },
  ],
  day90: [
    { dim: "spacing", value: "8px-scale", confidence: 0.94, dots: 4 },
    { dim: "naming", value: "kebab-case", confidence: 0.78, dots: 3 },
    { dim: "components", value: "functional-only", confidence: 0.99, dots: 5 },
    { dim: "colors", value: "teal-dominant", confidence: 0.72, dots: 3 },
    { dim: "layout", value: "flex-first", confidence: 0.88, dots: 4 },
    { dim: "borders", value: "subtle-glow", confidence: 0.81, dots: 4 },
  ],
};

function ConfDots({ filled, total = 5 }: { filled: number; total?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dots = ref.current.children;
    Array.from(dots).forEach((d, i) => {
      (d as HTMLElement).animate(
        [{ transform: "scale(0)" }, { transform: "scale(1)" }],
        { duration: 200, delay: i * 40, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" }
      );
    });
  }, []);

  return (
    <div ref={ref} className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="inline-block rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundColor: i < filled ? teal : "rgba(255,255,255,0.1)",
            boxShadow: i < filled ? `0 0 3px ${teal}44` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function TasteFingerprint() {
  const ref = useRef<HTMLDivElement>(null);
  const grid = [
    [1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 1],
  ];

  useEffect(() => {
    if (!ref.current) return;
    const cells = ref.current.querySelectorAll("[data-cell]");
    Array.from(cells).forEach((c, i) => {
      (c as HTMLElement).animate(
        [{ transform: "scale(0)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }],
        { duration: 200, delay: 300 + i * 20, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" }
      );
    });
  }, []);

  return (
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em" }}>taste fingerprint</span>
      <div ref={ref} className="flex gap-0.5" style={{ marginTop: 4 }}>
        {grid.map((row, ri) => (
          <div key={ri} className="flex flex-col gap-0.5">
            {row.map((v, ci) => (
              <div
                key={ci}
                data-cell
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  backgroundColor: v ? `${teal}66` : "rgba(255,255,255,0.04)",
                  boxShadow: v ? `0 0 3px ${teal}22` : undefined,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TasteCard({ state }: { state: TasteState }) {
  const rowsRef = useRef<HTMLDivElement>(null);
  const patterns = data[state];

  useEffect(() => {
    if (!rowsRef.current) return;
    staggerIn(rowsRef.current, { stagger: 50, from: { opacity: 0, transform: "translateX(-8px)" } });
  }, []);

  return (
    <WidgetCard style={{ width: 360 }}>
      <WidgetHeader icon="fingerprint" title="TASTE LOG" showControls />
      <div ref={rowsRef} className="flex flex-col" style={{ gap: 6 }}>
        {patterns.map((p) => (
          <div key={p.dim} className="flex items-center" style={{ height: 22, gap: 8, opacity: 0 }}>
            <span style={{ fontSize: 11, fontFamily: mono, color: "rgba(255,255,255,0.55)", width: 80, flexShrink: 0 }}>{p.dim}</span>
            <span style={{ fontSize: 11, fontFamily: mono, color: teal, width: 110, flexShrink: 0 }}>{p.value}</span>
            <ConfDots filled={p.dots} />
            <span style={{ fontSize: 10, fontFamily: mono, color: "rgba(255,255,255,0.28)", marginLeft: "auto" }}>{p.confidence.toFixed(2)}</span>
          </div>
        ))}
      </div>
      {state === "day90" && <TasteFingerprint />}
    </WidgetCard>
  );
}

export function TasteLogSection() {
  const labels = ["DAY 1", "DAY 30", "DAY 90"];
  const states: TasteState[] = ["day1", "day30", "day90"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s, i) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={labels[i]} active={s === "day90"} />
          <TasteCard state={s} />
        </div>
      ))}
    </div>
  );
}
