/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.moralis.io",
        port: "2053",
        pathname: "/ipfs/**",
      },
    ],
  },
};

module.exports = nextConfig;
