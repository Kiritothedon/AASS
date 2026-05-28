import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'
import { getSql, hasDatabase } from '../db'
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
  if (process.env.NODE_ENV === 'development' && !hasDatabase()) return true
  return false
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
  return hasDatabase()
}

export async function countRecentByFingerprint(
  fingerprintHash: string,
  hours: number
): Promise<number> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

  if (isFileStorageMode()) {
    return readFileIncidents().filter(
      (row) =>
        row.fingerprint_hash === fingerprintHash && row.created_at >= since
    ).length
  }

  const sql = getSql()
  if (!sql) return 0

  const rows = await sql`
    select count(*)::int as count
    from incidents
    where fingerprint_hash = ${fingerprintHash}
      and created_at >= ${since}
  `

  return Number(rows[0]?.count ?? 0)
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

  const sql = getSql()
  if (!sql) {
    throw new Error('Incident storage is not configured')
  }

  const inserted = await sql`
    insert into incidents (
      reporter_name, city, state, title, description,
      incident_type, occurred_on, latitude, longitude, fingerprint_hash
    ) values (
      ${row.reporter_name},
      ${row.city},
      ${row.state},
      ${row.title},
      ${row.description},
      ${row.incident_type},
      ${row.occurred_on},
      ${row.latitude},
      ${row.longitude},
      ${input.fingerprintHash}
    )
    returning
      id, reporter_name, city, state, title, description,
      incident_type, occurred_on, latitude, longitude, created_at
  `

  return toPublicIncident(inserted[0] as IncidentRecord)
}

export async function listAllIncidents(): Promise<IncidentPublic[]> {
  if (isFileStorageMode()) {
    return readFileIncidents().map(toPublicIncident)
  }

  const sql = getSql()
  if (!sql) return []

  const rows = await sql`
    select
      id, reporter_name, city, state, title, description,
      incident_type, occurred_on, latitude, longitude, created_at
    from incidents
    order by created_at desc
    limit 500
  `

  return (rows as IncidentRecord[]).map(toPublicIncident)
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
