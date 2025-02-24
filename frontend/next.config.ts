import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/task/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/task/:path*`,
      },
    ];
  },
};

export default nextConfig;
