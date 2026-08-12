import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the dev tools indicator that sits at bottom-left in development.
   * It never shipped to production, but it sits on top of the layout while
   * reviewing the design.
   */
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
