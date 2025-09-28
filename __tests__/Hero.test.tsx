import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero Component', () => {
  it('renders hero with title and subtitle', () => {
    render(
      <Hero
        title="Test Title"
        subtitle="Test subtitle content"
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test subtitle content')).toBeInTheDocument()
  })

  it('renders primary CTA when provided', () => {
    render(
      <Hero
        title="Test Title"
        subtitle="Test subtitle"
        primaryCTA={{
          label: 'Primary Action',
          href: '/test'
        }}
      />
    )

    expect(screen.getByText('Primary Action')).toBeInTheDocument()
  })

  it('renders secondary CTA when provided', () => {
    render(
      <Hero
        title="Test Title"
        subtitle="Test subtitle"
        secondaryCTA={{
          label: 'Secondary Action',
          href: '/test2'
        }}
      />
    )

    expect(screen.getByText('Secondary Action')).toBeInTheDocument()
  })
})
