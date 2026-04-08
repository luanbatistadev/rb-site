"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";

type ContactFormProps = {
  dict: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
};

export function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("success");
  }

  return (
    <motion.div
      data-testid="contact-form"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-xl px-6"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl font-bold tracking-tight text-center"
      >
        {dict.title}
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="mt-4 text-center text-muted"
      >
        {dict.subtitle}
      </motion.p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center"
        >
          <p className="text-lg font-medium text-accent">{dict.success}</p>
        </motion.div>
      ) : (
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              {dict.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-xl border border-foreground/10 bg-foreground/2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              {dict.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-xl border border-foreground/10 bg-foreground/2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              {dict.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="rounded-xl border border-foreground/10 bg-foreground/2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              {dict.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="resize-none rounded-xl border border-foreground/10 bg-foreground/2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{dict.error}</p>
          )}

          <Button type="submit" variant="primary" size="lg" className="mt-2">
            {dict.send}
          </Button>
        </motion.form>
      )}
    </motion.div>
  );
}
