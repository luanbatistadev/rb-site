"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { CodeEditorPreview } from "@/components/sections/code-editor-preview";

type ServicesProps = {
  dict: {
    title: string;
    subtitle: string;
    mobile: { title: string; description: string };
    web: { title: string; description: string };
    ux: { title: string; description: string };
    codePreview: {
      tag: string;
      titleLine1: string;
      titleLine2: string;
      subtitle: string;
      button: string;
    };
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
          <CodeEditorPreview dict={dict.codePreview} />
        </motion.div>
      </motion.div>
    </section>
  );
}
