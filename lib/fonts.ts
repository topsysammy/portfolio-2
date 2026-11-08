import localFont from "next/font/local";

/*
 * All fonts are self-hosted from ./font-files (latin subset, variable where available).
 * next/font/google fails intermittently on Vercel builds, so nothing is fetched at build time.
 */

export const geist = localFont({ src: [{ path: "./font-files/geist-normal.woff2", weight: "400 700", style: "normal" }], variable: "--font-geist", display: "swap" });
export const geistMono = localFont({ src: [{ path: "./font-files/geist-mono-normal.woff2", weight: "400 500", style: "normal" }], variable: "--font-geist-mono", display: "swap" });
export const instrument = localFont({
  src: [
    { path: "./font-files/instrument-serif-normal.woff2", weight: "400", style: "normal" },
    { path: "./font-files/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});
export const interTight = localFont({ src: [{ path: "./font-files/inter-tight-normal.woff2", weight: "500 700", style: "normal" }], variable: "--font-inter-tight", display: "swap" });

/* Project typefaces — used by the project windows (specimens and wordmarks). */
export const jakarta = localFont({ src: [{ path: "./font-files/jakarta-normal.woff2", weight: "400 700", style: "normal" }], variable: "--font-jakarta", preload: false });
export const figtree = localFont({ src: [{ path: "./font-files/figtree-normal.woff2", weight: "400 700", style: "normal" }], variable: "--font-figtree", preload: false });
export const roboto = localFont({ src: [{ path: "./font-files/roboto-normal.woff2", weight: "400 700", style: "normal" }], variable: "--font-roboto", preload: false });
export const kodchasan = localFont({ src: [{ path: "./font-files/kodchasan-normal.woff2", weight: "700", style: "normal" }], variable: "--font-kodchasan", preload: false });
export const fredoka = localFont({ src: [{ path: "./font-files/fredoka-normal.woff2", weight: "400 700", style: "normal" }], variable: "--font-fredoka", preload: false });
export const dmMono = localFont({ src: [{ path: "./font-files/dm-mono-normal.woff2", weight: "400", style: "normal" }], variable: "--font-dm-mono", preload: false });
export const instrumentSans = localFont({ src: [{ path: "./font-files/instrument-sans-normal.woff2", weight: "400 600", style: "normal" }], variable: "--font-instrument-sans", preload: false });
export const jost = localFont({ src: [{ path: "./font-files/jost-normal.woff2", weight: "400 500", style: "normal" }], variable: "--font-jost", preload: false });
export const cormorant = localFont({
  src: [
    { path: "./font-files/cormorant-latin.woff2", weight: "300 500", style: "normal" },
    { path: "./font-files/cormorant-latin-italic.woff2", weight: "300 500", style: "italic" },
  ],
  variable: "--font-cormorant",
  preload: false,
});
export const manrope = localFont({ src: [{ path: "./font-files/manrope-latin.woff2", weight: "400 600", style: "normal" }], variable: "--font-manrope", preload: false });

export const shadowsTwo = localFont({ src: [{ path: "./font-files/shadows-two-normal.woff2", weight: "400", style: "normal" }], variable: "--font-shadows", preload: false });
export const dmSans = localFont({ src: [{ path: "./font-files/dm-sans-normal.woff2", weight: "400 600", style: "normal" }], variable: "--font-dm-sans", preload: false });

export const projectFonts = [jakarta, figtree, roboto, kodchasan, fredoka, dmMono, instrumentSans, jost, cormorant, manrope, shadowsTwo, dmSans]
  .map((f) => f.variable)
  .join(" ");
