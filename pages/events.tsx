import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import EventList from '../components/EventList'
import Container from '../components/Container'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

interface EventsPageProps {
  events: Array<{
    id: string
    title: string
    date: string
    time: string
    location: string
    description: string
    rsvpUrl?: string
    status: 'upcoming' | 'past'
  }>
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <>
      <Hero
        title="Events & Workshops"
        subtitle="Join us for workshops, town halls, training sessions, and community events focused on building safer, stronger Black communities."
        backgroundImage="/images/hero-events.jpg"
      />

      {/* Event Stats */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">89</div>
              <div className="text-secondary-muted">Workshops Hosted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">3.2K</div>
              <div className="text-secondary-muted">Participants</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">45</div>
              <div className="text-secondary-muted">Communities</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">95%</div>
              <div className="text-secondary-muted">Satisfaction Rate</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Event Types */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Types of Events
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              We host a variety of events designed to educate, engage, and empower communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary-black">
                Community Workshops
              </h3>
              <p className="text-secondary-muted">
                Hands-on training sessions on digital safety, emergency preparedness, and neighborhood organizing.
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary-black">
                Town Halls
              </h3>
              <p className="text-secondary-muted">
                Community discussions on safety issues, policy updates, and collaborative problem-solving.
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary-black">
                Training Sessions
              </h3>
              <p className="text-secondary-muted">
                Professional development and skill-building workshops for community leaders and volunteers.
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary-black">
                Safety Audits
              </h3>
              <p className="text-secondary-muted">
                Community-led assessments of neighborhood safety conditions and resource needs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* All Events */}
      <EventList events={events} title="Upcoming & Past Events" />

      {/* Event Request */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Host an Event in Your Community
            </h2>
            <p className="text-xl text-secondary-muted mb-8 leading-relaxed">
              Interested in bringing our workshops or training sessions to your community? We work with local organizations, schools, and community groups to host events that meet your specific needs.
            </p>
            
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-primary-black mb-4">
                Event Request Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary-black">1</span>
                  </div>
                  <h4 className="font-semibold text-primary-black mb-2">Contact Us</h4>
                  <p className="text-sm text-secondary-muted">Reach out with your event ideas and community needs.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary-black">2</span>
                  </div>
                  <h4 className="font-semibold text-primary-black mb-2">Plan Together</h4>
                  <p className="text-sm text-secondary-muted">We'll work with you to design the perfect event.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary-black">3</span>
                  </div>
                  <h4 className="font-semibold text-primary-black mb-2">Host Event</h4>
                  <p className="text-sm text-secondary-muted">We'll bring the expertise, you bring the community.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary">
                  Request an Event
                </a>
                <a href="/initiatives" className="btn-secondary">
                  Learn About Programs
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
  const events = [
    {
      id: 'workshop-digital-safety-2025-01',
      title: 'Digital Safety Workshop',
      date: '2025-01-15',
      time: '6:00 PM - 8:00 PM',
      location: 'Atlanta Community Center, Atlanta, GA',
      description: 'Learn essential digital safety practices for community organizing and personal security. Topics include secure communication, social media safety, and protecting community data.',
      rsvpUrl: '#',
      status: 'upcoming' as const
    },
    {
      id: 'town-hall-safety-2025-01',
      title: 'Community Safety Town Hall',
      date: '2025-01-22',
      time: '7:00 PM - 9:00 PM',
      location: 'Chicago Public Library, Chicago, IL',
      description: 'Join us for a community discussion on neighborhood safety initiatives, resource sharing, and collaborative solutions for safer communities.',
      rsvpUrl: '#',
      status: 'upcoming' as const
    },
    {
      id: 'training-leadership-2025-02',
      title: 'Community Leadership Training',
      date: '2025-02-05',
      time: '9:00 AM - 4:00 PM',
      location: 'Detroit Community Hub, Detroit, MI',
      description: 'Comprehensive training for community leaders on organizing, advocacy, and implementing safety programs in their neighborhoods.',
      rsvpUrl: '#',
      status: 'upcoming' as const
    },
    {
      id: 'workshop-emergency-prep-2024-12',
      title: 'Emergency Preparedness Workshop',
      date: '2024-12-10',
      time: '6:30 PM - 8:30 PM',
      location: 'Houston Community Center, Houston, TX',
      description: 'Learn essential emergency preparedness skills including first aid, emergency communication, and community resource coordination.',
      status: 'past' as const
    },
    {
      id: 'safety-audit-training-2024-11',
      title: 'Community Safety Audit Training',
      date: '2024-11-18',
      time: '10:00 AM - 2:00 PM',
      location: 'Oakland Public Library, Oakland, CA',
      description: 'Training session on conducting community safety audits and developing action plans for neighborhood improvement.',
      status: 'past' as const
    },
    {
      id: 'tech-training-intro-2024-10',
      title: 'Introduction to Tech Training Programs',
      date: '2024-10-25',
      time: '6:00 PM - 8:00 PM',
      location: 'Brooklyn Community Center, Brooklyn, NY',
      description: 'Information session about our coding bootcamps and technology training programs for community members.',
      status: 'past' as const
    }
  ]

  return {
    props: {
      events
    },
    revalidate: 3600
  }
}
