import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || 'postgres://nexus:nexus@localhost:5432/nexus'
const client = postgres(connectionString, { prepare: false, max: 10 })
export const db = drizzle(client, { schema })
export * from './schema'
