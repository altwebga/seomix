import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cp.seomix.ru",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
