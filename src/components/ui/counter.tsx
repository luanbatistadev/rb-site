"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type CounterProps = {
  value: string;
  label: string;
};

function parseTarget(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function Counter({ value, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const parsed = parseTarget(value);
    if (!parsed) {
      setDisplay(value);
      return;
    }

    const { num, suffix } = parsed;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += num / steps;
      if (current >= num) {
        current = num;
        clearInterval(interval);
      }
      setDisplay(`${Math.round(current)}${suffix}`);
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/5 bg-foreground/[0.02] px-8 py-10"
    >
      <span className="text-5xl font-bold tracking-tight">{display}</span>
      <span className="text-sm text-muted">{label}</span>
    </motion.div>
  );
}
