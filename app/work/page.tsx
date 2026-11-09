import type { Metadata } from "next";
import WorkFeatured from "@/components/WorkFeatured";
import Talk from "@/components/Talk";

export const metadata: Metadata = { title: "Work", description: "Apps, websites, dashboards and things Temitope Samuel made just for fun." };

export default function Work() {
  return (
    <>
      <main id="main"><WorkFeatured /></main>
      <Talk />
    </>
  );
}
