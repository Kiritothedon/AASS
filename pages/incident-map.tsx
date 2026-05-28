import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'

const IncidentMapView = dynamic(() => import('../components/IncidentMapView'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 min-h-[420px] flex items-center justify-center text-secondary-muted text-sm">
      Loading map...
    </div>
  ),
})

export default function IncidentMapPage() {
  return (
    <div className="bg-gtp-bg-0 min-h-screen">
      <section className="border-b border-gtp-border bg-gtp-gradient">
        <div className="container-custom py-10 md:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-secondary-muted hover:text-gtp-blue-light mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news hub
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-gtp-blue mb-3">
                <MapPin className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Live community map</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-white font-serif leading-tight">
                Incident map
              </h1>
              <p className="mt-3 text-secondary-muted leading-relaxed">
                Pins show where reports were submitted. Click a location to read incidents from that city.
              </p>
            </div>
            <Link href="/report" className="btn-primary inline-flex items-center justify-center shrink-0">
              Report an incident
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding-compact">
        <div className="container-custom">
          <IncidentMapView />
        </div>
      </section>
    </div>
  )
}
