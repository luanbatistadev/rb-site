import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import TechBar from "@/components/sections/tech-bar";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Metrics } from "@/components/sections/metrics";
import { Cta } from "@/components/sections/cta";
import projectsData from "@/data/projects.json";

export default async function HomePage({
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
      <main>
        <Hero dict={dict.hero} locale={locale} />
        <TechBar />
        <Services dict={dict.services} />
        <Projects
          dict={dict.projects}
          projects={projectsData}
          locale={locale}
        />
        <Metrics dict={dict.metrics} />
        <Cta dict={dict.cta} locale={locale} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
