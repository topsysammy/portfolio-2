import type { Metadata } from "next";
import WorkBrowser from "@/components/WorkBrowser";
import Talk from "@/components/Talk";

export const metadata: Metadata = { title: "Work", description: "Case studies, websites and vibecoded apps by Temitope Samuel." };

export default function Work() {
  return (
    <>
      <main id="main"><WorkBrowser /></main>
      <Talk />
    </>
  );
}
