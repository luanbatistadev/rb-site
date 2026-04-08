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
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";

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
  }>;
  locale: string;
};

const platformConfig: Record<
  string,
  { color: string; label: string; icon: React.ReactNode }
> = {
  apple: {
    color: "#6b7280",
    label: "Apple",
    icon: (
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    ),
  },
  android: {
    color: "#22c55e",
    label: "Android",
    icon: (
      <>
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86a.633.633 0 00-.83.22l-1.88 3.24a11.463 11.463 0 00-8.92 0L5.66 5.66c-.16-.31-.55-.44-.83-.22-.31.17-.43.55-.27.86L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
      </>
    ),
  },
  kotlin: {
    color: "#a855f7",
    label: "Kotlin",
    icon: (
      <path d="M2 2h20L12 12l10 10H2z" />
    ),
  },
  swift: {
    color: "#f97316",
    label: "Swift",
    icon: (
      <path d="M21.985 14.187c.054-.186.1-.373.138-.562.037-.186.066-.374.088-.564a8.47 8.47 0 00-.3-3.325 8.037 8.037 0 00-1.465-2.724A9.15 9.15 0 0018.03 5.1a13.745 13.745 0 00-2.085-1.213c1.747 1.812 2.735 3.96 2.735 3.96s-1.556-1.88-4.08-3.625a18.94 18.94 0 01-.876-.625c-.074-.06-.13-.105-.186-.155a5.62 5.62 0 01-.075-.064l.03.03c2.22 3.212 1.2 6.66 1.2 6.66a8.663 8.663 0 00-2.655-4.315 8.493 8.493 0 00-1.654-1.215c.495 1.068.495 2.055.495 2.055s-.894-1.836-3.065-3.455c-1.156-.864-1.916-2.158-2.16-2.595-.014-.026-.024-.046-.03-.058a10.073 10.073 0 00.87 3.69 14.088 14.088 0 005.12 5.93 12.097 12.097 0 01-4.875-1.98l.06.045a10.073 10.073 0 006.88 3.406c3.27.39 6.49-1.01 8.01-3.795.126-.155.23-.32.33-.495a4.86 4.86 0 00.33-1.28c.133-.825.09-1.672-.14-2.475z" />
    ),
  },
  flutter: {
    color: "#3b82f6",
    label: "Flutter",
    icon: (
      <path d="M14.314 0L3.098 11.216l3.228 3.228L19.694 1.27h-5.38zM14.314 11.9l-5.26 5.26 3.228 3.228 2.032-2.032 5.26-5.26h-5.26z" />
    ),
  },
  web: {
    color: "#171717",
    label: "Web",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
};

function PlatformIcon({ platform }: { platform: string }) {
  const config = platformConfig[platform.toLowerCase()];

  if (!config) {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)] text-2xs font-bold text-white"
        style={{ backgroundColor: "#6b7280" }}
        title={platform}
      >
        {platform.charAt(0).toUpperCase()}
      </span>
    );
  }

  if (platform.toLowerCase() === "web") {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
        style={{ color: config.color }}
        title={config.label}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          {config.icon}
        </svg>
      </span>
    );
  }

  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
      title={config.label}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={config.color}
      >
        {config.icon}
      </svg>
    </span>
  );
}

function ProjectImage({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className="bg-[#f9fffc] border border-[#ececec] rounded-lg overflow-hidden h-121.25">
      <motion.div
        className="relative w-full h-full shadow-[-14px_13px_13.4px_0px_rgba(0,0,0,0.1)]"
        style={{ y, perspective: 1000, rotateY: -5, scaleY: 0.9, skewX: 26.05 }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #ede9fe 50%, #fae8ff 75%, #fce7f3 100%)",
            }}
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
    <section id="projetos" data-testid="projects" className="bg-foreground/2 py-15 px-6">
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
            className="mt-6 text-[36px] font-semibold leading-[1.4] tracking-[-0.36px] text-foreground"
          >
            {dict.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-2xl text-muted"
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
                  <Button
                    href={`/${locale}/projetos/${project.id}`}
                    variant="primary"
                    size="md"
                    icon={<ArrowIcon />}
                  >
                    {dict.viewMore}
                  </Button>
                </div>
              </div>
            );

            const imageContent = (
              <ProjectImage image={project.image} name={project.name} />
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
                  {isOdd ? (
                    <>
                      {textContent}
                      {imageContent}
                    </>
                  ) : (
                    <>
                      <div className="order-2 md:order-1">{imageContent}</div>
                      <div className="order-1 md:order-2">{textContent}</div>
                    </>
                  )}
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
