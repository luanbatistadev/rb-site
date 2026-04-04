import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";

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
      <Header locale={locale} dict={dict.nav} />
      <main className="min-h-screen pt-32 pb-24">
        <ContactForm dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
