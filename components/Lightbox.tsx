"use client";
import { useEffect } from "react";

export type Shot = { src: string; alt: string };

export default function Lightbox({ shots, index, onClose, onGo }: { shots: Shot[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onGo((index + 1) % shots.length);
      if (e.key === "ArrowLeft") onGo((index - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = prev; };
  }, [index, shots.length, onClose, onGo]);

  const s = shots[index];
  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={s.alt} onClick={onClose}>
      <div className="viewer-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={s.src} src={s.src} alt={s.alt} onClick={(e) => e.stopPropagation()} />
      </div>
      <div className="viewer-foot" onClick={(e) => e.stopPropagation()}>
        <span>{s.alt}</span>
        <span>{index + 1} / {shots.length}</span>
      </div>
      <button className="viewer-btn viewer-close" aria-label="Close" autoFocus onClick={onClose}>✕</button>
      <button className="viewer-btn viewer-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onGo((index - 1 + shots.length) % shots.length); }}>←</button>
      <button className="viewer-btn viewer-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onGo((index + 1) % shots.length); }}>→</button>
    </div>
  );
}
