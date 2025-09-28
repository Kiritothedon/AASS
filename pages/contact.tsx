import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import Container from '../components/Container'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

interface ContactPageProps {
  contactInfo: {
    email: string
    phone: string
    address: string
    hours: string
  }
}

export default function ContactPage({ contactInfo }: ContactPageProps) {
  const contactMethods = [
    {
      icon: Mail,
      title: 'General Inquiries',
      description: 'For questions about our programs, partnerships, or general information.',
      contact: 'contact@aass.org',
      href: 'mailto:contact@aass.org'
    },
    {
      icon: Phone,
      title: 'Press & Media',
      description: 'For media inquiries, interviews, and press-related questions.',
      contact: 'press@aass.org',
      href: 'mailto:press@aass.org'
    },
    {
      icon: Mail,
      title: 'Partnerships',
      description: 'For organizations interested in partnering with AASS.',
      contact: 'partnerships@aass.org',
      href: 'mailto:partnerships@aass.org'
    },
    {
      icon: Mail,
      title: 'Support',
      description: 'For technical support with our software or platform issues.',
      contact: 'support@aass.org',
      href: 'mailto:support@aass.org'
    }
  ]

  return (
    <>
      <Hero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Whether you're interested in our programs, want to partner with us, or have questions about our work, we're here to help."
        backgroundImage="/images/hero-contact.jpg"
      />

      {/* Contact Form */}
      <section className="section-padding">
        <Container>
          <ContactForm />
        </Container>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
                Contact Information
              </h2>
              <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
                Choose the best way to reach us based on your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div key={index} className="card card-hover text-center">
                    <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-primary-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-primary-black">
                      {method.title}
                    </h3>
                    <p className="text-secondary-muted mb-4 leading-relaxed">
                      {method.description}
                    </p>
                    <a
                      href={method.href}
                      className="text-primary-gold hover:text-opacity-80 font-medium transition-colors duration-200"
                    >
                      {method.contact}
                    </a>
                  </div>
                )
              })}
            </div>

            {/* Office Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="card">
                <h3 className="text-2xl font-semibold text-primary-black mb-6">
                  Visit Our Office
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary-gold mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary-black">Address</div>
                      <div className="text-secondary-muted">
                        {contactInfo.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary-gold mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary-black">Phone</div>
                      <div className="text-secondary-muted">
                        <a href={`tel:${contactInfo.phone}`} className="hover:text-primary-gold transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary-gold mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary-black">Email</div>
                      <div className="text-secondary-muted">
                        <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-gold transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary-gold mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary-black">Office Hours</div>
                      <div className="text-secondary-muted">
                        {contactInfo.hours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-semibold text-primary-black mb-6">
                  What to Expect
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">Response Time</h4>
                    <p className="text-secondary-muted">
                      We typically respond to all inquiries within 3-5 business days. For urgent matters, please call our office directly.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">Partnership Inquiries</h4>
                    <p className="text-secondary-muted">
                      We're always interested in partnering with organizations that share our mission. Please include details about your organization and proposed collaboration.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">Program Applications</h4>
                    <p className="text-secondary-muted">
                      For program applications, please visit our Initiatives page to learn more about our programs and application processes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">Media Requests</h4>
                    <p className="text-secondary-muted">
                      We welcome media inquiries and are happy to provide interviews, statements, and background information about our work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-secondary-muted">
                Quick answers to common questions about our programs and services.
              </p>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-primary-black mb-3">
                  How can I apply to your programs?
                </h3>
                <p className="text-secondary-muted">
                  Visit our Initiatives page to learn about our programs and application processes. Each program has specific requirements and application deadlines.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-primary-black mb-3">
                  Do you offer programs in my city?
                </h3>
                <p className="text-secondary-muted">
                  We serve communities nationwide. Check our Events page for upcoming workshops and events in your area, or contact us to discuss bringing our programs to your community.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-primary-black mb-3">
                  How can my organization partner with AASS?
                </h3>
                <p className="text-secondary-muted">
                  We partner with community organizations, schools, nonprofits, and businesses. Contact our partnerships team to discuss collaboration opportunities.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-primary-black mb-3">
                  Is there a cost for your programs?
                </h3>
                <p className="text-secondary-muted">
                  Most of our programs are free or low-cost for participants. We provide scholarships and financial assistance for those who need it. Contact us for specific program costs.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contactInfo = {
    email: 'contact@aass.org',
    phone: '(555) 123-4567',
    address: '1234 Community Way\nSuite 100\nAtlanta, GA 30309',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM'
  }

  return {
    props: {
      contactInfo
    },
    revalidate: 3600
  }
}
