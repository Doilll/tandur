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
      // Nanti kalau ada domain lain (misal dari Cloudinary/S3), tambahkan di sini
    ],
  },
};

module.exports = nextConfig;
