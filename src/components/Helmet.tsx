import svgPaths from "./svg-paths";

interface HelmetProps {
  size?: number;
  accentColor?: string;
  glowColor?: string;
  pulsing?: boolean;
}

export function Helmet({
  size = 32,
  accentColor = "#0DEEF3",
  glowColor,
  pulsing = false,
}: HelmetProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        filter: glowColor ? `drop-shadow(0 0 6px ${glowColor})` : undefined,
        animation: pulsing ? "helmetPulse 1.4s ease-in-out infinite" : undefined,
      }}
    >
      <svg
        viewBox="0 0 165.11 161.407"
        fill="none"
        width={size}
        height={size}
        style={{ display: "block" }}
      >
        <path d={svgPaths.p11b211f0} fill="white" stroke="black" />
        <path d={svgPaths.p1b6c7a80} fill={accentColor} stroke="black" />
        <path d={svgPaths.p1eb7b900} fill="#001635" />
        <path d={svgPaths.p32e9fc00} fill="#001635" />
        <path d={svgPaths.p1892c0c0} fill="#001635" />
        <path d={svgPaths.p1eb7b900} stroke="black" />
        <path d={svgPaths.p32e9fc00} stroke="black" />
        <path d={svgPaths.p1892c0c0} stroke="black" />
        <path d={svgPaths.p16e8fb00} fill={accentColor} stroke="black" />
        <path d={svgPaths.p3ab18700} fill={accentColor} stroke="black" />
      </svg>
    </div>
  );
}
