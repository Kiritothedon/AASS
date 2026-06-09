import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import IncidentReportForm from '../components/IncidentReportForm'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, faqSchema, webPageSchema } from '../components/JsonLd'

const REPORT_FAQ = [
  {
    question: 'How do I report a racial incident on AASSociety?',
    answer:
      'Use the report form to describe what happened, where it occurred (city and state), and when. No account is required. Submissions may appear on the public incident map after review.',
  },
  {
    question: 'Will my racial incident report be public?',
    answer:
      'Reports may be published on the AASS community incident map so patterns become visible. Do not include information you are not comfortable sharing publicly.',
  },
  {
    question: 'Is AASS the same as filing a police report?',
    answer:
      'No. AASS is a civic documentation and advocacy platform. For emergencies or criminal complaints, contact local law enforcement. AASS helps communities document harm and advocate for policy change.',
  },
]

export default function ReportPage() {
  const title = 'Report a Racial Incident — Free Community Reporting'
  const description =
    'Report a racial incident, hate crime, or discrimination in your city. Free community reporting for Black Americans — submissions may appear on the public AASS incident map. No account required.'

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
          faqSchema(REPORT_FAQ),
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

        <section className="mt-12 pt-8 border-t border-gtp-border" aria-labelledby="report-faq">
          <h2 id="report-faq" className="font-serif text-lg font-bold text-primary-white mb-4">
            Frequently asked questions
          </h2>
          <dl className="space-y-5 text-sm">
            {REPORT_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-primary-white">{item.question}</dt>
                <dd className="mt-1.5 text-secondary-muted leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}
