import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/task/:path*',
        destination: `http://localhost:5010/task/:path*`,
      },
      {
        source: '/search/:path*',
        destination: `http://localhost:5010/search/:path*`,
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
      {
        source: '/search/fields/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/search/fields/:path*`,
      },
      {
        source: '/kafka/publish/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/kafka/publish/:path*`,
      },
      {
        source: '/questions/answers/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/questions/answers/:path*`,
      },
      {
        source: '/questions/assessment-questions/config',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/questions/assessment-questions/config`,
      },
      {
        source: '/api/event',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/api/event`,
      },
    ];
  },
};

export default nextConfig;
