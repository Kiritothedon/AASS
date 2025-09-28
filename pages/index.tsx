import { GetStaticProps } from 'next'
import Hero from '../components/Hero'
import FeatureGrid from '../components/FeatureGrid'
import InitiativeCard from '../components/InitiativeCard'
import BlogCard from '../components/BlogCard'
import CTA from '../components/CTA'
import Container from '../components/Container'
import { Building2, Code, Shield } from 'lucide-react'
import initiatives from '../data/initiatives.json'
import { getBlogPosts } from '../lib/blog'

interface HomePageProps {
  featuredInitiatives: typeof initiatives
  latestPosts: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    tags: string[]
    featured?: boolean
  }>
}

const features = [
  {
    icon: Building2,
    title: 'Business Incubator',
    description: 'Seed funding, mentorship, and go-to-market support for Black founders building safety-focused businesses.'
  },
  {
    icon: Code,
    title: 'Tech Training',
    description: 'Coding bootcamps and technology skills training for at-risk populations, with job placement support.'
  },
  {
    icon: Shield,
    title: 'Safety Software',
    description: 'Community safety apps, reporting systems, and analytics tools designed for neighborhood protection.'
  }
]

export default function HomePage({ featuredInitiatives, latestPosts }: HomePageProps) {
  return (
    <>
      <Hero
        title="Building Safety Through Black Business & Technology"
        subtitle="AASS empowers Black communities with training, tools, and capital — so that economic opportunity fuels safer, stronger neighborhoods."
        primaryCTA={{
          label: 'Explore Initiatives',
          href: '#initiatives'
        }}
        secondaryCTA={{
          label: 'See Our Software',
          href: '/software'
        }}
      />

      {/* Feature Grid */}
      <FeatureGrid
        features={features}
        title="Our Approach"
        description="We combine business development, technology training, and community safety tools to create comprehensive solutions for Black communities."
      />

      {/* Featured Initiatives */}
      <section id="initiatives" className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Featured Initiatives
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Our programs support founders, train technologists, and build software that addresses vulnerability in communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredInitiatives.slice(0, 3).map((initiative) => {
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

          <div className="text-center">
            <a
              href="/initiatives"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View All Initiatives</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">156</div>
              <div className="text-secondary-gray">Tech Graduates</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">$2.3M</div>
              <div className="text-secondary-gray">Funding Deployed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">89</div>
              <div className="text-secondary-gray">Communities Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">12K+</div>
              <div className="text-secondary-gray">App Users</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
              Latest Insights
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Stay updated with our latest research, program updates, and community stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                featured={index === 0}
              />
            ))}
          </div>

          <div className="text-center">
            <a
              href="/blog"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Read All Posts</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Join Our Mission"
        description="Be part of the movement to build safer, stronger Black communities through business and technology."
        primaryAction={{
          label: 'Join Newsletter',
          href: '#newsletter'
        }}
        secondaryAction={{
          label: 'Donate',
          href: '#donate'
        }}
      >
        <div id="newsletter" className="mt-8">
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-l-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-gold"
              />
              <button className="btn-primary rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </CTA>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogPosts()
  const latestPosts = posts.slice(0, 3)

  return {
    props: {
      featuredInitiatives: initiatives.slice(0, 3),
      latestPosts
    },
    revalidate: 3600 // Revalidate every hour
  }
}
