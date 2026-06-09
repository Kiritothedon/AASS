import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ExternalLink, MapPin, Shield, FileText, ArrowRight, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
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
  } catch { return '' }
}

const SOURCE = {
  'black enterprise': { dot: '#f59e0b', label: 'Black Enterprise' },
  'the grio':         { dot: '#10b981', label: 'The Grio' },
  'grio':             { dot: '#10b981', label: 'The Grio' },
  'google':           { dot: '#60a5fa', label: 'Google News' },
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

      {/* Hero: mission + primary actions */}
      <section className="bg-gtp-bg-0 border-b border-gtp-border">
        <div className="container-custom py-10 md:py-14">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-4">
              African American Safety Society
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-primary-white leading-[1.15]">
              Document the incident.<br className="hidden sm:block" />
              Prove the pattern.<br className="hidden sm:block" />
              Win the demand.
            </h1>
            <p className="mt-5 text-base md:text-lg text-secondary-muted leading-relaxed max-w-2xl">
              AASS is not a news site. It is a civic tool: report what happened where you live,
              see what others have reported on the public map, and read the policy work on what
              Black America should fight for next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/report" className="btn-primary inline-flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Report an incident
              </Link>
              <Link href="/incident-map" className="btn-secondary inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                View incident map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-5 rounded-lg border border-gtp-border bg-gtp-bg-2">
              <Shield className="h-6 w-6 text-primary-gold mb-3" />
              <h2 className="font-serif text-lg font-bold text-primary-white mb-2">Report</h2>
              <p className="text-sm text-secondary-muted leading-relaxed">
                Submit a racial incident from your community: what happened, where, and when.
                Reports feed the public map so patterns become visible, not isolated anecdotes.
              </p>
              <Link href="/report" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-gold hover:gap-2 transition-all">
                Start a report <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-5 rounded-lg border border-gtp-border bg-gtp-bg-2">
              <MapPin className="h-6 w-6 text-gtp-blue-light mb-3" />
              <h2 className="font-serif text-lg font-bold text-primary-white mb-2">Map</h2>
              <p className="text-sm text-secondary-muted leading-relaxed">
                Browse community-submitted incidents on an interactive map. See where reports
                cluster and what kinds of harm keep showing up in the same places.
              </p>
              <Link href="/incident-map" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gtp-blue-light hover:gap-2 transition-all">
                Open the map <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-5 rounded-lg border border-gtp-border bg-gtp-bg-2">
              <FileText className="h-6 w-6 text-[#2f5d43] mb-3" />
              <h2 className="font-serif text-lg font-bold text-primary-white mb-2">Demand</h2>
              <p className="text-sm text-secondary-muted leading-relaxed">
                Read original policy analysis on what Black America should fight for now:
                concrete, winnable demands instead of open-ended fights the country keeps dodging.
              </p>
              <Link href="/winnable-demand" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6ee7b7] hover:gap-2 transition-all">
                Read the essay <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured editorial */}
      <section className="bg-gtp-bg-0 border-b border-gtp-border">
        <div className="container-custom py-8 md:py-10">
          <Link
            href="/winnable-demand"
            className="group block relative overflow-hidden rounded-lg border border-gtp-border bg-gtp-bg-2 hover:border-primary-gold/50 transition-colors"
          >
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#2f5d43] via-primary-gold to-[#9a3b2c]" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 px-6 py-6">
              <div className="shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 bg-primary-gold text-primary-black">
                  Flagship Essay
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-primary-white leading-snug group-hover:text-gtp-blue-light transition-colors">
                  The Winnable Demand: free college and tax relief for the descendants of American slavery
                </h2>
                <p className="mt-2 text-sm text-secondary-muted leading-relaxed max-w-3xl">
                  Why Black America should retire the open-ended fight for reparations and force a narrower
                  question the country cannot answer honestly and still say no.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary-gold group-hover:gap-2.5 transition-all">
                Read now
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* News as context, not identity */}
      <section id="context" className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom py-8 md:py-10">
          <div className="flex items-center justify-between gap-4 mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gtp-border rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gtp-border">
              {contextStories.map((a) => (
                <a
                  key={a.id}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 bg-gtp-bg-2 hover:bg-gtp-bg-0 transition-colors"
                >
                  <SourceDot source={a.source} />
                  <h3 className="mt-2 text-sm font-bold text-primary-white font-serif leading-snug line-clamp-3 group-hover:text-gtp-blue-light transition-colors">
                    {a.title}
                  </h3>
                  <span className="mt-2 flex items-center gap-1 text-[10px] text-secondary-muted/60">
                    <ExternalLink className="h-3 w-3" />
                    {timeAgo(a.publishedAt)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gtp-bg-0 border-t border-gtp-border">
        <div className="container-custom py-10 md:py-12">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-3">
              What AASS is
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-white leading-snug mb-4">
              A civic safety platform for Black communities
            </h2>
            <p className="text-sm md:text-base text-secondary-muted leading-relaxed mb-4">
              The African American Safety Society helps people document racial harm, visualize where
              it keeps happening, and connect that evidence to policy demands worth fighting for.
              It complements commercial court-record tools like Global Ticket Pay: GTP handles tickets
              and warrants; AASS handles the community safety and advocacy layer those records do not cover.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-secondary text-sm">
                About AASS
              </Link>
              <Link href="/blog" className="btn-secondary text-sm">
                Safety guides &amp; insights
              </Link>
              <Link href="/report" className="btn-primary text-sm">
                Report an incident
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO resource strip — internal links + keyword-rich copy */}
      <section className="bg-gtp-bg-1 border-t border-gtp-border">
        <div className="container-custom py-8 md:py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-muted mb-4">
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
                className="block p-4 rounded-lg border border-gtp-border bg-gtp-bg-2 hover:border-primary-gold/40 transition-colors"
              >
                <h3 className="text-sm font-bold text-primary-white font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-secondary-muted leading-relaxed">{item.desc}</p>
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
