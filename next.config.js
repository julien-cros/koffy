/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*",
      },
    ],
  },
};

module.exports = nextConfig;
