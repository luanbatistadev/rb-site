"use client";

import { motion } from "framer-motion";
import { cardHover, scaleIn, viewportOnce } from "@/lib/animations";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function Card({ children, className = "", dark = false }: CardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={cardHover}
      className={`rounded-2xl border p-6 transition-shadow ${
        dark
          ? "border-white/[0.06] bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white"
          : "border-foreground/5 bg-white shadow-sm"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
