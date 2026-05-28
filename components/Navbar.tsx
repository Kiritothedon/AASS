import Link from 'next/link'
import { Newspaper } from 'lucide-react'

const navigation = [
  { name: 'Headlines', href: '#latest' },
  { name: 'About', href: '#about' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gtp-border bg-gtp-bg-0/90 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-gold/15 border border-primary-gold/30">
              <Newspaper className="h-4 w-4 text-primary-gold" />
            </span>
            <span className="text-lg font-bold text-primary-white font-serif tracking-wide">
              AASS
            </span>
            <span className="hidden sm:inline text-xs text-secondary-muted font-sans font-normal">
              News &amp; Affairs
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-secondary-muted hover:text-gtp-blue-light transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
