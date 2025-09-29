import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Auth routes (no JWT required)
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:8084/auth/:path*",
      },
      // Protected API routes (JWT middleware applied)
      {
        source: "/api/:path*",
        destination: "http://localhost:8084/api/:path*",
      },
    ];
  },
};

export default nextConfig;
