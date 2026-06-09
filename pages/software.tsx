import { GetStaticProps } from 'next'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'
import JsonLd, { breadcrumbSchema, webPageSchema } from '../components/JsonLd'
import {
  Shield,
  BarChart3,
  MapPin,
  Smartphone,
  Lock,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Safety Mapping',
    description:
      'Interactive maps showing safety resources, incident reports, and community assets with full privacy controls.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description:
      'Optimized for mobile devices with offline capabilities and push notifications for urgent alerts.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description:
      'Community leaders can view safety trends, response times, and impact metrics with customizable reports.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'End-to-end encryption, community data ownership, and transparent algorithms that communities can audit.',
  },
]

const stats = [
  { value: '12K+', label: 'Active Users' },
  { value: '89', label: 'Communities' },
  { value: '2.1K', label: 'Incidents Resolved' },
  { value: '35%', label: 'Safety Improvement' },
]

const inDevelopment = [
  {
    name: 'Safety Map',
    description:
      'Interactive mapping platform for community safety resources and incident reports.',
    badge: 'Beta',
    badgeClass: 'bg-gtp-blue/15 text-gtp-blue-light border border-gtp-blue/25',
  },
  {
    name: 'Community Alerts',
    description:
      'Emergency notification system for community-wide alerts and resource mobilization.',
    badge: 'Development',
    badgeClass: 'bg-gtp-bg-3 text-secondary-muted border border-gtp-border',
  },
]

export default function SoftwarePage() {
  const title = 'Community Safety Software'
  const description =
    'Explore AASS safety software including incident reporting, community mapping, and tools built to protect and empower Black communities.'

  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <SEO title={title} description={description} path="/software" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/software' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Software', path: '/software' },
          ]),
        ]}
      />
      <PageHeader
        title="Software"
        subtitle="Safety technology designed for community protection and resilience."
        badge="Products"
      />

      <div className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          {/* Watchtower hero */}
          <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 overflow-hidden mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary-gold/25 bg-primary-gold/10">
                    <Shield className="h-7 w-7 text-primary-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-white font-serif">Watchtower</h2>
                    <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-primary-gold/15 text-primary-gold border border-primary-gold/25">
                      Live
                    </span>
                  </div>
                </div>

                <p className="text-base text-secondary-muted leading-relaxed mb-8">
                  Community safety reporting and triage dashboard with real-time incident tracking,
                  neighborhood alerts, and analytics built for Black communities.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="rounded-xl border border-gtp-border bg-gtp-bg-3 p-4 text-center">
                      <div className="text-2xl font-bold text-primary-gold">{value}</div>
                      <div className="text-xs text-secondary-muted mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#contact" className="btn-primary">
                    Request Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="/blog/2025-06-01-how-tech-can-boost-community-safety" className="btn-secondary">
                    Learn More
                  </a>
                </div>
              </div>

              {/* Right: visual placeholder */}
              <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-gtp-bg-3 to-gtp-bg-0 border-l border-gtp-border p-12">
                <div className="text-center">
                  <div className="flex h-20 w-20 mx-auto mb-4 items-center justify-center rounded-2xl border border-primary-gold/30 bg-primary-gold/10">
                    <Shield className="h-10 w-10 text-primary-gold" />
                  </div>
                  <p className="text-base font-semibold text-primary-white">Watchtower Dashboard</p>
                  <p className="mt-1 text-sm text-secondary-muted">Community Safety Platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif">Key features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 text-center hover:border-gtp-blue/30 transition-colors">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary-gold/20 bg-primary-gold/10">
                    <Icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <h3 className="text-sm font-bold text-primary-white mb-2">{title}</h3>
                  <p className="text-xs text-secondary-muted leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* In Development */}
          <div className="mb-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif">In development</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inDevelopment.map(({ name, description, badge, badgeClass }) => (
                <div key={name} className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold text-primary-white font-serif">{name}</h3>
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${badgeClass}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-muted leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif mb-3">
                Ready to deploy?
              </h2>
              <p className="text-base text-secondary-muted max-w-2xl mx-auto">
                We work with cities, nonprofits, and community groups to deploy our safety
                technology. Contact us to discuss pilot programs and partnerships.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {}, revalidate: 3600 }
}
