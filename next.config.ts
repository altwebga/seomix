import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://api.webga.ru/**")],
  },
};

export default nextConfig;
