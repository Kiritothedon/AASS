import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import IncidentReportForm from '../components/IncidentReportForm'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, webPageSchema } from '../components/JsonLd'

export default function ReportPage() {
  const title = 'Report a Racial Incident'
  const description =
    'Report a racial incident by city and state. Community submissions may appear on the public AASS incident map. No account required.'

  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <SEO title={title} description={description} path="/report" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/report' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Report Incident', path: '/report' },
          ]),
        ]}
      />
      <div className="container-custom max-w-2xl py-6 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-muted hover:text-gtp-blue-light transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          News hub
        </Link>

        <header className="mt-5 mb-6 border-b border-gtp-border pb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gtp-blue mb-2">
            Community reporting
          </p>
          <h1 className="text-2xl md:text-[1.75rem] font-bold text-primary-white font-serif leading-tight">
            Report an incident
          </h1>
          <p className="mt-2 text-sm text-secondary-muted leading-relaxed">
            Share what happened by city and state. Reports may appear on the public map. No account required.
          </p>
        </header>

        <IncidentReportForm />
      </div>
    </div>
  )
}
