import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/task/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/task/:path*`,
      },
      {
        source: '/search/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/search/:path*`,
      },
      {
        source: '/actuator/health',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/actuator/health`,
      },
      {
        source: '/keycloak/health',
        destination: `${process.env.NEXT_PUBLIC_KEYCLOAK_HEALTH}/health`,
      },
      {
        source: '/kibana/api/status',
        destination: `${process.env.NEXT_PUBLIC_KIBANA_HEALTH}/api/status`,
      },
      {
        source: '/api/user/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/api/user/:path*`,
      },
    ];
  },
};

export default nextConfig;
