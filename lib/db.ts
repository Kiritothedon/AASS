import { neon } from '@neondatabase/serverless'

/** AASS-only Postgres. Never point this at Global Ticket Pay Supabase. */
export function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL)
}
