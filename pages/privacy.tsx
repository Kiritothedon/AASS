import { GetStaticProps } from 'next'
import Container from '../components/Container'

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-secondary-gray mt-4">
              Last updated: December 2024
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                The African American Safety Society ("AASS," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul>
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Program application information</li>
                <li>Newsletter subscription information</li>
                <li>Event registration details</li>
                <li>Survey responses and feedback</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>We may automatically collect certain information about your device and usage, including:</p>
              <ul>
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device information</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our programs and services</li>
                <li>Communicate with you about our programs, events, and updates</li>
                <li>Process program applications and registrations</li>
                <li>Send newsletters and educational content</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and prevent fraud</li>
              </ul>

              <h2>Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our website and providing services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                <li><strong>Program Partners:</strong> With partner organizations when you participate in joint programs (with your consent)</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2>Community Data Ownership</h2>
              <p>
                For our community safety platforms and software, we follow a community-first approach to data ownership. Communities using our tools maintain control over their data, and we provide transparent data practices and community governance options.
              </p>

              <h2>Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Some features of our website may not function properly if cookies are disabled.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul>
                <li>Email: privacy@aass.org</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 1234 Community Way, Suite 100, Atlanta, GA 30309</li>
              </ul>

              <div className="bg-secondary-gray p-6 rounded-lg mt-8">
                <h3>Key Privacy Commitments</h3>
                <ul>
                  <li>We do not sell your personal information</li>
                  <li>We use your data only for legitimate purposes</li>
                  <li>We provide community control over community data</li>
                  <li>We maintain transparent data practices</li>
                  <li>We implement strong security measures</li>
                </ul>
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
    props: {},
    revalidate: 86400 // Revalidate daily
  }
}
