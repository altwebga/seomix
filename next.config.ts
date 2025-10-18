import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cp.seomix.ru",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
