import { useRef, useEffect } from "react";
import { StateLabel, Icon, teal, mono, sfPro } from "./WidgetCard";
import { scaleIn } from "./anim";

type InputState = "empty" | "typing" | "chips";

function Chip({ label, color }: { label: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    scaleIn(ref.current);
  }, []);
  return (
    <span ref={ref} style={{
      fontSize: 10, color, backgroundColor: `${color}12`, border: `1px solid ${color}30`,
      borderRadius: 12, padding: "3px 10px", fontFamily: mono, display: "inline-block",
    }}>
      {label}
    </span>
  );
}

const tools = [
  { icon: "paperclip", label: "Attach" },
  { icon: "externalLink", label: "Link" },
  { icon: "figma", label: "Figma frame" },
  { icon: "image", label: "Screenshot" },
];

function InputBarInner({ state }: { state: InputState }) {
  const hasText = state !== "empty";
  const sendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sendRef.current) return;
  }, [hasText]);

  return (
    <div style={{ width: 500, fontFamily: sfPro }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
        {tools.map((t) => (
          <div key={t.label} className="flex items-center gap-1" style={{ cursor: "pointer", opacity: 0.3, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}>
            <Icon name={t.icon} size={12} color="white" strokeWidth={1.4} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.label}</span>
          </div>
        ))}
      </div>

      {state === "chips" && (
        <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
          <Chip label="Dashboard.tsx" color="#4285F4" />
          <Chip label="figma://frame/123" color="#A259FF" />
        </div>
      )}

      <div className="flex items-center" style={{
        backgroundColor: "#0D1117", borderRadius: 8, padding: "8px 10px", gap: 8,
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Icon name="plus" size={16} color="rgba(255,255,255,0.2)" strokeWidth={1.4} />
        <div className="flex-1" style={{ minWidth: 0 }}>
          <span style={{ fontSize: 12, color: hasText ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.28)" }}>
            {state === "typing" ? "Build a dashboard component with..." : state === "chips" ? "Add chart integration for the data" : "Message RONIN..."}
          </span>
        </div>
        <span style={{ fontSize: 10, fontFamily: mono, color: "rgba(255,255,255,0.28)", flexShrink: 0 }}>sonnet-4-6</span>
        <span className="inline-block rounded-full" style={{ width: 6, height: 6, backgroundColor: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
        <div
          ref={sendRef}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 26, height: 26,
            backgroundColor: hasText ? teal : "rgba(255,255,255,0.06)",
            boxShadow: hasText ? `0 0 12px ${teal}33` : undefined,
            cursor: "pointer", flexShrink: 0,
          }}
        >
          <Icon name="send" size={12} color={hasText ? "#000" : "rgba(255,255,255,0.2)"} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

export function InputBarSection() {
  return (
    <div className="flex flex-col gap-6 items-center">
      {(["empty", "typing", "chips"] as InputState[]).map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "typing"} />
          <InputBarInner state={s} />
        </div>
      ))}
    </div>
  );
}
