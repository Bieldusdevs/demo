'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { motion } from 'motion/react'

type Msg = { role: 'user' | 'assistant', content: string }

export default function StudioClient() {
  const [input, setInput] = useState('Explique RAG com Qdrant + LangChain em 3 bullets')
  const [messages, setMessages] = useState<Msg[]>([])
  const [isPending, startTransition] = useTransition()
  const [optimisticMessages, addOptimistic] = useOptimistic(messages, (state, newMsg: Msg) => [...state, newMsg])

  async function send() {
    if (!input.trim()) return
    const userMsg: Msg = { role: 'user', content: input }
    addOptimistic(userMsg)
    setMessages(m => [...m, userMsg])
    setInput('')
    startTransition(async () => {
      // hit Hono API – fallback mock streaming if offline
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/ai/chat` : '/api/edge/chat', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({ prompt: userMsg.content })
        })
        const text = await res.text()
        setMessages(m => [...m, { role:'assistant', content: text.slice(0,1200) || mockAnswer }])
      } catch {
        setMessages(m => [...m, { role:'assistant', content: mockAnswer }])
      }
    })
  }

  const mockAnswer = `• Qdrant armazena embeddings 1536-d (text-embedding-3-large) com HNSW < 5ms.
• LangChain faz retriever + re-rank: top_k=6, similarity cosine ≥0.78.
• OpenAI gpt-4o recebe contexto injetado, streaming SSE via Hono/Bun p95 <8ms. Redis cache hit 82%.`

  const msgs = optimisticMessages.length > messages.length ? optimisticMessages : messages

  return (
    <div className="rounded-[24px] border border-zinc-800 bg-zinc-950/70 backdrop-blur p-5">
      <div className="text-[11px] text-zinc-500 tracking-wider mb-3">AI STUDIO • REACT 19 useOptimistic</div>
      <div className="min-h-[230px] space-y-3 text-sm max-h-[340px] overflow-auto pr-1">
        {msgs.length===0 && <div className="text-zinc-500">Digite um prompt e veja streaming RAG…</div>}
        {msgs.map((m,i)=>(
          <motion.div key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className={m.role==='user'?'text-zinc-200':'text-emerald-200/90'}>
            <span className="text-[10px] text-zinc-500 mr-2">{m.role.toUpperCase()}</span>
            {m.content}
          </motion.div>
        ))}
        {isPending && <div className="text-zinc-500 text-xs">streaming… ●●●</div>}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=> e.key==='Enter' && send()}
          className="flex-1 bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/60"
          placeholder="Prompt RAG..."
        />
        <button onClick={send} disabled={isPending} className="px-4 py-3 rounded-xl bg-emerald-400 text-black text-sm font-medium disabled:opacity-60">
          Send
        </button>
      </div>
      <div className="text-[10px] text-zinc-500 mt-3">OpenAI • LangChain • Qdrant • Redis cache</div>
    </div>
  )
}
