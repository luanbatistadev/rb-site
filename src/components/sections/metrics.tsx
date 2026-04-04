"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";
import { Tag } from "@/components/ui/tag";
import { Counter } from "@/components/ui/counter";

type MetricsProps = {
  dict: {
    tag: string;
    title: string;
    subtitle: string;
    experience: { value: string; label: string };
    focus: { value: string; label: string };
    multi: { value: string; label: string };
  };
};

export function Metrics({ dict }: MetricsProps) {
  return (
    <section className="bg-background py-24 px-6">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeInUp} className="flex justify-center">
          <Tag>{dict.tag}</Tag>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 text-center text-4xl font-bold tracking-tight text-foreground"
        >
          {dict.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-2xl text-center text-muted"
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <Counter value={dict.experience.value} label={dict.experience.label} />
          <Counter value={dict.focus.value} label={dict.focus.label} />
          <Counter value={dict.multi.value} label={dict.multi.label} />
        </motion.div>
      </motion.div>
    </section>
  );
}
