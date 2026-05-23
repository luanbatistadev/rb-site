"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const OPTIONS = [
  { code: "pt-BR", label: "PT" },
  { code: "en", label: "EN" },
] as const;

type Props = {
  currentLocale: string;
  ariaLabel: string;
};

export function LocaleSwitcher({ currentLocale, ariaLabel }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const setLocale = (code: string) => {
    if (code === currentLocale) return;
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div
      className="inline-flex items-center gap-1 text-base font-light"
      aria-label={ariaLabel}
    >
      {OPTIONS.map((opt, i) => {
        const active = opt.code === currentLocale;
        return (
          <span key={opt.code} className="contents">
            {i > 0 && <span className="text-white/30">/</span>}
            <button
              type="button"
              onClick={() => setLocale(opt.code)}
              disabled={pending}
              aria-pressed={active}
              className={
                active
                  ? "text-white"
                  : "text-white/40 transition-colors duration-200 hover:text-white/80"
              }
            >
              {opt.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
