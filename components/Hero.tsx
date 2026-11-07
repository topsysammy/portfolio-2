import Image from "next/image";
import { profile } from "@/lib/data";

export default function Hero() {
  const name = `${profile.name} —`;
  return (
    <header className="hero">
      <div className="photo">
        <Image src="/portrait-card.jpg" alt="Temitope Samuel, smiling, in a white t-shirt" fill priority sizes="(max-width: 760px) 80vw, 40vw" />
      </div>
      <div className="loc">
        <p>Located<br />in Nigeria,<br />working worldwide</p>
        <span className="globe" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="12" cy="12" r="9.5" />
            <ellipse className="spin" cx="12" cy="12" rx="4.2" ry="9.5" />
            <path d="M2.5 12h19M4 7h16M4 17h16" />
          </svg>
        </span>
      </div>
      <div className="role">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 8v10H8" />
        </svg>
        <p>Product Designer<br />&amp; <em>Design Engineer</em></p>
      </div>
      <h1 className="big" aria-label={profile.name}>
        <div className="track" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <span key={i}>{name}</span>)}
        </div>
      </h1>
      <span className="scroll-hint">scroll ↓</span>
    </header>
  );
}
