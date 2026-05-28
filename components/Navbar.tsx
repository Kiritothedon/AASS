import Link from 'next/link'

const navigation = [
  { name: 'Headlines', href: '/#latest' },
  { name: 'Coverage', href: '/#more-coverage' },
  { name: 'Report', href: '/report' },
  { name: 'Map', href: '/incident-map' },
  { name: 'About', href: '/#about' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gtp-border/80 bg-gtp-bg-0/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gtp-border bg-gradient-to-br from-primary-gold/20 via-gtp-bg-2 to-gtp-blue/10 shadow-inner">
              <span className="text-sm font-extrabold tracking-tight text-primary-gold">A</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-primary-white group-hover:text-gtp-blue-light transition-colors">
                AASS
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary-muted">
                News Hub
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-2.5 lg:px-3 py-2 text-xs sm:text-sm font-medium text-secondary-muted transition-colors hover:bg-gtp-bg-2 hover:text-primary-white whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
