"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerFast, fadeInUp } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";

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
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

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
        {bgSrc && (
          <img
            src={bgSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          />
        )}
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
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
            className="mt-8 text-center text-4xl font-medium uppercase text-white sm:text-6xl lg:text-7xl lg:leading-tight lg:tracking-tight xl:text-8xl"
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

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
          >
            <Link
              href={`/${locale}/contato`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 py-2 pl-8 pr-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/8 hover:border-white/15"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-white">
                {dict.cta}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatarGradients.map((gradient, i) => (
                  <div
                    key={i}
                    className={`h-10 w-10 rounded-full bg-linear-to-br ${gradient} ring-2 ring-[#0a0a0a]`}
                    style={{ zIndex: avatarGradients.length - i }}
                  />
                ))}
              </div>
              <span className="text-sm text-white/40">
                +50<br />clientes
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
