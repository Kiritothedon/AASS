import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

interface NewsletterFormProps {
  className?: string
  variant?: 'default' | 'inline'
}

export default function NewsletterForm({ className = '', variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`${className} text-center`}>
        <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
          <Check className="h-5 w-5" />
          <span className="font-medium">Successfully subscribed!</span>
        </div>
        <p className="text-sm text-secondary-muted">
          Thank you for joining our newsletter. You'll receive updates soon.
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`${className} flex flex-col sm:flex-row gap-3`}>
        <div className="flex-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary whitespace-nowrap"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    )
  }

  return (
    <div className={`${className} max-w-md mx-auto`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>
      <p className="text-xs text-secondary-muted mt-3 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}
