import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://api.seomix.ru/**")],
  },
};

export default nextConfig;
