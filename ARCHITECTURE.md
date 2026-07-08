# Nexus AI Studio – Arquitetura Técnica

## Stacks utilizados (24)

1. **Next.js 15** – App Router, Turbopack, PPR, Server Actions
2. **React 19** – use(), useOptimistic, Server Components, Streaming Suspense
3. **TypeScript 5.6** – strict true end-to-end
4. **Bun 1.1** – runtime API 4x Node, bundler nativo
5. **Hono 4.5** – edge router <1ms
6. **PostgreSQL 16**
7. **Drizzle ORM** – type-safe, migrations Kit
8. **Redis 7** – cache L2, rate limit, pub/sub
9. **React Three Fiber 8.17**
10. **Three.js r170**
11. **GSAP 3.12 + ScrollTrigger**
12. **Motion 11**
13. **WebGPU** – compute shaders nativos
14. **GLSL** – raymarching, post FX
15. **WGSL** – fluid sim compute
16. **OpenAI SDK 4** – gpt-4o, text-embedding-3-large
17. **LangChain** – retriever, chains
18. **Qdrant 1.9** – vector DB 1536d HNSW
19. **Docker** – multi-stage
20. **Kubernetes** – HPA 2-10
21. **Prometheus** – metrics /metrics
22. **Grafana 11**
23. **Turborepo 2** – cache remoto
24. **CI/CD GitHub Actions**

## Performance targets
- API p95 < 8ms
- R3F 240 FPS
- LCP < 1.2s
- TTFB edge < 45ms

## RAG Flow
prompt → Hono → LangChain retriever → Qdrant similarity → OpenAI streaming → React 19 use() → Redis cache 120s
