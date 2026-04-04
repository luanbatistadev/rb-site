"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, viewportOnce } from "@/lib/animations";

type FooterProps = {
  dict: {
    menu: string;
    social: string;
    contactTitle: string;
    rights: string;
    terms: string;
    privacy: string;
  };
  locale: string;
  navDict: {
    home: string;
    services: string;
    projects: string;
    contact: string;
  };
};

const menuLinks = [
  { key: "home" as const, label: "Início" },
  { label: "Sobre", href: "#servicos" },
  { key: "services" as const, label: "Serviços" },
  { key: "projects" as const, label: "Projetos" },
];

export function Footer({ dict, locale, navDict }: FooterProps) {
  return (
    <footer className="bg-background px-2 pb-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
        className="relative overflow-hidden rounded-xl"
      >
        {/* Background image layer */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 60%, rgba(40, 40, 60, 0.9) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 70% 40%, rgba(20, 20, 40, 0.8) 0%, transparent 60%),
                radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10, 10, 20, 0.95) 0%, #0a0a0a 100%)
              `,
            }}
          />
          {/* Swirl effect */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                conic-gradient(from 200deg at 40% 60%, transparent 0deg, rgba(80, 80, 120, 0.3) 60deg, transparent 120deg, rgba(60, 60, 100, 0.2) 200deg, transparent 300deg),
                radial-gradient(ellipse 50% 40% at 60% 50%, rgba(100, 100, 160, 0.15) 0%, transparent 60%)
              `,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-10 py-12 lg:px-16 lg:py-14">
          {/* Main row: logo + columns */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3"
            >
              <img
                src="/logo-512.svg"
                alt="RB"
                width={56}
                height={56}
                className="brightness-0 invert opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight text-white">
                  Computing
                </span>
                <span className="text-sm text-white/50">
                  Development.
                </span>
              </div>
            </Link>

            {/* 3 Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
              {/* Menu */}
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {dict.menu}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {menuLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href || `#${link.key}`}
                        className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                      >
                        {link.key ? navDict[link.key] : link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {dict.social}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      Linkedin
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {dict.contactTitle}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li>
                    <a
                      href="mailto:email@gmail.com"
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      email@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="text-sm text-white/50">
                      82988888888
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-12 border-t border-white/10" />

          {/* Bottom row */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              {dict.rights}
            </p>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <Link
                href={`/${locale}/termos`}
                className="transition-colors duration-200 hover:text-white/70"
              >
                {dict.terms}
              </Link>
              <span>•</span>
              <Link
                href={`/${locale}/privacidade`}
                className="transition-colors duration-200 hover:text-white/70"
              >
                {dict.privacy}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
