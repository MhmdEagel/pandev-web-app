import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [{
      hostname: "res.cloudinary.com"
    }]
  },
  reactCompiler: true,
};

export default nextConfig;
