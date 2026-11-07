"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox, { type Shot } from "./Lightbox";
import { Palette, TypeSpecimen } from "./Specimens";
import Reveal from "./Reveal";
import type { Block, Project } from "@/lib/projects";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function blockTitle(b: Block) {
  return b.eyebrow.charAt(0).toUpperCase() + b.eyebrow.slice(1);
}

export default function CaseStudy({ p, next, fontClass }: { p: Project; next: Project; fontClass: string }) {
  const blocks = useMemo(() => p.blocks ?? [], [p.blocks]);

  const shots: Shot[] = useMemo(
    () => [{ src: p.cover, alt: p.coverAlt }, ...blocks.flatMap((b) => (b.type === "figure" ? [{ src: b.image, alt: b.title }] : []))],
    [p, blocks]
  );
  const [view, setView] = useState<number | null>(null);
  const open = (src: string) => setView(shots.findIndex((s) => s.src === src));
  const close = useCallback(() => setView(null), []);

  // table of contents: the main (non-figure) chapters + specimens
  const toc = useMemo(() => {
    const t: { id: string; label: string }[] = [];
    blocks.forEach((b) => {
      if (b.type !== "figure") t.push({ id: slugify(blockTitle(b)), label: blockTitle(b) });
    });
    if (blocks.some((b) => b.type === "figure")) t.push({ id: "design", label: "The design" });
    if (p.palette) t.push({ id: "palette", label: "Palette" });
    if (p.font) t.push({ id: "type", label: "Typeface" });
    return t;
  }, [blocks, p.palette, p.font]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(toc.findIndex((t) => t.id === e.target.id));
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  let firstFigure = true;
  let n = 0;

  return (
    <div className="page split">
      <aside className="split-side">
        <Link href="/work" className="back">← All work</Link>
        <span className="label">{p.year} · {p.label.toLowerCase()}</span>
        <h1 className="split-title" style={{ fontSize: 22, marginTop: 8, letterSpacing: "-0.03em" }}>{p.title}</h1>
        <dl className="cs-meta">
          {p.meta?.map((m) => (
            <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
          ))}
        </dl>
        <div className="cs-links">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">{p.kind === "vibecoded" ? `Try ${p.title}` : "Visit site"} ↗</a>}
          {p.behance && <a className={p.live ? "alt" : ""} href={p.behance} target="_blank" rel="noreferrer">Bē View on Behance</a>}
        </div>
        <nav className="toc" aria-label="On this page">
          <span className="label">on this page</span>
          <ul className="filters" style={{ "--on": Math.max(active, 0) } as React.CSSProperties}>
            {toc.map((t, i) => (
              <li key={t.id}>
                <button type="button" className={i === active ? "is-on" : ""} onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" })}>
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article>
        <header className="cs-hero">
          <h1>{p.title}</h1>
          <p className="sum">{p.summary}</p>
          <div className="tags">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <button type="button" className="cs-cover" onClick={() => open(p.cover)} aria-label="Enlarge cover image" style={{ display: "block", width: "100%" }}>
            <Image src={p.cover} alt={p.coverAlt} width={1400} height={1000} priority sizes="(max-width: 900px) 100vw, 900px" />
          </button>
        </header>

        {blocks.map((b, bi) => {
          const id = b.type === "figure" ? undefined : slugify(blockTitle(b));
          switch (b.type) {
            case "lead":
              return (
                <Reveal as="section" key={bi} id={id} className="blk lead">
                  <span className="label">{b.eyebrow}</span>
                  <p>{b.text}</p>
                </Reveal>
              );
            case "challenge":
              return (
                <section key={bi} id={id} className="blk">
                  <Reveal>
                    <span className="label">{b.eyebrow}</span>
                    <h2>{b.title}</h2>
                  </Reveal>
                  {(b.who || b.why) && (
                    <div className="cols2">
                      {b.who && <Reveal className="box"><h4>Who has this problem</h4><p>{b.who}</p></Reveal>}
                      {b.why && <Reveal className="box" delay={80}><h4>Why it matters</h4><p>{b.why}</p></Reveal>}
                    </div>
                  )}
                  {b.items.length > 0 && (
                    <div className="cols3">
                      {b.items.map((it, i) => (
                        <Reveal key={it.title} className="box" delay={i * 80}>
                          <span className="n">0{i + 1}</span>
                          <h4>{it.title}</h4>
                          <p>{it.text}</p>
                        </Reveal>
                      ))}
                    </div>
                  )}
                  {b.quote && (
                    <Reveal as="blockquote" className="quote">
                      <p>“{b.quote.text}”</p>
                      <span>— {b.quote.by}</span>
                    </Reveal>
                  )}
                </section>
              );
            case "timeline":
              return (
                <section key={bi} id={id} className="blk">
                  <Reveal>
                    <span className="label">{b.eyebrow}</span>
                    <h2>{b.title}</h2>
                  </Reveal>
                  <ol className="tl">
                    {b.steps.map((s, i) => (
                      <Reveal as="li" key={s.title} delay={i * 60}>
                        <span className="w">{s.when}</span>
                        <b>{s.title}</b>
                        <p>{s.text}</p>
                      </Reveal>
                    ))}
                  </ol>
                </section>
              );
            case "goals":
              return (
                <section key={bi} id={id} className="blk">
                  <Reveal>
                    <span className="label">{b.eyebrow}</span>
                    <h2>{b.title}</h2>
                    {b.intro && <p className="goals-intro">{b.intro}</p>}
                  </Reveal>
                  {b.items.some((x) => x.title) ? (
                    <div className="cols2">
                      {b.items.map((it, i) => (
                        <Reveal key={i} className="box" delay={i * 70}>
                          <h4>{it.title}</h4>
                          <p>{it.text}</p>
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    b.items.length > 0 && <ul className="ticks">{b.items.map((it) => <li key={it.text}>{it.text}</li>)}</ul>
                  )}
                </section>
              );
            case "research":
              return (
                <section key={bi} id={id} className="blk">
                  <Reveal>
                    <span className="label">{b.eyebrow}</span>
                    <h2>{b.title}</h2>
                    <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                      {b.methods.map((m) => <span key={m} className="chip">{m}</span>)}
                    </div>
                  </Reveal>
                  <ol className="findings">
                    {b.findings.map((f) => <Reveal as="li" key={f}>{f}</Reveal>)}
                  </ol>
                  <div className="cols2">
                    {b.lists.map((l) => (
                      <Reveal key={l.title} className="box">
                        <h4>{l.title}</h4>
                        <ul className="ticks">{l.items.map((x) => <li key={x}>{x}</li>)}</ul>
                      </Reveal>
                    ))}
                  </div>
                </section>
              );
            case "figure": {
              const anchor = firstFigure ? "design" : undefined;
              firstFigure = false;
              n += 1;
              const img = (
                <button type="button" className="fig" onClick={() => open(b.image)} aria-label={`Enlarge: ${b.title}`} style={{ display: "block", width: "100%" }}>
                  <Image src={b.image} alt={b.alt} width={1400} height={1000} sizes="(max-width: 900px) 100vw, 900px" style={{ width: "100%", height: "auto" }} />
                </button>
              );
              return (
                <section key={bi} id={anchor} className="blk">
                  <Reveal>
                    <span className="label">{String(n).padStart(2, "0")} — {b.eyebrow}</span>
                    <h2>{b.title}</h2>
                    {b.text && <p className="txt">{b.text}</p>}
                  </Reveal>
                  {b.points ? (
                    <div className="fig-split">
                      <Reveal>{img}</Reveal>
                      <div className="pts">
                        {b.points.map((pt, i) => (
                          <Reveal key={pt.title} className="box" delay={i * 80}>
                            <span className="n">0{i + 1}</span>
                            <h4>{pt.title}</h4>
                            <p>{pt.text}</p>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Reveal>{img}</Reveal>
                  )}
                </section>
              );
            }
          }
        })}

        {p.palette && (
          <section id="palette" className="blk">
            <Reveal>
              <span className="label">the palette</span>
              <h2>The colours this project is built from.</h2>
              <p className="txt">With WCAG 2.1 contrast worked out from each swatch against white or ink text. AA needs 4.5:1 for body text and 3:1 for large text. Click a swatch to copy its hex.</p>
            </Reveal>
            <Palette swatches={p.palette} />
          </section>
        )}

        {p.font && (
          <section id="type" className="blk">
            <Reveal>
              <span className="label">the typeface</span>
              <h2>The typeface this project uses, and where.</h2>
              <p className="txt">Drag the slider to see how the type holds up at other sizes. Switch weights, or type your own sample.</p>
            </Reveal>
            <TypeSpecimen {...p.font} className={fontClass} />
          </section>
        )}

        {(p.behance || p.live) && (
          <Reveal className="blk" style={{ paddingTop: 80 }}>
            <div className="box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <p style={{ color: "var(--color-ink)", fontSize: 17 }}>
                {p.live && p.kind === "vibecoded" ? "Don't take my word for it… click around." : "The full case study is on Behance too."}
              </p>
              <a className="cta" href={p.live && p.kind === "vibecoded" ? p.live : p.behance} target="_blank" rel="noreferrer">
                {p.live && p.kind === "vibecoded" ? `Try ${p.title}` : "View on Behance"} <span className="ar">↗</span>
              </a>
            </div>
          </Reveal>
        )}

        <Link href={`/work/${next.slug}`} className="next-proj">
          <div className="row">
            <div>
              <span className="label">next project →</span>
              <h3>{next.title}</h3>
              <p>{next.summary}</p>
            </div>
            <div className="thumb">
              <Image src={next.cover} alt={next.coverAlt} width={520} height={390} sizes="260px" />
            </div>
          </div>
        </Link>
      </article>

      {view !== null && view >= 0 && <Lightbox shots={shots} index={view} onClose={close} onGo={setView} />}
    </div>
  );
}
