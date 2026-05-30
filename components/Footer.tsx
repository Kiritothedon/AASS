import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { name: 'Headlines', href: '/#latest' },
  { name: 'More Coverage', href: '/#more-coverage' },
  { name: 'Report an Incident', href: '/report' },
  { name: 'Incident Map', href: '/incident-map' },
  { name: 'Software', href: '/software' },
  { name: 'Initiatives', href: '/initiatives' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gtp-border bg-gtp-bg-0">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary-gold/30 bg-gradient-to-br from-primary-gold/15 via-gtp-bg-2 to-gtp-blue/10 shadow-inner">
                <span className="text-sm font-extrabold tracking-tight text-primary-gold">A</span>
              </span>
              <span className="text-[15px] font-bold text-primary-white group-hover:text-gtp-blue-light transition-colors">
                AASS
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-secondary-muted max-w-[260px]">
              Furthering Black progress through business, technology, and community safety.
            </p>
            <p className="text-[11px] text-secondary-muted/55 leading-relaxed max-w-[260px]">
              Headlines curated via public RSS feeds. Full articles open on original publisher sites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-white">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-muted hover:text-primary-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Parent company */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-white">
                Legal
              </h3>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-muted hover:text-primary-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary-muted">
                A property of
              </p>
              <Link
                href="https://www.globalticketpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-gtp-blue-light hover:text-primary-white transition-colors"
              >
                Global Ticket Pay (GTP)
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </Link>
              <p className="mt-0.5 text-xs text-secondary-muted">GTP Systems Inc.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gtp-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-secondary-muted/70">
            &copy; {new Date().getFullYear()} African American Safety Society. All rights reserved.
          </p>
          <p className="text-xs text-secondary-muted/70">
            Built by{' '}
            <Link
              href="https://demondre.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-muted hover:text-primary-white transition-colors"
            >
              De&apos;Mondre Zimmerman
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
