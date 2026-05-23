"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { pickRandomBg, BG_PLACEHOLDER_STYLE } from "@/lib/background-images";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  platforms: string[];
  description: Record<string, string>;
  image: string;
  bgColor?: string;
};

type ProjectsPageContentProps = {
  dict: {
    tag: string;
    title: string;
    subtitle: string;
    sectionTag: string;
    viewMore: string;
  };
  projects: Project[];
  locale: string;
};

const svgLogos: Record<string, { src: string; alt: string }> = {
  apple: { src: "/apple_logo.svg", alt: "Apple" },
  android: { src: "/android_logo.svg", alt: "Android" },
  kotlin: { src: "/kotlin_logo.svg", alt: "Kotlin" },
  swift: { src: "/swift_logo.svg", alt: "Swift" },
  flutter: { src: "/flutter_logo.svg", alt: "Flutter" },
  figma: { src: "/figma_logo.svg", alt: "Figma" },
  js: { src: "/js_logo.svg", alt: "JavaScript" },
  next: { src: "/next_logo.svg", alt: "Next.js" },
  notion: { src: "/notion_logo.svg", alt: "Notion" },
};

function PlatformIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  const logo = svgLogos[key];

  if (logo) {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
        title={logo.alt}
      >
        <Image src={logo.src} alt={logo.alt} width={16} height={16} className="h-4 w-4 object-contain" />
      </span>
    );
  }

  if (key === "web") {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
        title="Web"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "#171717" }}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 12h20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)] text-2xs font-bold text-foreground/50"
      title={platform}
    >
      {platform.charAt(0).toUpperCase()}
    </span>
  );
}

function ProjectCardImage({
  image,
  name,
  bgColor,
}: {
  image: string;
  name: string;
  bgColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className="relative h-75 overflow-hidden rounded-xl"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <motion.div className="relative h-full w-full" style={{ y }}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={bgColor ? "object-contain p-8" : "object-cover"}
          />
        ) : (
          <div className="h-full w-full bg-foreground/3" />
        )}
      </motion.div>
    </div>
  );
}

function GradientArrow() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7] transition-transform duration-200 group-hover:scale-110">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </span>
  );
}

function PageHero({
  dict,
}: {
  dict: { tag: string; title: string; subtitle: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
    setBgSrc(pickRandomBg());
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
  const heroPadding = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  return (
    <motion.div className="relative" style={{ padding: heroPadding }}>
      <motion.section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#0b0b0b]"
        style={{ borderRadius }}
      >
        <motion.div className="absolute inset-0" style={{ ...BG_PLACEHOLDER_STYLE, y: backgroundY }}>
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

        <div className="relative z-10 pt-40 pb-56">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-300 flex-col items-center gap-4 px-6 text-center"
          >
            <motion.div variants={fadeInUp}>
              <Tag variant="dark">{dict.tag}</Tag>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-240 text-[48px] font-semibold uppercase leading-[1.2] tracking-[-0.48px] text-white"
            >
              {dict.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-157 text-[18px] leading-[1.2] text-white"
            >
              {dict.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function ProjectsPageContent({
  dict,
  projects,
  locale,
}: ProjectsPageContentProps) {
  return (
    <>
      <PageHero dict={dict} />

      <section className="bg-background px-6 py-15">
        <div className="mx-auto max-w-300">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeInUp}>
              <Tag>{dict.sectionTag}</Tag>
            </motion.div>

            <div className="mt-8 flex flex-col gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="w-full rounded-2xl bg-white p-12"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex flex-1 flex-col justify-center gap-5">
                      <div className="flex items-center -space-x-1.5">
                        {project.platforms.map((platform) => (
                          <PlatformIcon key={platform} platform={platform} />
                        ))}
                      </div>

                      <h2 className="text-[32px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212]">
                        {project.name}
                      </h2>

                      <p className="text-[20px] font-normal leading-[1.3] text-[#8e8e93]">
                        {project.description[locale] ||
                          Object.values(project.description)[0]}
                      </p>

                      <div>
                        <Link
                          href={`/projetos/${project.id}`}
                          className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#121212] pl-8 pr-1 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#2a2a2a]"
                        >
                          {dict.viewMore}
                          <GradientArrow />
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1">
                      <ProjectCardImage
                        image={project.image}
                        name={project.name}
                        bgColor={project.bgColor}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
