import { ReactNode, useRef, useEffect } from "react";
import { Helmet } from "./components/Helmet";
import AgentHQShowcase from "./components/AgentHQCard";
import { SeatBadgeWidget } from "./components/SeatBadge";
import { MemoryBarWidget } from "./components/MemoryBar";
import { CostWidgetSection } from "./components/CostWidget";
import { JobsWidgetSection } from "./components/JobsWidget";
import { BuildTreeSection } from "./components/BuildTree";
import { BriefCardSection } from "./components/BriefCard";
import { DiffCardSection } from "./components/DiffCard";
import { ConnectorsStripSection } from "./components/ConnectorsStrip";
import { TasteLogSection } from "./components/TasteLog";
import { CodeBlockSection } from "./components/CodeBlock";
import { InputBarSection } from "./components/InputBar";
import { QuickActionChipsSection } from "./components/QuickActionChips";
import { TerminalCardSection } from "./components/TerminalCard";
import { teal, mono, sfPro } from "./components/WidgetCard";
import { scrollReveal, staggerIn } from "./components/anim";

function Section({ num, title, children, id }: { num: string; title: string; children: ReactNode; id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollReveal(ref.current);
  }, []);

  return (
    <div ref={ref} id={id} style={{ marginBottom: 56, opacity: 0 }}>
      <div className="flex items-center gap-2 justify-center" style={{ marginBottom: 16 }}>
        <span
          style={{
            fontSize: 9,
            fontFamily: mono,
            color: teal,
            backgroundColor: `${teal}0D`,
            border: `1px solid ${teal}30`,
            borderRadius: 4,
            padding: "1px 5px",
            fontWeight: 600,
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: sfPro,
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const helmetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !helmetRef.current) return;
    helmetRef.current.animate(
      [
        { opacity: 0, transform: "scale(0.7) translateY(20px)" },
        { opacity: 1, transform: "scale(1) translateY(0)" },
      ],
      { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    );
    staggerIn(heroRef.current, {
      selector: "[data-hero-text]",
      stagger: 100,
      duration: 500,
      from: { opacity: 0, transform: "translateY(12px)" },
    });
  }, []);

  return (
    <div
      className="size-full overflow-auto"
      style={{
        backgroundColor: "#030B15",
        fontFamily: sfPro,
      }}
    >
      <div
        ref={heroRef}
        className="flex flex-col items-center justify-center"
        style={{ padding: "56px 40px 48px", textAlign: "center" }}
      >
        <div ref={helmetRef} style={{ marginBottom: 20, opacity: 0 }}>
          <Helmet size={56} accentColor={teal} glowColor={teal} />
        </div>
        <h1
          data-hero-text
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            marginBottom: 6,
            opacity: 0,
          }}
        >
          RONIN Widget System
        </h1>
        <p data-hero-text style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4, opacity: 0 }}>
          Your design-engineering command center
        </p>
        <p data-hero-text style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: mono, opacity: 0 }}>
          14 widgets · all states · fluid animations
        </p>
      </div>

      <div style={{ width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "0 auto 48px" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 80px" }}>
        <Section num="01" title="Agent HQ" id="agent-hq"><AgentHQShowcase /></Section>
        <Section num="02" title="Seat Badge" id="seat-badge"><SeatBadgeWidget /></Section>
        <Section num="03" title="Memory Bar" id="memory-bar"><MemoryBarWidget /></Section>
        <Section num="04" title="Cost Widget" id="cost-widget"><CostWidgetSection /></Section>
        <Section num="05" title="Jobs Widget" id="jobs-widget"><JobsWidgetSection /></Section>
        <Section num="06" title="Build Tree" id="build-tree"><BuildTreeSection /></Section>
        <Section num="07" title="Brief Card" id="brief-card"><BriefCardSection /></Section>
        <Section num="08" title="Diff Card" id="diff-card"><DiffCardSection /></Section>
        <Section num="09" title="Connectors Strip" id="connectors-strip"><ConnectorsStripSection /></Section>
        <Section num="10" title="Taste Log" id="taste-log"><TasteLogSection /></Section>
        <Section num="11" title="Code Block" id="code-block"><CodeBlockSection /></Section>
        <Section num="12" title="Input Bar" id="input-bar"><InputBarSection /></Section>
        <Section num="13" title="Quick Action Chips" id="quick-action-chips"><QuickActionChipsSection /></Section>
        <Section num="14" title="Terminal Card" id="terminal-card"><TerminalCardSection /></Section>
      </div>
    </div>
  );
}
