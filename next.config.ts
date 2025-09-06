import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '**/lib/**': ['../versioned'],
  },
}

export default nextConfig
