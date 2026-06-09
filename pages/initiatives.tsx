import { GetStaticProps } from 'next'
import PageHeader from '../components/PageHeader'
import InitiativeCard from '../components/InitiativeCard'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, webPageSchema } from '../components/JsonLd'

interface Initiative {
  id: string
  title: string
  summary: string
  details: string
  icon: string
  stats?: { [key: string]: string | number | undefined }
  cta: { label: string; href: string }
}

const initiatives: Initiative[] = [
  {
    id: 'business-technology',
    title: 'Business & Technology',
    summary: 'Supporting projects that grow Black enterprise.',
    details:
      'We provide funding, mentorship, and resources to Black entrepreneurs building safety-focused businesses.',
    icon: 'Building2',
    cta: { label: 'Learn More', href: '#contact' },
  },
  {
    id: 'software-safety',
    title: 'Software for Safety',
    summary: 'Building tools like Watchtower to enhance security.',
    details:
      'Our flagship community safety platform and other software solutions designed for neighborhood protection.',
    icon: 'Shield',
    cta: { label: 'View Software', href: '/software' },
  },
  {
    id: 'research-policy',
    title: 'Research & Policy',
    summary: 'Exploring data-driven approaches for resilience.',
    details:
      'We conduct research and develop policy recommendations to improve community safety outcomes.',
    icon: 'BarChart3',
    cta: { label: 'Read Research', href: '/blog' },
  },
]

interface InitiativesPageProps {
  initiatives: Initiative[]
}

export default function InitiativesPage({ initiatives }: InitiativesPageProps) {
  const title = 'Community Initiatives'
  const description =
    'AASS initiatives supporting Black business, technology, safety programs, and community-led progress across the United States.'

  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <SEO title={title} description={description} path="/initiatives" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/initiatives' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Initiatives', path: '/initiatives' },
          ]),
        ]}
      />
      <PageHeader
        title="Initiatives"
        subtitle="Programs designed to build economic opportunity and community safety."
        badge="Programs"
      />

      <section className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {initiatives.map((initiative) => {
              const lucideReact = require('lucide-react') // eslint-disable-line
              const IconComponent = lucideReact[initiative.icon] as any // eslint-disable-line
              return (
                <InitiativeCard
                  key={initiative.id}
                  initiative={initiative}
                  iconComponent={IconComponent}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { initiatives }, revalidate: 3600 }
}
