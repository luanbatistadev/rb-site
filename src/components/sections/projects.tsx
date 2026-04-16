"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

type ProjectsProps = {
  dict: {
    tag: string;
    title: string;
    subtitle: string;
    viewMore: string;
    viewAll: string;
  };
  projects: Array<{
    id: string;
    name: string;
    platforms: string[];
    description: Record<string, string>;
    image: string;
    bgColor?: string;
  }>;
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

function ProjectImage({
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

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden h-121.25" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <motion.div
        className="relative w-full h-full"
        style={{ y }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className={bgColor ? "object-contain p-8" : "object-cover"}
          />
        ) : (
          <div
            className="h-full w-full bg-foreground/3"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-3 opacity-40">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
                <span className="text-sm font-medium text-gray-400">
                  {name}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

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

export function Projects({ dict, projects, locale }: ProjectsProps) {
  return (
    <section id="projetos" data-testid="projects" className="bg-background py-15 px-6">
      <motion.div
        className="mx-auto max-w-300"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex flex-col items-center text-center">
          <Tag>{dict.tag}</Tag>

          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-[36px] font-semibold leading-[1.4] tracking-[-0.36px] text-foreground"
          >
            {dict.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-muted"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {projects.map((project, index) => {
            const isOdd = index % 2 === 0;
            const slideVariant = isOdd ? fadeInLeft : fadeInRight;

            const textContent = (
              <div className="flex flex-col justify-center gap-5">
                <div className="flex items-center -space-x-1.5">
                  {project.platforms.map((platform) => (
                    <PlatformIcon key={platform} platform={platform} />
                  ))}
                </div>

                <h3 className="text-[32px] font-semibold leading-[1.4] tracking-[-0.32px] text-foreground">
                  {project.name}
                </h3>

                <p className="text-xl leading-[1.3] text-muted">
                  {project.description[locale] ||
                    Object.values(project.description)[0]}
                </p>

                <div className="mt-2">
                  <Link
                    href={`/${locale}/projetos/${project.id}`}
                    className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#121212] py-1 pl-8 pr-1 text-[18px] font-semibold text-white transition-all duration-200 hover:bg-[#2a2a2a]"
                  >
                    {dict.viewMore}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7] transition-transform duration-200 group-hover:scale-110">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
            );

            const imageContent = (
              <ProjectImage image={project.image} name={project.name} bgColor={project.bgColor} />
            );

            return (
              <motion.div
                key={project.id}
                variants={slideVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="rounded-2xl bg-white pl-14.5 pr-6 py-6"
              >
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  {textContent}
                  {imageContent}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 flex justify-center"
        >
          <a
            href={`/${locale}/projetos`}
            className="text-[18px] font-semibold leading-[1.4] text-foreground underline"
          >
            {dict.viewAll}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
