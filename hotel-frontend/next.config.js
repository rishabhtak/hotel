/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hotel-backend-jrld.onrender.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hotel-backend-jrld.onrender.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
