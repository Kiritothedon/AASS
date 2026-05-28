import Link from 'next/link'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import IncidentReportForm from '../components/IncidentReportForm'

export default function ReportPage() {
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
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gtp-blue mb-3">
              <ShieldAlert className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Community reporting</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-white font-serif leading-tight">
              Incident reporting
            </h1>
            <p className="mt-3 text-secondary-muted leading-relaxed">
              Document a racial incident you experienced or witnessed. Reports can appear on the public
              incident map by city and state. No account is needed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding-compact">
        <div className="container-custom max-w-4xl">
          <IncidentReportForm />
        </div>
      </section>
    </div>
  )
}
