import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnm.westwing.com.br',
      },
    ],
  },
};

export default nextConfig;
