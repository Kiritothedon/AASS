import { GetStaticProps } from 'next'
import Link from 'next/link'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import BlogCard from '../../components/BlogCard'
import SEO from '../../components/SEO'
import JsonLd, { breadcrumbSchema, itemListSchema, webPageSchema } from '../../components/JsonLd'
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
  const title = 'Insights on Black Community Safety & Advocacy'
  const description =
    'Research and analysis from AASSociety on racial incident reporting, Black community safety, hate crime documentation, technology, and policy demands worth fighting for.'

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
          itemListSchema({
            name: 'AASS Insights',
            description,
            items: posts.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
          }),
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
