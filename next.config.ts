import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['placewaifu.com','picsum.photos'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
