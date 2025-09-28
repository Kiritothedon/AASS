import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../components/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm Component', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders contact form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByText(/send message/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/full name/i).closest('input')).toHaveAttribute('required')
      expect(screen.getByText(/email address/i).closest('input')).toHaveAttribute('required')
    })
  })

  it('submits form with valid data', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'general' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a test message' }
    })

    fireEvent.click(screen.getByText(/send message/i))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'general',
          message: 'This is a test message'
        })
      })
    })
  })
})
