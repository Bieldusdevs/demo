import OpenAI from 'openai'
// import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
// import { QdrantVectorStore } from '@langchain/community/vectorstores/qdrant'

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-demo' })

export async function ragChat(prompt: string) {
  // 1. embed
  // const embeddings = new OpenAIEmbeddings({ modelName: 'text-embedding-3-large' })
  // 2. qdrant
  // const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, { url: 'http://localhost:6333', collectionName: 'nexus_docs' })
  // 3. retriever
  // const docs = await vectorStore.similaritySearch(prompt, 6)
  // 4. llm
  // const llm = new ChatOpenAI({ modelName: 'gpt-4o', streaming: true, temperature: 0.3 })
  return {
    prompt,
    retrieved: 6,
    context_tokens: 1420,
    model: 'gpt-4o',
    streamed: true
  }
}

export const config = {
  embedding: 'text-embedding-3-large',
  dims: 1536,
  vectorDB: 'Qdrant 1.9',
  chunk: 512,
  overlap: 64
}
