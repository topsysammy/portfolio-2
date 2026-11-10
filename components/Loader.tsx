"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

/**
 * Opening scene: one Figma-style frame on an empty canvas. The "Topsy" cursor selects it,
 * then the view zooms out and the frame lands exactly on the hero headline as the canvas
 * of projects appears around it. Plays once per session; any key or click skips it.
 */
type Phase = "idle" | "frame" | "name" | "cursor" | "select" | "zoom" | "done";
type Box = { x: number; y: number; w: number; h: number; font: string; size: number; spacing: string; lh: string };

const PAD_X = 28, PAD_Y = 18;

export default function Loader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [box, setBox] = useState<Box | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.remove("op-intro");
      html.classList.add("seen", "ready");
      setPhase("done");
      return;
    }

    // Land on the hero headline when there is one (home page); otherwise a centred frame.
    html.classList.add("op-intro");
    const h1 = document.querySelector<HTMLElement>(".hc-center h1");
    if (h1) {
      const r = h1.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      setBox({ x: r.left, y: r.top, w: r.width, h: r.height, font: cs.fontFamily, size: parseFloat(cs.fontSize), spacing: cs.letterSpacing, lh: cs.lineHeight });
    } else {
      const size = Math.min(120, Math.max(44, innerWidth * 0.08));
      const w = Math.min(innerWidth - 64, size * 8.2), h = size * 1.05;
      setBox({ x: (innerWidth - w) / 2, y: (innerHeight - h) / 2, w, h, font: "var(--font-display)", size, spacing: "-0.055em", lh: "0.9" });
    }

    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    const finish = () => {
      try { sessionStorage.setItem("seen-intro", "1"); } catch {}
      html.classList.add("op-landed");
      html.classList.remove("op-intro", "op-zoom");
      setPhase("done");
    };
    // ~6s in total: frame, name, cursor, selection, then the zoom out to the canvas
    at(175, () => setPhase("frame"));
    at(850, () => setPhase("name"));
    at(1575, () => setPhase("cursor"));
    at(2475, () => setPhase("select"));
    at(3750, () => { setPhase("zoom"); html.classList.add("ready", "op-zoom"); });
    at(6000, finish);

    const skip = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      html.classList.add("ready");
      setPhase("zoom");
      timers.current.push(window.setTimeout(finish, 450));
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (phase === "done") return null;

  const f = box && { left: box.x - PAD_X, top: box.y - PAD_Y, width: box.w + PAD_X * 2, height: box.h + PAD_Y * 2 };
  const origin = box ? `${box.x + box.w / 2}px ${box.y + box.h / 2}px` : "50% 50%";
  const vars = f ? ({ "--fx": `${f.left}px`, "--fy": `${f.top}px`, "--fw": `${f.width}px`, "--fh": `${f.height}px`, "--origin": origin } as React.CSSProperties) : undefined;

  return (
    <div className={`intro-scene is-${phase}`} style={vars} aria-hidden="true">
      {f && box && (
        <div className="intro-stage">
          <div className="intro-bg" />
          <div className="intro-frame" style={f}>
            <span className="intro-label">
              <svg viewBox="0 0 12 12"><path d="M1 3.5h10M1 8.5h10M3.5 1v10M8.5 1v10" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
              {profile.name} / Portfolio
            </span>
            <span className="intro-name" style={{ left: PAD_X, top: PAD_Y, width: box.w, height: box.h, fontFamily: box.font, fontSize: box.size, letterSpacing: box.spacing, lineHeight: box.lh }}>
              {profile.name}
            </span>
            <span className="intro-sel"><i className="tl" /><i className="tr" /><i className="bl" /><i className="br" /></span>
            <span className="intro-size">{Math.round(f.width)} × {Math.round(f.height)}</span>
          </div>
          <span className="intro-cursor">
            <svg viewBox="0 0 16 16"><path d="M2 1.5l11 5.2-4.6 1.4-1.9 4.6z" /></svg>
            <b>Topsy</b>
          </span>
        </div>
      )}
      <small className="intro-skip">click or press any key to skip</small>
    </div>
  );
}
