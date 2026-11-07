"use client";
import { useEffect, useRef, useState } from "react";
import { workflow } from "@/lib/data";

const DUR = 3600;
const toolsFor: Record<string, string[]> = {
  Idea: ["FigJam", "Notes", "Claude"],
  Design: ["Figma", "FigJam"],
  Prompt: ["Claude", "ChatGPT", "Gemini"],
  Build: ["Claude", "React", "Next.js"],
  Iterate: ["Real users", "Figma"],
  Ship: ["Vercel", "GitHub"],
};

export default function Workflow() {
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const t = setTimeout(() => setOn((o) => (o + 1) % workflow.length), DUR);
    return () => clearTimeout(t);
  }, [on, auto, visible]);

  const step = workflow[on];
  return (
    <div className="ways" ref={ref} style={{ "--on": on } as React.CSSProperties}>
      <ol>
        {workflow.map((w, i) => (
          <li key={w.title}>
            <button type="button" className={i === on ? "is-on" : ""} onClick={() => { setOn(i); setAuto(false); }} aria-pressed={i === on}>
              <span className="n">0{i + 1}</span>
              <span className="t">{w.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="ways-stage" aria-live="polite">
        <div className="glow" />
        <div className="num">0{on + 1}</div>
        <div key={on} className="swap" style={{ position: "relative" }}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <div className="ways-tools">{toolsFor[step.title].map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <div className="ways-dots">
          {workflow.map((w, i) => (
            <i key={w.title} className={i === on ? (auto && visible ? "on" : "done") : i < on ? "done" : ""} style={{ "--dur": `${DUR}ms` } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
}
