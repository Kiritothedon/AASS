import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import SoftwareCard from '../components/SoftwareCard'
import ContactForm from '../components/ContactForm'
import Container from '../components/Container'
import { Shield, Users, BarChart3, MapPin, Smartphone, Lock } from 'lucide-react'

const watchtowerFeatures = [
  'Real-time incident reporting and community alerts',
  'Privacy-first design with community data control',
  'Integration with local law enforcement (when appropriate)',
  'Neighborhood watch coordination tools',
  'Safety hotline mapping and resource directories',
  'Community analytics dashboard',
  'Mobile-first responsive design',
  'End-to-end encrypted communications'
]

interface SoftwarePageProps {
  software: Array<{
    id: string
    name: string
    description: string
    features: string[]
    image: string
    status: 'live' | 'beta' | 'development'
    cta: {
      label: string
      href: string
    }
  }>
}

export default function SoftwarePage({ software }: SoftwarePageProps) {
  const features = [
    {
      icon: Shield,
      title: 'Privacy-First Design',
      description: 'All our tools prioritize community privacy and data control, with end-to-end encryption and transparent algorithms.'
    },
    {
      icon: Users,
      title: 'Community-Centered',
      description: 'Built with and for communities, our software adapts to local needs and cultural contexts.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Advanced analytics help communities understand safety patterns and make informed decisions.'
    }
  ]


  return (
    <>
      <Hero
        title="Safety Software Solutions"
        subtitle="We build pragmatic tools for community safety: reporting systems, triage dashboards, mapping and resource directories, and analytics for decision makers. Our software is designed for pilot programs with cities, nonprofits, and community groups."
        backgroundImage="/images/hero-software.jpg"
      />

      {/* Features */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Our Approach to Safety Tech
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Every tool we build is designed with community needs, privacy, and scalability in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card card-hover text-center">
                  <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-primary-black">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Product: Watchtower */}
      <section className="section-padding">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
                Featured Product: Watchtower
              </h2>
              <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
                Our flagship community safety platform, deployed in 89 communities nationwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Info */}
              <div>
                <h3 className="text-2xl font-semibold text-primary-black mb-4">
                  AASS Triage Dashboard
                </h3>
                <p className="text-secondary-muted leading-relaxed mb-6">
                  Watchtower is a comprehensive community safety reporting and triage dashboard designed to help neighborhoods monitor, report, and respond to safety concerns. The platform includes privacy-first design, encrypted communications, and integration with local law enforcement when appropriate.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-secondary-gray rounded-lg">
                    <div className="text-2xl font-bold text-primary-black mb-1">12K+</div>
                    <div className="text-sm text-secondary-muted">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-gray rounded-lg">
                    <div className="text-2xl font-bold text-primary-black mb-1">89</div>
                    <div className="text-sm text-secondary-muted">Communities</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-gray rounded-lg">
                    <div className="text-2xl font-bold text-primary-black mb-1">2.1K</div>
                    <div className="text-sm text-secondary-muted">Incidents Resolved</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-gray rounded-lg">
                    <div className="text-2xl font-bold text-primary-black mb-1">35%</div>
                    <div className="text-sm text-secondary-muted">Safety Improvement</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="btn-primary">
                    Request Demo
                  </a>
                  <a href="/blog/2025-06-01-how-tech-can-boost-community-safety" className="btn-secondary">
                    Learn More
                  </a>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-black to-primary-green flex items-center justify-center">
                    <div className="text-center text-white">
                      <Shield className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-xl font-semibold">Watchtower Dashboard</div>
                      <div className="text-sm opacity-80">Community Safety Platform</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* All Products */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              All Products
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Explore our complete suite of safety technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {software.map((product) => (
              <SoftwareCard key={product.id} software={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Features Detail */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-primary-black text-center">
              Platform Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-3">
                      Location-Based Safety
                    </h3>
                    <p className="text-secondary-muted">
                      Interactive maps showing safety resources, incident reports, and community assets with privacy controls.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-primary-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-3">
                      Mobile-First Design
                    </h3>
                    <p className="text-secondary-muted">
                      Responsive design optimized for mobile devices with offline capabilities and push notifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-primary-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-3">
                      Analytics Dashboard
                    </h3>
                    <p className="text-secondary-muted">
                      Community leaders can view safety trends, response times, and impact metrics with customizable reports.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="h-6 w-6 text-primary-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-3">
                      Privacy & Security
                    </h3>
                    <p className="text-secondary-muted">
                      End-to-end encryption, community data ownership, and transparent algorithms that communities can audit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pilot Program CTA */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Ready to Pilot Our Software?
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              We work with cities, nonprofits, and community groups to deploy our safety technology. Contact us to discuss pilot programs, custom implementations, and partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                Request Pilot Program
              </a>
              <a href="/contact" className="btn-secondary">
                Schedule Demo
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Get in Touch
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Ready to learn more about our software solutions? Contact us to discuss your community's needs.
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const software = [
    {
      id: 'watchtower',
      name: 'Watchtower',
      description: 'Community safety reporting and triage dashboard with real-time incident tracking, neighborhood alerts, and analytics.',
      features: watchtowerFeatures,
      image: '/images/software/watchtower.jpg',
      status: 'live' as const,
      cta: {
        label: 'Request Demo',
        href: '#contact'
      }
    },
    {
      id: 'safety-map',
      name: 'Safety Map',
      description: 'Interactive mapping platform for community safety resources, incident reports, and neighborhood assets.',
      features: [
        'Interactive safety resource mapping',
        'Community asset directory',
        'Incident heat mapping',
        'Privacy-controlled data sharing'
      ],
      image: '/images/software/safety-map.jpg',
      status: 'beta' as const,
      cta: {
        label: 'Join Beta',
        href: '#contact'
      }
    },
    {
      id: 'community-alerts',
      name: 'Community Alerts',
      description: 'Emergency notification system for community-wide alerts, safety updates, and resource mobilization.',
      features: [
        'Multi-channel alert system',
        'Geographic targeting',
        'Community response coordination',
        'Integration with emergency services'
      ],
      image: '/images/software/community-alerts.jpg',
      status: 'development' as const,
      cta: {
        label: 'Learn More',
        href: '#contact'
      }
    }
  ]

  return {
    props: {
      software
    },
    revalidate: 3600
  }
}
