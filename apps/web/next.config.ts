import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  typescript: {
    ignoreBuildErrors: false
  },
  transpilePackages: ['@nexus/ui', '@nexus/db', '@nexus/ai', '@nexus/shaders'],
  images: {
    remotePatterns: [{ hostname: '**' }]
  }
}

export default nextConfig
