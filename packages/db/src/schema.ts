import { pgTable, uuid, text, timestamp, jsonb, integer, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow()
})

export const prompts = pgTable('prompts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  prompt: text('prompt').notNull(),
  response: text('response'),
  tokensIn: integer('tokens_in'),
  tokensOut: integer('tokens_out'),
  latencyMs: integer('latency_ms'),
  model: varchar('model', { length: 64 }).default('gpt-4o'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow()
})

export const vectors = pgTable('vectors', {
  id: uuid('id').defaultRandom().primaryKey(),
  qdrantId: varchar('qdrant_id', { length: 128 }),
  source: text('source'),
  chunk: text('chunk'),
  embeddingModel: varchar('embedding_model', { length: 64 }).default('text-embedding-3-large'),
  createdAt: timestamp('created_at').defaultNow()
})

export type User = typeof users.$inferSelect
export type Prompt = typeof prompts.$inferSelect
