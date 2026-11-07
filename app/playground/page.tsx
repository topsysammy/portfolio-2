import type { Metadata } from "next";
import Image from "next/image";
import Talk from "@/components/Talk";
import { playground } from "@/lib/data";

export const metadata: Metadata = { title: "Playground", description: "Small ideas, experiments and things Temitope built for fun." };

export default function Playground() {
  return (
    <>
      <main id="main" className="page" style={{ paddingTop: 140 }}>
        <span className="label">playground</span>
        <h1 className="page-title" style={{ marginTop: 12, marginBottom: 14 }}>Just for <span className="serif">fun</span></h1>
        <p style={{ margin: "0 0 56px", maxWidth: "46ch", fontSize: 17, lineHeight: 1.5, color: "var(--color-ink-2)" }}>
          Small ideas, experiments and things I built because I wanted to see if I could. Pick one.
        </p>
        <div className="grid">
          {playground.map((g, i) => {
            const body = (
              <>
                <div className="thumb">
                  <Image src={g.image} alt={g.alt} fill sizes="(max-width: 720px) 100vw, 50vw" priority={i < 2} />
                  <span className="tag">{g.tag}</span>
                  {g.badge && <span className="lock">🔒 {g.badge}</span>}
                </div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                {g.href ? <span className="open">Open it ↗</span> : <span className="open off">Private · available on request</span>}
              </>
            );
            const style = { "--i": i } as React.CSSProperties;
            return g.href ? (
              <a key={g.title} className="pg-card" href={g.href} target="_blank" rel="noreferrer" style={style}>{body}</a>
            ) : (
              <div key={g.title} className="pg-card" style={style}>{body}</div>
            );
          })}
        </div>
      </main>
      <Talk />
    </>
  );
}
