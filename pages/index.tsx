import { GetStaticProps } from 'next'
import Link from 'next/link'
import Container from '../components/Container'
import Hero from '../components/Hero'
import BlogCard from '../components/BlogCard'
import { getBlogPosts } from '../lib/blog'
import { Building2, Code, Shield, ArrowRight } from 'lucide-react'

interface HomePageProps {
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
    description:
      'Seed funding, mentorship, and go-to-market support for Black founders building safety-focused businesses.',
  },
  {
    icon: Code,
    title: 'Tech Training',
    description:
      'Coding bootcamps and technology skills training for at-risk populations, with job placement support.',
  },
  {
    icon: Shield,
    title: 'Safety Software',
    description:
      'Community safety apps, reporting systems, and analytics tools designed for neighborhood protection.',
  },
]

export default function HomePage({ latestPosts }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Building Safety Through Business & Technology"
        subtitle="AASS creates software and initiatives that make communities safer."
        backgroundImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center"
        primaryCTA={{
          label: 'Our Software',
          href: '/software',
        }}
        secondaryCTA={{
          label: 'Learn More',
          href: '/about',
        }}
      />

      {/* Mission Cards */}
      <section className="py-24 bg-primary-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/about" className="card card-hover group">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-2xl font-bold text-primary-white font-serif mb-4 group-hover:text-primary-gold transition-colors">
                Our Mission
              </h3>
              <p className="text-secondary-muted leading-relaxed">
                We exist to further Black progress through business and
                technology, with the ultimate aim of making our communities
                safer.
              </p>
              <div className="flex items-center text-primary-gold mt-4 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-semibold">Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>

            <Link href="/software" className="card card-hover group">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-2xl font-bold text-primary-white font-serif mb-4 group-hover:text-primary-gold transition-colors">
                Our Software
              </h3>
              <p className="text-secondary-muted leading-relaxed">
                Watchtower and other safety tools designed to enhance community
                protection and resilience.
              </p>
              <div className="flex items-center text-primary-gold mt-4 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-semibold">View Software</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>

            <Link href="/blog" className="card card-hover group">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-primary-black" />
              </div>
              <h3 className="text-2xl font-bold text-primary-white font-serif mb-4 group-hover:text-primary-gold transition-colors">
                Insights
              </h3>
              <p className="text-secondary-muted leading-relaxed">
                Research, analysis, and updates from our work in community
                safety and technology.
              </p>
              <div className="flex items-center text-primary-gold mt-4 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-semibold">Read Insights</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Latest Insights */}
      <section className="py-24 bg-secondary-gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-white font-serif mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
              Stay updated with our latest research, program updates, and
              community stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} featured={index === 0} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="btn-secondary inline-flex items-center group"
            >
              <span>Read All Posts</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary-white font-serif mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-secondary-muted mb-12">
              Join our newsletter for updates on our initiatives, software
              releases, and community impact.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-secondary-gray border border-secondary-dark rounded-l-lg text-primary-white placeholder-secondary-muted focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                />
                <button className="btn-primary rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = await getBlogPosts()

  return {
    props: {
      latestPosts: latestPosts.slice(0, 3),
    },
    revalidate: 3600,
  }
}
