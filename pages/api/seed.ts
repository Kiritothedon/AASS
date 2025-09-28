import { NextApiRequest, NextApiResponse } from 'next'
import initiativesData from '../../data/initiatives.json'
import teamData from '../../data/team.json'
import { getBlogPosts } from '../../lib/blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Only allow in development or with proper authorization
  if (process.env.NODE_ENV === 'production' && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const posts = getBlogPosts()
    
    const seedData = {
      initiatives: initiativesData,
      team: teamData,
      posts: posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        tags: post.tags,
        featured: post.featured
      })),
      stats: {
        techGraduates: 156,
        fundingDeployed: '$2.3M',
        communitiesServed: 89,
        appUsers: '12K+',
        workshopsHosted: 89,
        participants: '3.2K'
      },
      lastUpdated: new Date().toISOString()
    }

    return res.status(200).json(seedData)
  } catch (error) {
    console.error('Seed data error:', error)
    return res.status(500).json({ 
      error: 'Failed to generate seed data' 
    })
  }
}
