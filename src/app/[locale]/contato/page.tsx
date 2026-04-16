import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactHero } from "@/components/sections/contact-hero";

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale} dict={dict.nav} activePath="/contato" />
      <main>
        <ContactHero dict={dict.contact} />
        <div className="bg-background py-20 px-6">
          <ContactForm dict={dict.contact} />
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
