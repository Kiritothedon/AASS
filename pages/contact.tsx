import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gtp-bg-0">
      <PageHeader
        title="Contact Us"
        subtitle="Have a question, partnership inquiry, or want to report an issue? Reach out."
        badge="Get in touch"
      />

      <section className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar info */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-gtp-border bg-gtp-bg-3">
                  <Mail className="h-5 w-5 text-gtp-blue" />
                </div>
                <h3 className="text-sm font-bold text-primary-white mb-1">Email</h3>
                <a
                  href="mailto:contact@aass.org"
                  className="text-sm text-secondary-muted hover:text-gtp-blue-light transition-colors"
                >
                  contact@aass.org
                </a>
              </div>

              <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-gtp-border bg-gtp-bg-3">
                  <MapPin className="h-5 w-5 text-gtp-blue" />
                </div>
                <h3 className="text-sm font-bold text-primary-white mb-1">Mailing</h3>
                <p className="text-sm text-secondary-muted leading-relaxed">
                  1234 Community Way, Suite 100
                  <br />
                  Atlanta, GA 30309
                </p>
              </div>

              <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6">
                <h3 className="text-sm font-bold text-primary-white mb-2">Response Time</h3>
                <p className="text-sm text-secondary-muted leading-relaxed">
                  We typically respond within 3–5 business days.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
