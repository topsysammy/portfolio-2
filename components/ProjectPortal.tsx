"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { projects, nextProject, type Block, type Project } from "@/lib/projects";
import { portal } from "@/lib/portal";
import { profile } from "@/lib/data";
import { Palette, TypeSpecimen } from "./Specimens";
import Lightbox, { type Shot } from "./Lightbox";
import { copyText } from "./CopyEmail";

const cap = (s: string) => (s.charAt(0).toUpperCase() + s.slice(1)).replace(/\bi\b/g, "I");
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const kindLabel = (p: Project) => p.label;

function Sec({ id, title, actions, caption, children }: { id: string; title: string; actions?: ReactNode; caption?: ReactNode; children?: ReactNode }) {
  return (
    <section className="psec" id={`p-${id}`} data-sec={id}>
      <div className="psec-head">
        <h2>{title}</h2>
        {actions}
      </div>
      {caption && <p className="psec-cap">{caption}</p>}
      {children}
    </section>
  );
}

function Icon({ p, size }: { p: Project; size: number }) {
  const i = portal[p.slug].icon;
  return (
    <span className="pmark" style={{ width: size, height: size, background: i.bg, color: i.fg, fontSize: size * 0.56, borderRadius: size * 0.26 }} aria-hidden="true">
      {i.text}
    </span>
  );
}

