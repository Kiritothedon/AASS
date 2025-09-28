import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Container from '../../components/Container'
import BlogCard from '../../components/BlogCard'
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react'
import { getBlogPosts, getBlogPost, getBlogSlugs } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'

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

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="section-padding">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
            <p className="text-secondary-muted">Loading...</p>
          </div>
        </Container>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="section-padding">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-black mb-4">Post Not Found</h1>
            <p className="text-secondary-muted mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Head>
        <title>{post.title} | African American Safety Society</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Head>

      {/* Back Navigation */}
      <section className="py-8 bg-secondary-gray">
        <Container>
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-2 text-secondary-muted hover:text-primary-gold transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </Container>
      </section>

      {/* Article Header */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif text-primary-black leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-secondary-muted mb-8">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary-gray text-secondary-muted text-sm rounded-full"
                    >
                      <Tag className="h-3 w-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div className="bg-gray-50 p-8 rounded-lg mb-8">
                <p className="text-xl text-secondary-muted italic leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              
              {/* MDX Content */}
              <div className="prose prose-lg prose-headings:font-serif prose-headings:text-primary-black prose-p:text-secondary-muted prose-p:leading-relaxed prose-a:text-primary-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-primary-black">
                {post.content}
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-secondary-gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold text-primary-black mb-8 text-center">
                Related Posts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Want More Insights?
            </h2>
            <p className="text-gray-200 mb-6">
              Explore our other posts about community safety, technology, and business development.
            </p>
            <Link href="/blog" className="btn-primary">
              Browse All Posts
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getBlogSlugs()
  
  const paths = slugs.map((slug) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      notFound: true
    }
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = getBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .filter(p => p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)

  // If no related posts by tags, get recent posts
  const finalRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : allPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  return {
    props: {
      post,
      relatedPosts: finalRelatedPosts
    },
    revalidate: 3600
  }
}
