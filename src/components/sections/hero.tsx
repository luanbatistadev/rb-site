"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerFast, fadeInUp } from "@/lib/animations";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";

type HeroProps = {
  dict: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
  };
  locale: string;
};

const avatarGradients = [
  "from-emerald-400 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-indigo-500",
];

export function Hero({ dict, locale }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          opacity: backgroundOpacity,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 30% 50%, rgba(139, 92, 246, 0.18) 0%, transparent 55%),
              radial-gradient(ellipse 50% 50% at 70% 60%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 90% 40% at 50% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle 600px at 35% 35%, rgba(96, 165, 250, 0.12) 0%, transparent 50%),
              radial-gradient(circle 500px at 65% 55%, rgba(168, 85, 247, 0.14) 0%, transparent 45%),
              radial-gradient(circle 400px at 50% 45%, rgba(45, 212, 191, 0.1) 0%, transparent 40%),
              radial-gradient(circle 300px at 45% 60%, rgba(129, 140, 248, 0.08) 0%, transparent 35%)
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 40% 35% at 48% 45%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 35% 30% at 52% 48%, rgba(139, 92, 246, 0.15) 0%, transparent 45%)
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              conic-gradient(from 180deg at 50% 50%, rgba(59, 130, 246, 0.03) 0deg, rgba(139, 92, 246, 0.05) 60deg, rgba(20, 184, 166, 0.03) 120deg, rgba(99, 102, 241, 0.04) 180deg, rgba(168, 85, 247, 0.03) 240deg, rgba(45, 212, 191, 0.05) 300deg, rgba(59, 130, 246, 0.03) 360deg)
            `,
          }}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          variants={staggerFast}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Tag>{dict.tag}</Tag>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-8 text-center text-4xl font-medium uppercase text-white sm:text-6xl lg:text-[80px] lg:leading-[1.2] lg:tracking-[-0.01em] xl:text-[96px]"
          >
            {dict.titleLine1}
            <br />
            <span className="whitespace-nowrap">{dict.titleLine2}</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            {dict.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            <Button
              href={`/${locale}#contato`}
              variant="primary"
              size="lg"
              magnetic
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              }
            >
              {dict.cta}
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {avatarGradients.map((gradient, i) => (
                <div
                  key={i}
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-[#0a0a0a]`}
                  style={{ zIndex: avatarGradients.length - i }}
                />
              ))}
            </div>
            <span className="text-sm text-white/50">
              +50 projetos entregues
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
