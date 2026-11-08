import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight, Plus_Jakarta_Sans, Figtree, Roboto } from "next/font/google";

export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
export const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
export const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-inter-tight", display: "swap" });

/* Project typefaces — only used by the case-study type specimens. */
export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jakarta", preload: false });
export const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-figtree", preload: false });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto", preload: false });
import { Kodchasan, Fredoka, DM_Mono, Instrument_Sans, Jost, Cormorant_Garamond, Manrope } from "next/font/google";
export const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", preload: false });
export const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-manrope", preload: false });
export const kodchasan = Kodchasan({ subsets: ["latin"], weight: "700", variable: "--font-kodchasan", preload: false });
export const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fredoka", preload: false });
export const dmMono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--font-dm-mono", preload: false });
export const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-instrument-sans", preload: false });
export const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost", preload: false });
export const projectFonts = [jakarta, figtree, roboto, kodchasan, fredoka, dmMono, instrumentSans, jost, cormorant, manrope].map((f) => f.variable).join(" ");
