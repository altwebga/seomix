/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.seomix.ru",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
  },
};

module.exports = nextConfig;
