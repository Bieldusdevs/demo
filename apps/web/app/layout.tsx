import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEXUS AI STUDIO — Next 15 • R3F • WebGPU • Hono',
  description: 'Demonstração full-stack: Next.js 15, React 19, Three.js, WebGPU WGSL, OpenAI, LangChain, Qdrant, Drizzle, Redis, Bun, Hono, K8s, Prometheus.',
  metadataBase: new URL('https://nexus.ai')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#050608] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  )
}
