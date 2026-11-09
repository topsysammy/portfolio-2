"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects, type Kind } from "@/lib/projects";

const filters: { label: string; kind: Kind | "all" }[] = [
  { label: "All projects", kind: "all" },
  { label: "Applications", kind: "case" },
  { label: "Websites", kind: "website" },
  { label: "Dashboards", kind: "dashboard" },
  { label: "App screenshots", kind: "screenshots" },
  { label: "Just for fun", kind: "vibecoded" },
];

export default function WorkBrowser() {
  const [on, setOn] = useState(0);
  const kind = filters[on].kind;
  const list = kind === "all" ? projects : projects.filter((p) => p.kind === kind);
  return (
    <div className="page split">
      <aside className="split-side">
        <h1 className="split-title">Projects</h1>
        <p className="desc">Mobile apps, websites, dashboards and things I made just for fun. Each case study shows what I changed and why.</p>
        <ul className="filters" style={{ "--on": on } as React.CSSProperties} aria-label="Filter projects">
          {filters.map((f, i) => {
            const n = f.kind === "all" ? projects.length : projects.filter((p) => p.kind === f.kind).length;
            return (
              <li key={f.kind}>
                <button type="button" className={i === on ? "is-on" : ""} aria-pressed={i === on} onClick={() => setOn(i)}>
                  {f.label} <small>{n}</small>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <div>
        <h2 className="page-title">Selected <span className="serif">work</span></h2>
        {list.length ? (
          <div className="grid" key={kind}>
            {list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} priority={i < 2} />)}
          </div>
        ) : (
          <div className="pg-empty" key={kind}>
            <span className="label">coming soon</span>
            <p>{kind === "screenshots" ? "App Store and Play Store screenshot sets are on the way." : "Nothing here yet. Check back soon."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
