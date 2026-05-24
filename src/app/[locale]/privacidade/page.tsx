import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LegalContent } from "@/components/sections/legal-content";
import { privacy } from "@/data/legal/privacy";

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const doc = privacy[locale as Locale];

  return (
    <>
      <Header dict={dict.nav} activePath="/privacidade" />
      <main>
        <LegalContent doc={doc} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
