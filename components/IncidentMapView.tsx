import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { IncidentPublic, MapLocationPin } from '../lib/incidents/types'
import { AlertCircle, MapPin, X } from 'lucide-react'

import 'leaflet/dist/leaflet.css'

const pinIcon = L.divIcon({
  className: 'aass-map-pin',
  html: '<div class="aass-map-pin-dot"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -12],
})

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

function FitBounds({ pins }: { pins: MapLocationPin[] }) {
  const map = useMap()

  useEffect(() => {
    if (pins.length === 0) return
    const bounds = L.latLngBounds(pins.map((pin) => [pin.latitude, pin.longitude]))
    map.fitBounds(bounds.pad(0.2), { maxZoom: 10 })
  }, [map, pins])

  return null
}

function IncidentCard({ incident }: { incident: IncidentPublic }) {
  return (
    <article className="rounded-lg border border-gtp-border bg-gtp-bg-1 p-3">
      {incident.title && (
        <h4 className="text-sm font-semibold text-primary-white leading-snug">{incident.title}</h4>
      )}
      <p className="mt-1 text-xs text-secondary-muted line-clamp-4 whitespace-pre-wrap">
        {incident.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-secondary-muted">
        {incident.reporterName && <span>Reported by {incident.reporterName}</span>}
        {incident.incidentType && <span className="capitalize">{incident.incidentType.replace(/_/g, ' ')}</span>}
        <span>{formatDate(incident.createdAt)}</span>
      </div>
    </article>
  )
}

export default function IncidentMapView() {
  const [pins, setPins] = useState<MapLocationPin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<MapLocationPin | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/incidents')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load map data')
        if (!cancelled) setPins(data.pins || [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load incidents')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const totalIncidents = useMemo(
    () => pins.reduce((sum, pin) => sum + pin.incidentCount, 0),
    [pins]
  )

  const defaultCenter: [number, number] = [39.5, -98.35]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-8 rounded-2xl border border-gtp-border overflow-hidden bg-gtp-bg-2 min-h-[420px] lg:min-h-[560px]">
        {loading ? (
          <div className="h-[420px] lg:h-[560px] flex items-center justify-center text-secondary-muted text-sm">
            Loading map...
          </div>
        ) : error ? (
          <div className="h-[420px] lg:h-[560px] flex flex-col items-center justify-center gap-3 px-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <p className="text-sm text-secondary-muted">{error}</p>
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={4}
            className="h-[420px] lg:h-[560px] w-full z-0"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins.length > 0 && <FitBounds pins={pins} />}
            {pins.map((pin) => (
              <Marker
                key={pin.locationKey}
                position={[pin.latitude, pin.longitude]}
                icon={pinIcon}
                eventHandlers={{
                  click: () => setSelected(pin),
                }}
              >
                <Popup>
                  <strong>
                    {pin.city}, {pin.state}
                  </strong>
                  <br />
                  {pin.incidentCount} report{pin.incidentCount === 1 ? '' : 's'}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <aside className="lg:col-span-4 rounded-2xl border border-gtp-border bg-gtp-bg-2 flex flex-col min-h-[320px] lg:min-h-[560px]">
        <div className="px-5 py-4 border-b border-gtp-border bg-gtp-bg-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-white">
                Location reports
              </h2>
              <p className="mt-1 text-xs text-secondary-muted">
                {totalIncidents} total report{totalIncidents === 1 ? '' : 's'} across {pins.length} location{pins.length === 1 ? '' : 's'}
              </p>
            </div>
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md p-1 text-secondary-muted hover:text-primary-white hover:bg-gtp-bg-2"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!selected ? (
            <ul className="space-y-2">
              {pins.length === 0 && !loading && (
                <li className="text-sm text-secondary-muted text-center py-8">
                  No incidents on the map yet. Be the first to submit a report.
                </li>
              )}
              {pins.map((pin) => (
                <li key={pin.locationKey}>
                  <button
                    type="button"
                    onClick={() => setSelected(pin)}
                    className="w-full text-left rounded-xl border border-gtp-border bg-gtp-bg-1 px-4 py-3 hover:border-gtp-blue/40 hover:bg-gtp-bg-3/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gtp-blue shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary-white">
                          {pin.city}, {pin.state}
                        </p>
                        <p className="text-xs text-secondary-muted mt-0.5">
                          {pin.incidentCount} incident report{pin.incidentCount === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-primary-white font-serif">
                  {selected.city}, {selected.state}
                </h3>
                <p className="text-xs text-secondary-muted mt-1">
                  {selected.incidentCount} report{selected.incidentCount === 1 ? '' : 's'} at this pin
                </p>
              </div>
              {selected.incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
