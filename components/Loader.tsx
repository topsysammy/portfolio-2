"use client";
import { useEffect, useState } from "react";

const words = ["Hello", "Bawo", "Ndewo", "Sannu", "Hi there!", "Let's build something."];

export default function Loader() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.add("ready");
      setDone(true);
      return;
    }
    const finish = () => {
      setDone(true);
      try { sessionStorage.setItem("seen-intro", "1"); } catch {}
      setTimeout(() => html.classList.add("ready"), 350);
    };
    let n = 0;
    const tick = setInterval(() => {
      n += 1;
      if (n >= words.length) {
        clearInterval(tick);
        setTimeout(finish, 500);
      } else setI(n);
    }, n === 0 ? 360 : 240);
    const skip = () => { clearInterval(tick); finish(); };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      clearInterval(tick);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div className={`loader ${done ? "done" : ""}`} aria-hidden="true">
      <p><span className="dotb" /><b key={i} style={{ fontWeight: 500 }}>{words[i]}</b></p>
      <small>press any key to skip</small>
    </div>
  );
}
