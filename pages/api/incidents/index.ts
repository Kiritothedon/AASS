import type { NextApiRequest, NextApiResponse } from 'next'
import { geocodeCityState } from '../../../lib/geocode'
import { getClientIp, getUserAgent, hashFingerprint } from '../../../lib/fingerprint'
import {
  countRecentByFingerprint,
  createIncident,
  getMapPins,
  incidentsStorageReady,
} from '../../../lib/incidents/store'
import { STATE_CODES } from '../../../lib/us-states'

const MAX_DESCRIPTION = 5000
const MAX_TITLE = 200
const MAX_NAME = 120
const MAX_CITY = 100

const INCIDENT_TYPES = new Set([
  'workplace',
  'public',
  'law_enforcement',
  'housing',
  'education',
  'healthcare',
  'retail',
  'other',
])

function normalizeText(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function validateCreateBody(body: unknown): { ok: true; data: Record<string, string> } | { ok: false; errors: string[] } {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: ['Invalid request body'] }
  }

  const record = body as Record<string, unknown>
  const errors: string[] = []

  const city = normalizeText(record.city, MAX_CITY)
  const state = normalizeText(record.state, 2).toUpperCase()
  const description = normalizeText(record.description, MAX_DESCRIPTION)

  if (!city || city.length < 2) errors.push('City is required')
  if (!state || !STATE_CODES.has(state)) errors.push('A valid US state is required')
  if (!description || description.length < 20) {
    errors.push('Please provide a description of at least 20 characters')
  }

  if (record.company && normalizeText(record.company, 50)) {
    errors.push('Submission rejected')
  }

  const incidentType = normalizeText(record.incidentType, 40)
  if (incidentType && !INCIDENT_TYPES.has(incidentType)) {
    errors.push('Invalid incident type')
  }

  let occurredOn = normalizeText(record.occurredOn, 10)
  if (occurredOn && !/^\d{4}-\d{2}-\d{2}$/.test(occurredOn)) {
    errors.push('Incident date must use YYYY-MM-DD format')
  }
  if (!occurredOn) occurredOn = ''

  if (errors.length > 0) return { ok: false, errors }

  return {
    ok: true,
    data: {
      reporterName: normalizeText(record.reporterName, MAX_NAME),
      city,
      state,
      title: normalizeText(record.title, MAX_TITLE),
      description,
      incidentType,
      occurredOn,
    },
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!incidentsStorageReady()) {
    return res.status(503).json({
      error: 'Incident reporting is not configured yet. Please try again later.',
    })
  }

  if (req.method === 'GET') {
    try {
      const pins = await getMapPins()
      return res.status(200).json({ pins, totalIncidents: pins.reduce((n, p) => n + p.incidentCount, 0) })
    } catch (error) {
      console.error('GET /api/incidents', error)
      return res.status(500).json({ error: 'Failed to load incidents' })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const validated = validateCreateBody(req.body)
    if (!validated.ok) {
      return res.status(400).json({ error: 'Validation failed', details: validated.errors })
    }

    const ip = getClientIp(req)
    const userAgent = getUserAgent(req)

    let fingerprintHash: string
    try {
      fingerprintHash = hashFingerprint(ip, userAgent)
    } catch {
      return res.status(503).json({ error: 'Server configuration error' })
    }

    const lastHourCount = await countRecentByFingerprint(fingerprintHash, 1)
    if (lastHourCount >= 1) {
      return res.status(429).json({
        error: 'You can submit one report per hour from this connection. Please try again later.',
      })
    }

    const dayCount = await countRecentByFingerprint(fingerprintHash, 24)
    if (dayCount >= 3) {
      return res.status(429).json({
        error: 'Daily report limit reached for this connection. You may submit up to 3 reports per day.',
      })
    }

    const coords = await geocodeCityState(validated.data.city, validated.data.state)

    const incident = await createIncident({
      reporterName: validated.data.reporterName || undefined,
      city: validated.data.city,
      state: validated.data.state,
      title: validated.data.title || undefined,
      description: validated.data.description,
      incidentType: validated.data.incidentType || undefined,
      occurredOn: validated.data.occurredOn || undefined,
      fingerprintHash,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
    })

    return res.status(201).json({
      success: true,
      incident,
      mapped: Boolean(coords),
    })
  } catch (error) {
    console.error('POST /api/incidents', error)
    return res.status(500).json({ error: 'Failed to save incident report' })
  }
}
