"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
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
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section data-testid="cta" className="bg-background px-6 pb-20 pt-10">
      <div
        ref={cardRef}
        className="relative mx-auto max-w-300 overflow-hidden rounded-xl"
      >
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={bgSrc || undefined}
            alt=""
            className={`h-full w-full object-cover ${bgSrc ? "animate-fade-in" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-[#0b0b0b]/80" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col items-center px-8 py-15 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeInUp} className="flex w-40 h-11 items-center gap-2">
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

          <motion.h2
            variants={fadeInUp}
            className="mt-6 text-[48px] font-medium leading-[1.2] tracking-[-0.48px] text-white max-w-228"
          >
            {dict.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-171 text-[18px] font-light leading-[1.4] text-[#eaeaea]"
          >
            {dict.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href={`/${locale}/contato`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white/5 pl-8 pr-1 text-[18px] font-semibold text-white"
            >
              {dict.button}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7]">
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
