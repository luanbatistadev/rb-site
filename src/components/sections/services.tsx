"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";
import { Card } from "@/components/ui/card";

type ServicesProps = {
  dict: {
    title: string;
    subtitle: string;
    mobile: { title: string; description: string };
    web: { title: string; description: string };
    ux: { title: string; description: string };
  };
};

const services = [
  {
    key: "mobile" as const,
    logos: [
      { src: "/apple_logo.svg", alt: "Apple" },
      { src: "/android_logo.svg", alt: "Android" },
      { src: "/swift_logo.svg", alt: "Swift" },
      { src: "/kotlin_logo.svg", alt: "Kotlin" },
      { src: "/flutter_logo.svg", alt: "Flutter" },
    ],
  },
  {
    key: "web" as const,
    logos: [
      { src: "/next_logo.svg", alt: "Next.js" },
      { src: "/js_logo.svg", alt: "JavaScript" },
    ],
  },
  {
    key: "ux" as const,
    logos: [
      { src: "/figma_logo.svg", alt: "Figma" },
      { src: "/notion_logo.svg", alt: "Notion" },
    ],
  },
];

const codeLines = [
  { indent: 0, color: "text-purple-400", content: "import", extra: " { createApp } from ", extraColor: "text-emerald-400", trail: "'@rb/core'" },
  { indent: 0, color: "text-purple-400", content: "import", extra: " { analytics } from ", extraColor: "text-emerald-400", trail: "'@rb/analytics'" },
  { indent: 0, color: "text-muted/40", content: "" },
  { indent: 0, color: "text-blue-400", content: "const", extra: " app = ", extraColor: "text-foreground/60", trail: "createApp({" },
  { indent: 1, color: "text-foreground/60", content: "name: ", extra: "'rb-site'", extraColor: "text-emerald-400", trail: "," },
  { indent: 1, color: "text-foreground/60", content: "version: ", extra: "'2.0.0'", extraColor: "text-emerald-400", trail: "," },
  { indent: 1, color: "text-foreground/60", content: "plugins: ", extra: "[analytics()]", extraColor: "text-yellow-300", trail: "," },
  { indent: 0, color: "text-foreground/60", content: "})", extra: "", extraColor: "", trail: "" },
  { indent: 0, color: "text-muted/40", content: "" },
  { indent: 0, color: "text-blue-400", content: "export default", extra: " app", extraColor: "text-foreground/60", trail: "" },
];

export function Services({ dict }: ServicesProps) {
  return (
    <section id="servicos" data-testid="services" className="bg-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-300 px-6 py-15"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-center text-[36px] font-semibold leading-[1.4] tracking-[-0.36px] text-foreground"
        >
          {dict.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-1 max-w-2xl text-center text-[18px] leading-[1.2] text-muted"
        >
          {dict.subtitle}
        </motion.p>

        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3">
          {services.map((service) => (
            <motion.div key={service.key} variants={fadeInUp}>
              <Card className="h-full">
                <div className="mb-4 flex items-center -space-x-1.5">
                  {service.logos.map((logo) => (
                    <span
                      key={logo.alt}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                  ))}
                </div>

                <h3 className="text-[18px] font-semibold leading-[1.2] text-foreground">
                  {dict[service.key].title}
                </h3>

                <p className="mt-2 text-base leading-[1.2] tracking-[0.16px] text-muted">
                  {dict[service.key].description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12">
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a] h-105.5">
            <div className="flex items-center gap-2 border-b border-white/6 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-xs text-white/30 font-mono">app.ts</span>
            </div>

            <div className="px-5 py-4 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className="flex" style={{ paddingLeft: line.indent * 24 }}>
                  <span className="mr-4 inline-block w-5 text-right text-white/20 select-none text-xs">
                    {i + 1}
                  </span>
                  {line.content ? (
                    <span>
                      <span className={line.color}>{line.content}</span>
                      {line.extra && (
                        <span className={line.extraColor}>{line.extra}</span>
                      )}
                      {line.trail && (
                        <span className="text-emerald-400">{line.trail}</span>
                      )}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
