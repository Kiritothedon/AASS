import Container from '../components/Container'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-black">
      <Container>
        <div className="py-24">
          <div className="max-w-4xl mx-auto">
            <div className="card text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-white font-serif mb-8 tracking-wide">
                ABOUT THE AFRICAN AMERICAN SAFETY SOCIETY
              </h1>
              <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
              <p className="text-xl text-secondary-muted leading-relaxed max-w-3xl mx-auto">
                The African American Safety Society (AASS) exists to further Black progress through business and technology, with the ultimate aim of making our communities safer. We release software and tools that strengthen economic power and reduce risks. This site offers only a glimpse into our mission.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}