import { useRef, useEffect } from "react";
import { StateLabel, teal, green, mono } from "./WidgetCard";
import { staggerIn } from "./anim";

type CodeState = "generic" | "transitioning" | "personalized";

interface Token { text: string; color: string }
interface Line { num: number; tokens: Token[] }

const codeData: Record<CodeState, { filename: string; lines: Line[] }> = {
  generic: {
    filename: "Component.tsx",
    lines: [
      { num: 1, tokens: [{ text: "import ", color: teal }, { text: "React ", color: "rgba(255,255,255,0.88)" }, { text: "from ", color: teal }, { text: "'react'", color: green }] },
      { num: 2, tokens: [{ text: "", color: "" }] },
      { num: 3, tokens: [{ text: "// basic component", color: "rgba(255,255,255,0.28)" }] },
      { num: 4, tokens: [{ text: "const ", color: teal }, { text: "div1 ", color: "rgba(255,255,255,0.88)" }, { text: "= () => {", color: "rgba(255,255,255,0.88)" }] },
      { num: 5, tokens: [{ text: "  return (", color: "rgba(255,255,255,0.88)" }] },
      { num: 6, tokens: [{ text: '    <div style={{ padding: 16 }}>', color: "rgba(255,255,255,0.88)" }] },
      { num: 7, tokens: [{ text: "      <div className=", color: "rgba(255,255,255,0.88)" }, { text: '"container"', color: green }, { text: ">", color: "rgba(255,255,255,0.88)" }] },
      { num: 8, tokens: [{ text: "        <h1>Title</h1>", color: "rgba(255,255,255,0.88)" }] },
      { num: 9, tokens: [{ text: "      </div>", color: "rgba(255,255,255,0.88)" }] },
      { num: 10, tokens: [{ text: "    </div>", color: "rgba(255,255,255,0.88)" }] },
      { num: 11, tokens: [{ text: "  )", color: "rgba(255,255,255,0.88)" }] },
      { num: 12, tokens: [{ text: "}", color: "rgba(255,255,255,0.88)" }] },
    ],
  },
  transitioning: {
    filename: "Dashboard.tsx",
    lines: [
      { num: 1, tokens: [{ text: "import ", color: teal }, { text: "React ", color: "rgba(255,255,255,0.88)" }, { text: "from ", color: teal }, { text: "'react'", color: green }] },
      { num: 2, tokens: [{ text: "import ", color: teal }, { text: "{ ", color: "rgba(255,255,255,0.88)" }, { text: "ChartCard", color: "#A78BFA" }, { text: " } ", color: "rgba(255,255,255,0.88)" }, { text: "from ", color: teal }, { text: "'./chart-card'", color: green }] },
      { num: 3, tokens: [{ text: "", color: "" }] },
      { num: 4, tokens: [{ text: "const ", color: teal }, { text: "heroSection ", color: "rgba(255,255,255,0.88)" }, { text: "= () => {", color: "rgba(255,255,255,0.88)" }] },
      { num: 5, tokens: [{ text: "  return (", color: "rgba(255,255,255,0.88)" }] },
      { num: 6, tokens: [{ text: '    <section className=', color: "rgba(255,255,255,0.88)" }, { text: '"flex flex-col gap-4"', color: green }, { text: ">", color: "rgba(255,255,255,0.88)" }] },
      { num: 7, tokens: [{ text: '      <div className=', color: "rgba(255,255,255,0.88)" }, { text: '"mainGrid p-4"', color: green }, { text: ">", color: "rgba(255,255,255,0.88)" }] },
      { num: 8, tokens: [{ text: "        <", color: "rgba(255,255,255,0.88)" }, { text: "ChartCard", color: "#A78BFA" }, { text: " />", color: "rgba(255,255,255,0.88)" }] },
      { num: 9, tokens: [{ text: "      </div>", color: "rgba(255,255,255,0.88)" }] },
      { num: 10, tokens: [{ text: "    </section>", color: "rgba(255,255,255,0.88)" }] },
      { num: 11, tokens: [{ text: "  )", color: "rgba(255,255,255,0.88)" }] },
      { num: 12, tokens: [{ text: "}", color: "rgba(255,255,255,0.88)" }] },
    ],
  },
  personalized: {
    filename: "Chart.tsx",
    lines: [
      { num: 1, tokens: [{ text: "import ", color: teal }, { text: "{ ", color: "rgba(255,255,255,0.88)" }, { text: "ForgeRail", color: "#A78BFA" }, { text: " } ", color: "rgba(255,255,255,0.88)" }, { text: "from ", color: teal }, { text: "'./forge-rail'", color: green }] },
      { num: 2, tokens: [{ text: "import ", color: teal }, { text: "{ ", color: "rgba(255,255,255,0.88)" }, { text: "useRoninTheme", color: "#A78BFA" }, { text: " } ", color: "rgba(255,255,255,0.88)" }, { text: "from ", color: teal }, { text: "'./hooks'", color: green }] },
      { num: 3, tokens: [{ text: "", color: "" }] },
      { num: 4, tokens: [{ text: "// 8px-scale · teal-dominant · kebab-case", color: "rgba(255,255,255,0.28)" }] },
      { num: 5, tokens: [{ text: "export ", color: teal }, { text: "const ", color: teal }, { text: "hero-cockpit ", color: "rgba(255,255,255,0.88)" }, { text: "= () => {", color: "rgba(255,255,255,0.88)" }] },
      { num: 6, tokens: [{ text: "  const ", color: teal }, { text: "theme = ", color: "rgba(255,255,255,0.88)" }, { text: "useRoninTheme", color: "#A78BFA" }, { text: "()", color: "rgba(255,255,255,0.88)" }] },
      { num: 7, tokens: [{ text: "  return (", color: "rgba(255,255,255,0.88)" }] },
      { num: 8, tokens: [{ text: "    <", color: "rgba(255,255,255,0.88)" }, { text: "ForgeRail", color: "#A78BFA" }, { text: " gap={8} pad={16}>", color: "rgba(255,255,255,0.88)" }] },
      { num: 9, tokens: [{ text: '      <div className=', color: "rgba(255,255,255,0.88)" }, { text: '"cockpit-grid gap-2"', color: green }, { text: ">", color: "rgba(255,255,255,0.88)" }] },
      { num: 10, tokens: [{ text: "        {", color: "rgba(255,255,255,0.88)" }, { text: "data", color: "#A78BFA" }, { text: ".map(", color: "rgba(255,255,255,0.88)" }, { text: "renderCard", color: "#A78BFA" }, { text: ")}", color: "rgba(255,255,255,0.88)" }] },
      { num: 11, tokens: [{ text: "      </div>", color: "rgba(255,255,255,0.88)" }] },
      { num: 12, tokens: [{ text: "    </", color: "rgba(255,255,255,0.88)" }, { text: "ForgeRail", color: "#A78BFA" }, { text: ">", color: "rgba(255,255,255,0.88)" }] },
      { num: 13, tokens: [{ text: "  )", color: "rgba(255,255,255,0.88)" }] },
      { num: 14, tokens: [{ text: "}", color: "rgba(255,255,255,0.88)" }] },
    ],
  },
};

