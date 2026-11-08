import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // case studies now open in a window on /work — keep old links working
  async redirects() {
    return [{ source: "/work/:slug(duba|shoppa|mealio|picta|duba-website|morenikeji|adunni|dearly|folat|saaspro)", destination: "/work#:slug", permanent: false }];
  },
};

export default nextConfig;
