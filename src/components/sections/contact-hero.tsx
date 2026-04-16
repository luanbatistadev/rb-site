"use client";

import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerFast, fadeInUp } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";

type ContactHeroProps = {
  dict: {
    title: string;
    subtitle: string;
  };
};

export function ContactHero({ dict }: ContactHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
  const heroPadding = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  return (
    <motion.div style={{ padding: heroPadding }}>
      <ViewTransition name="hero-bg">
      <motion.section
        ref={heroRef}
        className="relative overflow-hidden bg-[#0b0b0b]"
        style={{ borderRadius }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY, opacity: backgroundOpacity }}
        >
          {bgSrc && (
            <img
              src={bgSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 pt-40 pb-24">
          <motion.div
            className="mx-auto flex max-w-300 flex-col items-center gap-4 px-6 text-center"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Tag variant="dark">Contato</Tag>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-[854px] text-[48px] font-semibold leading-[1.2] tracking-[-0.48px] text-white"
            >
              {dict.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-[18px] leading-[1.4] text-white/70"
            >
              {dict.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
      </ViewTransition>
    </motion.div>
  );
}
