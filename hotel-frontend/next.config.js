/** @type {import('next').NextConfig} 
const nextConfig = {
  images: {
    domains: ["hotel-backend-jrld.onrender.com"],
  },
  reactStrictMode: true,
};
*/

const nextjsDistDir = join("src", require("./src/next.config.js").distDir);
const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
    images: {
      domains: ['hotel-backend-jrld.onrender.com'],
    }
  }
});

module.exports = nextjsServer;
