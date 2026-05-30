import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, Loader2, MapPin, Navigation, Send } from 'lucide-react'
import { US_STATES } from '../lib/us-states'

const INCIDENT_TYPES = [
  { value: 'workplace', label: 'Workplace' },
  { value: 'public', label: 'Public / Community' },
  { value: 'law_enforcement', label: 'Law Enforcement' },
  { value: 'housing', label: 'Housing' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail / Service' },
  { value: 'other', label: 'Other' },
]

async function reverseGeocode(lat: number, lon: number): Promise<{ city: string; state: string; address: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'AASS-IncidentMap/1.0',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(8000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const a = data.address || {}
    const city = a.city || a.town || a.village || a.county || ''
    const stateAbbr = US_STATES.find(
      (s) => s.name.toLowerCase() === (a.state || '').toLowerCase()
    )?.code ?? ''
    const road = a.road || ''
    const houseNumber = a.house_number || ''
    const address = [houseNumber, road].filter(Boolean).join(' ')
    return city && stateAbbr ? { city, state: stateAbbr, address } : null
  } catch {
    return null
  }
}

export default function IncidentReportForm() {
  const [form, setForm] = useState({
    reporterName: '',
    address: '',
    city: '',
    state: 'TX',
    title: '',
    description: '',
    incidentType: 'other',
    occurredOn: '',
    company: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [geoStatus, setGeoStatus] = useState<'idle' | 'detecting' | 'done' | 'denied'>('idle')
  const [message, setMessage] = useState('')

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied')
      return
    }
    setGeoStatus('detecting')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const result = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
        if (result) {
          setForm((prev) => ({
            ...prev,
            city: result.city || prev.city,
            state: result.state || prev.state,
            address: result.address || prev.address,
          }))
          setGeoStatus('done')
        } else {
          setGeoStatus('idle')
        }
      },
      () => setGeoStatus('denied'),
      { timeout: 10000, maximumAge: 60000 }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const response = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus('error')
        setMessage(data.error || data.details?.join(' ') || 'Unable to submit report')
        return
      }
      setStatus('success')
      setMessage(
        data.mapped
          ? 'Your report was submitted and will appear on the incident map.'
          : 'Report submitted. Map placement may take a moment.'
      )
      setForm({
        reporterName: '', address: '', city: '', state: form.state,
        title: '', description: '', incidentType: 'other', occurredOn: '', company: '',
      })
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h2 className="mt-4 text-xl font-bold text-primary-white font-serif">Report received</h2>
        <p className="mt-3 text-sm text-secondary-muted leading-relaxed">{message}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/incident-map" className="btn-primary inline-flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            View incident map
          </Link>
          <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>
            Submit another report
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 md:p-8 space-y-6">
      <div className="rounded-lg border border-gtp-border bg-gtp-bg-3/60 px-4 py-3 text-xs text-secondary-muted leading-relaxed">
        No account required. Reports are tied to a privacy-safe connection fingerprint (not your name)
        to reduce spam. Your name is optional. City and state are required.
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reporter name */}
        <div>
          <label htmlFor="reporterName" className="form-label">
            Your name <span className="text-secondary-muted font-normal">(optional)</span>
          </label>
          <input
            id="reporterName"
            className="form-input"
            value={form.reporterName}
            onChange={(e) => update('reporterName', e.target.value)}
            maxLength={120}
            autoComplete="name"
          />
        </div>

        {/* Incident type */}
        <div>
          <label htmlFor="incidentType" className="form-label">
            Incident type
          </label>
          <select
            id="incidentType"
            className="form-input"
            value={form.incidentType}
            onChange={(e) => update('incidentType', e.target.value)}
          >
            {INCIDENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Location section */}
      <div className="space-y-4">
        {/* "Use my location" button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={geoStatus === 'detecting'}
            className="inline-flex items-center gap-2 rounded-lg border border-gtp-blue/40 bg-gtp-blue/8 px-4 py-2 text-xs font-semibold text-gtp-blue-light hover:bg-gtp-blue/15 disabled:opacity-50 transition-all"
          >
            {geoStatus === 'detecting' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Navigation className="h-3.5 w-3.5" />
            )}
            {geoStatus === 'detecting' ? 'Detecting…' : 'Use my location'}
          </button>
          {geoStatus === 'done' && (
            <span className="text-xs text-emerald-400">Location detected</span>
          )}
          {geoStatus === 'denied' && (
            <span className="text-xs text-secondary-muted">Location access denied — enter manually</span>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="form-label">
            Address or street <span className="text-secondary-muted font-normal">(optional)</span>
          </label>
          <input
            id="address"
            className="form-input"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            maxLength={200}
            placeholder="123 Main St, or an intersection"
            autoComplete="street-address"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* City */}
          <div>
            <label htmlFor="city" className="form-label">
              City <span className="text-primary-gold">*</span>
            </label>
            <input
              id="city"
              required
              className="form-input"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              maxLength={100}
              placeholder="San Antonio"
              autoComplete="address-level2"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="form-label">
              State <span className="text-primary-gold">*</span>
            </label>
            <select
              id="state"
              required
              className="form-input"
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
            >
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Date + headline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="occurredOn" className="form-label">
            Date of incident <span className="text-secondary-muted font-normal">(optional)</span>
          </label>
          <input
            id="occurredOn"
            type="date"
            className="form-input"
            value={form.occurredOn}
            onChange={(e) => update('occurredOn', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="title" className="form-label">
            Short headline <span className="text-secondary-muted font-normal">(optional)</span>
          </label>
          <input
            id="title"
            className="form-input"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            maxLength={200}
            placeholder="Brief summary"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="form-label">
          What happened? <span className="text-primary-gold">*</span>
        </label>
        <textarea
          id="description"
          required
          className="form-input min-h-[160px] resize-y"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          maxLength={5000}
          placeholder="Share what happened, where, and any context you are comfortable including."
        />
        <p className="mt-2 text-xs text-secondary-muted">
          Minimum 20 characters. Do not include information you are not comfortable sharing publicly.
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-secondary-muted max-w-lg">
          By submitting, you confirm this report is truthful to the best of your knowledge.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === 'loading' ? 'Submitting…' : 'Submit report'}
        </button>
      </div>
    </form>
  )
}
