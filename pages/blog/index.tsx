import { GetStaticProps } from 'next'
import Link from 'next/link'
import BlogCard from '../../components/BlogCard'
import Container from '../../components/Container'
import { Calendar, Tag, User } from 'lucide-react'
import { getBlogPosts } from '../../lib/blog'

interface BlogIndexPageProps {
  posts: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    tags: string[]
    featured?: boolean
  }>
  tags: string[]
}

export default function BlogIndexPage({ posts, tags }: BlogIndexPageProps) {
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-primary-black text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Insights & Updates
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Stay informed about our latest research, program updates, community stories, and insights on building safer Black communities through business and technology.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-black mb-8">Featured Post</h2>
              <div className="max-w-4xl">
                <BlogCard post={featuredPost} featured />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-secondary-gray">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-primary-black">All Posts</h2>
                <div className="text-secondary-muted">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-secondary-muted">
                    <Calendar className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary-black mb-2">No Posts Yet</h3>
                    <p>Check back soon for our latest insights and updates.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-8 space-y-8">
                {/* Tags */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-primary-black mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-secondary-gray text-secondary-muted text-sm rounded-full hover:bg-primary-gold hover:text-primary-black transition-colors duration-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-primary-black mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-secondary-muted text-sm mb-4">
                    Get our latest posts delivered to your inbox.
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                    />
                    <button className="btn-primary text-sm rounded-l-none px-3">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* About */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-primary-black mb-4">
                    About Our Blog
                  </h3>
                  <p className="text-secondary-muted text-sm leading-relaxed">
                    We share insights on community safety, technology solutions, business development, and research findings to help build stronger Black communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogPosts()
  
  // Extract unique tags
  const allTags = posts.flatMap(post => post.tags)
  const uniqueTags = Array.from(new Set(allTags)).sort()

  return {
    props: {
      posts,
      tags: uniqueTags
    },
    revalidate: 3600
  }
}