function CodeBlockCard({ state }: { state: CodeState }) {
  const d = codeData[state];
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!linesRef.current) return;
    staggerIn(linesRef.current, { stagger: 30, from: { opacity: 0, transform: "translateX(-4px)" } });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#161B22",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        fontFamily: mono,
        width: 440,
      }}
    >
      <div className="flex items-center justify-between" style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{d.filename}</span>
        <span style={{
          fontSize: 9,
          color: teal,
          backgroundColor: `${teal}12`,
          border: `1px solid ${teal}30`,
          borderRadius: 10,
          padding: "1px 6px",
          fontWeight: 600,
        }}>
          tsx
        </span>
      </div>
      <div ref={linesRef} style={{ padding: "10px 0", fontSize: 12, lineHeight: "20px" }}>
        {d.lines.map((line) => (
          <div key={line.num} className="flex" style={{ opacity: 0 }}>
            <span style={{ width: 40, textAlign: "right", paddingRight: 12, color: "rgba(255,255,255,0.15)", fontSize: 11, userSelect: "none", flexShrink: 0 }}>{line.num}</span>
            <span>{line.tokens.map((t, i) => <span key={i} style={{ color: t.color || "transparent" }}>{t.text}</span>)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeBlockSection() {
  const states: CodeState[] = ["generic", "transitioning", "personalized"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "personalized"} />
          <CodeBlockCard state={s} />
        </div>
      ))}
    </div>
  );
}
