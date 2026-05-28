export interface IncidentRecord {
  id: string
  reporter_name: string | null
  city: string
  state: string
  title: string | null
  description: string
  incident_type: string | null
  occurred_on: string | null
  latitude: number | null
  longitude: number | null
  created_at: string
  fingerprint_hash?: string
}

export interface IncidentPublic {
  id: string
  reporterName: string | null
  city: string
  state: string
  title: string | null
  description: string
  incidentType: string | null
  occurredOn: string | null
  latitude: number | null
  longitude: number | null
  createdAt: string
}

export interface MapLocationPin {
  locationKey: string
  city: string
  state: string
  latitude: number
  longitude: number
  incidentCount: number
  incidents: IncidentPublic[]
}

export interface CreateIncidentInput {
  reporterName?: string
  city: string
  state: string
  title?: string
  description: string
  incidentType?: string
  occurredOn?: string
  fingerprintHash: string
  latitude: number | null
  longitude: number | null
}

export function toPublicIncident(row: IncidentRecord): IncidentPublic {
  return {
    id: row.id,
    reporterName: row.reporter_name,
    city: row.city,
    state: row.state,
    title: row.title,
    description: row.description,
    incidentType: row.incident_type,
    occurredOn: row.occurred_on,
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: row.created_at,
  }
}

export function locationKey(city: string, state: string): string {
  return `${state.trim().toUpperCase()}|${city.trim().toLowerCase()}`
}

export function groupIncidentsForMap(incidents: IncidentPublic[]): MapLocationPin[] {
  const groups = new Map<string, MapLocationPin>()

  for (const incident of incidents) {
    if (incident.latitude == null || incident.longitude == null) continue

    const key = locationKey(incident.city, incident.state)
    const existing = groups.get(key)

    if (!existing) {
      groups.set(key, {
        locationKey: key,
        city: incident.city,
        state: incident.state,
        latitude: incident.latitude,
        longitude: incident.longitude,
        incidentCount: 1,
        incidents: [incident],
      })
      continue
    }

    existing.incidentCount += 1
    existing.incidents.push(incident)
  }

  return Array.from(groups.values()).sort((a, b) => b.incidentCount - a.incidentCount)
}
