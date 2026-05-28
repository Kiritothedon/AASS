import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type {
  CreateIncidentInput,
  IncidentPublic,
  IncidentRecord,
  MapLocationPin,
} from './types'
import {
  groupIncidentsForMap,
  locationKey,
  toPublicIncident,
} from './types'

const INCIDENTS_FILE = path.join(process.cwd(), 'data', 'incidents.json')

function isFileStorageMode(): boolean {
  if (process.env.INCIDENTS_STORAGE === 'file') return true
  if (process.env.NODE_ENV === 'development' && !getSupabase()) return true
  return false
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function readFileIncidents(): IncidentRecord[] {
  if (!fs.existsSync(INCIDENTS_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(INCIDENTS_FILE, 'utf8')) as IncidentRecord[]
  } catch {
    return []
  }
}

function writeFileIncidents(rows: IncidentRecord[]): void {
  const dir = path.dirname(INCIDENTS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(INCIDENTS_FILE, JSON.stringify(rows, null, 2))
}

export function incidentsStorageReady(): boolean {
  if (isFileStorageMode()) return true
  return Boolean(getSupabase())
}

export async function countRecentByFingerprint(
  fingerprintHash: string,
  hours: number
): Promise<number> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

  if (isFileStorageMode()) {
    return readFileIncidents().filter(
      (row) =>
        row.fingerprint_hash === fingerprintHash &&
        row.created_at >= since
    ).length
  }

  const supabase = getSupabase()
  if (!supabase) return 0

  const { count, error } = await supabase
    .from('incidents')
    .select('*', { count: 'exact', head: true })
    .eq('fingerprint_hash', fingerprintHash)
    .gte('created_at', since)

  if (error) throw error
  return count ?? 0
}

export async function createIncident(input: CreateIncidentInput): Promise<IncidentPublic> {
  const row: IncidentRecord = {
    id: randomUUID(),
    reporter_name: input.reporterName?.trim() || null,
    city: input.city.trim(),
    state: input.state.trim().toUpperCase(),
    title: input.title?.trim() || null,
    description: input.description.trim(),
    incident_type: input.incidentType?.trim() || null,
    occurred_on: input.occurredOn || null,
    latitude: input.latitude,
    longitude: input.longitude,
    fingerprint_hash: input.fingerprintHash,
    created_at: new Date().toISOString(),
  }

  if (isFileStorageMode()) {
    const all = readFileIncidents()
    all.unshift(row)
    writeFileIncidents(all)
    return toPublicIncident(row)
  }

  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Incident storage is not configured')
  }

  const { data, error } = await supabase
    .from('incidents')
    .insert({
      reporter_name: row.reporter_name,
      city: row.city,
      state: row.state,
      title: row.title,
      description: row.description,
      incident_type: row.incident_type,
      occurred_on: row.occurred_on,
      latitude: row.latitude,
      longitude: row.longitude,
      fingerprint_hash: input.fingerprintHash,
    })
    .select('*')
    .single()

  if (error) throw error
  return toPublicIncident(data as IncidentRecord)
}

export async function listAllIncidents(): Promise<IncidentPublic[]> {
  if (isFileStorageMode()) {
    return readFileIncidents().map(toPublicIncident)
  }

  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('incidents')
    .select(
      'id, reporter_name, city, state, title, description, incident_type, occurred_on, latitude, longitude, created_at'
    )
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) throw error
  return (data as IncidentRecord[]).map(toPublicIncident)
}

export async function getMapPins(): Promise<MapLocationPin[]> {
  const incidents = await listAllIncidents()
  return groupIncidentsForMap(incidents)
}

export async function getIncidentsByLocation(
  city: string,
  state: string
): Promise<IncidentPublic[]> {
  const key = locationKey(city, state)
  const incidents = await listAllIncidents()
  return incidents.filter((item) => locationKey(item.city, item.state) === key)
}
