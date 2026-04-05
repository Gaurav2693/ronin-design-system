import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, mono } from "./WidgetCard";
import { staggerIn } from "./anim";

type DiffState = "collapsed" | "expanded";

const files = [
  { status: "M", path: "src/Dashboard.tsx", add: 45, del: 12 },
  { status: "M", path: "src/styles/theme.ts", add: 16, del: 27 },
  { status: "A", path: "src/Chart.tsx", add: 61, del: 0 },
];

const statusColors: Record<string, string> = { M: "#F5C200", A: "#34D399", D: "#EF4444" };

function DiffCardInner({ state }: { state: DiffState }) {
  const totalAdd = files.reduce((a, f) => a + f.add, 0);
  const totalDel = files.reduce((a, f) => a + f.del, 0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== "expanded" || !listRef.current) return;
    staggerIn(listRef.current, { stagger: 60, from: { opacity: 0, transform: "translateX(-6px)" } });
  }, [state]);

  return (
    <WidgetCard style={{ width: 380 }}>
      <WidgetHeader
        icon="gitCompare"
        iconColor="#34D399"
        title="DIFF"
        showControls
        right={
          state === "collapsed" ? (
            <span style={{ fontSize: 10, fontFamily: mono }}>
              <span style={{ color: "#34D399" }}>+{totalAdd}</span>{" "}
              <span style={{ color: "#EF4444" }}>-{totalDel}</span>
            </span>
          ) : undefined
        }
      />
      {state === "expanded" && (
        <div ref={listRef} className="flex flex-col" style={{ gap: 4 }}>
          {files.map((f) => (
            <div key={f.path} className="flex items-center justify-between" style={{ height: 24, paddingLeft: 2, opacity: 0 }}>
              <div className="flex items-center gap-2" style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: 11, fontFamily: mono, color: statusColors[f.status], width: 14, fontWeight: 600 }}>{f.status}</span>
                <span style={{ fontSize: 11, fontFamily: mono, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.path}</span>
              </div>
              <div style={{ fontSize: 10, fontFamily: mono, flexShrink: 0, marginLeft: 12 }}>
                <span style={{ color: "#34D399" }}>+{f.add}</span>{" "}
                <span style={{ color: "#EF4444" }}>-{f.del}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}

export function DiffCardSection() {
  return (
    <div className="flex gap-4 justify-center">
      {(["collapsed", "expanded"] as DiffState[]).map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} />
          <DiffCardInner state={s} />
        </div>
      ))}
    </div>
  );
}
