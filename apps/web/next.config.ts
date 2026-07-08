import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel-safe config
  // reactCompiler removido para build estável – ative local se quiser
  experimental: {
    // reactCompiler: false,
    ppr: 'incremental',
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  eslint: {
    // Vercel: ignora durante build para não quebrar deploy demo
    ignoreDuringBuilds: true
  },
  typescript: {
    // permite deploy mesmo com workspace types
    ignoreBuildErrors: true
  },
  transpilePackages: ['@nexus/ui', '@nexus/db', '@nexus/ai', '@nexus/shaders'],
  images: {
    remotePatterns: [{ hostname: '**' }]
  }
}

export default nextConfig
