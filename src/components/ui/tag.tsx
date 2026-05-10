"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function Tag({ children, className = "", variant = "light" }: TagProps) {
  if (variant === "dark") {
    return (
      <motion.span
        variants={fadeInUp}
        className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4.5 py-1.5 text-base leading-[1.2] text-subtitle-white ${className}`}
        style={{
          clipPath: "inset(0 round 9999px)",
          WebkitClipPath: "inset(0 round 9999px)",
          backdropFilter: "url(#liquid-glass) blur(8px) saturate(1.5)",
          WebkitBackdropFilter: "blur(10px) saturate(1.5)",
        }}
      >
        &lt;/&gt; {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={fadeInUp}
      className={`inline-flex items-center rounded-full border border-[#e7e7e7] bg-white px-4.5 py-1.5 text-base leading-[1.2] text-muted ${className}`}
    >
      &lt;/&gt; {children}
    </motion.span>
  );
}
