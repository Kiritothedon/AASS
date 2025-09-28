import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary-black">
      <PageHeader title="Contact Us" />

      <Container>
        <div className="py-16">
          <div className="max-w-2xl mx-auto">
            <ContactForm />

            <div className="mt-12 text-center">
              <div className="text-secondary-muted text-sm">
                <p>Email: contact@aass.org</p>
                <p className="mt-2">
                  Mailing: 1234 Community Way, Suite 100, Atlanta, GA 30309
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
