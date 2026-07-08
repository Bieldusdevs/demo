# Fix Vercel deploy – Nexus AI Studio

Você viu 2 warnings:

```
Warning detected "engines": { "node": ..., "bun": ... }
Warning: Detected "engines": { "node": ">=20" }
```

Isso é normal. Vercel NÃO roda Bun no build do Next.js, e odeia `>=` ranges.

## O que foi corrigido

1. **Removido `bun` de engines**
   Vercel: `Defaulting to "node".`
   → Agora engines só tem Node.

2. **Pinned Node para `20.x`**
   Antes: `"node": ">=20"`
   Depois: `"node": "20.x"`
   → Remove o warning de auto-upgrade.

3. **packageManager trocado para pnpm**
   Antes: `"packageManager": "bun@1.1.30"`
   Depois: `"packageManager": "pnpm@9.12.3"`
   → Vercel builda 100% com pnpm. Localmente você ainda pode usar Bun:
   ```bash
   bun install
   bun turbo dev
   ```

4. **@types/node downgrade 22 → 20.17.6**
   Vercel roda Node 20 por padrão. Types 22 causam conflito.

5. **Adicionado:**
   - `vercel.json` na raiz
   - `pnpm-workspace.yaml`
   - `.nvmrc` com `20`

## Deploy correto no Vercel

**Opção A – Monorepo Turborepo (recomendado):**
1. Vercel Dashboard → Add New Project
2. Root Directory: `apps/web`
3. Framework Preset: Next.js
4. Build Command: `cd ../.. && pnpm turbo build --filter=@nexus/web...`
5. Install Command: `pnpm install`
6. Node Version: 20.x (Settings → General)

**Opção B – Simplificada:**
Deixe Root Directory como `/` e use o `vercel.json` incluído.

Env vars necessárias:
```
OPENAI_API_KEY=sk-...
API_URL=https://sua-api-hono.fly.io
NEXT_PUBLIC_API_URL=https://sua-api-hono.fly.io
DATABASE_URL=...
REDIS_URL=...
QDRANT_URL=...
```

## API Hono + Bun – onde deployar?

Vercel NÃO é ideal para Hono+Bun. Deploy a API em:
- **Fly.io** (recomendado): `fly launch` – suporta Bun nativo
- **Railway** – 1 click Bun
- **Cloudflare Workers** – Hono é edge-first

O front Next.js fica no Vercel, API no Fly. CORS já liberado.

## Quer manter Bun no Vercel?

Possível, mas hack:
`vercel.json`:
```json
{
  "installCommand": "npm i -g bun && bun install",
  "buildCommand": "bun run build"
}
```
Não recomendo – quebra cache Turborepo. Use pnpm no Vercel, Bun local.

Tudo já commitado no repo atualizado.
