import { useRef, useEffect } from "react";
import { WidgetCard, WidgetHeader, StateLabel, StatusDot, teal, green, mono } from "./WidgetCard";
import { staggerIn, cursorBlink } from "./anim";

type TermState = "collapsed" | "idle" | "streaming";

const termGreen = "#a0ff9b";

function TerminalInner({ state }: { state: TermState }) {
  const termRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (state === "collapsed" || !termRef.current) return;
    staggerIn(termRef.current, { stagger: 50, from: { opacity: 0, transform: "translateX(-4px)" } });
  }, [state]);

  useEffect(() => {
    if (state !== "idle" || !cursorRef.current) return;
    const anim = cursorBlink(cursorRef.current);
    return () => { anim?.cancel(); };
  }, [state]);

  return (
    <WidgetCard style={{ width: 440 }}>
      <WidgetHeader
        icon="terminal"
        iconColor="#A78BFA"
        title="TERMINAL"
        showControls
        right={<StatusDot color={green} />}
      />
      {state !== "collapsed" && (
        <div
          ref={termRef}
          style={{
            backgroundColor: "#0D1117",
            borderRadius: 6,
            padding: 10,
            fontFamily: mono,
            fontSize: 11,
            lineHeight: "18px",
          }}
        >
          {state === "idle" && (
            <>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>
                <span style={{ color: termGreen }}>✓</span> TypeScript compiled (2.1s)
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>
                <span style={{ color: termGreen }}>✓</span> Server started on :8787
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>Listening for connections...</div>
              <div style={{ marginTop: 4, opacity: 0 }}>
                <span style={{ color: teal }}>ronin $</span>
                <span
                  ref={cursorRef}
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 14,
                    backgroundColor: teal,
                    marginLeft: 4,
                    verticalAlign: "middle",
                  }}
                />
              </div>
            </>
          )}
          {state === "streaming" && (
            <>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>
                <span style={{ color: teal }}>$</span> npm run build
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>&gt; ronin-orchestrator@0.1.0 build</div>
              <div style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>&gt; tsc && node dist/server.mjs</div>
              <div style={{ color: termGreen, opacity: 0 }}>✓ TypeScript compiled (2.1s)</div>
              <div style={{ color: termGreen, opacity: 0 }}>✓ Server started on :8787</div>
              <div style={{ color: teal, opacity: 0 }}>● Listening for SSE connections...</div>
            </>
          )}
        </div>
      )}
    </WidgetCard>
  );
}

export function TerminalCardSection() {
  const states: TermState[] = ["collapsed", "idle", "streaming"];
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {states.map((s) => (
        <div key={s} className="flex flex-col gap-1.5 items-center">
          <StateLabel label={s} active={s === "streaming"} />
          <TerminalInner state={s} />
        </div>
      ))}
    </div>
  );
}
