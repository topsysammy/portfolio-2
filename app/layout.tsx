import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geist, geistMono, instrument, interTight, projectFonts } from "@/lib/fonts";
import ProjectPortal from "@/components/ProjectPortal";
import { MediaProvider } from "@/components/MediaContext";
import { presentVideos } from "@/lib/media";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Toast from "@/components/Toast";

const title = "Temitope Samuel · Product Designer & Design Engineer";
const description =
  "Temitope Samuel (Topsy) is a product designer in Nigeria who designs digital products in Figma and builds them with AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://topsysammy.vercel.app"),
  title: { default: title, template: "%s · Temitope Samuel" },
  description,
  openGraph: { title, description, images: ["/portrait-card.jpg"], type: "website" },
  twitter: { card: "summary_large_image", title, description, creator: "@Topsysammy" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#ffffff", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${interTight.variable} ${projectFonts}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(sessionStorage.getItem('seen-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('seen','ready');else d.classList.add('op-intro')}catch(e){document.documentElement.classList.add('seen','ready')}`,
          }}
        />
        <noscript><style>{`.intro-scene{display:none}.rv{opacity:1;transform:none}.hc-world,.hc-center>*,.hc-bar,.hc-cursor{opacity:1!important;translate:none!important}`}</style></noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Loader />
        <Nav />
        <MediaProvider videos={presentVideos()}>
          {children}
          <ProjectPortal />
        </MediaProvider>
        <Toast />
      </body>
    </html>
  );
}
