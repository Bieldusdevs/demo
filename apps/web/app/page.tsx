import { Suspense } from 'react'
import HeroScene from '@/components/r3f/HeroScene'
import StackMarquee from '@/components/StackMarquee'
import StudioClient from '@/components/StudioClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <main className="relative grain">
      {/* HERO 3D */}
      <section className="relative h-[100svh] overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050608]" />}>
          <HeroScene />
        </Suspense>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="text-[11px] tracking-[0.28em] text-emerald-300/80 mb-5">
            NEXT.JS 15 • REACT 19 • WEBGPU • HONO • BUN
          </div>
          <h1 className="text-[clamp(44px,8vw,124px)] font-[700] leading-[0.86] tracking-[-0.03em]">
            NEXUS<br/>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              AI STUDIO
            </span>
          </h1>
          <p className="mt-6 max-w-[680px] text-zinc-300 text-[17px] leading-relaxed">
            Demonstração full-stack cinematográfica. R3F + WebGPU WGSL, 
            OpenAI + LangChain RAG, Qdrant, Drizzle, Redis, Prometheus.
          </p>
          <div className="mt-9 flex gap-3 pointer-events-auto">
            <a href="#studio" className="px-6 py-3 rounded-full bg-white text-black font-medium">Abrir Studio →</a>
            <a href="https://github.com" className="px-6 py-3 rounded-full border border-zinc-700 text-zinc-200">Ver código</a>
          </div>
          <div className="mt-7 text-[11px] text-zinc-500 tracking-wider">
            P95 &lt;8ms • 240 FPS R3F • SSE Streaming React 19
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] to-transparent z-10" />
      </section>

      <StackMarquee />

      {/* STUDIO */}
      <section id="studio" className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10">
          <div>
            <div className="text-emerald-300 text-xs tracking-widest mb-3">REACT 19 • SERVER ACTIONS</div>
            <h2 className="text-[42px] font-[650] leading-tight tracking-tight mb-4">
              Playground RAG<br/>em tempo real
            </h2>
            <p className="text-zinc-400 max-w-lg">
              use() + Suspense streaming. Hono @ Bun edge. Qdrant vector search.
              OpenAI gpt-4o via LangChain. Métricas Prometheus live.
            </p>
          </div>
          <StudioClient />
        </div>
      </section>

      {/* SHADER WALL */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-8">WebGPU • WGSL • GLSL</h3>
          <div className="grid md:grid-cols-3 gap-5 text-sm text-zinc-400">
            {[
              ['Raymarching SDF', 'Fragment shader 60fps'],
              ['Fluid Sim GPU', 'Compute WGSL'],
              ['Post FX Pipeline', 'Bloom + Chromatic']
            ].map(([t,s])=>(
              <div key={t} className="rounded-2xl bg-zinc-950 border border-zinc-900 p-5">
                <div className="text-zinc-100 font-medium mb-1">{t}</div>
                <div>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-20 bg-[#090a0e] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            ['p95 API', '< 8 ms', 'Hono + Bun'],
            ['R3F', '240 FPS', 'WebGPU'],
            ['Vector', '1536-d', 'Qdrant'],
            ['Uptime', '99.99%', 'K8s HPA']
          ].map(([k,v,s])=>(
            <div key={k}>
              <div className="text-zinc-500 text-xs">{k}</div>
              <div className="text-3xl font-semibold text-emerald-300 mt-1">{v}</div>
              <div className="text-zinc-500 text-xs mt-1">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 text-center text-zinc-500 text-sm px-6">
        Next.js 15 • React 19 • TypeScript • Bun • Hono • PostgreSQL • Drizzle • Redis • R3F • Three.js • GSAP • Motion • WebGPU • OpenAI • LangChain • Qdrant • Docker • Kubernetes • Prometheus • Grafana • Turborepo • CI/CD
        <br/><br/>© 2026 Nexus AI Studio — Built to impress.
      </footer>
    </main>
  )
}
