import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // force Next.js to use this folder as root
  },
};

export default nextConfig;
