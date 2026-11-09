import type { Metadata } from "next";
import WorkBrowser from "@/components/WorkBrowser";
import Talk from "@/components/Talk";

export const metadata: Metadata = { title: "Work", description: "Apps, websites, dashboards and things Temitope Samuel made just for fun." };

export default function Work() {
  return (
    <>
      <main id="main"><WorkBrowser /></main>
      <Talk />
    </>
  );
}
