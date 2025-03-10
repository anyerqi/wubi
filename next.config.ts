import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '/api/wubi': ['data/*.yaml'],
  },
};

export default nextConfig;
