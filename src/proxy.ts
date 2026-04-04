import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt-BR", "en"];
const defaultLocale = "pt-BR";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (locales.includes(lang)) return lang;
    const match = locales.find(
      (l) => l.startsWith(lang) || lang.startsWith(l)
    );
    if (match) return match;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
      const newPath = pathname.replace(`/${defaultLocale}`, "") || "/";
      request.nextUrl.pathname = newPath;
      return NextResponse.redirect(request.nextUrl);
    }
    return;
  }

  const locale = getLocale(request);

  if (locale === defaultLocale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
