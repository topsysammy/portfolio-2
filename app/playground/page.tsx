import type { Metadata } from "next";
import Link from "next/link";
import Talk from "@/components/Talk";

export const metadata: Metadata = { title: "Playground", description: "Small ideas, experiments and things Temitope builds for fun." };

export default function Playground() {
  return (
    <>
      <main id="main" className="page" style={{ paddingTop: 140, paddingBottom: 120 }}>
        <span className="label">playground</span>
        <h1 className="page-title" style={{ marginTop: 12, marginBottom: 14 }}>Just for <span className="serif">fun</span></h1>
        <p style={{ margin: "0 0 56px", maxWidth: "46ch", fontSize: 17, lineHeight: 1.5, color: "var(--color-ink-2)" }}>
          Small ideas, experiments and things I build because I want to see if I can.
        </p>
        <div className="pg-empty">
          <span className="label">nothing here yet</span>
          <p>New experiments are on the way. In the meantime, the real work is a click away.</p>
          <Link className="cta" href="/work">See all work <span className="ar">→</span></Link>
        </div>
      </main>
      <Talk />
    </>
  );
}
