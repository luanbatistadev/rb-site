"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: React.ReactNode;
};

const MAGNETIC_STRENGTH = 0.3;

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  magnetic = false,
  onClick,
  type = "button",
  className = "",
  icon,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 200, damping: 20 });
  const springY = useSpring(magnetY, { stiffness: 200, damping: 20 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      magnetX.set((e.clientX - centerX) * MAGNETIC_STRENGTH);
      magnetY.set((e.clientY - centerY) * MAGNETIC_STRENGTH);

      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [magnetic, magnetX, magnetY, glowX, glowY]
  );

  const handleMouseEnter = useCallback(() => {
    if (magnetic) setHovering(true);
  }, [magnetic]);

  const handleMouseLeave = useCallback(() => {
    if (!magnetic) return;
    setHovering(false);
    magnetX.set(0);
    magnetY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [magnetic, magnetX, magnetY, glowX, glowY]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !ref.current) {
        onClick?.();
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      });
      setTimeout(() => setRipple(null), 600);
      onClick?.();
    },
    [magnetic, onClick]
  );

  const glowXVal = useTransform(glowX, (v) => `${v}%`);
  const glowYVal = useTransform(glowY, (v) => `${v}%`);

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer overflow-hidden transition-colors";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    outline: "border border-foreground/10 text-foreground hover:bg-foreground/5",
    ghost: "text-foreground hover:bg-foreground/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Magnetic content (glow + ripple)
  const magneticOverlay = magnetic ? (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowXVal, glowYVal],
            ([x, y]) =>
              variant === "primary"
                ? `radial-gradient(circle 80px at ${x} ${y}, rgba(255,255,255,0.25), transparent)`
                : `radial-gradient(circle 80px at ${x} ${y}, rgba(255,255,255,0.08), transparent)`
          ),
          opacity: hovering ? 1 : 0,
        }}
      />
      {ripple && (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out_forwards]"
          style={{
            left: ripple.x - 5,
            top: ripple.y - 5,
            width: 10,
            height: 10,
          }}
        />
      )}
    </>
  ) : null;

  const content = (
    <>
      {magneticOverlay}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon && <span className="ml-1">{icon}</span>}
      </span>
    </>
  );

  // Non-magnetic: simple render
  if (!magnetic) {
    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }
    return (
      <button onClick={onClick} type={type} className={classes}>
        {content}
      </button>
    );
  }

  // Magnetic: wrapped in motion.div with spring physics
  if (href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <button onClick={handleClick} type={type} className={classes}>
        {content}
      </button>
    </motion.div>
  );
}
