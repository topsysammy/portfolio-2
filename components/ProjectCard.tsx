"use client";
import Image from "next/image";
import { projectHref, type Project } from "@/lib/projects";
import { useHasVideo } from "./MediaContext";

export default function ProjectCard({ p, i = 0, priority = false }: { p: Project; i?: number; priority?: boolean }) {
  const href = projectHref(p);
  const video = useHasVideo(p.slug) ? p.video : undefined;
  const inner = (
    <>
      <div className="thumb">
        {video ? (
          <video
            className="thumb-video"
            src={video.src}
            poster={video.poster ?? p.cover}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${p.title} demo`}
          />
        ) : (
          <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 720px) 100vw, 50vw" priority={priority} />
        )}
        {video && <span className="badge">▶ Demo</span>}
      </div>
      <div className="meta">
        <div>
          <h3>{p.title} <span className="yr">{p.year} · {p.label}</span></h3>
          <p className="sub">{p.summary}</p>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <span className="arrow" aria-hidden="true">→</span>
      </div>
    </>
  );
  const style = { "--i": i } as React.CSSProperties;
  return (
    <a className="card" href={href} style={style} aria-label={`Open ${p.title}`}>{inner}</a>
  );
}
