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
    <article className="rounded-md border border-gtp-border bg-gtp-bg-0 p-3">
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

  const mapH = 'h-[min(70vh,520px)]'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className={`lg:col-span-3 rounded-lg border border-gtp-border overflow-hidden bg-gtp-bg-1 ${mapH}`}>
        {loading ? (
          <div className={`flex ${mapH} items-center justify-center text-secondary-muted text-sm`}>
            Loading map…
          </div>
        ) : error ? (
          <div className={`flex ${mapH} flex-col items-center justify-center gap-2 px-6 text-center`}>
            <AlertCircle className="h-7 w-7 text-red-400" />
            <p className="text-sm text-secondary-muted">{error}</p>
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={4}
            className={`w-full z-0 ${mapH}`}
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

      <aside className={`lg:col-span-2 flex flex-col rounded-lg border border-gtp-border bg-gtp-bg-1 ${mapH}`}>
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gtp-border">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary-white">
              Locations
            </h2>
            <p className="mt-0.5 text-[11px] text-secondary-muted">
              {totalIncidents} report{totalIncidents === 1 ? '' : 's'} · {pins.length} pin{pins.length === 1 ? '' : 's'}
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

        <div className="flex-1 overflow-y-auto p-3">
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
                    className="w-full text-left rounded-md border border-gtp-border bg-gtp-bg-0 px-3 py-2.5 hover:border-gtp-blue/40 transition-colors"
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
