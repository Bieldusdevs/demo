import StudioClient from '@/components/StudioClient'

export const metadata = { title: 'Studio – Nexus AI' }

export default function StudioPage(){
  return <div className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">Nexus Studio</h1>
    <StudioClient />
    <p className="text-zinc-500 text-sm mt-8">Next.js 15 • React 19 • Hono • OpenAI • LangChain • Qdrant</p>
  </div>
}
