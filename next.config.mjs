/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [],
  },
});

const nextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
});

export default nextConfig;
