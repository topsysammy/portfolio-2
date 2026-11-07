"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";

export default function Nav() {
  const path = usePathname();
  const home = path === "/";
  const [onHero, setOnHero] = useState(home);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setOnHero(home && y < window.innerHeight - 90);
      setHide(y > 240 && y > last + 2);
      if (y < last - 2 || y < 240) setHide(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [home]);

  return (
    <header className={`nav ${onHero ? "on-hero" : "solid"} ${hide ? "hide" : ""}`}>
      <Link href="/" className="brandmark" aria-label="Temitope Samuel, home">
        <span className="c">©</span>
        <span className="roll">
          <span>Design by Topsy</span>
          <span>Temitope Samuel</span>
        </span>
      </Link>
      <nav className="navlinks" aria-label="Main">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
