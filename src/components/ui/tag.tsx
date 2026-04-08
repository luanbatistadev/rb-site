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
        className={`inline-flex items-center text-lg text-subtitle-white ${className}`}
      >
        &lt;/&gt; {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={fadeInUp}
      className={`inline-flex items-center rounded-full border border-[#e7e7e7] bg-white px-[18px] py-1.5 text-base leading-[1.2] text-muted ${className}`}
    >
      &lt;/&gt; {children}
    </motion.span>
  );
}
