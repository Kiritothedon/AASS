import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'
import fs from 'fs'
import path from 'path'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

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

function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (
    !data.name ||
    typeof data.name !== 'string' ||
    data.name.trim().length < 2
  ) {
    errors.push('Name is required and must be at least 2 characters long')
  }

  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.push('Valid email address is required')
  }

  if (
    !data.subject ||
    typeof data.subject !== 'string' ||
    data.subject.trim().length < 3
  ) {
    errors.push('Subject is required and must be at least 3 characters long')
  }

  if (
    !data.message ||
    typeof data.message !== 'string' ||
    data.message.trim().length < 10
  ) {
    errors.push('Message is required and must be at least 10 characters long')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

async function sendEmail(data: ContactFormData): Promise<boolean> {
  const contactEmail = process.env.AASS_CONTACT_EMAIL || 'contact@aass.org'

  const emailContent = `
New contact form submission from AASS website:

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from the AASS website contact form.
  `

  try {
    // Try SendGrid first
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: contactEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@aass.org',
        subject: `Contact Form: ${data.subject}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      }

      await sgMail.send(msg)
      return true
    }

    // Fallback to SMTP
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: contactEmail,
        subject: `Contact Form: ${data.subject}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      })
      return true
    }

    return false
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

function saveToFile(data: ContactFormData): boolean {
  try {
    const messagesPath = path.join(process.cwd(), 'data', 'messages.json')

    // Ensure directory exists
    const dir = path.dirname(messagesPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Read existing messages
    let messages = []
    if (fs.existsSync(messagesPath)) {
      const fileContent = fs.readFileSync(messagesPath, 'utf8')
      messages = JSON.parse(fileContent)
    }

    // Add new message
    const message = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
    }

    messages.push(message)

    // Save back to file
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2))
    return true
  } catch (error) {
    console.error('File saving failed:', error)
    return false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting
    const clientIP =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      'unknown'
    if (!rateLimit(clientIP as string)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      })
    }

    // Validate request body
    const { isValid, errors } = validateFormData(req.body)
    if (!isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      })
    }

    const formData: ContactFormData = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      subject: req.body.subject.trim(),
      message: req.body.message.trim(),
    }

    // Try to send email first
    const emailSent = await sendEmail(formData)

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully',
        method: 'email',
      })
    }

    // Fallback to file storage (for development/local)
    const fileSaved = saveToFile(formData)

    if (fileSaved) {
      return res.status(200).json({
        success: true,
        message: 'Message saved successfully',
        method: 'file',
        note: 'Email configuration not available. Message saved to local file.',
      })
    }

    // Both methods failed
    return res.status(500).json({
      error: 'Failed to process message. Please try again later.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}
