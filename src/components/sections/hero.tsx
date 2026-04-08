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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
  const padding = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  return (
    <motion.div
      ref={wrapperRef}
      data-testid="hero"
      id="inicio"
      style={{ padding }}
    >
      <motion.section
        className="relative min-h-screen overflow-hidden bg-[#0b0b0b]"
        style={{ borderRadius }}
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
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Tag variant="dark">{dict.tag}</Tag>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-8 text-center text-4xl font-medium uppercase leading-[1.2] text-white sm:text-6xl md:text-7xl lg:text-[96px] lg:tracking-[-0.96px]"
            >
              {dict.titleLine1}
              <br />
              <span className="whitespace-nowrap">{dict.titleLine2}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-171 text-lg leading-[1.4] text-[#eaeaea] md:text-[18px]"
            >
              {dict.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
            >
              <Link
                href={`/${locale}/contato`}
                className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-8 pr-1 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/8"
              >
                <span className="text-sm font-medium uppercase tracking-wide text-white">
                  {dict.cta}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7] transition-transform duration-300 group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-5">
                  {avatarGradients.map((gradient, i) => (
                    <div
                      key={i}
                      className={`h-12.5 w-12.5 rounded-full bg-linear-to-br ${gradient} ring-2 ring-[#0b0b0b]`}
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
      </motion.section>
    </motion.div>
  );
}
