import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root to this project; otherwise Next.js picks up a stray
  // package-lock.json higher up and watches the whole user folder.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
