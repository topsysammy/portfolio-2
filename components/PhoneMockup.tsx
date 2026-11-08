import Image from "next/image";
import bars from "@/lib/screen-bars.json";

type Bar = { bg: string; fg: string };
const BARS = bars as Record<string, Bar>;

/** iPhone-style mockup: titanium frame, side buttons, Dynamic Island and (for screenshots without one) a 9:41 status bar. */
export default function PhoneMockup({
  src,
  alt,
  statusBar = true,
  island = true,
  sizes = "200px",
}: {
  src: string;
  alt: string;
  statusBar?: boolean;
  island?: boolean;
  sizes?: string;
}) {
  const bar = BARS[src] ?? { bg: "#ffffff", fg: "#000000" };
  return (
    <span className="iphone">
      <span className="iphone-btn iphone-btn-action" aria-hidden="true" />
      <span className="iphone-btn iphone-btn-up" aria-hidden="true" />
      <span className="iphone-btn iphone-btn-down" aria-hidden="true" />
      <span className="iphone-btn iphone-btn-power" aria-hidden="true" />
      <span className="iphone-screen" style={{ background: bar.bg }}>
        {statusBar && (
          <span className="iphone-bar" style={{ color: bar.fg }} aria-hidden="true">
            <span>9:41</span>
            <span className="iphone-icons">
              <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="0.8" /><rect x="5" y="5.5" width="3" height="6.5" rx="0.8" /><rect x="10" y="3" width="3" height="9" rx="0.8" /><rect x="15" y="0" width="3" height="12" rx="0.8" /></svg>
              <svg viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10 10 0 0 0 8 .4 10 10 0 0 0 .8 3.3L2 4.6a8.3 8.3 0 0 1 6-2.4Zm0 3.6c1.4 0 2.6.5 3.6 1.4L12.8 6A6.9 6.9 0 0 0 8 4a6.9 6.9 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.5l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z" /></svg>
              <svg viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="19" height="8" rx="2" /><path d="M24 4v4c.8-.3 1.4-1.1 1.4-2S24.8 4.3 24 4Z" opacity="0.5" /></svg>
            </span>
          </span>
        )}
        {island && <span className="iphone-island" aria-hidden="true" />}
        <span className={`iphone-shot ${statusBar ? "has-bar" : ""}`}>
          <Image src={src} alt={alt} width={393} height={852} sizes={sizes} />
        </span>
        <span className="iphone-home" aria-hidden="true" />
      </span>
    </span>
  );
}
