import Link from "next/link";
import Image from "next/image";
import { projectHref, type Project } from "@/lib/projects";

export default function ProjectCard({ p, i = 0, priority = false }: { p: Project; i?: number; priority?: boolean }) {
  const href = projectHref(p);
  const external = !p.page;
  const inner = (
    <>
      <div className="thumb">
        <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 720px) 100vw, 50vw" priority={priority} />
      </div>
      <div className="meta">
        <div>
          <h3>{p.title} <span className="yr">{p.year} · {p.label}</span></h3>
          <p className="sub">{p.summary}</p>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <span className="arrow" aria-hidden="true">{external ? "↗" : "→"}</span>
      </div>
    </>
  );
  const style = { "--i": i } as React.CSSProperties;
  return external ? (
    <a className="card" href={href} target="_blank" rel="noreferrer" style={style}>{inner}</a>
  ) : (
    <Link className="card" href={href} style={style}>{inner}</Link>
  );
}
