/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ],
    domains: ["uweaoe7wvyxytlgx.public.blob.vercel-storage.com"]
  },
};

module.exports = nextConfig;
