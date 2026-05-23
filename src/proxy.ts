import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt-BR", "en"] as const;
const defaultLocale = "pt-BR";
const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocaleFromAcceptLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if ((locales as readonly string[]).includes(lang)) return lang;
    const match = locales.find(
      (l) => l.startsWith(lang) || lang.startsWith(l)
    );
    if (match) return match;
  }

  return defaultLocale;
}

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }
  return getLocaleFromAcceptLanguage(request);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    const newPath = pathname.replace(`/${pathnameLocale}`, "") || "/";
    request.nextUrl.pathname = newPath;
    return NextResponse.redirect(request.nextUrl);
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
