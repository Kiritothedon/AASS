import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={`card card-hover h-full flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
      {/* Featured badge */}
      {post.featured && (
        <div className="absolute -top-3 -right-3 bg-primary-gold text-primary-black px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      )}

      <div className="flex-1">
        <h3 className={`font-semibold text-primary-black mb-3 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary-gold transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className={`text-secondary-muted mb-4 leading-relaxed ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary-gray text-secondary-muted text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-sm text-secondary-muted pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-gold hover:text-opacity-80 font-medium transition-colors duration-200"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
