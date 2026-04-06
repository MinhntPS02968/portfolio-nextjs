import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_DEBUG === "false",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
