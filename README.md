# NEXUS AI STUDIO
### Demonstração Full-Stack Ultra Premium

**Stack completo impressionante – Visual + Técnico**

> Next.js 15 • React 19 • TypeScript • Bun • Hono • PostgreSQL • Drizzle ORM • Redis • React Three Fiber • Three.js • GSAP • Motion • WebGPU • GLSL/WGSL • OpenAI SDK • LangChain • Qdrant • Docker • Kubernetes • Prometheus • Grafana • Turborepo • CI/CD

---

## 🎯 Conceito

**Nexus AI Studio** – Um laboratório 3D interativo para geração e análise de conteúdo com IA.

Landing cinematográfica WebGPU + R3F → Dashboard RAG em tempo real → Playground de shaders → Métricas observáveis Prometheus/Grafana.

Um site que prova arquitetura enterprise de ponta a ponta.

---

## 🧱 Arquitetura Monorepo (Turborepo)

```
nexus-demo/
├── apps/
│   ├── web/              # Next.js 15 + React 19 + App Router
│   │   ├── app/
│   │   │   ├── (landing)/
│   │   │   ├── studio/
│   │   │   └── api/edge/
│   │   └── components/r3f/
│   └── api/              # Hono + Bun (Edge API)
│       └── src/
├── packages/
│   ├── db/               # Drizzle ORM + PostgreSQL
│   ├── ui/               # Design System
│   ├── ai/               # OpenAI + LangChain + Qdrant
│   └── shaders/          # GLSL / WGSL
├── k8s/                  # Kubernetes manifests
├── monitoring/           # Prometheus + Grafana
└── docker-compose.yml
```

**Fluxo de dados:**

Browser (R3F/WebGPU)
 ↓
Next.js 15 Edge (React 19 Server Components)
 ↓
Hono API @ Bun (sub-5ms)
 ↓
├─ PostgreSQL + Drizzle
├─ Redis Cache
├─ Qdrant Vector DB
└─ OpenAI + LangChain

Observabilidade: Prometheus → Grafana

---

## ⚡ Stack Breakdown

**Frontend Cinematográfico:**
- Next.js 15.1 – App Router, Turbopack, Server Actions
- React 19 – use(), useOptimistic, Server Components
- React Three Fiber 8.17 + Three.js r170
- GSAP 3.12 + ScrollTrigger
- Motion (Framer Motion 11)
- WebGPU + WGSL custom shaders
- GLSL postprocessing

**Backend Ultra:**
- Bun 1.1 – 4x faster que Node
- Hono 4.5 – Edge-first <1ms router
- PostgreSQL 16
- Drizzle ORM – type-safe SQL
- Redis 7 – cache + rate limit + pub/sub
- Qdrant – vector search 1536d
- OpenAI SDK 4 + LangChain

**DevOps Enterprise:**
- Turborepo – monorepo cache
- Docker multi-stage
- Kubernetes HPA
- Prometheus + Grafana
- GitHub Actions CI/CD

---

## 🚀 Quick Start

```bash
# 1. Clone + install com Bun
bun install

# 2. Subir infra
docker-compose up -d
# → PostgreSQL :5432
# → Redis :6379
# → Qdrant :6333
# → Prometheus :9090
# → Grafana :3001

# 3. Migrate DB
bun run db:push

# 4. Dev Turborepo
bun turbo dev
# web → http://localhost:3000
# api → http://localhost:8787
```

---

## 📦 Apps

### apps/web – Next.js 15
- React Server Components + Suspense streaming
- R3F Canvas full-screen WebGPU fallback
- GSAP ScrollTrigger cinematic sections
- Motion layout animations
- Edge runtime OpenAI streaming

### apps/api – Hono + Bun
- `/ai/chat` – OpenAI streaming + LangChain RAG
- `/vectors/search` – Qdrant similarity
- `/metrics` – Prometheus exporter
- Redis rate limiting: 60req/min
- <8ms p95 latency

---

## 🧠 AI Pipeline

```
User prompt → Hono
 → LangChain retriever (Qdrant)
 → OpenAI gpt-4o + embeddings text-embedding-3-large
 → Stream SSE → React 19 use()
 → Redis cache
```

---

## 📊 Observabilidade

Prometheus scrape `/metrics` a cada 5s.
Grafana dashboards incluídos:
- API latency p50/p95/p99
- RPS, error rate
- Postgres connections
- Redis hit rate
- OpenAI tokens/cost
- Qdrant vector latency

Login Grafana: admin / nexus

---

## ☸️ Kubernetes

```bash
kubectl apply -f k8s/
# deployments: web, api
# hpa: 2-10 replicas
# service mesh ready
```

Ver k8s/ completo.

---

Feito para impressionar investidores, tech leads e recrutadores FAANG.
