import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Talk from "@/components/Talk";
import { experience, howIWork, profile, skills, socials, tools } from "@/lib/data";

export const metadata: Metadata = { title: "About", description: "Temitope Samuel — product designer who designs in Figma and builds with AI." };

export default function About() {
  return (
    <>
      <main id="main" className="page split">
        <aside className="split-side">
          <div className="profile-card">
            <Image src="/portrait-card.jpg" alt="Temitope Samuel, smiling, in a white t-shirt" width={600} height={750} priority sizes="300px" />
          </div>
          <h1 className="split-title" style={{ marginTop: 18, fontSize: 18 }}>{profile.name}</h1>
          <p className="desc" style={{ marginTop: 2 }}>{profile.role} · {profile.location}</p>
          <span className="pill" style={{ marginTop: 16, alignSelf: "flex-start" }}><span className="dot" />Open to work</span>
          <div className="cs-links">
            <a href={profile.cv} download>Download CV ↓</a>
            <a className="alt" href={profile.cal} target="_blank" rel="noreferrer">Book a call ↗</a>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 22, fontSize: 13, color: "var(--color-ink-3)" }}>
            {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink">{s.label}</a>)}
          </div>
        </aside>

        <div>
          <span className="label">main bio</span>
          <h2 className="page-title" style={{ marginTop: 12 }}>
            Making complicated things feel <span className="serif">simple.</span>
          </h2>
          <Reveal className="about-bio">
            {profile.bio.map((b) => <p key={b.slice(0, 12)}>{b}</p>)}
          </Reveal>

          <section className="sec">
            <Reveal className="sec-head">
              <div>
                <span className="label">how i work</span>
                <h2>Understand → Explore → Design → Build → Iterate</h2>
              </div>
            </Reveal>
            <div className="how">
              {howIWork.map((h, i) => (
                <Reveal key={h.title} className="box" delay={i * 80}>
                  <span className="n">0{i + 1}</span>
                  <h4 style={{ fontSize: 18 }}>{h.title}</h4>
                  <p>{h.text}</p>
                  <span className="motto">{h.motto}</span>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="sec">
            <Reveal className="sec-head">
              <div>
                <span className="label">experience</span>
                <h2>Where I&apos;ve worked</h2>
              </div>
              <a className="cta light" href={profile.cv} download>Download CV ↓</a>
            </Reveal>
            <ol className="xp">
              {experience.map((x, i) => (
                <Reveal as="li" key={x.role + x.company} delay={i * 60}>
                  <span className="when">{x.dates}</span>
                  <div>
                    <h4>{x.role}</h4>
                    <p className="at">{x.company}{x.where ? ` · ${x.where}` : ""}</p>
                    <p>{x.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section className="sec">
            <Reveal className="sec-head">
              <div>
                <span className="label">tools</span>
                <h2>What I reach for</h2>
              </div>
            </Reveal>
            <div className="toolgrid">
              {tools.map((g, i) => (
                <Reveal key={g.group} className="box" delay={i * 80}>
                  <h4>{g.group}</h4>
                  <div className="chips">{g.items.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                </Reveal>
              ))}
            </div>
            <Reveal className="box" style={{ marginTop: 12 }}>
              <h4>Skills</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {skills.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <Talk />
    </>
  );
}
