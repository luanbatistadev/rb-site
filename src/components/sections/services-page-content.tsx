"use client";

import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { staggerContainer, staggerFast, fadeInUp, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import Link from "next/link";

type ServicesPageDict = {
  tag: string;
  title: string;
  subtitle: string;
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  viewMore: string;
  cards: {
    software: { title: string; description: string };
    consulting: { title: string; description: string };
    legacy: { title: string; description: string };
    maintenance: { title: string; description: string };
  };
};

type ServicesPageContentProps = {
  dict: ServicesPageDict;
  locale: string;
};

type ServiceLogo = { src: string; alt: string };

const serviceLogos: Record<keyof ServicesPageDict["cards"], ServiceLogo[]> = {
  software: [
    { src: "/apple_logo.svg", alt: "Apple" },
    { src: "/android_logo.svg", alt: "Android" },
    { src: "/swift_logo.svg", alt: "Swift" },
    { src: "/kotlin_logo.svg", alt: "Kotlin" },
    { src: "/flutter_logo.svg", alt: "Flutter" },
    { src: "/next_logo.svg", alt: "Next.js" },
  ],
  consulting: [
    { src: "/next_logo.svg", alt: "Next.js" },
    { src: "/js_logo.svg", alt: "JavaScript" },
  ],
  legacy: [
    { src: "/apple_logo.svg", alt: "Apple" },
    { src: "/android_logo.svg", alt: "Android" },
    { src: "/swift_logo.svg", alt: "Swift" },
    { src: "/kotlin_logo.svg", alt: "Kotlin" },
    { src: "/flutter_logo.svg", alt: "Flutter" },
  ],
  maintenance: [
    { src: "/next_logo.svg", alt: "Next.js" },
    { src: "/js_logo.svg", alt: "JavaScript" },
  ],
};

const serviceKeys: Array<keyof ServicesPageDict["cards"]> = [
  "software",
  "consulting",
  "legacy",
  "maintenance",
];

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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
  );
}

function DesktopIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="28" height="36" viewBox="0 0 18 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="2" width="12" height="20" rx="2.5" />
      <path d="M8 18h2" />
    </svg>
  );
}

function GlassDeviceCircles() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center gap-4">
      <LiquidGlass variant="circle" className="h-26 w-26">
        <DesktopIcon />
      </LiquidGlass>
      <LiquidGlass variant="circle" className="h-26 w-26">
        <MobileIcon />
      </LiquidGlass>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  logos,
  viewMore,
  locale,
}: {
  title: string;
  description: string;
  logos: ServiceLogo[];
  viewMore: string;
  locale: string;
}) {
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
    setBgSrc(pickRandomBg());
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col justify-between rounded-xl bg-white p-8 gap-6"
    >
      <div className="flex flex-col gap-6">
        <div className="relative h-88.25 w-full overflow-hidden rounded-lg bg-[#0b0b0b]">
          {bgSrc && (
            <Image
              src={bgSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover animate-fade-in"
            />
          )}
          <GlassDeviceCircles />
        </div>

        <div className="flex items-center -space-x-1.5">
          {logos.map((logo) => (
            <span
              key={logo.alt}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
            >
              <Image src={logo.src} alt={logo.alt} width={16} height={16} className="h-4 w-4 object-contain" />
            </span>
          ))}
        </div>

        <h3 className="text-[24px] font-semibold leading-[1.2] text-[#121212]">
          {title}
        </h3>

        <p className="text-[18px] leading-[1.2] tracking-[0.18px] text-[#8e8e93]">
          {description}
        </p>
      </div>

      <Link
        href={`/${locale}/contato`}
        className="group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-[#121212] pl-8 pr-1 text-[18px] font-semibold text-white transition-all duration-200 hover:bg-[#2a2a2a]"
      >
        {viewMore}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7] transition-transform duration-200 group-hover:scale-110">
          <ArrowIcon />
        </span>
      </Link>
    </motion.div>
  );
}

export function ServicesPageContent({ dict, locale }: ServicesPageContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
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
    <>
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
              <Image
                src={bgSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center animate-fade-in"
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="relative z-10 pt-40 pb-56">
            <motion.div
              className="mx-auto flex max-w-300 flex-col items-center gap-4 px-6 text-center"
              variants={staggerFast}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <Tag variant="dark">{dict.tag}</Tag>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="max-w-[854px] text-[48px] font-semibold uppercase leading-[1.2] tracking-[-0.48px] text-white"
              >
                {dict.title}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-[684px] text-[18px] leading-[1.2] text-white"
              >
                {dict.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
        </ViewTransition>
      </motion.div>

      <section className="bg-background px-6 py-15">
        <motion.div
          className="mx-auto max-w-300"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex flex-col items-center text-center">
            <Tag>{dict.sectionTag}</Tag>

            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-[36px] font-semibold leading-[1.4] tracking-[-0.36px] text-foreground"
            >
              {dict.sectionTitle}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-[654px] text-[18px] leading-[1.4] text-muted"
            >
              {dict.sectionSubtitle}
            </motion.p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {serviceKeys.map((key) => (
              <ServiceCard
                key={key}
                title={dict.cards[key].title}
                description={dict.cards[key].description}
                logos={serviceLogos[key]}
                viewMore={dict.viewMore}
                locale={locale}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
