import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page contact-hero" style={{ paddingBottom: 160 }}>
      <span className="label">404</span>
      <h1 style={{ marginTop: 16 }}>This page went <span className="serif">offline.</span></h1>
      <Link href="/" className="cta" style={{ marginTop: 32 }}>Back home →</Link>
    </main>
  );
}
