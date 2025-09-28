import { GetStaticProps } from 'next'
import Link from 'next/link'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import BlogCard from '../../components/BlogCard'
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
  return (
    <div className="min-h-screen bg-primary-black">
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