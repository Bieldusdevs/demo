'use client'
import { motion } from 'motion/react'

const stacks = [
  'Next.js 15','React 19','TypeScript','Bun','Hono','PostgreSQL','Drizzle ORM',
  'Redis','React Three Fiber','Three.js','GSAP','Motion','WebGPU','GLSL','WGSL',
  'OpenAI SDK','LangChain','Qdrant','Docker','Kubernetes','Prometheus','Grafana','Turborepo','CI/CD'
]

export default function StackMarquee() {
  return (
    <div className="border-y border-zinc-900 py-4 overflow-hidden bg-[#07080c]">
      <motion.div
        className="flex gap-10 whitespace-nowrap text-[13px] text-zinc-400"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
      >
        {[...stacks, ...stacks].map((s,i)=>(
          <span key={i} className="tracking-wide">✦ {s}</span>
        ))}
      </motion.div>
    </div>
  )
}
