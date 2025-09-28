import { NextApiRequest, NextApiResponse } from 'next'
import { getBlogPosts } from '../../lib/blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const posts = getBlogPosts()
    
    // Add CORS headers for client-side usage
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    return res.status(200).json({
      posts: posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        tags: post.tags,
        featured: post.featured
      })),
      total: posts.length,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Posts API error:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch posts' 
    })
  }
}
