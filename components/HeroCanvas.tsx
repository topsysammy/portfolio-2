"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { profile } from "@/lib/data";
import { projects } from "@/lib/projects";

/**
 * Live-canvas hero: an endless, slowly drifting Figma-style canvas of real frames
 * from the projects. Drag to pan; click a frame to open that project's window.
 */
type Kind = "phone" | "web" | "cover" | "portrait";
type Frame = { slug: string; kind: Kind; src: string; label: string };
const SIZE: Record<Kind, [number, number]> = { phone: [180, 390], web: [420, 262], cover: [360, 270], portrait: [240, 300] };

const f = (slug: string, kind: Kind, file: string, label: string): Frame => ({
  slug,
  kind,
  src: kind === "portrait" ? "/portrait-card.jpg" : kind === "cover" ? projects.find((p) => p.slug === slug)!.cover : `/work/${slug}/screens/${file}.jpg`,
  label,
});

const COLUMNS: Frame[][] = [
  [f("duo-deck", "phone", "home", "Home"), f("adunni", "cover", "", "Cover"), f("duba", "phone", "welcome", "Welcome")],
  [f("saaspro", "web", "s1", "Dashboard"), f("dearly", "phone", "home", "Home"), f("adunni", "web", "s1", "Home")],
  [f("legacy-homes", "phone", "home", "Home"), f("legacy-homes-website", "web", "s1", "Hero"), f("legacy-homes", "phone", "property", "Property")],
  [f("folat", "phone", "home", "Home"), f("saaspro-website", "cover", "", "Cover"), f("mealio", "phone", "home", "Home")],
  [f("duba-website", "web", "s1", "Hero"), f("shoppa", "phone", "offline-home", "Home"), f("about", "portrait", "", "Temitope"), f("morenikeji", "web", "s1", "Hero")],
  [f("picta", "phone", "home", "Home"), f("duo-deck", "cover", "", "Cover"), f("folat", "phone", "customer", "Customer")],
  [f("legacy-homes-web", "web", "s3", "Saved properties"), f("legacy-homes", "phone", "crypto", "Pay with crypto"), f("legacy-homes-website", "cover", "", "Cover")],
  [f("saaspro-website", "web", "s1", "Home"), f("duo-deck", "phone", "play-deep-talk", "Deep Talk"), f("dearly", "cover", "", "Cover")],
  [f("dearly", "phone", "write", "Write"), f("saaspro", "web", "s3", "Products"), f("mealio", "phone", "meal-details", "Meal details")],
];

const GAP_X = 96;
const H = 1800; // world height (wraps vertically)
type Placed = Frame & { x: number; y: number; w: number; h: number };
const PLACED: Placed[] = [];
let W = 0;
COLUMNS.forEach((col, ci) => {
  const colW = Math.max(...col.map((c) => SIZE[c.kind][0]));
  const used = col.reduce((s, c) => s + SIZE[c.kind][1], 0);
  const gap = (H - used) / col.length;
  let y = (ci * 263) % H;
  col.forEach((c) => {
    const [w, h] = SIZE[c.kind];
    PLACED.push({ ...c, x: W + (colW - w) / 2, y, w, h });
    y += h + gap;
  });
  W += colW + GAP_X;
});

const title = (slug: string) => (slug === "about" ? "About" : projects.find((p) => p.slug === slug)?.title ?? slug);
const mod = (a: number, n: number) => ((a % n) + n) % n;

