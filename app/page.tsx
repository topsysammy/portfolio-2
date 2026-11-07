import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Workflow from "@/components/Workflow";
import Talk from "@/components/Talk";
import { profile, skills, tools } from "@/lib/data";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="over" id="main">
        <section className="page intro">
          <Reveal as="p">
            I&apos;m Topsy, a product designer who enjoys making complicated things feel{" "}
            <span className="serif">simple</span>.{" "}
            <span className="mute">I design in Figma, then build with AI — from idea to interface to a working product people can actually use.</span>
          </Reveal>
        </section>

        <section className="big-faded" aria-hidden="true"><h2>selected work</h2></section>

        <main className="page">
          <Reveal className="head">
            <span className="pill"><span className="dot" />{profile.availability}</span>
            <h2>I design digital products and build them <span className="serif">with AI.</span></h2>
            <p>Fintech, commerce and food apps for people in Nigeria and beyond — researched, designed in Figma, and shipped.</p>
            <div className="ctas">
              <a className="cta" href={profile.cal} target="_blank" rel="noreferrer">Book a call <span className="ar">↗</span></a>
              <Link className="cta light" href="/work">See all work →</Link>
            </div>
          </Reveal>

          <div className="grid">
            {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} priority={i < 2} />)}
          </div>

          <section className="sec">
            <Reveal className="sec-head">
              <div>
                <span className="label">built with ai</span>
                <h2>Idea → interface → <span className="serif" style={{ fontWeight: 400 }}>shipped</span></h2>
              </div>
              <p>Six steps I follow for everything I make. AI types; I make the calls.</p>
            </Reveal>
            <Reveal><Workflow /></Reveal>
          </section>

          <section className="sec">
            <Reveal className="sec-head">
              <div>
                <span className="label">toolbox</span>
                <h2>What I do, and what I use</h2>
              </div>
              <Link href="/about" className="cta light">More about me →</Link>
            </Reveal>
            <div className="toolgrid four">
              <Reveal className="box" delay={0}>
                <h4>Skills</h4>
                <div className="chips" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {skills.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </Reveal>
              {tools.map((g, i) => (
                <Reveal className="box" key={g.group} delay={(i + 1) * 80}>
                  <h4>{g.group}</h4>
                  <div className="chips">{g.items.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                </Reveal>
              ))}
            </div>
          </section>
        </main>
        <Talk />
      </div>
    </>
  );
}
