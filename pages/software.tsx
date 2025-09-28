import { GetStaticProps } from 'next'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import { Shield, Users, BarChart3, MapPin, Smartphone, Lock } from 'lucide-react'

const watchtowerFeatures = [
  'Real-time incident reporting and community alerts',
  'Privacy-first design with community data control',
  'Integration with local law enforcement (when appropriate)',
  'Neighborhood watch coordination tools',
  'Safety hotline mapping and resource directories',
  'Community analytics dashboard',
  'Mobile-first responsive design',
  'End-to-end encrypted communications',
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
  return (
    <div className="min-h-screen bg-primary-black">
      <PageHeader 
        title="Software" 
        subtitle="Safety technology designed for community protection and resilience."
      />
      
      <Container>
        <div className="py-16">
          {/* Watchtower - Main Focus */}
          <div className="mb-24">
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-8 w-8 text-primary-black" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-primary-white font-serif">Watchtower</h2>
                      <span className="inline-block bg-primary-gold text-primary-black px-3 py-1 rounded-full text-sm font-semibold">
                        LIVE
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-secondary-muted mb-6 leading-relaxed">
                    Community safety reporting and triage dashboard with real-time incident tracking, neighborhood alerts, and analytics.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 bg-secondary-dark rounded-lg">
                      <div className="text-2xl font-bold text-primary-gold mb-1">12K+</div>
                      <div className="text-sm text-secondary-muted">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-dark rounded-lg">
                      <div className="text-2xl font-bold text-primary-gold mb-1">89</div>
                      <div className="text-sm text-secondary-muted">Communities</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-dark rounded-lg">
                      <div className="text-2xl font-bold text-primary-gold mb-1">2.1K</div>
                      <div className="text-sm text-secondary-muted">Incidents Resolved</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-dark rounded-lg">
                      <div className="text-2xl font-bold text-primary-gold mb-1">35%</div>
                      <div className="text-sm text-secondary-muted">Safety Improvement</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <a href="#contact" className="btn-primary">
                      Request Demo
                    </a>
                    <a href="/blog/2025-06-01-how-tech-can-boost-community-safety" className="btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary-dark to-secondary-gray rounded-lg p-8 border border-primary-gold">
                    <div className="text-center text-primary-white">
                      <Shield className="h-16 w-16 mx-auto mb-4 text-primary-gold" />
                      <div className="text-xl font-semibold mb-2">Watchtower Dashboard</div>
                      <div className="text-sm text-secondary-muted">Community Safety Platform</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-primary-white font-serif text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card text-center">
                <MapPin className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-white mb-2">Safety Mapping</h3>
                <p className="text-secondary-muted text-sm">
                  Interactive maps showing safety resources, incident reports, and community assets with privacy controls.
                </p>
              </div>
              <div className="card text-center">
                <Smartphone className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-white mb-2">Mobile First</h3>
                <p className="text-secondary-muted text-sm">
                  Responsive design optimized for mobile devices with offline capabilities and push notifications.
                </p>
              </div>
              <div className="card text-center">
                <BarChart3 className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-white mb-2">Analytics</h3>
                <p className="text-secondary-muted text-sm">
                  Community leaders can view safety trends, response times, and impact metrics with customizable reports.
                </p>
              </div>
              <div className="card text-center">
                <Lock className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-white mb-2">Privacy First</h3>
                <p className="text-secondary-muted text-sm">
                  End-to-end encryption, community data ownership, and transparent algorithms that communities can audit.
                </p>
              </div>
            </div>
          </div>

          {/* Other Products */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-primary-white font-serif text-center mb-12">
              In Development
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold text-primary-white mb-3">Safety Map</h3>
                <p className="text-secondary-muted mb-4">
                  Interactive mapping platform for community safety resources and incident reports.
                </p>
                <span className="inline-block bg-accent-blue text-primary-white px-3 py-1 rounded-full text-sm font-semibold">
                  BETA
                </span>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-primary-white mb-3">Community Alerts</h3>
                <p className="text-secondary-muted mb-4">
                  Emergency notification system for community-wide alerts and resource mobilization.
                </p>
                <span className="inline-block bg-secondary-muted text-primary-white px-3 py-1 rounded-full text-sm font-semibold">
                  DEVELOPMENT
                </span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-white font-serif mb-4">
                Ready to Deploy?
              </h2>
              <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
                We work with cities, nonprofits, and community groups to deploy our safety technology. Contact us to discuss pilot programs and partnerships.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const software = [
    {
      id: 'watchtower',
      name: 'Watchtower',
      description: 'Community safety reporting and triage dashboard with real-time incident tracking, neighborhood alerts, and analytics.',
      features: watchtowerFeatures,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
      status: 'live' as const,
      cta: {
        label: 'Request Demo',
        href: '#contact',
      },
    },
    {
      id: 'safety-map',
      name: 'Safety Map',
      description: 'Interactive mapping platform for community safety resources, incident reports, and neighborhood assets.',
      features: [
        'Interactive safety resource mapping',
        'Community asset directory',
        'Incident heat mapping',
        'Privacy-controlled data sharing',
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
      status: 'beta' as const,
      cta: {
        label: 'Join Beta',
        href: '#contact',
      },
    },
    {
      id: 'community-alerts',
      name: 'Community Alerts',
      description: 'Emergency notification system for community-wide alerts, safety updates, and resource mobilization.',
      features: [
        'Multi-channel alert system',
        'Geographic targeting',
        'Community response coordination',
        'Integration with emergency services',
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
      status: 'development' as const,
      cta: {
        label: 'Learn More',
        href: '#contact',
      },
    },
  ]

  return {
    props: {
      software,
    },
    revalidate: 3600,
  }
}