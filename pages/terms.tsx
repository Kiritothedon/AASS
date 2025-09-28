import { GetStaticProps } from 'next'
import Container from '../components/Container'

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Please read these terms carefully before using our website and services.
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
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using the African American Safety Society (AASS) website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on AASS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2>Program Participation</h2>
              
              <h3>Eligibility</h3>
              <p>
                Our programs are designed to serve Black communities and individuals committed to advancing community safety. Participation in our programs is subject to application review and acceptance.
              </p>

              <h3>Program Requirements</h3>
              <p>Participants in our programs agree to:</p>
              <ul>
                <li>Attend required sessions and complete assignments</li>
                <li>Maintain respectful and professional conduct</li>
                <li>Use program resources responsibly</li>
                <li>Follow all program guidelines and policies</li>
                <li>Respect the privacy and confidentiality of other participants</li>
              </ul>

              <h3>Program Modifications</h3>
              <p>
                We reserve the right to modify program content, schedules, and requirements. Participants will be notified of significant changes in advance when possible.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the website are protected under applicable copyrights, trademarks, and other proprietary rights. The copying, redistribution, use, or publication by you of any such matters or any part of the website is strictly prohibited.
              </p>

              <h2>Community Safety Platform Terms</h2>
              
              <h3>Data Ownership</h3>
              <p>
                Communities using our safety platforms retain ownership and control of their data. We provide tools and services but do not claim ownership of community-generated data.
              </p>

              <h3>Privacy and Security</h3>
              <p>
                Users of our community safety platforms must respect the privacy and security of other community members. Sharing personal information without consent is prohibited.
              </p>

              <h3>Responsible Use</h3>
              <p>Users agree to:</p>
              <ul>
                <li>Report only legitimate safety concerns</li>
                <li>Not use the platform for harassment or false reporting</li>
                <li>Respect community guidelines and local laws</li>
                <li>Maintain the confidentiality of sensitive information</li>
              </ul>

              <h2>User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use our services for any unlawful purpose or in violation of any local, state, national, or international law</li>
                <li>Transmit any harmful, threatening, abusive, defamatory, or otherwise objectionable content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to any part of our services</li>
              </ul>

              <h2>Disclaimer</h2>
              <p>
                The materials on AASS's website are provided on an 'as is' basis. AASS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2>Limitations</h2>
              <p>
                In no event shall AASS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AASS's website, even if AASS or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2>Accuracy of Materials</h2>
              <p>
                The materials appearing on AASS's website could include technical, typographical, or photographic errors. AASS does not warrant that any of the materials on its website are accurate, complete, or current. AASS may make changes to the materials contained on its website at any time without notice.
              </p>

              <h2>Links</h2>
              <p>
                AASS has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AASS of the site. Use of any such linked website is at the user's own risk.
              </p>

              <h2>Modifications</h2>
              <p>
                AASS may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the State of Georgia and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: legal@aass.org</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 1234 Community Way, Suite 100, Atlanta, GA 30309</li>
              </ul>

              <div className="bg-secondary-gray p-6 rounded-lg mt-8">
                <h3>Key Points</h3>
                <ul>
                  <li>Use our services responsibly and respectfully</li>
                  <li>Respect intellectual property rights</li>
                  <li>Follow program guidelines and requirements</li>
                  <li>Community data belongs to communities</li>
                  <li>We provide services "as is" with appropriate disclaimers</li>
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
