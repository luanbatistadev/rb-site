"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  { key: "home" as const, href: "" },
  { key: "services" as const, href: "/servicos" },
  { key: "projects" as const, href: "/projetos" },
  { key: "contact" as const, href: "/contato" },
];

export function Footer({ dict, locale, navDict }: FooterProps) {
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
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
          {bgSrc && (
            <Image
              src={bgSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-[#0b0b0b]/80" />
        </div>

        <div className="relative z-10 px-10 py-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3"
            >
              <Image
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
                    <li key={link.key}>
                      <Link
                        href={`/${locale}${link.href}`}
                        className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                      >
                        {navDict[link.key]}
                      </Link>
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
                      href="https://www.instagram.com/rbcdevelopment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/company/rb-computing-development"
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
                      href="mailto:luanbatistadev@gmail.com"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      luanbatistadev@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+5569992950959"
                      className="text-base text-[#eaeaea] transition-colors duration-200 hover:text-white"
                    >
                      +55 69 99295-0959
                    </a>
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
