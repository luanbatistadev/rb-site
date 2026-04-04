"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "blob" | "glass" | "none";

const VARIANT: CursorVariant = "none";

function SpotlightBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 60, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 30 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [role='button'], input, textarea, select")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-9999"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: hovering ? 200 : 120,
          height: hovering ? 200 : 120,
          opacity: hovering ? 0.12 : 0.07,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,140,255,0.6) 0%, rgba(100,140,255,0) 70%)",
          filter: "blur(30px)",
        }}
      />
    </motion.div>
  );
}

function GlassCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 250, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 250, damping: 25 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [role='button'], input, textarea, select")
      );
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-9999"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: hovering ? 48 : clicking ? 16 : 24,
          height: hovering ? 48 : clicking ? 16 : 24,
          borderRadius: "50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 2px 12px rgba(0,0,0,0.15), inset 0 0.5px 0 rgba(255,255,255,0.1)",
        }}
      />
    </motion.div>
  );
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!mounted || !hasPointer || VARIANT === "none") return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {VARIANT === "blob" && <SpotlightBlob />}
      {VARIANT === "glass" && <GlassCursor />}
    </>
  );
}
