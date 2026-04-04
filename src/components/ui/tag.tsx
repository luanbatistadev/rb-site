"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className = "" }: TagProps) {
  return (
    <motion.span
      variants={fadeInUp}
      className={`inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-4 py-1.5 text-xs font-medium tracking-wide text-muted ${className}`}
    >
      <span className="text-accent">✦</span>
      {children}
    </motion.span>
  );
}
