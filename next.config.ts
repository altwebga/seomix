// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.seomix.ru",
        pathname: "/assets/**",
        // search: "*" // (необязательно) если хочешь явно разрешить любые query
      },
    ],
  },
};

export default nextConfig;
