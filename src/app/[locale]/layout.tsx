import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "./dictionaries";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ locale: "pt-BR" }, { locale: "en" }];
}

export const metadata: Metadata = {
  title: "RB Computing Development — Desenvolvimento, Design & Experiência",
  description:
    "Construímos aplicações digitais de alto impacto com foco em performance e experiências que engajam usuários e geram resultados.",
  icons: {
    icon: "/logo-512.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
