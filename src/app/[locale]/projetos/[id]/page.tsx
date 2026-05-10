import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "../../dictionaries";
import type { Locale } from "../../dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cta } from "@/components/sections/cta";
import { ProjectDetailContent } from "@/components/sections/project-detail-content";
import projectsData from "@/data/projects.json";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectsData.map((project) => ({ locale, id: project.id }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (!hasLocale(locale)) notFound();

  const project = projectsData.find((p) => p.id === id);
  if (!project) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale} dict={dict.nav} activePath="/projetos" />
      <ProjectDetailContent
        project={project}
        locale={locale as Locale}
        dict={dict.projectDetail}
      />
      <Cta dict={dict.cta} locale={locale} />
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
