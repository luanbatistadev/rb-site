"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { submitContactForm } from "@/lib/contact-action";
import { LogoRB } from "@/components/ui/logo-rb";
import { ArrowIcon } from "@/components/ui/contact-icons";

type ContactFormDict = {
  formTitle: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  subjectPlaceholder: string;
  subjectOptions: {
    mobile: string;
    web: string;
    consulting: string;
    legacy: string;
    maintenance: string;
    other: string;
  };
  budget: string;
  budgetPlaceholder: string;
  budgetOptions: {
    lt10k: string;
    "10to30k": string;
    "30to80k": string;
    gt80k: string;
    undecided: string;
  };
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  errors: {
    validation: string;
    rate_limit: string;
    send_failed: string;
  };
};

type ContactFormProps = {
  dict: ContactFormDict;
};

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success" };

type SubmitError = "validation" | "rate_limit" | "send_failed";

const inputClasses =
  "w-full rounded-xl border border-foreground/10 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/20";

const selectClasses =
  "w-full appearance-none rounded-xl border border-foreground/10 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/20";

const labelClasses = "text-sm font-medium text-foreground/70";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  );
}

function errorMessage(error: SubmitError, dict: ContactFormDict["errors"]): string {
  switch (error) {
    case "rate_limit":
      return dict.rate_limit;
    case "validation":
      return dict.validation;
    case "send_failed":
      return dict.send_failed;
  }
}

export function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
        return;
      }
      setStatus({ kind: "error", message: errorMessage(result.error, dict.errors) });
    });
  }

  function reset() {
    setStatus({ kind: "idle" });
  }

  if (status.kind === "success") {
    return (
      <motion.div
        data-testid="contact-form"
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-xl bg-white p-8 py-12 text-center md:p-10"
      >
        <LogoRB width={56} height={50} className="text-foreground opacity-80" />
        <h3 className="text-[24px] font-semibold leading-[1.2] text-foreground">
          {dict.successTitle}
        </h3>
        <p className="max-w-sm text-[16px] leading-[1.5] text-muted">
          {dict.successBody}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex h-12 items-center gap-3 rounded-full border border-foreground/10 bg-white pl-8 pr-1 text-[16px] font-semibold text-foreground transition-colors duration-200 hover:border-foreground/20 cursor-pointer"
        >
          {dict.sendAnother}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-accent-from to-accent-to">
            <ArrowIcon className="h-4 w-4 text-white" />
          </span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-testid="contact-form"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl bg-white p-6 md:p-8"
    >
      <motion.h3
        variants={fadeInUp}
        className="mb-6 text-[20px] font-semibold leading-[1.2] text-foreground"
      >
        {dict.formTitle}
      </motion.h3>

      <motion.form
        ref={formRef}
        variants={fadeInUp}
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="name">{dict.name}</FieldLabel>
            <input id="name" name="name" type="text" required placeholder={dict.name} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="email">{dict.email}</FieldLabel>
            <input id="email" name="email" type="email" required placeholder={dict.email} className={inputClasses} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="phone">{dict.phone}</FieldLabel>
            <input id="phone" name="phone" type="tel" placeholder={dict.phone} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="subject">{dict.subject}</FieldLabel>
            <select id="subject" name="subject" required defaultValue="" className={selectClasses}>
              <option value="" disabled>{dict.subjectPlaceholder}</option>
              <option value="mobile">{dict.subjectOptions.mobile}</option>
              <option value="web">{dict.subjectOptions.web}</option>
              <option value="consulting">{dict.subjectOptions.consulting}</option>
              <option value="legacy">{dict.subjectOptions.legacy}</option>
              <option value="maintenance">{dict.subjectOptions.maintenance}</option>
              <option value="other">{dict.subjectOptions.other}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="budget">{dict.budget}</FieldLabel>
          <select id="budget" name="budget" defaultValue="" className={selectClasses}>
            <option value="">{dict.budgetPlaceholder}</option>
            <option value="lt10k">{dict.budgetOptions.lt10k}</option>
            <option value="10to30k">{dict.budgetOptions["10to30k"]}</option>
            <option value="30to80k">{dict.budgetOptions["30to80k"]}</option>
            <option value="gt80k">{dict.budgetOptions.gt80k}</option>
            <option value="undecided">{dict.budgetOptions.undecided}</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="message">{dict.message}</FieldLabel>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={dict.message}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {status.kind === "error" && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="group mt-2 inline-flex h-13 w-full items-center justify-between rounded-full bg-foreground pl-8 pr-1 text-base font-semibold text-white transition-colors duration-200 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <span>{isPending ? dict.sending : dict.send}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-accent-from to-accent-to transition-transform duration-200 group-hover:scale-110">
            <ArrowIcon className="h-4 w-4 text-white" />
          </span>
        </button>
      </motion.form>
    </motion.div>
  );
}
