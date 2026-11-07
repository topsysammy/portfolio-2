import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import Talk from "@/components/Talk";
import { caseStudies, nextProject } from "@/lib/projects";
import { jakarta, figtree, roboto } from "@/lib/fonts";

const fontClass: Record<string, string> = {
  duba: jakarta.variable,
  shoppa: figtree.variable,
  mealio: roboto.variable,
};

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { images: [p.cover] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <main id="main"><CaseStudy p={p} next={nextProject(slug)} fontClass={fontClass[slug] ?? ""} /></main>
      <Talk />
    </>
  );
}
