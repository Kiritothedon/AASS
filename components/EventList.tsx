import { Calendar, MapPin, ExternalLink } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  rsvpUrl?: string
  status: 'upcoming' | 'past'
}

interface EventListProps {
  events: Event[]
  title?: string
  showPast?: boolean
}

export default function EventList({ events, title, showPast = true }: EventListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const upcomingEvents = events.filter(event => event.status === 'upcoming')
  const pastEvents = events.filter(event => event.status === 'past')

  return (
    <section className="section-padding">
      <div className="container-custom">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              {title}
            </h2>
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-primary-black">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 text-primary-gold">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Upcoming
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-primary-black mb-3">
                    {event.title}
                  </h4>

                  <div className="flex items-center space-x-2 text-secondary-muted mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>

                  <div className="flex items-start space-x-2 text-secondary-muted mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  <p className="text-secondary-muted text-sm mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {event.rsvpUrl && (
                    <a
                      href={event.rsvpUrl}
                      className="btn-primary w-full text-center inline-flex items-center justify-center space-x-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>RSVP</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {showPast && pastEvents.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-primary-black">Past Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="card opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 text-secondary-muted">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      Past
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-primary-black mb-3">
                    {event.title}
                  </h4>

                  <div className="flex items-start space-x-2 text-secondary-muted mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  <p className="text-secondary-muted text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-secondary-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-black mb-2">No Events Scheduled</h3>
            <p className="text-secondary-muted">
              Check back soon for upcoming events and workshops.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
