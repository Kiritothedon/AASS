import Link from 'next/link'
import { Shield, Users, BarChart3, ArrowRight, Newspaper } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, webPageSchema } from '../components/JsonLd'

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'Every tool and initiative we build centers on making Black communities safer — physically, economically, and socially.',
  },
  {
    icon: Users,
    title: 'Community Power',
    description:
      'We believe in community ownership of data, decisions, and technology. Our tools are built with communities, not just for them.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven',
    description:
      'Research and analytics guide our approach. We surface the data communities need to advocate effectively for themselves.',
  },
]

export default function AboutPage() {
  const title = 'About the African American Safety Society'
  const description =
    'AASSociety (AASS) helps Black Americans report racial incidents, map community harm, and read policy analysis on safety and winnable demands. Learn about our mission, tools, and founder.'

  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <SEO title={title} description={description} path="/about" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/about' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <PageHeader
        title="About AASS"
        subtitle="Furthering Black progress through business, technology, and community safety."
      />

      {/* Mission */}
      <section className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-5">
              Our Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif leading-snug mb-6">
              Building safety, power, and progress for Black America
            </h2>
            <p className="text-base md:text-lg text-secondary-muted leading-relaxed">
              The African American Safety Society (AASS) exists to further Black progress through
              business and technology, with the ultimate aim of making our communities safer. We
              release software and tools that strengthen economic power, reduce risk, and give
              communities the information they need to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gtp-bg-0 border-t border-gtp-border">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif">
              What drives us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 md:p-8 hover:border-gtp-blue/30 transition-colors"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary-gold/20 bg-primary-gold/10">
                  <Icon className="h-5 w-5 text-primary-gold" />
                </div>
                <h3 className="text-base font-bold text-primary-white mb-2">{title}</h3>
                <p className="text-sm text-secondary-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Hub */}
      <section className="section-padding bg-gtp-bg-1 border-t border-gtp-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-4">
                  The News Hub
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif mb-4 leading-snug">
                  One focused starting point each day
                </h2>
                <p className="text-secondary-muted leading-relaxed mb-6">
                  This platform surfaces timely reporting on politics, business, culture, and
                  community affairs affecting Black America. It aggregates headlines from trusted
                  sources — Black Enterprise, The Grio, and Google News — so you stay informed
                  without managing feeds yourself.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#latest"
                    className="btn-primary"
                  >
                    Browse Headlines
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/software" className="btn-secondary">
                    View Our Software
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-8 flex flex-col items-center justify-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gtp-border bg-gtp-bg-3">
                  <Newspaper className="h-8 w-8 text-gtp-blue/60" />
                </div>
                <div>
                  <p className="text-xl font-bold text-primary-white font-serif">24 stories</p>
                  <p className="text-sm text-secondary-muted">aggregated every 10 minutes</p>
                </div>
                <div className="w-full border-t border-gtp-border pt-4">
                  <p className="text-xs text-secondary-muted leading-relaxed">
                    Sources: Black Enterprise &bull; The Grio &bull; Google News
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
