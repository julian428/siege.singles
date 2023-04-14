/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt', '@prisma/client', 'fs', "@mapbox"],
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
}

module.exports = nextConfig
