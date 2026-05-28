import type { NextApiRequest, NextApiResponse } from 'next'

/** Vercel Cron hits this route to refresh the homepage news cache (ISR). */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.authorization
    if (auth !== `Bearer ${secret}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  try {
    await res.revalidate('/')
    return res.status(200).json({
      revalidated: true,
      path: '/',
      at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('News cron revalidate failed:', error)
    return res.status(500).json({ error: 'Revalidation failed' })
  }
}
