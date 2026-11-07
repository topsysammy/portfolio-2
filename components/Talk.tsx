import Link from "next/link";
import Image from "next/image";
import { nav, profile, socials } from "@/lib/data";
import CopyEmail from "./CopyEmail";

export default function Talk() {
  return (
    <footer className="talk" id="contact">
      <div className="glow" />
      <div className="page">
        <div className="talk-inner">
          <div>
            <span className="label" style={{ color: "#8f8a9c" }}>let&apos;s make something together</span>
            <h2 style={{ marginTop: 18 }}>
              Let&apos;s <span className="serif">talk</span>
            </h2>
            <p className="lede">
              Whether you need a product designed, a website built, or just want to talk about an interesting idea — I&apos;d love to hear from you.
            </p>
          </div>
          <div className="talk-card">
            <div className="who">
              <Image src="/portrait-avatar.jpg" alt="" width={52} height={52} />
              <div>
                <b>{profile.name}</b>
                <span className="inline-flex items-center gap-2"><i className="dot" style={{ display: "inline-block" }} /> Open to work</span>
              </div>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.5, color: "#b9b5c4" }}>{profile.availabilityLong}</p>
            <CopyEmail className="copy">
              <span>{profile.email}</span>
              <small>copy</small>
            </CopyEmail>
            <div className="row">
              <a className="cta" style={{ background: "#fff", color: "#121212" }} href={profile.cal} target="_blank" rel="noreferrer">
                Book a call <span className="ar">↗</span>
              </a>
              <a className="cta ghost" href={profile.cv} download>
                Download CV ↓
              </a>
            </div>
          </div>
        </div>

        <div className="foot">
          <span>
            <b style={{ color: "#fff", fontWeight: 500 }}>{profile.name}</b> · {profile.role}
          </span>
          <nav aria-label="Footer">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
          <nav aria-label="Social">
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </nav>
          <span>© 2026 {profile.name} · ✦ Designed in Figma · Built with AI</span>
        </div>
      </div>
    </footer>
  );
}
