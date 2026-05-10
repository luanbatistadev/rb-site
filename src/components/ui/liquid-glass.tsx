type LiquidGlassProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "circle" | "pill" | "card";
  tint?: "light" | "dark";
  size?: number;
};

export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0"
      style={{ position: "absolute" }}
    >
      <defs>
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.05"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
            result="redChannel"
          />
          <feColorMatrix
            in="redChannel"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="redOnly"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="44"
            xChannelSelector="R"
            yChannelSelector="G"
            result="greenChannel"
          />
          <feColorMatrix
            in="greenChannel"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="greenOnly"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="48"
            xChannelSelector="R"
            yChannelSelector="G"
            result="blueChannel"
          />
          <feColorMatrix
            in="blueChannel"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blueOnly"
          />
          <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rg" />
          <feBlend in="rg" in2="blueOnly" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

export function LiquidGlass({
  children,
  className = "",
  variant = "circle",
  tint = "light",
}: LiquidGlassProps) {
  const shape =
    variant === "circle"
      ? "rounded-full"
      : variant === "pill"
      ? "rounded-full"
      : "rounded-2xl";

  const tintBg = tint === "light" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.18)";
  const innerHighlight =
    tint === "light"
      ? "inset 1px 1px 0 rgba(255,255,255,0.55), inset -1px -1px 0 rgba(255,255,255,0.10), inset 0 0 14px rgba(255,255,255,0.18)"
      : "inset 1px 1px 0 rgba(255,255,255,0.35), inset 0 0 12px rgba(255,255,255,0.10)";

  const clipPath =
    variant === "circle" ? "circle(50% at 50% 50%)" : undefined;

  return (
    <div
      className={`relative isolate ${shape} ${className}`}
      style={{
        clipPath,
        WebkitClipPath: clipPath,
        backdropFilter: "url(#liquid-glass) blur(8px) saturate(1.6) brightness(1.05)",
        WebkitBackdropFilter: "blur(12px) saturate(1.6) brightness(1.05)",
      }}
    >
      <div className="absolute inset-0 z-1" style={{ background: tintBg, borderRadius: "inherit" }} />
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{ borderRadius: "inherit", boxShadow: innerHighlight }}
      />
      <div className="relative z-3 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
