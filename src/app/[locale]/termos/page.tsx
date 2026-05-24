import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LegalContent } from "@/components/sections/legal-content";
import { terms } from "@/data/legal/terms";

export default async function TermosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const doc = terms[locale as Locale];

  return (
    <>
      <Header dict={dict.nav} activePath="/termos" />
      <main>
        <LegalContent doc={doc} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
