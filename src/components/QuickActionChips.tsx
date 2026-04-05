import { useState, useRef, useEffect } from "react";
import { StateLabel, Icon, teal } from "./WidgetCard";
import { animateIn } from "./anim";

type ChipState = "default" | "hover" | "active";

const chips = [
  { icon: "globe", label: "Open workspace" },
  { icon: "flask", label: "Review last commit" },
  { icon: "cpu", label: "Run local model" },
  { icon: "pen", label: "Open Figma" },
];

function ActionChip({ icon, label, forceState }: { icon: string; label: string; forceState?: ChipState }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const state = forceState ?? (pressed ? "active" : hover ? "hover" : "default");

  useEffect(() => {
    if (!ref.current) return;
    animateIn(ref.current, { from: { opacity: 0, transform: "translateY(6px)" } });
  }, []);

  const styles: Record<ChipState, { bg: string; border: string }> = {
    default: { bg: "#1A1F2E", border: "1px solid rgba(255,255,255,0.08)" },
    hover: { bg: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" },
    active: { bg: `rgba(13,238,243,0.08)`, border: `1px solid rgba(13,238,243,0.28)` },
  };

  const s = styles[state];

  const handleClick = () => {
    if (ref.current && !forceState) {
      ref.current.animate(
        [{ transform: "scale(0.95)" }, { transform: "scale(1)" }],
        { duration: 250, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => !forceState && setHover(true)}
      onMouseLeave={() => { if (!forceState) { setHover(false); setPressed(false); } }}
      onMouseDown={() => !forceState && setPressed(true)}
      onMouseUp={() => { if (!forceState) { setPressed(false); handleClick(); } }}
      className="flex items-center gap-1.5"
      style={{
        backgroundColor: s.bg,
        border: s.border,
        borderRadius: 22,
        padding: "8px 14px",
        cursor: "pointer",
        transition: "all 0.15s",
        userSelect: "none",
        opacity: 0,
      }}
    >
      <Icon name={icon} size={14} color={teal} strokeWidth={1.5} />
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.88)" }}>{label}</span>
    </div>
  );
}

export function QuickActionChipsSection() {
  const states: ChipState[] = ["default", "hover", "active"];

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-1.5 items-center">
        <StateLabel label="INTERACTIVE" />
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {chips.map((c) => <ActionChip key={c.label} {...c} />)}
        </div>
      </div>
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "active"} />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {chips.map((c) => <ActionChip key={c.label} {...c} forceState={s} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
