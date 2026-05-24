"use client";

import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { staggerFast, fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { pickRandomBg, BG_PLACEHOLDER_STYLE } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";
import type { LegalDocument, LegalBlock } from "@/data/legal/terms";

type LegalContentProps = {
  doc: LegalDocument;
};

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "p") {
    return (
      <p className="text-[16px] leading-[1.6] text-foreground/80">{block.text}</p>
    );
  }
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {block.items.map((item) => (
        <li key={item} className="list-disc text-[16px] leading-[1.6] text-foreground/80 marker:text-foreground/40">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalContent({ doc }: LegalContentProps) {
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
      <motion.div className="relative" style={{ padding: heroPadding }}>
        <ViewTransition name="hero-bg">
          <motion.section
            ref={heroRef}
            className="relative overflow-hidden bg-[#0b0b0b]"
            style={{ borderRadius }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ ...BG_PLACEHOLDER_STYLE, y: backgroundY, opacity: backgroundOpacity }}
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

            <div className="relative z-10 pt-40 pb-24">
              <motion.div
                className="mx-auto flex max-w-300 flex-col items-center gap-4 px-6 text-center"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp}>
                  <Tag variant="dark">{doc.tag}</Tag>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="max-w-213.5 text-[48px] font-semibold leading-[1.2] tracking-[-0.48px] text-white"
                >
                  {doc.title}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="max-w-2xl text-[18px] leading-[1.4] text-white/70"
                >
                  {doc.subtitle}
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="mt-2 text-sm text-white/50"
                >
                  {doc.lastUpdatedLabel}: {doc.lastUpdated}
                </motion.p>
              </motion.div>
            </div>
          </motion.section>
        </ViewTransition>
      </motion.div>

      <section className="bg-background px-6 py-20">
        <motion.div
          className="mx-auto max-w-200 rounded-xl bg-white p-8 md:p-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex flex-col gap-10">
            {doc.sections.map((section) => (
              <motion.div key={section.title} variants={fadeInUp} className="flex flex-col gap-3">
                <h2 className="text-[22px] font-semibold leading-[1.3] text-foreground">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.blocks.map((block, idx) => (
                    <Block key={idx} block={block} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
