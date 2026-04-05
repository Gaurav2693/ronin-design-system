import { ReactNode, useRef, useEffect } from "react";
import { animateIn, pulseLoop } from "./anim";

// -- Design tokens --
export const teal = "#0DEEF3";
export const green = "#34D399";
export const mono = "ui-monospace, SFMono-Regular, monospace";
export const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';

// -- Animated card wrapper --
export function WidgetCard({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animateIn(ref.current, { delay: delay * 1000, from: { opacity: 0, transform: "translateY(12px) scale(0.98)" } });
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        backgroundColor: "#07182C",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: 12,
        fontFamily: sfPro,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// -- SVG icon set -- clean, minimal, 1px stroke --
export function Icon({
  name,
  size = 14,
  color = teal,
  strokeWidth = 1.5,
}: {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const s = { strokeWidth, stroke: color, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    settings: <><circle cx="12" cy="12" r="3" {...s} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" {...s} /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...s} /><circle cx="9" cy="7" r="4" {...s} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" {...s} /><path d="M16 3.13a4 4 0 0 1 0 7.75" {...s} /></>,
    brain: <><path d="M9.5 2A5.5 5.5 0 0 0 5 7.5c0 1 .3 2 .8 2.8A5.5 5.5 0 0 0 4 15.5 5.5 5.5 0 0 0 9.5 21h.5" {...s} /><path d="M14.5 2A5.5 5.5 0 0 1 19 7.5c0 1-.3 2-.8 2.8A5.5 5.5 0 0 1 20 15.5 5.5 5.5 0 0 1 14.5 21h-.5" {...s} /><path d="M12 2v19" {...s} /></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23" {...s} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" {...s} /></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...s} /></>,
    gitBranch: <><line x1="6" y1="3" x2="6" y2="15" {...s} /><circle cx="18" cy="6" r="3" {...s} /><circle cx="6" cy="18" r="3" {...s} /><path d="M18 9a9 9 0 0 1-9 9" {...s} /></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" {...s} /><polyline points="14 2 14 8 20 8" {...s} /><line x1="16" y1="13" x2="8" y2="13" {...s} /><line x1="16" y1="17" x2="8" y2="17" {...s} /><polyline points="10 9 9 9 8 9" {...s} /></>,
    gitCompare: <><circle cx="18" cy="18" r="3" {...s} /><circle cx="6" cy="6" r="3" {...s} /><path d="M13 6h3a2 2 0 0 1 2 2v7" {...s} /><path d="M11 18H8a2 2 0 0 1-2-2V9" {...s} /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...s} /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s} /></>,
    fingerprint: <><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" {...s} /><path d="M5 19.5C5.5 18 6 15 6 12c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2" {...s} /><path d="M12 12c0 4-1 8-4 11" {...s} /><path d="M12 12c0 3-1.5 7-4.5 10" {...s} /><path d="M20 17.5c0-2-1-6.5-8-6.5" {...s} /><path d="M22 22c-2-3-3-6-3-9" {...s} /></>,
    code: <><polyline points="16 18 22 12 16 6" {...s} /><polyline points="8 6 2 12 8 18" {...s} /></>,
    terminal: <><polyline points="4 17 10 11 4 5" {...s} /><line x1="12" y1="19" x2="20" y2="19" {...s} /></>,
    chevronUp: <><polyline points="18 15 12 9 6 15" {...s} /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" {...s} /><line x1="6" y1="6" x2="18" y2="18" {...s} /></>,
    paperclip: <><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" {...s} /></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" {...s} /><polyline points="15 3 21 3 21 9" {...s} /><line x1="10" y1="14" x2="21" y2="3" {...s} /></>,
    figma: <><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" {...s} /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" {...s} /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" {...s} /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" {...s} /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" {...s} /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" {...s} /><circle cx="8.5" cy="8.5" r="1.5" {...s} /><polyline points="21 15 16 10 5 21" {...s} /></>,
    globe: <><circle cx="12" cy="12" r="10" {...s} /><line x1="2" y1="12" x2="22" y2="12" {...s} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" {...s} /></>,
    flask: <><path d="M9 3h6" {...s} /><path d="M10 3v6.5L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 9.5V3" {...s} /></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" {...s} /><rect x="9" y="9" width="6" height="6" {...s} /><line x1="9" y1="1" x2="9" y2="4" {...s} /><line x1="15" y1="1" x2="15" y2="4" {...s} /><line x1="9" y1="20" x2="9" y2="23" {...s} /><line x1="15" y1="20" x2="15" y2="23" {...s} /><line x1="20" y1="9" x2="23" y2="9" {...s} /><line x1="20" y1="14" x2="23" y2="14" {...s} /><line x1="1" y1="9" x2="4" y2="9" {...s} /><line x1="1" y1="14" x2="4" y2="14" {...s} /></>,
    pen: <><path d="M12 20h9" {...s} /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" {...s} /></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" {...s} /><polygon points="22 2 15 22 11 13 2 9 22 2" {...s} /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" {...s} /><line x1="5" y1="12" x2="19" y2="12" {...s} /></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...s} /></>,
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      {paths[name] || null}
    </svg>
  );
}

// -- Widget header with clean SVG icon --
export function WidgetHeader({
  icon,
  title,
  iconColor = teal,
  right,
  showControls = false,
}: {
  icon: string;
  title: string;
  iconColor?: string;
  right?: ReactNode;
  showControls?: boolean;
}) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
      <div className="flex items-center gap-1.5">
        <Icon name={icon} size={13} color={iconColor} strokeWidth={1.6} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
          }}
        >
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {right}
        {showControls && (
          <div className="flex items-center gap-1.5">
            <span style={{ cursor: "pointer", opacity: 0.3, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}>
              <Icon name="chevronUp" size={12} color="white" />
            </span>
            <span style={{ cursor: "pointer", opacity: 0.3, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}>
              <Icon name="x" size={12} color="white" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// -- State label --
export function StateLabel({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        fontSize: 10,
        color: active ? teal : "rgba(255,255,255,0.35)",
        fontFamily: mono,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </span>
  );
}

// -- Status dot with optional animation --
export function StatusDot({
  color,
  size = 6,
  pulsing = false,
  glow = false,
}: {
  color: string;
  size?: number;
  pulsing?: boolean;
  glow?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pulsing || !ref.current) return;
    const anim = pulseLoop(ref.current);
    return () => { anim?.cancel(); };
  }, [pulsing]);

  return (
    <span
      ref={ref}
      className="inline-block rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: glow ? `0 0 8px ${color}` : undefined,
        flexShrink: 0,
      }}
    />
  );
}
