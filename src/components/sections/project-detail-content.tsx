"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

const technologies = [
  {
    name: "Swift",
    render: () => (
      <span className="flex items-center gap-2 text-xl font-bold select-none">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M27.2 22.4c.1-.5.2-1 .2-1.6 0-3.2-1.8-6.8-5-10 1.4 2.4 2.2 5 2 7.4-3.4-2.4-6.6-5.4-9.2-8.8 2 2.8 4.4 5.2 7 7.2-2.2-1-5.6-4-8.2-7 1.8 2.8 4 5.2 6.4 7.2-3-1.4-6.8-4.6-9-7.4.4.6.8 1.2 1.4 1.8 2.8 3.4 6.2 6.4 10 8.4-1.8 1.8-4.4 2.8-7.2 2.6 4.2 2 9 2 12.6-.2.2-.2.4-.2.6-.4 1-.6 1.8-1.6 2-2.8.2-.8-.2-1.6-.6-2.4z"
            fill="#F05138"
          />
        </svg>
        <span style={{ color: "#F05138" }}>Swift</span>
      </span>
    ),
  },
  {
    name: "Flutter",
    render: () => (
      <span className="flex items-center gap-2 text-xl font-bold select-none">
        <svg
          width="24"
          height="28"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 0L0 16l5 5L21 5h-5z" fill="#42A5F5" />
          <path d="M16 16L5 27l5 5L26 16h-5z" fill="#42A5F5" />
          <path d="M5 27l5.5-5.5L16 27l-5.5 5z" fill="#0D47A1" />
        </svg>
        <span style={{ color: "#027DFD" }}>Flutter</span>
      </span>
    ),
  },
  {
    name: "Next.js",
    render: () => (
      <span className="flex items-center gap-2 text-xl font-extrabold tracking-tight select-none">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="15" fill="#000" />
          <path
            d="M21.5 22V10h-1.2v10.2L12.4 10H11v12h1.2V11.6l8.3 10.8z"
            fill="#fff"
          />
        </svg>
        <span className="text-black">NEXT.js</span>
      </span>
    ),
  },
  {
    name: "Kotlin",
    render: () => (
      <span className="flex items-center gap-2 text-xl font-bold select-none">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="kotlin-detail-grad"
              x1="0"
              y1="0"
              x2="32"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
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
  {
    name: "Node.js",
    render: () => (
      <span className="flex items-center gap-2 text-xl font-bold select-none">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 1.6L3.2 9v12.8L16 30.4l12.8-8.8V9L16 1.6z"
            fill="#339933"
          />
          <path
            d="M16 8v16l-6.4-4V12L16 8z"
            fill="#fff"
            fillOpacity="0.3"
          />
        </svg>
        <span style={{ color: "#339933" }}>node.js</span>
      </span>
    ),
  },
];

type ProjectDetailContentProps = {
  project: {
    id: string;
    name: string;
    platforms: string[];
    description: Record<string, string>;
    image: string;
    gallery: string[];
  };
  description: string;
};

function ProjectPlaceholderImage({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #ede9fe 50%, #fae8ff 75%, #fce7f3 100%)",
      }}
    />
  );
}

export function ProjectDetailContent({
  project,
  description,
}: ProjectDetailContentProps) {
  return (
    <main className="bg-background">
      <section className="pt-32 pb-[60px]">
        <motion.div
          className="mx-auto max-w-[1200px] px-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/60"
              >
                &lt;/&gt; {project.name}
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-[48px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#121212] uppercase text-center"
              >
                {project.name}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-[628px] text-center text-[18px] font-normal leading-[1.5] text-[#8e8e93]"
              >
                {description}
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="flex w-full flex-col gap-10">
              <ProjectPlaceholderImage className="w-full h-[489px]" />

              <div className="flex w-full items-center justify-between h-[42px]">
                {technologies.map((tech) => (
                  <div key={tech.name}>{tech.render()}</div>
                ))}
              </div>

              <div className="flex w-full flex-col gap-6 sm:flex-row">
                <ProjectPlaceholderImage className="flex-1 h-[489px]" />
                <ProjectPlaceholderImage className="flex-1 h-[489px]" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
