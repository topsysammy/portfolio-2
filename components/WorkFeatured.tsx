"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, projectHref, type Kind, type Project } from "@/lib/projects";
import { portal } from "@/lib/portal";
import PhoneMockup from "./PhoneMockup";
import { useHasVideo } from "./MediaContext";

/** Spotlight projects, with the three screens shown in each. */
const SPOTLIGHT: { slug: string; screens: string[]; desktop?: boolean }[] = [
  { slug: "duo-deck", screens: ["deck-deep-talk", "home", "play-deep-talk"] },
  { slug: "folat", screens: ["customers", "home", "customer"] },
  { slug: "adunni", screens: ["s4", "s1"], desktop: true },
];
const SLIDE_MS = 6500;

const GROUPS: { kind: Kind; title: string; text: string }[] = [
  { kind: "case", title: "Applications", text: "Mobile and web apps, from first sketch to shipped product." },
  { kind: "website", title: "Websites", text: "Landing pages and sites that sell a product by showing it." },
  { kind: "dashboard", title: "Dashboards", text: "Data-dense tools that stay calm to read." },
  // App screenshots is hidden until the first set is added:
  // { kind: "screenshots", title: "App screenshots", text: "Store-ready screenshot sets." },
  { kind: "vibecoded", title: "Just for fun", text: "Things I made because I wanted to see if I could." },
];

