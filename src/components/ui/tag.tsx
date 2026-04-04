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
      className={`inline-flex items-center gap-2 text-[18px] font-normal leading-[1.4] text-white/50 ${className}`}
    >
      <span>&lt;/&gt;</span>
      {children}
    </motion.span>
  );
}
