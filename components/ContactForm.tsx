import { useState } from 'react'
import { Send, Check, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
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
        <div className="bg-secondary-gray rounded-lg shadow-lg p-8 border border-secondary-dark max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-primary-gold mb-4">
            <Check className="h-8 w-8" />
            <h3 className="text-xl font-semibold text-primary-white">
              Message Sent!
            </h3>
          </div>
          <p className="text-secondary-muted mb-6">
            Thanks — your message was sent. We'll respond within 3–5 business
            days.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-secondary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="bg-secondary-gray rounded-lg shadow-lg p-8 border border-secondary-dark max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-semibold text-primary-white mb-6 font-serif">
          Send us a message
        </h3>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-900 bg-opacity-20 p-4 rounded-lg mb-6 border border-red-800">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary-white mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary-dark border border-secondary-muted rounded-lg text-primary-white placeholder-secondary-muted focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary-white mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary-dark border border-secondary-muted rounded-lg text-primary-white placeholder-secondary-muted focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-primary-white mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary-dark border border-secondary-muted rounded-lg text-primary-white placeholder-secondary-muted focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
            placeholder="What's this about?"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-primary-white mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-secondary-dark border border-secondary-muted rounded-lg text-primary-white placeholder-secondary-muted focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors resize-vertical"
            placeholder="Tell us more about your inquiry..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-black border-t-transparent" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
