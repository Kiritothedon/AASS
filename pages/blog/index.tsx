import { GetStaticProps } from 'next'
import Link from 'next/link'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import BlogCard from '../../components/BlogCard'
import SEO from '../../components/SEO'
import JsonLd, { breadcrumbSchema, webPageSchema } from '../../components/JsonLd'
import { getBlogPosts } from '../../lib/blog'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  featured?: boolean
}

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const title = 'Insights & Analysis'
  const description =
    'Research, analysis, and commentary from the African American Safety Society on community safety, technology, and Black progress.'

  return (
    <div className="min-h-screen bg-primary-black">
      <SEO title={title} description={description} path="/blog" />
      <JsonLd
        data={[
          webPageSchema({ title, description, path: '/blog' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/blog' },
          ]),
        ]}
      />
      <PageHeader
        title="Insights"
        subtitle="Research, analysis, and updates from our work in community safety."
      />

      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} featured={index === 0} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPosts()

  return {
    props: {
      posts,
    },
    revalidate: 3600,
  }
}
