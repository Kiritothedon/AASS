import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import InitiativeCard from '../components/InitiativeCard'
import Container from '../components/Container'
import initiativesData from '../data/initiatives.json'

interface InitiativesPageProps {
  initiatives: typeof initiativesData
}

export default function InitiativesPage({ initiatives }: InitiativesPageProps) {
  return (
    <>
      <Hero
        title="Our Initiatives"
        subtitle="Our programs support founders, train technologists, and build software that addresses vulnerability in communities. We prioritize solutions that scale and can be deployed by local leaders."
        backgroundImage="/images/hero-initiatives.jpg"
      />

      {/* All Initiatives */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              All Programs
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Explore our comprehensive suite of programs designed to build economic opportunity and community safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative) => {
              // Import the icon component dynamically
              const IconComponent = require('lucide-react')[initiative.icon as keyof typeof require('lucide-react')]
              return (
                <InitiativeCard
                  key={initiative.id}
                  initiative={initiative}
                  iconComponent={IconComponent}
                />
              )
            })}
          </div>
        </Container>
      </section>

      {/* Program Details */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-primary-black text-center">
              Program Details
            </h2>

            <div className="space-y-12">
              {initiatives.map((initiative) => {
                const IconComponent = require('lucide-react')[initiative.icon as keyof typeof require('lucide-react')]
                return (
                  <div key={initiative.id} id={initiative.id} className="card">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-primary-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-primary-black mb-4">
                          {initiative.title}
                        </h3>
                        <p className="text-secondary-muted leading-relaxed mb-6">
                          {initiative.details}
                        </p>

                        {/* Stats */}
                        {initiative.stats && (
                          <div className="grid grid-cols-3 gap-6 p-6 bg-secondary-gray rounded-lg mb-6">
                            {Object.entries(initiative.stats).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-2xl font-bold text-primary-black mb-1">{value}</div>
                                <div className="text-sm text-secondary-muted capitalize">{key}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <a
                          href={initiative.cta.href}
                          className="btn-primary"
                        >
                          {initiative.cta.label}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Application Process */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-primary-black">
              How to Apply
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card card-hover">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-black">1</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-black mb-3">Review Programs</h3>
                <p className="text-secondary-muted">
                  Explore our initiatives and find the program that best fits your goals and experience.
                </p>
              </div>

              <div className="card card-hover">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-black">2</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-black mb-3">Submit Application</h3>
                <p className="text-secondary-muted">
                  Complete our application process with your background, goals, and program interest.
                </p>
              </div>

              <div className="card card-hover">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-black">3</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-black mb-3">Join the Program</h3>
                <p className="text-secondary-muted">
                  If selected, join our cohort and begin your journey with mentorship and support.
                </p>
              </div>
            </div>

            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-primary-black mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-secondary-muted mb-6">
                Contact us to learn more about our programs and application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary">
                  Contact Us
                </a>
                <a href="/events" className="btn-secondary">
                  Attend Info Session
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      initiatives: initiativesData
    },
    revalidate: 3600
  }
}
