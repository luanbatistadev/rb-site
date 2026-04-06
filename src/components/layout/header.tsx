"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  locale: string;
  dict: {
    home: string;
    services: string;
    projects: string;
    contact: string;
    cta: string;
  };
};

const navLinks = [
  { key: "home" as const, href: "#inicio" },
  { key: "services" as const, href: "#servicos" },
  { key: "projects" as const, href: "#projetos" },
  { key: "contact" as const, href: "#contato" },
];

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 lg:px-30 pt-4"
      >
        <nav
          className={`relative flex h-17 w-full max-w-300 items-center justify-between rounded-full px-6 transition-all duration-500 ${
            scrolled
              ? "border border-white/10 bg-[#0a0a0a]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
              : "border border-white/8 bg-white/4 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[50px] bg-linear-to-r from-transparent via-white/15 to-transparent" />

          <Link href={`/${locale}`} className="group flex h-11 items-center gap-2.5">
            <Image
              src="/logo-512.svg"
              alt="RB"
              width={40}
              height={40}
              className="brightness-0 invert opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-semibold text-white/90 tracking-tight">
                Computing
              </span>
              <span className="text-[11px] text-white/40">
                Development.
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-0 md:flex absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="flex h-9 items-center rounded-lg px-3 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/8 hover:text-white"
              >
                {dict[link.key]}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href={`/${locale}/contato`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/10 px-5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            >
              {dict.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-50">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-4.5 flex-col items-center gap-1.5">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 7, width: 18 }
                    : { rotate: 0, y: 0, width: 18 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-[1.5px] w-4.5 rounded-full bg-white/80"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="block h-[1.5px] w-4.5 rounded-full bg-white/80"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -7, width: 18 }
                    : { rotate: 0, y: 0, width: 18 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-[1.5px] w-4.5 rounded-full bg-white/80"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-2xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.15 + index * 0.08,
                  }}
                  className="text-3xl font-semibold text-white transition-colors duration-200 hover:text-accent"
                >
                  {dict[link.key]}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.15 + navLinks.length * 0.08,
                }}
                className="mt-4"
              >
                <Button
                  href={`/${locale}/contato`}
                  variant="primary"
                  size="lg"
                  onClick={handleNavClick}
                >
                  {dict.cta}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
