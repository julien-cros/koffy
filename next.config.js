/** @type {import('next').NextConfig} */
const nextConfig = {
	
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;

