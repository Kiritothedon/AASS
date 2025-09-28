import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'data/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  author: string
  featured?: boolean
  content: string
}

export function getBlogPosts(): BlogPost[] {
  // Get all MDX files
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove .mdx extension from filename to get slug
      const slug = fileName.replace(/\.mdx$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        tags: matterResult.data.tags || [],
        author: matterResult.data.author,
        featured: matterResult.data.featured || false,
        content: matterResult.content,
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      tags: matterResult.data.tags || [],
      author: matterResult.data.author,
      featured: matterResult.data.featured || false,
      content: matterResult.content,
    }
  } catch (error) {
    return null
  }
}

export function getBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
