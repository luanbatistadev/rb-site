import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cta } from "@/components/sections/cta";
import { ProjectsPageContent } from "@/components/sections/projects-page-content";
import projectsData from "@/data/projects.json";

export default async function ProjetosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale} dict={dict.nav} activePath="/projetos" />
      <main>
        <ProjectsPageContent
          dict={dict.projectsPage}
          projects={projectsData}
          locale={locale}
        />
        <Cta dict={dict.cta} locale={locale} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
