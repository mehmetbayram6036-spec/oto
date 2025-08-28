import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for Vercel deployment
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false
};

export default nextConfig;
