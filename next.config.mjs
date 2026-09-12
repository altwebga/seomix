/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Caches Turbopack's compiler artifacts on disk between dev server
    // restarts for faster cold-start/compile times (Next.js 16, beta).
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crm.seomix.ru",
        port: "",
        pathname: "/assets/**",
        search: "",
      },
    ],
  },
}

export default nextConfig
