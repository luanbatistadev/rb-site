"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { pickRandomBg, BG_PLACEHOLDER_STYLE } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";

type Locale = "pt-BR" | "en";

type LocalizedString = Record<string, string>;

type Metric = {
  value: string;
  label: LocalizedString;
};

type ProjectLinks = {
  appStore?: string;
  playStore?: string;
  web?: string;
};

type Project = {
  id: string;
  name: string;
  tagline?: LocalizedString;
  year?: string;
  client?: string;
  role?: LocalizedString;
  platforms: string[];
  description: LocalizedString;
  challenge?: LocalizedString;
  solution?: LocalizedString;
  metrics?: Metric[];
  links?: ProjectLinks;
  image: string;
  gallery: string[];
  bgColor?: string;
};

type Dict = {
  pageTag: string;
  challengeTitle: string;
  solutionTitle: string;
  impactTitle: string;
  galleryTitle: string;
  visitAppStore: string;
  visitPlayStore: string;
  visitWebsite: string;
  yearLabel: string;
  clientLabel: string;
  roleLabel: string;
};

type ProjectDetailContentProps = {
  project: Project;
  locale: Locale;
  dict: Dict;
};

type TechRenderer = () => React.ReactNode;

const technologies: Record<string, { name: string; render: TechRenderer }> = {
  swift: {
    name: "Swift",
    render: () => (
      <span className="flex items-center gap-3 text-3xl font-bold select-none">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M27.2 22.4c.1-.5.2-1 .2-1.6 0-3.2-1.8-6.8-5-10 1.4 2.4 2.2 5 2 7.4-3.4-2.4-6.6-5.4-9.2-8.8 2 2.8 4.4 5.2 7 7.2-2.2-1-5.6-4-8.2-7 1.8 2.8 4 5.2 6.4 7.2-3-1.4-6.8-4.6-9-7.4.4.6.8 1.2 1.4 1.8 2.8 3.4 6.2 6.4 10 8.4-1.8 1.8-4.4 2.8-7.2 2.6 4.2 2 9 2 12.6-.2.2-.2.4-.2.6-.4 1-.6 1.8-1.6 2-2.8.2-.8-.2-1.6-.6-2.4z"
            fill="#F05138"
          />
        </svg>
        <span style={{ color: "#F05138" }}>Swift</span>
      </span>
    ),
  },
  flutter: {
    name: "Flutter",
    render: () => (
      <span className="flex items-center gap-3 text-3xl font-bold select-none">
        <svg width="38" height="44" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 0L0 16l5 5L21 5h-5z" fill="#42A5F5" />
          <path d="M16 16L5 27l5 5L26 16h-5z" fill="#42A5F5" />
          <path d="M5 27l5.5-5.5L16 27l-5.5 5z" fill="#0D47A1" />
        </svg>
        <span style={{ color: "#027DFD" }}>Flutter</span>
      </span>
    ),
  },
  next: {
    name: "Next.js",
    render: () => (
      <span className="flex items-center gap-3 text-3xl font-extrabold tracking-tight select-none">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="#000" />
          <path d="M21.5 22V10h-1.2v10.2L12.4 10H11v12h1.2V11.6l8.3 10.8z" fill="#fff" />
        </svg>
        <span className="text-foreground">NEXT.js</span>
      </span>
    ),
  },
  kotlin: {
    name: "Kotlin",
    render: () => (
      <span className="flex items-center gap-3 text-3xl font-bold select-none">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="kotlin-detail-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7F52FF" />
              <stop offset="50%" stopColor="#C811E2" />
              <stop offset="100%" stopColor="#E54857" />
            </linearGradient>
          </defs>
          <path d="M0 32L16 16 32 32H0z" fill="url(#kotlin-detail-grad)" />
          <path d="M0 0h32L16 16 0 32V0z" fill="url(#kotlin-detail-grad)" />
        </svg>
        <span
          style={{
            background: "linear-gradient(135deg, #7F52FF, #C811E2, #E54857)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Kotlin
        </span>
      </span>
    ),
  },
  js: {
    name: "JavaScript",
    render: () => (
      <span className="flex items-center gap-3 text-3xl font-bold select-none">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#000">JS</text>
        </svg>
        <span style={{ color: "#000" }}>JavaScript</span>
      </span>
    ),
  },
};

function GlassLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-white/25"
      style={{
        clipPath: "inset(0 round 9999px)",
        WebkitClipPath: "inset(0 round 9999px)",
        backdropFilter: "url(#liquid-glass) blur(10px) saturate(1.5) brightness(1.05)",
        WebkitBackdropFilter: "blur(12px) saturate(1.5) brightness(1.05)",
        backgroundColor: "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </a>
  );
}

function ProjectHero({ project, locale, dict }: ProjectDetailContentProps) {
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

  const tagline = project.tagline?.[locale] ?? project.tagline?.["pt-BR"] ?? project.description[locale];
  const role = project.role?.[locale] ?? project.role?.["pt-BR"];

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
              sizes="100vw"
              className="object-cover object-center animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>

        <div className="relative z-10 pt-40 pb-32 px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-300 flex flex-col items-center text-center gap-5"
          >
            <motion.div variants={fadeInUp}>
              <Tag variant="dark">{project.name}</Tag>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-4xl text-[56px] font-semibold leading-[1.1] tracking-[-0.56px] text-white md:text-[72px]"
            >
              {project.name}
            </motion.h1>

            {tagline && (
              <motion.p
                variants={fadeInUp}
                className="max-w-2xl text-lg leading-[1.4] text-white/70"
              >
                {tagline}
              </motion.p>
            )}

            <motion.div variants={fadeInUp} className="mt-6 grid grid-cols-1 gap-4 text-left text-white/80 sm:grid-cols-3">
              {project.year && (
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-white/40">{dict.yearLabel}</span>
                  <span className="text-base font-medium">{project.year}</span>
                </div>
              )}
              {project.client && (
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-white/40">{dict.clientLabel}</span>
                  <span className="text-base font-medium">{project.client}</span>
                </div>
              )}
              {role && (
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-white/40">{dict.roleLabel}</span>
                  <span className="text-base font-medium">{role}</span>
                </div>
              )}
            </motion.div>

            {project.links && Object.keys(project.links).length > 0 && (
              <motion.div variants={fadeInUp} className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {project.links.appStore && (
                  <GlassLink href={project.links.appStore}>{dict.visitAppStore}</GlassLink>
                )}
                {project.links.playStore && (
                  <GlassLink href={project.links.playStore}>{dict.visitPlayStore}</GlassLink>
                )}
                {project.links.web && (
                  <GlassLink href={project.links.web}>{dict.visitWebsite}</GlassLink>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function TechRow({ platforms }: { platforms: string[] }) {
  const techs = platforms
    .map((p) => technologies[p.toLowerCase()])
    .filter((t): t is { name: string; render: TechRenderer } => Boolean(t));

  if (techs.length === 0) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-wrap items-center justify-around gap-x-10 gap-y-6 border-y border-foreground/10 py-6"
    >
      {techs.map((tech) => (
        <div key={tech.name}>{tech.render()}</div>
      ))}
    </motion.div>
  );
}

function ProjectImageBlock({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative overflow-hidden rounded-2xl h-105 md:h-150"
      style={project.bgColor ? { backgroundColor: project.bgColor } : { backgroundColor: "#f5f5f5" }}
    >
      <motion.div className="relative h-full w-full" style={{ y }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={project.bgColor ? "object-contain p-12" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </motion.div>
    </motion.div>
  );
}

function ChallengeSolution({ project, locale, dict }: { project: Project; locale: Locale; dict: Dict }) {
  const challenge = project.challenge?.[locale] ?? project.challenge?.["pt-BR"];
  const solution = project.solution?.[locale] ?? project.solution?.["pt-BR"];

  if (!challenge && !solution) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
    >
      {challenge && (
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wider text-foreground/40">01</span>
          <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-foreground">
            {dict.challengeTitle}
          </h2>
          <p className="text-[17px] leading-normal text-muted">{challenge}</p>
        </motion.div>
      )}
      {solution && (
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wider text-foreground/40">02</span>
          <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-foreground">
            {dict.solutionTitle}
          </h2>
          <p className="text-[17px] leading-normal text-muted">{solution}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

function MetricsBlock({ project, locale, dict }: { project: Project; locale: Locale; dict: Dict }) {
  if (!project.metrics?.length) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col gap-8"
    >
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-wider text-foreground/40">03</span>
        <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-foreground">
          {dict.impactTitle}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {project.metrics.map((metric, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="flex flex-col justify-center gap-2 rounded-2xl bg-white p-8"
          >
            <span className="bg-linear-to-br from-[#00b6aa] to-[#00a5e7] bg-clip-text text-[44px] font-semibold leading-none text-transparent">
              {metric.value}
            </span>
            <span className="text-base text-muted">
              {metric.label[locale] ?? metric.label["pt-BR"]}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectDetailContent({ project, locale, dict }: ProjectDetailContentProps) {
  return (
    <main className="bg-background">
      <ProjectHero project={project} locale={locale} dict={dict} />

      <section className="px-6 py-10">
        <div className="mx-auto max-w-300 flex flex-col gap-20">
          <TechRow platforms={project.platforms} />
          <ProjectImageBlock project={project} />
          <ChallengeSolution project={project} locale={locale} dict={dict} />
          <MetricsBlock project={project} locale={locale} dict={dict} />
        </div>
      </section>

      <ProjectsNavigation currentId={project.id} locale={locale} />
    </main>
  );
}

import projectsData from "@/data/projects.json";

function ProjectsNavigation({ currentId, locale }: { currentId: string; locale: Locale }) {
  const list = projectsData;
  const idx = list.findIndex((p) => p.id === currentId);
  const prev = idx > 0 ? list[idx - 1] : list[list.length - 1];
  const next = idx < list.length - 1 ? list[idx + 1] : list[0];

  return (
    <section className="border-t border-foreground/10 px-6 py-12">
      <div className="mx-auto max-w-300 grid grid-cols-2 gap-6">
        <Link
          href={`/${locale}/projetos/${prev.id}`}
          className="group flex flex-col gap-1 text-left"
        >
          <span className="text-xs uppercase tracking-wider text-foreground/40">←</span>
          <span className="text-[20px] font-semibold text-foreground transition-colors group-hover:text-accent">
            {prev.name}
          </span>
        </Link>
        <Link
          href={`/${locale}/projetos/${next.id}`}
          className="group flex flex-col gap-1 text-right"
        >
          <span className="text-xs uppercase tracking-wider text-foreground/40">→</span>
          <span className="text-[20px] font-semibold text-foreground transition-colors group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      </div>
    </section>
  );
}
