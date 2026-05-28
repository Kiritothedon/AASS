import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, MapPin, Send } from 'lucide-react'
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

export default function IncidentReportForm() {
  const [form, setForm] = useState({
    reporterName: '',
    city: '',
    state: 'TX',
    title: '',
    description: '',
    incidentType: 'other',
    occurredOn: '',
    company: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
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
          ? 'Your report was submitted and will appear on the incident map for your city.'
          : 'Your report was submitted. Map placement may take a moment if geocoding is unavailable.'
      )
      setForm({
        reporterName: '',
        city: '',
        state: form.state,
        title: '',
        description: '',
        incidentType: 'other',
        occurredOn: '',
        company: '',
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
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setStatus('idle')}
          >
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

        <div>
          <label htmlFor="incidentType" className="form-label">
            Incident type <span className="text-secondary-muted font-normal">(optional)</span>
          </label>
          <select
            id="incidentType"
            className="form-input"
            value={form.incidentType}
            onChange={(e) => update('incidentType', e.target.value)}
          >
            {INCIDENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

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
          />
        </div>

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
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

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
          Minimum 20 characters. Do not include information you are not comfortable sharing publicly on the map.
        </p>
      </div>

      {/* Honeypot for bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-secondary-muted max-w-lg">
          By submitting, you confirm this report is truthful to the best of your knowledge. AASS may review submissions for abuse.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === 'loading' ? 'Submitting...' : 'Submit report'}
        </button>
      </div>
    </form>
  )
}
