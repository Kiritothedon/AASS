import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from '../../components/Container'
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react'
import SEO from '../../components/SEO'
import JsonLd, { articleSchema, breadcrumbSchema } from '../../components/JsonLd'
import { getBlogPosts, getBlogPost, getBlogSlugs } from '../../lib/blog'
import { renderMarkdown } from '../../lib/markdown'

interface BlogPostPageProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    tags: string[]
    featured?: boolean
    content: string
  }
  relatedPosts: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    tags: string[]
    featured?: boolean
  }>
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: BlogPostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        ogType="article"
        publishedTime={new Date(post.date).toISOString()}
        author={post.author}
        tags={post.tags}
      />
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="min-h-screen bg-primary-black">
        <Container>
          <div className="py-16">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-gold hover:text-opacity-80 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Link>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-white font-serif mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-secondary-muted mb-8">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {post.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {post.tags.join(', ')}
                  </div>
                )}
              </div>

              <div className="w-24 h-1 bg-primary-gold mb-8"></div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-2xl font-bold text-primary-white font-serif mb-8">
                  Related Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.slice(0, 2).map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="card card-hover group"
                    >
                      <h3 className="text-xl font-semibold text-primary-white group-hover:text-primary-gold transition-colors mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-secondary-muted mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-sm text-secondary-muted">
                        {new Date(relatedPost.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogSlugs()
  const paths = slugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getBlogPost(slug)
  const allPosts = await getBlogPosts()

  // Get related posts (exclude current post)
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      relatedPosts,
    },
    revalidate: 3600,
  }
}
