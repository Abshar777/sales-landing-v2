import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF → WebP → fallback automatically for all next/image usages
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Pricing section avatar placeholder
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
