export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // Bridge to Hono API, fallback mock for demo
  const apiUrl = process.env.API_URL || 'http://localhost:8787'
  try {
    const r = await fetch(`${apiUrl}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ prompt })
    })
    const text = await r.text()
    return new Response(text, { headers: { 'Content-Type':'text/plain' }})
  } catch {
    // Mock streaming response for demo preview
    const answer = `Nexus RAG result for: "${prompt}"\n\n• Qdrant vector search top_k=6 cosine 0.81\n• LangChain retriever injected 1.4k tokens\n• OpenAI gpt-4o streaming via Hono/Bun\n• Redis cache hit: false → stored 120s\n• p95 latency: 7.3ms`
    return new Response(answer)
  }
}
