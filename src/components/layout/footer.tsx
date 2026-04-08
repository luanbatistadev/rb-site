"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";

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
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

  return (
    <footer data-testid="footer" className="bg-background p-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
        className="relative overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0">
          <img
            src={bgSrc || undefined}
            alt=""
            className={`h-full w-full object-cover ${bgSrc ? "animate-fade-in" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-[#0b0b0b]/80" />
        </div>

        <div className="relative z-10 px-10 py-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
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

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-20">
              <div>
                <h3 className="text-base font-normal text-white">
                  {dict.menu}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {menuLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href || `#${link.key}`}
                        className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                      >
                        {link.key ? navDict[link.key] : link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-normal text-white">
                  {dict.social}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      Linkedin
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-normal text-white">
                  {dict.contactTitle}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <a
                      href="mailto:email@gmail.com"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      email@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="text-base text-[#eaeaea]">
                      82988888888
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10" />

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-base font-light text-white">
              {dict.rights}
            </p>
            <div className="flex items-center gap-1 text-base font-light text-white">
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