export default function WorkFeatured() {
  return (
    <div className="page wf-page">
      <header className="bento-head">
        <span className="label">work · {projects.length} projects</span>
        <h1 className="page-title">Selected <span className="serif">work</span></h1>
        <p>Start with the spotlight, then browse everything by type. Open any project to see what I designed and why.</p>
      </header>
      <Spotlight />
      <JumpBar />
      {GROUPS.map((g) => {
        const list = projects.filter((p) => p.kind === g.kind);
        return (
          <section key={g.kind} id={`type-${g.kind}`} className="wf-group">
            <div className="wf-group-head">
              <h2>{g.title} <small>{String(list.length).padStart(2, "0")}</small></h2>
              <p>{g.text}</p>
            </div>
            {list.length ? (
              <div className="wf-grid">{list.map((p, i) => <MiniCard key={p.slug} p={p} i={i} />)}</div>
            ) : (
              <div className="pg-empty wf-empty"><span className="label">coming soon</span><p>App Store and Play Store screenshot sets are on the way.</p></div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** Pinned category bar: highlights the section being read, with a pill that slides between categories. */
function JumpBar() {
  const [active, setActive] = useState<Kind | null>(null);
  const nav = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const lock = useRef(0);
  /** Where the bar sits once it's pinned: its sticky top plus its own height. */
  const pinnedBottom = () => {
    const el = nav.current;
    if (!el) return 150;
    return (parseFloat(getComputedStyle(el).top) || 0) + el.offsetHeight;
  };

  // scroll-spy: the active section is the last one whose top has passed just under the bar
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      if (performance.now() < lock.current) return;
      const line = pinnedBottom() + 24;
      let hit: Kind | null = null;
      for (const g of GROUPS) {
        const el = document.getElementById(`type-${g.kind}`);
        if (el && el.getBoundingClientRect().top <= line) hit = g.kind;
      }
      setActive(hit);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  // move the pill under the active link, and keep it in view when the bar scrolls sideways (phones)
  useEffect(() => {
    const bar = nav.current, p = pill.current;
    if (!bar || !p) return;
    const link = active ? bar.querySelector<HTMLElement>(`[data-kind="${active}"]`) : null;
    if (!link) { p.style.opacity = "0"; return; }
    p.style.opacity = "1";
    p.style.width = `${link.offsetWidth}px`;
    p.style.transform = `translateX(${link.offsetLeft}px)`;
    const l = link.offsetLeft - bar.scrollLeft, r = l + link.offsetWidth;
    if (l < 0 || r > bar.clientWidth) bar.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  const go = (e: React.MouseEvent, kind: Kind) => {
    const el = document.getElementById(`type-${kind}`);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - pinnedBottom() - 16;
    lock.current = performance.now() + (reduce ? 0 : 900);
    setActive(kind);
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav ref={nav} className="wf-jump" aria-label="Jump to a section">
      <span ref={pill} className="wf-pill" aria-hidden="true" />
      {GROUPS.map((g) => (
        <a key={g.kind} data-kind={g.kind} href={`#type-${g.kind}`} className={active === g.kind ? "is-on" : ""} aria-current={active === g.kind ? "true" : undefined} onClick={(e) => go(e, g.kind)}>
          {g.title} <small>{projects.filter((p) => p.kind === g.kind).length}</small>
        </a>
      ))}
    </nav>
  );
}

function Spotlight() {
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const started = useRef(0);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    if (paused || reduce) return;
    started.current = performance.now();
    const t = setTimeout(() => setOn((v) => (v + 1) % SPOTLIGHT.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [on, paused, reduce]);

  return (
    <section className={`wf-spot ${paused ? "is-paused" : ""}`} aria-roledescription="carousel" aria-label="Featured projects" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SPOTLIGHT.map((s, i) => {
        const p = projects.find((x) => x.slug === s.slug)!;
        const x = portal[s.slug];
        const shots = s.screens.map((n) => x.screens.find((sc) => sc.src.endsWith(`/${n}.jpg`))!).filter(Boolean);
        return (
          <article key={s.slug} className={`wf-slide ${i === on ? "is-on" : ""}`} style={{ background: x.icon.bg, color: x.icon.fg }} aria-hidden={i !== on} aria-roledescription="slide" aria-label={`${i + 1} of ${SPOTLIGHT.length}: ${p.title}`}>
            <div className="wf-copy">
              <span className="wf-kicker">Featured · {String(i + 1).padStart(2, "0")}/{String(SPOTLIGHT.length).padStart(2, "0")}</span>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <div className="wf-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="wf-ctas">
                <a className="wf-btn" href={projectHref(p)} tabIndex={i === on ? 0 : -1}>Open case study <span>→</span></a>
                {p.live && <a className="wf-btn ghost" href={p.live} target="_blank" rel="noreferrer" tabIndex={i === on ? 0 : -1}>Visit live <span>↗</span></a>}
              </div>
            </div>
            {s.desktop ? (
              <div className="wf-browsers" aria-hidden="true">
                {shots.map((sc, k) => (
                  <span key={sc.src} className={`wf-browser b${k}`}>
                    <span className="wf-bbar"><i /><i /><i /></span>
                    <span className="wf-bshot"><Image src={sc.src} alt="" fill sizes="(max-width: 760px) 90vw, 46vw" /></span>
                  </span>
                ))}
              </div>
            ) : (
            <div className="wf-phones" aria-hidden="true">
              {shots.map((sc, k) => (
                <span key={sc.src} className={`wf-phone p${k}`}>
                  <PhoneMockup src={sc.src} alt="" statusBar={sc.statusBar} island={sc.island} safeBottom={sc.safeBottom} sizes="260px" />
                </span>
              ))}
            </div>
            )}
          </article>
        );
      })}
      <div className="wf-dots" role="tablist" aria-label="Choose a featured project">
        {SPOTLIGHT.map((s, i) => {
          const p = projects.find((x) => x.slug === s.slug)!;
          return (
            <button key={s.slug} type="button" role="tab" aria-selected={i === on} aria-label={p.title} className={i === on ? "is-on" : ""} onClick={() => setOn(i)} style={{ "--ms": `${SLIDE_MS}ms` } as React.CSSProperties}>
              <span className="wf-dot-name">{p.title}</span>
              <span className="wf-bar"><i key={i === on ? `${on}-${paused}` : "off"} /></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MiniCard({ p, i }: { p: Project; i: number }) {
  const video = useHasVideo(p.slug) ? p.video : undefined;
  return (
    <a className="wf-card" href={projectHref(p)} style={{ "--i": i } as React.CSSProperties} aria-label={`Open ${p.title}`}>
      <span className="wf-thumb">
        {video ? (
          <video src={video.src} poster={video.poster ?? p.cover} style={{ background: video.bg ?? "#111" }} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />
        )}
        <span className="wf-go" aria-hidden="true">↗</span>
      </span>
      <span className="wf-meta">
        <b>{p.title}</b>
        <small>{p.year} · {p.label}</small>
      </span>
    </a>
  );
}
