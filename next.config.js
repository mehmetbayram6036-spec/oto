/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['nodemailer']
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

module.exports = nextConfig;
