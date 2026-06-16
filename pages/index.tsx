import { GetStaticProps } from 'next'
import Link from 'next/link'
import {
  ExternalLink,
  MapPin,
  Shield,
  FileText,
  ArrowRight,
  AlertTriangle,
  Eye,
  Megaphone,
  Lock,
  CheckCircle2,
} from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import SEO from '../components/SEO'
import JsonLd, { organizationSchema, websiteSchema } from '../components/JsonLd'
import { fetchNewsArticles, type NewsArticle } from '../lib/news'

interface HomePageProps {
  articles: NewsArticle[]
  fetchedAt: string
}

function timeAgo(iso: string) {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `${m}m`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h`
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

const SOURCE = {
  'black enterprise': { dot: '#f59e0b', label: 'Black Enterprise' },
  'the grio': { dot: '#10b981', label: 'The Grio' },
  grio: { dot: '#10b981', label: 'The Grio' },
  google: { dot: '#60a5fa', label: 'Google News' },
} as const

function getSource(raw: string) {
  const k = raw.toLowerCase()
  for (const [match, val] of Object.entries(SOURCE)) {
    if (k.includes(match)) return val
  }
  return { dot: '#8b949e', label: raw }
}

function SourceDot({ source }: { source: string }) {
  const s = getSource(source)
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary-muted">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
      {s.label}
    </span>
  )
}

// ── Motion primitives ──────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const STEPS = [
  {
    n: '01',
    icon: Shield,
    accent: '#2f5d43',
    glow: 'rgba(47,93,67,0.18)',
    title: 'Report',
    body: 'Submit a racial incident from your community — what happened, where, and when. Every report feeds the public map so patterns become visible, not isolated anecdotes.',
    href: '/report',
    cta: 'Start a report',
  },
  {
    n: '02',
    icon: MapPin,
    accent: '#C7A740',
    glow: 'rgba(199,167,64,0.18)',
    title: 'Map',
    body: 'Browse community-submitted incidents on an interactive map. See where reports cluster and what kinds of harm keep recurring in the same places.',
    href: '/incident-map',
    cta: 'Open the map',
  },
  {
    n: '03',
    icon: Megaphone,
    accent: '#9a3b2c',
    glow: 'rgba(154,59,44,0.18)',
    title: 'Demand',
    body: 'Read original policy analysis on what Black America should fight for now: concrete, winnable demands instead of open-ended fights the country keeps dodging.',
    href: '/winnable-demand',
    cta: 'Read the essay',
  },
]

const PRINCIPLES = [
  { icon: Lock, label: 'Free forever', sub: 'No account required' },
  { icon: Eye, label: 'Public by design', sub: 'Open community map' },
  { icon: CheckCircle2, label: 'Evidence first', sub: 'Patterns, not anecdotes' },
  { icon: Shield, label: 'Community-owned', sub: 'Built for, by us' },
]

export default function HomePage({ articles, fetchedAt }: HomePageProps) {
  const contextStories = articles.slice(0, 6)

  return (
    <>
      <SEO
        title="Black Community Safety — Report Incidents, Map Patterns, Win Demands"
        description="AASSociety helps Black Americans report racial incidents and hate crimes, explore community submissions on a public map, and read policy analysis on reparations and winnable demands. Free — no account required."
        path="/"
        tags={['Black community safety', 'racial incident reporting', 'hate crime map', 'AASSociety']}
      />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gtp-gradient border-b border-gtp-border">
        {/* tri-color signature line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2f5d43] via-primary-gold to-[#9a3b2c]" />
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gtp-glow opacity-70" />
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />

        <div className="container-custom relative py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Copy */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="lg:col-span-7"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
                <span className="flex h-1.5 w-6 overflow-hidden rounded-full">
                  <span className="flex-1 bg-[#2f5d43]" />
                  <span className="flex-1 bg-primary-gold" />
                  <span className="flex-1 bg-[#9a3b2c]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-gold">
                  African American Safety Society
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-primary-white leading-[1.08] tracking-tight"
              >
                Document the incident.
                <br />
                Prove the pattern.
                <br />
                <span className="bg-gradient-to-r from-primary-gold to-[#e6c965] bg-clip-text text-transparent">
                  Win the demand.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base md:text-lg text-secondary-muted leading-relaxed max-w-2xl"
              >
                AASS is not a news site. It is a civic tool: report what happened where you live,
                see what others have reported on the public map, and read the policy work on what
                Black America should fight for next.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <Link href="/report" className="btn-primary text-[15px] px-6 py-3">
                  <AlertTriangle className="h-4 w-4" />
                  Report an incident
                </Link>
                <Link href="/incident-map" className="btn-secondary text-[15px] px-6 py-3">
                  <MapPin className="h-4 w-4" />
                  View incident map
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-secondary-muted"
              >
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6ee7b7]" /> Free — no account
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6ee7b7]" /> Anonymous reporting
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6ee7b7]" /> Public, community data
                </span>
              </motion.div>
            </motion.div>

            {/* Visual: abstract "pattern map" panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative rounded-2xl border border-gtp-border bg-gtp-bg-1/80 backdrop-blur-sm p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-muted">
                    Community map · live
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-[#6ee7b7]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#6ee7b7] opacity-60 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6ee7b7]" />
                    </span>
                    open data
                  </span>
                </div>
                {/* faux map grid with pins */}
                <div className="relative h-56 rounded-xl border border-gtp-border bg-gtp-bg-0 overflow-hidden hero-grid">
                  <div className="absolute inset-0 bg-gtp-glow opacity-40" />
                  {[
                    { top: '22%', left: '30%', c: '#C7A740', d: 0 },
                    { top: '55%', left: '60%', c: '#9a3b2c', d: 0.4 },
                    { top: '40%', left: '46%', c: '#6ee7b7', d: 0.8 },
                    { top: '70%', left: '28%', c: '#60a5fa', d: 1.2 },
                    { top: '30%', left: '72%', c: '#C7A740', d: 1.6 },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="absolute"
                      style={{ top: p.top, left: p.left }}
                    >
                      <span className="relative flex h-3 w-3">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
                          style={{ background: p.c, animationDelay: `${p.d}s` }}
                        />
                        <span
                          className="relative inline-flex h-3 w-3 rounded-full border border-primary-white/70"
                          style={{ background: p.c }}
                        />
                      </span>
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    { k: 'Report', c: '#2f5d43' },
                    { k: 'Map', c: '#C7A740' },
                    { k: 'Demand', c: '#9a3b2c' },
                  ].map((s) => (
                    <div key={s.k} className="rounded-lg border border-gtp-border bg-gtp-bg-2 py-2">
                      <span
                        className="mx-auto mb-1 block h-1 w-6 rounded-full"
                        style={{ background: s.c }}
                      />
                      <span className="text-[11px] font-semibold text-primary-white">{s.k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Principles band ──────────────────────────────────────────────── */}
      <section className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gtp-border bg-gtp-bg-2 text-primary-gold">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-primary-white leading-tight">
                    {p.label}
                  </span>
                  <span className="block text-xs text-secondary-muted leading-tight">{p.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-gtp-bg-0 border-b border-gtp-border">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-muted mb-2">
              How it works
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-white leading-snug">
              Three steps from incident to leverage
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {STEPS.map((s) => (
              <motion.div key={s.title} variants={fadeUp}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gtp-border/0"
                  style={{ boxShadow: 'none' }}
                >
                  {/* hover glow */}
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: s.glow }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border"
                      style={{ borderColor: `${s.accent}55`, background: `${s.accent}1a`, color: s.accent }}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-3xl font-bold text-gtp-border/70 transition-colors group-hover:text-primary-white/20">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-serif text-xl font-bold text-primary-white">
                    {s.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm text-secondary-muted leading-relaxed">
                    {s.body}
                  </p>
                  <span
                    className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                    style={{ color: s.accent }}
                  >
                    {s.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured editorial ───────────────────────────────────────────── */}
      <section className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom py-12 md:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Link
              href="/winnable-demand"
              className="group block relative overflow-hidden rounded-2xl border border-gtp-border bg-gtp-bg-2 transition-colors hover:border-primary-gold/50"
            >
              <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#2f5d43] via-primary-gold to-[#9a3b2c]" />
              <div className="flex flex-col lg:flex-row lg:items-center gap-5 px-7 py-8 md:px-10">
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-gold px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-primary-black">
                    <FileText className="h-3 w-3" /> Flagship Essay
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-primary-white leading-snug transition-colors group-hover:text-gtp-blue-light">
                    The Winnable Demand: free college and tax relief for the descendants of American
                    slavery
                  </h2>
                  <p className="mt-2 text-sm text-secondary-muted leading-relaxed max-w-3xl">
                    Why Black America should retire the open-ended fight for reparations and force a
                    narrower question the country cannot answer honestly and still say no.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary-gold transition-all group-hover:gap-2.5">
                  Read now
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── News as context ──────────────────────────────────────────────── */}
      <section id="context" className="bg-gtp-bg-0 border-b border-gtp-border">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-muted mb-1">
                Context
              </p>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-primary-white">
                Headlines worth watching
              </h2>
              <p className="mt-2 text-sm text-secondary-muted max-w-2xl">
                Curated from public sources. Background reading, not the reason this site exists.
              </p>
            </div>
            <span className="text-[10px] text-secondary-muted/60 shrink-0 hidden sm:block">
              Updated {timeAgo(fetchedAt)} ago
            </span>
          </div>

          {contextStories.length === 0 ? (
            <p className="text-sm text-secondary-muted">No headlines available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contextStories.map((a) => (
                <a
                  key={a.id}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-gtp-border bg-gtp-bg-2 p-4 transition-all hover:-translate-y-0.5 hover:border-gtp-blue/40"
                >
                  <SourceDot source={a.source} />
                  <h3 className="mt-2 flex-1 font-serif text-sm font-bold text-primary-white leading-snug line-clamp-3 transition-colors group-hover:text-gtp-blue-light">
                    {a.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] text-secondary-muted/60">
                    <ExternalLink className="h-3 w-3" />
                    {timeAgo(a.publishedAt)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-3">
              What AASS is
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-white leading-snug mb-4">
              A civic safety platform for Black communities
            </h2>
            <p className="text-sm md:text-base text-secondary-muted leading-relaxed mb-6">
              The African American Safety Society helps people document racial harm, visualize where
              it keeps happening, and connect that evidence to policy demands worth fighting for. It
              complements commercial court-record tools like Global Ticket Pay: GTP handles tickets
              and warrants; AASS handles the community safety and advocacy layer those records do not
              cover.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/report" className="btn-primary text-sm">
                <AlertTriangle className="h-4 w-4" />
                Report an incident
              </Link>
              <Link href="/about" className="btn-secondary text-sm">
                About AASS
              </Link>
              <Link href="/blog" className="btn-secondary text-sm">
                Safety guides &amp; insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────────────────────── */}
      <section className="bg-gtp-bg-0">
        <div className="container-custom py-12 md:py-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-muted mb-5">
            Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'How to report a racial incident',
                href: '/blog/2026-06-10-how-to-report-racial-incident',
                desc: 'Step-by-step guide to documenting harm in your community.',
              },
              {
                title: 'Black community safety guide',
                href: '/blog/2026-06-10-black-community-safety-guide',
                desc: 'Why report, map, and demand change — not just react.',
              },
              {
                title: 'The Winnable Demand',
                href: '/winnable-demand',
                desc: 'Policy essay on reparations Black America can actually win.',
              },
              {
                title: 'All insights',
                href: '/blog',
                desc: 'Research and analysis from AASSociety.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-xl border border-gtp-border bg-gtp-bg-2 p-5 transition-all hover:-translate-y-0.5 hover:border-primary-gold/40"
              >
                <h3 className="font-serif text-sm font-bold text-primary-white leading-snug transition-colors group-hover:text-primary-gold">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-secondary-muted leading-relaxed">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-muted transition-all group-hover:gap-2 group-hover:text-primary-gold">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const articles = await fetchNewsArticles(12)
  return {
    props: { articles, fetchedAt: new Date().toISOString() },
    revalidate: 600,
  }
}
