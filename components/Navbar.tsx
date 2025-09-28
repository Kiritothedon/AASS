import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Initiatives', href: '/initiatives' },
  { name: 'Software', href: '/software' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="bg-secondary-gray shadow-lg border-b border-secondary-dark">
      {/* Top bar */}
      <div className="bg-primary-black text-primary-white text-sm py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <p className="text-secondary-muted">
              AASS — Building safety through Black business & technology
            </p>
            <Link href="/about" className="text-primary-gold hover:text-opacity-80 transition-colors">
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-white font-serif tracking-wider">
              AASS
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'text-sm font-medium transition-colors duration-200 uppercase tracking-wide',
                  router.pathname === item.href
                    ? 'text-primary-gold'
                    : 'text-primary-white hover:text-primary-gold'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-primary-white hover:text-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-dark py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'text-base font-medium transition-colors duration-200 uppercase tracking-wide',
                    router.pathname === item.href
                      ? 'text-primary-gold'
                      : 'text-primary-white hover:text-primary-gold'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
