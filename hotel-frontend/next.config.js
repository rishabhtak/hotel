/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hotel-backend-jrld.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hotel-backend-jrld.onrender.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
