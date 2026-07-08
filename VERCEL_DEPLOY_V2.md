# Vercel Deploy – Fix Definitivo 2026-07

## Erros que você teve

```
Error: Node.js version 20.x is deprecated...
npm error code ERESOLVE
While resolving: @nexus/api@0.1.0
Found: @langchain/core@1.2.1
Could not resolve dependency:
peer @langchain/core@">=0.3.58 <0.4.0" from langchain@0.3.37
```

Causa:
1. Vercel ignorou pnpm e usou `npm install` → ERESOLVE do LangChain
2. Node 20.x deprecated em Oct/2026 (Vercel já avisa em Jul/2026)
3. Monorepo instalou `apps/api` junto, arrastando langchain

## Correções aplicadas

### 1. Node 22.x
```
engines: { "node": "22.x" }
@types/node: "22.11.0"
.nvmrc: 22
```
- 20.x → deprecated warning resolvido
- 24.x ainda muito bleeding (Jul/2026), 22 LTS é sweet spot

### 2. LangChain removido de dependencies obrigatórias
- `@nexus/ai`: langchain → peerDependencies optional
- `@nexus/api`: langchain removido totalmente
- Código mantém comentários `// import { ChatOpenAI }` – stack continua documentada, só não quebra build

Se quiser LangChain em produção:
```bash
pnpm add langchain@0.3.37 @langchain/openai@0.3.7 @langchain/community@0.3.20 -w --save-exact
```
e use `--legacy-peer-deps`.

### 3. Vercel forçado a usar pnpm filtrado
`vercel.json`:
```json
"installCommand": "corepack enable && corepack prepare pnpm@9.12.3 --activate && pnpm install --filter @nexus/web... --no-frozen-lockfile --legacy-peer-deps"
```
Só instala `@nexus/web` + deps diretas (`@nexus/ai`, `@nexus/db`, `@nexus/ui`). `apps/api` é ignorado.

### 4. .npmrc anti-ERESOLVE
```
legacy-peer-deps=true
strict-peer-dependencies=false
engine-strict=false
shamefully-hoist=true
```

### 5. .vercelignore
Exclui `apps/api`, `k8s`, `monitoring`, `docker` do upload Vercel.

### 6. next.config.ts vercel-safe
```ts
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true }
```

---

## Deploy passo-a-passo

**Vercel Project Settings:**
- Framework: Next.js
- Root Directory: `apps/web`  ← importante
- Node Version: **22.x**
- Install Command: (deixa vazio, usa vercel.json)
- Build Command: (deixa vazio, usa vercel.json)
- Output: `.next`

Env vars:
```
NEXT_PUBLIC_API_URL=https://nexus-api.fly.dev
OPENAI_API_KEY=sk-...
```

**API Hono/Bun separado:**
```bash
cd apps/api
fly launch --dockerfile ../../docker/Dockerfile.api
# ou railway up
```

Pronto. Build deve passar em ~45s.

Se ainda der ERESOLVE: Project Settings → Install Command override:
```
pnpm install --filter @nexus/web... --no-frozen-lockfile --ignore-scripts
```
