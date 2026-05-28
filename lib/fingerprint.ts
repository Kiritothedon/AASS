import crypto from 'crypto'
import type { NextApiRequest } from 'next'

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(',')[0]?.trim() || 'unknown'
  }
  return req.socket.remoteAddress || 'unknown'
}

export function getUserAgent(req: NextApiRequest): string {
  const ua = req.headers['user-agent']
  return typeof ua === 'string' ? ua : 'unknown'
}

/** One-way hash so raw IPs are not stored in the database. */
export function hashFingerprint(ip: string, userAgent: string): string {
  const salt =
    process.env.INCIDENT_FINGERPRINT_SALT ||
    (process.env.NODE_ENV === 'development' ? 'aass-dev-fingerprint-salt' : '')
  if (!salt) {
    throw new Error('INCIDENT_FINGERPRINT_SALT is not configured')
  }
  return crypto
    .createHash('sha256')
    .update(`${salt}:${ip}:${userAgent}`)
    .digest('hex')
}