export default function HeroCanvas() {
  const ref = useRef<HTMLElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = () => window.matchMedia("(max-width: 760px)").matches;
    let scale = small() ? 0.62 : 1;
    let ox = -260, oy = -180, vx = 0, vy = 0;
    let drag: { x: number; y: number; moved: number; id: number } | null = null;
    let last = performance.now(), raf = 0, visible = true;
    const DRIFT_X = reduce ? 0 : -16, DRIFT_Y = reduce ? 0 : -9; // px per second

    const place = () => {
      const mx = 460, my = 420;
      PLACED.forEach((p, i) => {
        const node = items.current[i];
        if (!node) return;
        const x = (mod(p.x + ox + mx, W) - mx) * scale;
        const y = (mod(p.y + oy + my, H) - my) * scale;
        node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      });
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag) {
        // inertia after a drag, easing back into the slow drift
        vx += (DRIFT_X - vx) * Math.min(1, dt * 2.2);
        vy += (DRIFT_Y - vy) * Math.min(1, dt * 2.2);
        ox += vx * dt; oy += vy * dt;
      }
      place();
      if (visible) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    io.observe(el);

    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(".hc-cta")) return;
      drag = { x: e.clientX, y: e.clientY, moved: 0, id: e.pointerId };
      el.classList.add("grabbing");
      vx = vy = 0;
    };
    let lastMove = 0;
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = (e.clientX - drag.x) / scale, dy = (e.clientY - drag.y) / scale;
      drag.x = e.clientX; drag.y = e.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.moved > 6 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
      ox += dx; oy += dy;
      const now = performance.now(), dt = Math.max(1, now - lastMove) / 1000;
      lastMove = now;
      vx = dx / dt * 0.6; vy = dy / dt * 0.6;
      if (reduce) place();
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      el.dataset.dragged = drag.moved > 6 ? "1" : "";
      drag = null;
      el.classList.remove("grabbing");
      if (performance.now() - lastMove > 80) vx = vy = 0;
    };
    // swallow the click that ends a drag so it doesn't open a project
    const click = (e: MouseEvent) => {
      if (el.dataset.dragged) { e.preventDefault(); e.stopPropagation(); el.dataset.dragged = ""; }
    };
    const resize = () => { scale = small() ? 0.62 : 1; place(); };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <header className="hero hc" ref={ref}>
      <div className="hc-world">
        {PLACED.map((p, i) => (
          <a
            key={i}
            ref={(n) => { items.current[i] = n; }}
            href={p.slug === "about" ? "/about" : `#${p.slug}`}
            className={`hc-frame ${p.kind}`}
            style={{ width: p.w, height: p.h }}
            aria-label={p.slug === "about" ? "About Temitope" : `Open ${title(p.slug)}`}
            draggable={false}
          >
            <span className="hc-label">
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 3.5h10M1 8.5h10M3.5 1v10M8.5 1v10" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
              {title(p.slug)} / {p.label}
            </span>
            <span className="hc-img">
              <Image src={p.src} alt="" fill sizes={`${p.w}px`} draggable={false} />
            </span>
          </a>
        ))}
      </div>

      <div className="hc-fade" aria-hidden="true" />

      <span className="hc-cursor" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M2 1.5l11 5.2-4.6 1.4-1.9 4.6z" /></svg>
        <b>Topsy</b>
      </span>

      <div className="hc-center">
        <span className="hc-pill"><i />{profile.availability}</span>
        <h1>{profile.name}</h1>
        <p>
          Product designer &amp; design engineer. I design digital products{" "}
          <span className="serif">and build them with AI.</span>
        </p>
        <div className="hc-cta">
          <Link className="cta" href="/work">See all work <span className="ar">→</span></Link>
          <a className="cta light" href={profile.cal} target="_blank" rel="noreferrer">Book a call <span className="ar">↗</span></a>
        </div>
      </div>

      <div className="hc-bar" aria-hidden="true">
        <span><svg viewBox="0 0 16 16"><path d="M5.5 7V3.2a1.2 1.2 0 0 1 2.4 0V7m0-1.2V2.4a1.2 1.2 0 0 1 2.4 0V7m0-.8V3.6a1.2 1.2 0 0 1 2.4 0v5.6c0 3-2 5.3-4.8 5.3-2 0-3.1-.9-4.3-2.6L1.8 8.8a1.2 1.2 0 0 1 1.9-1.5L5.5 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>Drag to explore</span>
        <span className="sep" />
        <span>Click a frame to open it</span>
        <span className="sep" />
        <span className="mono">{projects.length} projects · 100%</span>
      </div>
    </header>
  );
}
