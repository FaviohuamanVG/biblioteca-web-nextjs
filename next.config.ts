import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || 'https://biblioteca-api.mangoground-cc35a231.eastus2.azurecontainerapps.io';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
