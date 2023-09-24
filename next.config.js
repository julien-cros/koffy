/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
