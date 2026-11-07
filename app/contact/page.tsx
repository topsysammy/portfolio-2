import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { profile, socials } from "@/lib/data";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Temitope Samuel — product design roles, freelance projects and interesting ideas." };

export default function Contact() {
  return (
    <main id="main" className="page contact-hero" style={{ paddingBottom: 120 }}>
      <span className="pill"><span className="dot" />{profile.availability}</span>
      <h1 style={{ marginTop: 28 }}>
        Let&apos;s build something <span className="serif">great.</span>
      </h1>
      <div className="contact-grid">
        <Reveal>
          <p style={{ margin: 0, fontSize: "clamp(20px,1.8vw,26px)", lineHeight: 1.35, letterSpacing: "-0.03em", maxWidth: "30ch" }}>
            Whether you need a product designed, a website built, or just want to talk about an interesting idea — I&apos;d love to hear from you.
          </p>
          <p style={{ margin: "18px 0 0", color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.5, maxWidth: "44ch" }}>{profile.availabilityLong}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            <a className="cta" href={profile.cal} target="_blank" rel="noreferrer">Book a 30-min call <span className="ar">↗</span></a>
            <a className="cta light" href={`mailto:${profile.email}`}>Drop a line</a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ul className="rows">
            <li>
              <CopyEmail>
                <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span className="k">email · click to copy</span>
                  <span style={{ overflowWrap: "anywhere" }}>{profile.email}</span>
                </span>
                <span className="ar">⧉</span>
              </CopyEmail>
            </li>
            {socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span className="k">{s.short}</span>
                    {s.label}
                  </span>
                  <span className="ar">↗</span>
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} download>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="k">pdf</span>
                  Download CV
                </span>
                <span className="ar">↓</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
      <p style={{ marginTop: 100, fontSize: 13, color: "var(--color-ink-3)" }}>© 2026 {profile.name} · ✦ Designed in Figma · Built with AI</p>
    </main>
  );
}
