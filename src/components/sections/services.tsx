"use client";

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
    icons: [
      { color: "bg-blue-500", shape: "rounded-full" },
      { color: "bg-cyan-400", shape: "rounded-full" },
      { color: "bg-indigo-500", shape: "rounded-sm" },
      { color: "bg-violet-400", shape: "rounded-full" },
    ],
  },
  {
    key: "web" as const,
    icons: [
      { color: "bg-accent", shape: "rounded-sm" },
      { color: "bg-yellow-400", shape: "rounded-full" },
      { color: "bg-orange-500", shape: "rounded-sm" },
      { color: "bg-rose-400", shape: "rounded-full" },
    ],
  },
  {
    key: "ux" as const,
    icons: [
      { color: "bg-pink-500", shape: "rounded-full" },
      { color: "bg-purple-400", shape: "rounded-sm" },
      { color: "bg-fuchsia-500", shape: "rounded-full" },
      { color: "bg-teal-400", shape: "rounded-sm" },
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
    <section id="servicos" className="bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-center text-4xl font-bold tracking-tight text-foreground"
        >
          {dict.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-2xl text-center text-muted"
        >
          {dict.subtitle}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <motion.div key={service.key} variants={fadeInUp}>
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  {service.icons.map((icon, i) => (
                    <span
                      key={i}
                      className={`inline-block h-3 w-3 ${icon.color} ${icon.shape}`}
                    />
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {dict[service.key].title}
                </h3>

                <p className="mt-2 text-sm text-muted">
                  {dict[service.key].description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] aspect-video">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
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