/* ---------- body blocks (my sections) ---------- */
function BlockView({ b, open }: { b: Block; open: (src: string) => void }) {
  switch (b.type) {
    case "lead":
      return <p className="plead">{b.text}</p>;
    case "challenge":
      return (
        <>
          <p className="plead-sm">{b.title}</p>
          {(b.who || b.why) && (
            <div className="cols2">
              {b.who && <div className="box"><h4>Who has this problem</h4><p>{b.who}</p></div>}
              {b.why && <div className="box"><h4>Why it matters</h4><p>{b.why}</p></div>}
            </div>
          )}
          {b.items.length > 0 && (
            <ol className="change-list">
              {b.items.map((it, i) => (
                <li className="change" key={it.title}>
                  <span className="change-num serif">{String(i + 1).padStart(2, "0")}</span>
                  <p className="change-what">{it.title}</p>
                  <p className="change-why">{it.text}</p>
                </li>
              ))}
            </ol>
          )}
          {b.quote && (
            <blockquote className="quote">
              <p>“{b.quote.text}”</p>
              <span>— {b.quote.by}</span>
            </blockquote>
          )}
        </>
      );
    case "timeline":
      return (
        <ol className="tl">
          {b.steps.map((s) => (
            <li key={s.title}><span className="w">{s.when}</span><b>{s.title}</b><p>{s.text}</p></li>
          ))}
        </ol>
      );
    case "goals":
      return (
        <>
          {b.intro && <p className="goals-intro">{b.intro}</p>}
          {b.items.some((x) => x.title) ? (
            <div className="pprinciples">
              {b.items.map((it) => (
                <div key={it.title}><b>{it.title}</b><p>{it.text}</p></div>
              ))}
            </div>
          ) : (
            b.items.length > 0 && <ul className="ticks">{b.items.map((it) => <li key={it.text}>{it.text}</li>)}</ul>
          )}
        </>
      );
    case "research":
      return (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{b.methods.map((m) => <span key={m} className="chip">{m}</span>)}</div>
          <ol className="findings">{b.findings.map((f) => <li key={f}>{f}</li>)}</ol>
          <div className="cols2">
            {b.lists.map((l) => (
              <div key={l.title} className="box"><h4>{l.title}</h4><ul className="ticks">{l.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
            ))}
          </div>
        </>
      );
    case "changes":
      return (
        <ol className="change-list pchanges">
          {b.items.map((it, i) => (
            <li className="change" key={i}>
              <span className="change-num serif">{String(i + 1).padStart(2, "0")}</span>
              <p className="change-what" style={{ fontWeight: 500 }}>{it.what}</p>
              <p className="change-why"><span className="label" style={{ display: "block", marginBottom: 4 }}>why it&apos;s better</span>{it.why}</p>
            </li>
          ))}
        </ol>
      );
    case "figure":
      return (
        <figure className="pfig">
          <figcaption>
            <span className="label">{b.eyebrow}</span>
            <h3>{b.title}</h3>
            {b.text && <p>{b.text}</p>}
          </figcaption>
          <button type="button" className="fig" onClick={() => open(b.image)} aria-label={`Enlarge: ${b.title}`}>
            <Image src={b.image} alt={b.alt} width={1400} height={1000} sizes="(max-width: 900px) 100vw, 820px" style={{ width: "100%", height: "auto" }} />
          </button>
          {b.points && (
            <div className="cols3">
              {b.points.map((pt, i) => (
                <div key={pt.title} className="box"><span className="n">0{i + 1}</span><h4>{pt.title}</h4><p>{pt.text}</p></div>
              ))}
            </div>
          )}
        </figure>
      );
  }
}

/* ---------- the window ---------- */
function Window({ p, onClose, onNext }: { p: Project; onClose: () => void; onNext: () => void }) {
  const x = portal[p.slug];
  const next = nextProject(p.slug);
  const blocks = useMemo(() => p.blocks ?? [], [p.blocks]);
  const story = blocks.filter((b) => b.type !== "figure");
  const figures = blocks.filter((b): b is Extract<Block, { type: "figure" }> => b.type === "figure");
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const secs = useMemo(() => {
    const s: [string, string][] = [["intro", "Introduction"]];
    story.forEach((b) => b.type !== "lead" && s.push([slug(b.eyebrow), cap(b.eyebrow)]));
    if (figures.length) s.push(["design", "The design"]);
    if (x.screens.length) s.push(["screens", "Screens"]);
    if (p.palette) s.push(["palette", "Core palette"], ["proportions", "Colour proportions"]);
    if (p.font) s.push(["type", "Type system"]);
    s.push(["about", "About"]);
    return s;
  }, [story, figures.length, x.screens.length, p.palette, p.font]);
  const [on, setOn] = useState(secs[0][0]);

  const shots: Shot[] = useMemo(
    () => [...figures.map((f) => ({ src: f.image, alt: f.title })), ...x.screens.map((s) => ({ src: s.src, alt: s.label }))],
    [figures, x.screens]
  );
  const open = (src: string) => setView(shots.findIndex((s) => s.src === src));

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 200);
  }, [closing, onClose]);

  // lock page scroll, focus, Esc
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    winRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && view === null && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [close, view]);

  // reset on project change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    setOn("intro");
  }, [p.slug]);

  // scroll spy inside the window
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setOn((e.target as HTMLElement).dataset.sec!)),
      { root, rootMargin: "-20% 0px -70% 0px" }
    );
    root.querySelectorAll("[data-sec]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [secs]);

  // keep the active chip visible in the mobile chip bar
  useEffect(() => {
    const n = navRef.current;
    const el = n?.querySelector<HTMLElement>(".is-on");
    if (n && el && n.scrollWidth > n.clientWidth) n.scrollTo({ left: el.offsetLeft - 12, behavior: "smooth" });
  }, [on]);

  const go = (id: string) => {
    const el = mainRef.current?.querySelector<HTMLElement>(`#p-${id}`);
    if (el && mainRef.current) {
      setOn(id);
      mainRef.current.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
  };

  const css = p.palette ? `:root {\n${p.palette.map((c) => `  --${slug(c.name)}: ${c.hex};`).join("\n")}\n}` : "";
  const copyCss = async () => {
    await copyText(css, "Palette copied as CSS");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const facts = (p.meta ?? []).slice(0, 4);
  const visitHref = p.live ?? p.behance;
  const visit = (cls: string) =>
    visitHref && (
      <a className={`pvisit ${cls}`} href={visitHref} target="_blank" rel="noreferrer" title={p.live ? "Open the live project" : "Open the case study on Behance"}>
        Visit <span aria-hidden="true">↗</span>
        {!p.live && <small>Behance</small>}
      </a>
    );
  const tools = (
    <div className="ptools">
      {p.palette && <button type="button" onClick={copyCss}>{copied ? "✓ Palette copied" : "⧉ Copy palette as CSS"}</button>}
      <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`About ${p.title}`)}`}>✉ Ask about this project</a>
      {p.live && p.behance && <a href={p.behance} target="_blank" rel="noreferrer">Bē View on Behance</a>}
      <button type="button" onClick={onNext}>→ Next: {next.title}</button>
    </div>
  );

  return (
    <div className={`portal-layer ${closing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby={`portal-${p.slug}`}>
      <div className="portal-backdrop" onClick={close} />
      <div className="portal-window" ref={winRef} tabIndex={-1}>
        <aside className="pside">
          <button type="button" className="pside-back" onClick={close}>← All work</button>
          <div className="pside-id">
            <Icon p={p} size={34} />
            <span><b>{p.title}</b><small>{kindLabel(p)}</small></span>
          </div>
          {visit("pvisit-side")}
          <nav className="pnav" ref={navRef} aria-label={`${p.title} sections`}>
            {secs.map(([id, label]) => (
              <button key={id} type="button" className={on === id ? "is-on" : ""} aria-current={on === id ? "true" : undefined} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </nav>
          {tools}
        </aside>

        <main className="pmain" ref={mainRef}>
          <div className="pdoc" key={p.slug}>
            <header className="phead">
              <h1 id={`portal-${p.slug}`}>{p.title} <span>{kindLabel(p)}</span></h1>
              <p>{p.summary}</p>
              {facts.length > 0 && (
                <dl className="pfacts">
                  {facts.map((m) => <div key={m.k}><dt className="label">{m.k}</dt><dd>{m.v}</dd></div>)}
                </dl>
              )}
              {visit("pvisit-head")}
            </header>

            <Sec id="intro" title="Introduction" caption={story[0]?.type === "lead" ? story[0].text : undefined}>
              <figure className={`pbanner ${x.dark ? "is-dark" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pbanner-blur" src={x.banner} alt="" />
                <span className="pbanner-mark">
                  <Icon p={p} size={52} />
                  <span style={{ fontFamily: `var(${x.wordmark.font})`, fontWeight: x.wordmark.weight }}>{x.wordmark.text}</span>
                </span>
              </figure>
            </Sec>

            {story.filter((b) => b.type !== "lead").map((b) => (
              <Sec key={b.eyebrow} id={slug(b.eyebrow)} title={cap(b.eyebrow)} actions={"title" in b && b.type !== "challenge" ? <span className="label">{b.title}</span> : undefined}>
                <BlockView b={b} open={open} />
              </Sec>
            ))}

            {figures.length > 0 && (
              <Sec id="design" title="The design" actions={<span className="label">{figures.length} boards · click to enlarge</span>}>
                {figures.map((f) => <BlockView key={f.title} b={f} open={open} />)}
              </Sec>
            )}

            {x.screens.length > 0 && (
              <Sec id="screens" title="Screens" actions={<span className="label">{x.screens.length} screens</span>} caption={x.screensCaption ?? (x.screens[0].web ? "Captured from the live site." : "Cut out of the final designs. Scroll sideways, click to enlarge.")}>
                <div className="pscreens">
                  {x.screens.map((s) => (
                    <figure key={s.src} className={s.web ? "is-web" : ""}>
                      <button type="button" className="pscreen-frame" onClick={() => open(s.src)} aria-label={`Enlarge ${s.label}`}>
                        <Image src={s.src} alt={s.label} width={s.web ? 1280 : 393} height={s.web ? 800 : 852} sizes={s.web ? "640px" : "196px"} />
                      </button>
                      <figcaption className="label">{s.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </Sec>
            )}

            {p.palette && (
              <>
                <Sec id="palette" title="Core palette" actions={<button type="button" className="text-btn" onClick={copyCss}>{copied ? "✓ Copied" : "Copy as CSS"}</button>} caption="Click any swatch to copy its hex. The chip shows WCAG 2.1 contrast against the better of white or ink text.">
                  <Palette swatches={p.palette} />
                </Sec>
                <Sec id="proportions" title="Colour proportions" caption={`Measured from ${x.screens.length} screens: every pixel matched to its nearest palette colour.`}>
                  <div className="pbar">
                    {x.proportions.map(([hex, pct]) => <span key={hex} style={{ flexGrow: pct, background: hex }} title={`${hex} · ${pct}%`} />)}
                  </div>
                  <ul className="plegend">
                    {x.proportions.map(([hex, pct]) => {
                      const name = p.palette!.find((c) => c.hex.toUpperCase() === hex.toUpperCase())?.name ?? hex;
                      return <li key={hex}><i style={{ background: hex }} />{name}<span>{pct}%</span></li>;
                    })}
                  </ul>
                </Sec>
              </>
            )}

            {p.font && (
              <Sec id="type" title="Type system" caption="The typefaces this project uses, and where. Drag the slider or type your own sample.">
                <TypeSpecimen {...p.font} className="" />
                {x.extraFonts && (
                  <div className="pfonts">
                    {x.extraFonts.map((f) => (
                      <div key={f.family} className="box">
                        <span className="label">{f.use}</span>
                        <p style={{ fontFamily: `var(${f.varName})`, fontSize: 34, color: "var(--color-ink)", marginTop: 10, lineHeight: 1.1 }}>{f.family}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Sec>
            )}

            <Sec id="about" title="About">
              <ul className="tags ptags">{p.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
              <div className="ptools-inline">{tools}</div>
              <button type="button" className="case-next" onClick={onNext}>
                <span className="label">Next project</span>
                <span className="case-next-name"><Icon p={next} size={30} /> {next.title}</span>
                <span className="case-next-tag">{next.summary}</span>
                <span className="case-next-ar" aria-hidden="true">→</span>
              </button>
            </Sec>
          </div>
        </main>
      </div>
      {view !== null && view >= 0 && <Lightbox shots={shots} index={view} onClose={() => setView(null)} onGo={setView} />}
    </div>
  );
}

/** Opens whenever the URL hash matches a project slug (e.g. /#duba or /work#shoppa). */
export default function ProjectPortal() {
  const [slugOn, setSlugOn] = useState<string | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const read = (fromNav: boolean) => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      const hit = projects.some((p) => p.slug === h) ? h : null;
      if (hit && fromNav) pushed.current = true;
      setSlugOn(hit);
    };
    read(false);
    const on = () => read(true);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      history.back();
    } else {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      setSlugOn(null);
    }
  }, []);

  const goNext = useCallback(() => {
    if (!slugOn) return;
    const n = nextProject(slugOn);
    history.replaceState(null, "", `#${n.slug}`);
    setSlugOn(n.slug);
  }, [slugOn]);

  const p = projects.find((x) => x.slug === slugOn);
  return p ? <Window p={p} onClose={close} onNext={goNext} /> : null;
}
