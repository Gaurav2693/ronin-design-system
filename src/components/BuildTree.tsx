import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, teal, green, mono } from "./WidgetCard";
import { staggerIn, animateIn } from "./anim";

type TreeState = "progress" | "complete" | "error";
type ItemStatus = "done" | "active" | "pending" | "error";

interface TreeItem { status: ItemStatus; label: string; cost?: string; indent?: boolean }

const statusConfig: Record<ItemStatus, { icon: string; color: string }> = {
  done: { icon: "✓", color: green },
  active: { icon: "●", color: teal },
  pending: { icon: "○", color: "rgba(255,255,255,0.2)" },
  error: { icon: "⚠", color: "#EF4444" },
};

const trees: Record<TreeState, TreeItem[]> = {
  progress: [
    { status: "done", label: "Read codebase structure", cost: "$0.001" },
    { status: "done", label: "src/Dashboard.tsx", indent: true },
    { status: "done", label: "src/styles/theme.ts", indent: true },
    { status: "done", label: "Analyse component dependencies", cost: "$0.003" },
    { status: "active", label: "Generate Chart.tsx component" },
    { status: "done", label: "Write component skeleton", indent: true },
    { status: "active", label: "Add data bindings", indent: true },
    { status: "pending", label: "Add tests", indent: true },
    { status: "pending", label: "Update Dashboard.tsx" },
    { status: "pending", label: "Run test suite" },
    { status: "pending", label: "Gate review" },
  ],
  complete: [
    { status: "done", label: "Read codebase structure", cost: "$0.001" },
    { status: "done", label: "src/Dashboard.tsx", indent: true },
    { status: "done", label: "src/styles/theme.ts", indent: true },
    { status: "done", label: "Analyse component dependencies", cost: "$0.003" },
    { status: "done", label: "Generate Chart.tsx component", cost: "$0.012" },
    { status: "done", label: "Write component skeleton", indent: true },
    { status: "done", label: "Add data bindings", indent: true },
    { status: "done", label: "Add tests", indent: true },
    { status: "done", label: "Update Dashboard.tsx", cost: "$0.008" },
    { status: "done", label: "Run test suite", cost: "$0.004" },
    { status: "done", label: "Gate review", cost: "$0.007" },
  ],
  error: [
    { status: "done", label: "Read codebase structure", cost: "$0.001" },
    { status: "done", label: "src/Dashboard.tsx", indent: true },
    { status: "done", label: "src/styles/theme.ts", indent: true },
    { status: "done", label: "Analyse component dependencies", cost: "$0.003" },
    { status: "done", label: "Generate Chart.tsx component", cost: "$0.012" },
    { status: "done", label: "Write component skeleton", indent: true },
    { status: "done", label: "Add data bindings", indent: true },
    { status: "done", label: "Add tests", indent: true },
    { status: "done", label: "Update Dashboard.tsx", cost: "$0.008" },
    { status: "done", label: "Run test suite", cost: "$0.004" },
    { status: "error", label: "Gate review" },
  ],
};

function BuildTreeCard({ state }: { state: TreeState }) {
  const listRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const items = trees[state];
  const errorIdx = items.findIndex((i) => i.status === "error");

  useEffect(() => {
    staggerIn(listRef.current, { stagger: 35, from: { opacity: 0, transform: "translateX(-8px)" } });
  }, []);

  useEffect(() => {
    animateIn(footerRef.current, { delay: 500, from: { opacity: 0, transform: "translateY(4px)" } });
  }, [state]);

  return (
    <WidgetCard style={{ width: 380 }}>
      <WidgetHeader icon="gitBranch" iconColor={state === "error" ? "#EF4444" : green} title="BUILD TREE" showControls />
      <div ref={listRef} className="flex flex-col">
        {items.map((item, i) => {
          const s = statusConfig[item.status];
          const dimmed = state === "error" && errorIdx >= 0 && i > errorIdx;
          return (
            <div key={`${item.label}-${i}`} className="flex items-center justify-between" style={{
              height: 26, paddingLeft: item.indent ? 20 : 0, opacity: 0,
              borderLeft: item.status === "active" ? `2px solid ${teal}` : "2px solid transparent",
            }}>
              <div className="flex items-center gap-2" style={{ minWidth: 0, flex: 1, opacity: dimmed ? 0.3 : 1 }}>
                <span style={{ fontSize: item.indent ? 10 : 11, color: s.color, width: 14, textAlign: "center", flexShrink: 0 }}>{s.icon}</span>
                <span style={{ fontSize: item.indent ? 11 : 12, color: item.status === "error" ? "#EF4444" : "rgba(255,255,255,0.88)", fontWeight: item.indent ? 400 : 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
              </div>
              {item.cost && <span style={{ fontSize: 11, fontFamily: mono, color: teal, flexShrink: 0, marginLeft: 8 }}>{item.cost}</span>}
            </div>
          );
        })}
      </div>
      {state === "complete" && (
        <div ref={footerRef} className="flex justify-end" style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)", opacity: 0 }}>
          <span style={{ fontSize: 12, fontFamily: mono, color: teal, fontWeight: 600 }}>Total: $0.0353</span>
        </div>
      )}
      {state === "error" && (
        <div ref={footerRef} style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(239,68,68,0.15)", opacity: 0 }}>
          <span style={{ fontSize: 11, color: "#EF4444" }}>Regression threshold exceeded (5.2% &gt; 5.0%)</span>
        </div>
      )}
    </WidgetCard>
  );
}

export function BuildTreeSection() {
  const labels = ["IN PROGRESS", "COMPLETE", "ERROR"];
  const states: TreeState[] = ["progress", "complete", "error"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s, i) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={labels[i]} active={s === "progress"} />
          <BuildTreeCard state={s} />
        </div>
      ))}
    </div>
  );
}
