"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

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

const inputClasses =
  "w-full rounded-xl border border-foreground/10 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/20";

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
      className="mx-auto max-w-200"
    >
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-accent/20 bg-accent/5 p-10 text-center"
        >
          <p className="text-lg font-medium text-accent">{dict.success}</p>
        </motion.div>
      ) : (
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                {dict.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={dict.name}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                {dict.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={dict.email}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground/70">
              {dict.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder={dict.phone}
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground/70">
              {dict.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={dict.message}
              className={`${inputClasses} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{dict.error}</p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex h-13 w-full items-center justify-center rounded-full bg-accent text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
          >
            {dict.send}
          </button>
        </motion.form>
      )}
    </motion.div>
  );
}
