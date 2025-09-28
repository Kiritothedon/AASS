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
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        <div className="card max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <Check className="h-8 w-8" />
            <h3 className="text-xl font-semibold">Message Sent!</h3>
          </div>
          <p className="text-secondary-muted mb-6">
            Thanks — your message was sent. We'll respond within 3–5 business days.
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
      <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-primary-black mb-6">
          Send us a message
        </h3>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-black mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-black mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-medium text-primary-black mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="media">Media & Press</option>
            <option value="volunteer">Volunteer</option>
            <option value="donation">Donation</option>
            <option value="program">Program Information</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-primary-black mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-vertical"
            placeholder="Tell us how we can help..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full inline-flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-black"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-xs text-secondary-muted mt-4 text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}
