/** @type {import('next').NextConfig} */
const nextConfig = {
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
