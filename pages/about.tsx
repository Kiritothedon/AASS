import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import TeamCard from '../components/TeamCard'
import Container from '../components/Container'
import { CheckCircle, Calendar, Users, Building } from 'lucide-react'
import teamData from '../data/team.json'

interface AboutPageProps {
  team: typeof teamData
}

export default function AboutPage({ team }: AboutPageProps) {
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'AASS founded with mission to advance safety through Black business and technology.'
    },
    {
      year: '2021',
      title: 'First Programs',
      description: 'Launched initial tech training cohort and business incubator program.'
    },
    {
      year: '2022',
      title: 'Community Expansion',
      description: 'Deployed Watchtower platform in 25 communities across 5 states.'
    },
    {
      year: '2023',
      title: 'Research Division',
      description: 'Established research and policy division with first major safety analytics report.'
    },
    {
      year: '2024',
      title: 'Scale & Impact',
      description: 'Reached 89 communities, graduated 156 tech students, deployed $2.3M in funding.'
    }
  ]

  const approachItems = [
    {
      icon: Building,
      title: 'Business Incubation',
      description: 'Supporting Black entrepreneurs with funding, mentorship, and market access to build safety-focused businesses.'
    },
    {
      icon: CheckCircle,
      title: 'Product Engineering',
      description: 'Developing community safety software, reporting platforms, and analytics tools designed for neighborhood protection.'
    },
    {
      icon: Users,
      title: 'Public Policy & Research',
      description: 'Conducting data-driven analysis and policy advocacy to improve safety outcomes in Black communities.'
    },
    {
      icon: Calendar,
      title: 'Community Programs',
      description: 'Organizing workshops, training sessions, and community engagement initiatives to build local capacity.'
    }
  ]

  return (
    <>
      <Hero
        title="About AASS"
        subtitle="The African American Safety Society advances safety for Black people by creating economic power and technological tools."
        backgroundImage="/images/hero-about.jpg"
      />

      {/* Mission */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-primary-black">
              Our Mission
            </h2>
            <p className="text-xl text-secondary-muted leading-relaxed mb-12">
              The African American Safety Society (AASS) advances safety for Black people by creating economic power and technological tools. We believe that stronger businesses, better digital infrastructure, and targeted safety software reduce harm and improve community resilience. We run training programs, incubators, research, and product initiatives to make measurable progress in Black communities nationwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary-gold mb-2">156</div>
                <div className="text-secondary-muted">Tech Graduates</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary-gold mb-2">89</div>
                <div className="text-secondary-muted">Communities Served</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary-gold mb-2">$2.3M</div>
                <div className="text-secondary-muted">Funding Deployed</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Our Approach
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              We combine multiple strategies to create comprehensive solutions for community safety and economic development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approachItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="card card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-secondary-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Our Journey
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              From foundation to impact, here's how we've grown to serve communities nationwide.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-gold"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary-gold rounded-full border-4 border-white shadow-lg"></div>
                    
                    <div className="ml-16">
                      <div className="card">
                        <div className="text-primary-gold font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-primary-black mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-secondary-muted">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Our Team
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Meet the leaders driving our mission to advance safety through Black business and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Our Partners
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              We work with organizations, foundations, and community groups to maximize our impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder partner logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-secondary-muted font-medium">Partner {i}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      team: teamData
    },
    revalidate: 3600
  }
}
