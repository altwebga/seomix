/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.webga.ru",
            },
            {
                protocol: "https",
                hostname: "storage.yandexcloud.net",
            },
        ],
    }
};

export default nextConfig;
