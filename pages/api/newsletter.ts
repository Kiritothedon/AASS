import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

interface NewsletterData {
  email: string
}

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3

  const key = ip
  const current = rateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function saveSubscription(data: NewsletterData): boolean {
  try {
    const subscriptionsPath = path.join(process.cwd(), 'data', 'newsletter.json')
    
    // Ensure directory exists
    const dir = path.dirname(subscriptionsPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Read existing subscriptions
    let subscriptions = []
    if (fs.existsSync(subscriptionsPath)) {
      const fileContent = fs.readFileSync(subscriptionsPath, 'utf8')
      subscriptions = JSON.parse(fileContent)
    }

    // Check if email already exists
    const existingSubscription = subscriptions.find(
      (sub: any) => sub.email.toLowerCase() === data.email.toLowerCase()
    )

    if (existingSubscription) {
      return true // Already subscribed
    }

    // Add new subscription
    const subscription = {
      id: Date.now().toString(),
      email: data.email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }
    
    subscriptions.push(subscription)

    // Save back to file
    fs.writeFileSync(subscriptionsPath, JSON.stringify(subscriptions, null, 2))
    return true
  } catch (error) {
    console.error('Newsletter subscription saving failed:', error)
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    if (!rateLimit(clientIP as string)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      })
    }

    // Validate request body
    const { email } = req.body

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      return res.status(400).json({ 
        error: 'Valid email address is required' 
      })
    }

    const newsletterData: NewsletterData = {
      email: email.trim()
    }

    // Save subscription
    const saved = saveSubscription(newsletterData)
    
    if (saved) {
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      })
    }

    return res.status(500).json({ 
      error: 'Failed to subscribe. Please try again later.' 
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
}
