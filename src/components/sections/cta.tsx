"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import Link from "next/link";

type CtaProps = {
  dict: {
    title: string;
    subtitle: string;
    button: string;
  };
  locale: string;
};

export function Cta({ dict, locale }: CtaProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section className="bg-background px-6 py-16 lg:px-[120px]">
      <div
        ref={cardRef}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl"
      >
        {/* Background with 3D swirl effect */}
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 60% 50%, rgba(80, 60, 120, 0.5) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 30% 60%, rgba(40, 60, 100, 0.4) 0%, transparent 55%),
                radial-gradient(ellipse 50% 50% at 70% 40%, rgba(60, 80, 140, 0.3) 0%, transparent 50%),
                #0a0a0a
              `,
            }}
          />
          {/* Swirl overlay */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `
                conic-gradient(from 180deg at 50% 55%, transparent 0deg, rgba(100, 80, 140, 0.25) 80deg, transparent 160deg, rgba(60, 80, 120, 0.2) 240deg, transparent 360deg),
                radial-gradient(ellipse 40% 35% at 50% 50%, rgba(120, 100, 160, 0.15) 0%, transparent 60%)
              `,
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center px-8 py-20 text-center md:py-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Logo */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <img
              src="/logo-512.svg"
              alt="RB"
              width={36}
              height={36}
              className="brightness-0 invert opacity-70"
            />
            <span className="text-sm font-medium text-white/60">
              Computing Development.
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="mt-8 text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            {dict.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/60"
          >
            {dict.subtitle}
          </motion.p>

          {/* Button: text + circular accent arrow */}
          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href={`/${locale}/contato`}
              className="group inline-flex items-center gap-3 text-base font-medium text-white transition-colors hover:text-white/80"
            >
              {dict.button}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-110">
                <svg
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
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
