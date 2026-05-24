"use client";

import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { staggerFast, fadeInUp } from "@/lib/animations";
import { pickRandomBg, BG_PLACEHOLDER_STYLE } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";
import projectsData from "@/data/projects.json";

type HeroProps = {
  dict: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    clients: string;
  };
};

const clientLogos: Array<{ src: string; fit: "cover" | "contain"; bg?: string }> = [
  { src: "/cimed_image.png", fit: "contain", bg: "#f5c518" },
  { src: "/tim_icon.svg", fit: "contain", bg: "#ffffff" },
  { src: "/carrefour_icon.svg", fit: "contain", bg: "#ffffff" },
  { src: "/denga_icon.png", fit: "cover" },
];

export function Hero({ dict }: HeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bgSrc, setBgSrc] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
    setBgSrc(pickRandomBg());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync initial value from media query (matches bgSrc pattern above)
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const backgroundRotateX = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.4, 0.55]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
  const padding = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  return (
    <motion.div
      ref={wrapperRef}
      data-testid="hero"
      id="inicio"
      className="relative"
      style={isMobile ? undefined : { padding }}
    >
      <ViewTransition name="hero-bg">
      <motion.section
        className="relative min-h-dvh overflow-hidden bg-[#0b0b0b] md:perspective-distant"
        style={isMobile ? { borderRadius: 12 } : { borderRadius }}
      >
        <motion.div
          className="absolute inset-0 origin-[center_70%] transform-gpu will-change-transform"
          style={{
            ...BG_PLACEHOLDER_STYLE,
            y: backgroundY,
            ...(isMobile ? {} : { opacity: backgroundOpacity, scale: backgroundScale, rotateX: backgroundRotateX }),
          }}
        >
          {bgSrc && (
            <Image
              src={bgSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {!isMobile && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen transform-gpu will-change-transform"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background:
                "radial-gradient(60% 50% at 30% 35%, rgba(120,90,255,0.5) 0%, transparent 60%), radial-gradient(50% 45% at 75% 65%, rgba(0,200,230,0.4) 0%, transparent 65%)",
            }}
          />
        )}

        <div className="relative z-10 flex min-h-dvh items-center justify-center px-6">
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
              className="mt-8 text-center text-[28px] font-medium uppercase leading-[1.2] text-white sm:text-6xl md:text-7xl lg:text-[96px] lg:tracking-[-0.96px]"
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
                href={"/contato"}
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
                <div className="flex -space-x-3">
                  {clientLogos.map((logo, i) => (
                    <span
                      key={logo.src}
                      className="relative h-12.5 w-12.5 overflow-hidden rounded-full ring-2 ring-[#0b0b0b]"
                      style={{ zIndex: clientLogos.length - i, backgroundColor: logo.bg ?? "#ffffff" }}
                    >
                      <Image
                        src={logo.src}
                        alt=""
                        fill
                        sizes="50px"
                        className={logo.fit === "contain" ? "object-contain p-1.5" : "object-cover"}
                      />
                    </span>
                  ))}
                </div>
                <span className="text-sm text-white/40">
                  +{projectsData.length}<br />{dict.clients}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      </ViewTransition>
    </motion.div>
  );
}
