import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const navigation = [
  { name: 'Report', href: '/report' },
  { name: 'Map', href: '/incident-map' },
  { name: 'Essay', href: '/winnable-demand' },
  { name: 'News', href: '/#context' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [router.asPath])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gtp-border/80 bg-gtp-bg-0/95 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_32px_rgba(0,0,0,0.45)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.25)]'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 min-w-0 shrink-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary-gold/30 bg-gradient-to-br from-primary-gold/15 via-gtp-bg-2 to-gtp-blue/10 shadow-inner ring-1 ring-primary-gold/10 group-hover:ring-primary-gold/30 transition-all">
              <span className="text-sm font-extrabold tracking-tight text-primary-gold">A</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-primary-white group-hover:text-gtp-blue-light transition-colors">
                AASS
              </span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary-muted">
                Safety &amp; Advocacy
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href || router.asPath === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-gtp-bg-2 text-primary-white'
                      : 'text-secondary-muted hover:bg-gtp-bg-2 hover:text-primary-white'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-secondary-muted hover:text-primary-white hover:bg-gtp-bg-2 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-gtp-border bg-gtp-bg-0/98 backdrop-blur-xl"
          >
            <nav className="container-custom py-2 flex flex-col" aria-label="Mobile navigation">
              {navigation.map((item, i) => {
                const isActive = router.pathname === item.href || router.asPath === item.href
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gtp-bg-2 text-primary-white'
                          : 'text-secondary-muted hover:bg-gtp-bg-2 hover:text-primary-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
