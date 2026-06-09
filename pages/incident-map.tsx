import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, faqSchema, webPageSchema } from '../components/JsonLd'

const MAP_FAQ = [
  {
    question: 'What is the AASS racial incident map?',
    answer:
      'An interactive map of community-reported racial incidents across the United States. Browse by city to see what others have documented and where harm clusters.',
  },
  {
    question: 'How do incidents get on the map?',
    answer:
      'Community members submit reports through the AASS report form. Approved submissions are grouped by location and displayed as map pins.',
  },
  {
    question: 'Can I add my own incident to the map?',
    answer:
      'Yes. Visit the Report page to submit what happened in your area. No account is required to file a report.',
  },
]

const IncidentMapView = dynamic(() => import('../components/IncidentMapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[min(70vh,560px)] rounded-lg border border-gtp-border bg-gtp-bg-2 flex items-center justify-center text-secondary-muted text-sm">
      Loading map…
    </div>
  ),
})

export default function IncidentMapPage() {
  const title = 'Racial Incident Map — Community Reports by City'
  const description =
    'Explore community-reported racial incidents, hate crimes, and discrimination on an interactive U.S. map. See where Black Americans are documenting harm — and add your own report.'

  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <SEO title={title} description={description} path="/incident-map" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/incident-map' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Incident Map', path: '/incident-map' },
          ]),
          faqSchema(MAP_FAQ),
        ]}
      />
      <div className="container-custom py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-secondary-muted hover:text-gtp-blue-light transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              News hub
            </Link>
            <h1 className="mt-4 text-2xl md:text-[1.75rem] font-bold text-primary-white font-serif leading-tight">
              Incident map
            </h1>
            <p className="mt-2 text-sm text-secondary-muted leading-relaxed">
              Reports grouped by city. Select a pin to read submissions from that area.
            </p>
          </div>
          <Link
            href="/report"
            className="btn-primary shrink-0 self-start text-sm px-4 py-2"
          >
            Report incident
          </Link>
        </div>

        <IncidentMapView />
      </div>
    </div>
  )
}
