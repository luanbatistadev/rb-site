"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerFast, fadeInUp, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { Tag } from "@/components/ui/tag";
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

const serviceIcons: Record<
  keyof ServicesPageDict["cards"],
  Array<{ color: string; shape: string }>
> = {
  software: [
    { color: "bg-blue-500", shape: "rounded-full" },
    { color: "bg-cyan-400", shape: "rounded-full" },
    { color: "bg-indigo-500", shape: "rounded-sm" },
    { color: "bg-violet-400", shape: "rounded-full" },
  ],
  consulting: [
    { color: "bg-accent", shape: "rounded-sm" },
    { color: "bg-yellow-400", shape: "rounded-full" },
    { color: "bg-orange-500", shape: "rounded-sm" },
    { color: "bg-rose-400", shape: "rounded-full" },
  ],
  legacy: [
    { color: "bg-pink-500", shape: "rounded-full" },
    { color: "bg-purple-400", shape: "rounded-sm" },
    { color: "bg-fuchsia-500", shape: "rounded-full" },
    { color: "bg-teal-400", shape: "rounded-sm" },
  ],
  maintenance: [
    { color: "bg-emerald-500", shape: "rounded-full" },
    { color: "bg-sky-400", shape: "rounded-sm" },
    { color: "bg-green-400", shape: "rounded-full" },
    { color: "bg-lime-500", shape: "rounded-sm" },
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

function ServiceCard({
  title,
  description,
  icons,
  viewMore,
  locale,
}: {
  title: string;
  description: string;
  icons: Array<{ color: string; shape: string }>;
  viewMore: string;
  locale: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex h-[668px] flex-col justify-between rounded-xl bg-white p-8"
    >
      <div className="flex flex-col gap-6">
        <div className="h-[353px] w-full overflow-hidden rounded-lg bg-[#f0f0f0]" />

        <div className="flex items-center -space-x-1.5">
          {icons.map((icon, i) => (
            <span
              key={i}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[3px_1px_3.6px_0px_rgba(0,0,0,0.1)]"
              style={{ zIndex: icons.length - i }}
            >
              <span className={`h-3 w-3 ${icon.color} ${icon.shape}`} />
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
        className="group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-[#121212] pl-8 pr-1 text-[18px] font-semibold text-white"
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
    setBgSrc(pickRandomBg());
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <>
      <div className="p-2">
        <section
          ref={heroRef}
          className="relative overflow-hidden rounded-xl bg-[#0b0b0b]"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: backgroundY, opacity: backgroundOpacity }}
          >
            {bgSrc && (
              <img
                src={bgSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-[7%] to-[93%] to-black" />
          </motion.div>

          <div className="relative z-10 pt-[100px] pb-[180px]">
            <motion.div
              className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 text-center"
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
        </section>
      </div>

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
                icons={serviceIcons[key]}
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
