import { NextApiRequest, NextApiResponse } from 'next'
import initiativesData from '../../data/initiatives.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Add CORS headers for client-side usage
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    return res.status(200).json({
      initiatives: initiativesData,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Initiatives API error:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch initiatives' 
    })
  }
}
