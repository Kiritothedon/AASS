import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ExternalLink, Newspaper, FileText, ArrowRight } from 'lucide-react'
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

// Source system — dot color + text color
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

function Img({ article, className }: { article: NewsArticle; className?: string }) {
  if (article.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={article.imageUrl}
        alt={article.title}
        className={`story-image ${className ?? ''}`}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gtp-bg-3">
      <Newspaper className="h-6 w-6 text-gtp-border" />
    </div>
  )
}

export default function HomePage({ articles, fetchedAt }: HomePageProps) {
  const [featured, ...rest] = articles
  const sidebar    = rest.slice(0, 8)
  const gridStories = rest.slice(8, 14)
  const listStories = rest.slice(14)

  return (
    <>
      <SEO
        title="African American News & Affairs"
        description="Daily curated African American news on politics, business, culture, and community safety. Read top headlines, report incidents, and explore original analysis from AASSociety."
        path="/"
      />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* ── Site masthead (stable H1 for SEO) ───────────────────────────── */}
      <section className="bg-gtp-bg-0 border-b border-gtp-border">
        <div className="container-custom py-5 md:py-6">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary-white leading-tight">
            African American News &amp; Affairs
          </h1>
          <p className="mt-2 max-w-3xl text-sm md:text-base text-secondary-muted leading-relaxed">
            Curated headlines on politics, business, culture, and community safety affecting Black America.
            Updated throughout the day from trusted sources.
          </p>
        </div>
      </section>

      {/* ── Featured editorial (above the headlines) ──────────────────── */}
      <section className="bg-gtp-bg-1 border-b border-gtp-border">
        <div className="container-custom">
          <Link
            href="/winnable-demand"
            className="group block relative overflow-hidden rounded-none sm:rounded-lg my-3 sm:my-4 border border-gtp-border bg-gtp-bg-2 hover:border-primary-gold/50 transition-colors"
          >
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#2f5d43] via-primary-gold to-[#9a3b2c]" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 px-5 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 bg-primary-gold text-primary-black">
                  Editorial
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary-muted">
                  <FileText className="h-3 w-3 text-primary-gold" />
                  AASSociety Op-Ed
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-primary-white leading-snug group-hover:text-gtp-blue-light transition-colors">
                  The Winnable Demand: free college and tax relief for the descendants of American slavery
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-secondary-muted line-clamp-2">
                  Why Black America should retire the open-ended fight for reparations and force a narrower question the
                  country cannot answer honestly and still say no.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 shrink-0 text-xs font-semibold text-primary-gold group-hover:gap-2.5 transition-all">
                Read the essay
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Main editorial grid ───────────────────────────────────────── */}
      <section id="latest" className="bg-gtp-bg-0">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 border-b border-gtp-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── Featured story (left, 8 cols) ── */}
            <div className="lg:col-span-8 lg:border-r border-gtp-border">
              {featured && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {/* Image */}
                  <div className="story-image-frame aspect-[16/9] w-full">
                    <Img article={featured} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gtp-bg-0/60 via-transparent to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-4 sm:p-5 border-b border-gtp-border">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 bg-primary-gold text-primary-black">
                        Top Story
                      </span>
                      <SourceDot source={featured.source} />
                      <span className="text-[10px] text-secondary-muted/60 ml-auto">{timeAgo(featured.publishedAt)}</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-[1.6rem] font-bold text-primary-white leading-[1.2] tracking-tight group-hover:text-gtp-blue-light transition-colors mb-2">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-sm text-secondary-muted leading-relaxed line-clamp-2 hidden sm:block">
                        {featured.excerpt}
                      </p>
                    )}
                  </div>
                  {/* Secondary pair below featured */}
                  <div className="grid grid-cols-2 divide-x divide-gtp-border">
                    {rest.slice(0, 2).map((a) => (
                      <a
                        key={a.id}
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/sub block p-4 hover:bg-gtp-bg-2 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SourceDot source={a.source} />
                        <h3 className="mt-1.5 text-sm font-bold text-primary-white font-serif leading-snug line-clamp-3 group-hover/sub:text-gtp-blue-light transition-colors">
                          {a.title}
                        </h3>
                        <span className="mt-1.5 block text-[10px] text-secondary-muted/60">{timeAgo(a.publishedAt)}</span>
                      </a>
                    ))}
                  </div>
                </a>
              )}
            </div>

            {/* ── Sidebar: 8 headlines (right, 4 cols) ── */}
            <aside className="lg:col-span-4">
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-gtp-border bg-gtp-bg-1/40">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-muted">
                  Latest Headlines
                </span>
                <span className="text-[10px] text-secondary-muted/60 shrink-0">
                  Updated {timeAgo(fetchedAt)} ago
                </span>
              </div>
              <div className="divide-y divide-gtp-border">
                {sidebar.map((a, i) => (
                  <a
                    key={a.id}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 px-4 py-3 hover:bg-gtp-bg-2 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-gtp-border/80 shrink-0 mt-0.5 w-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <SourceDot source={a.source} />
                      <h3 className="mt-1 text-[13px] font-semibold text-primary-white leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                        {a.title}
                      </h3>
                      <span className="mt-1 block text-[10px] text-secondary-muted/60">{timeAgo(a.publishedAt)}</span>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          </motion.div>
        </div>
      </section>

      {/* ── More Coverage ─────────────────────────────────────────────── */}
      {gridStories.length > 0 && (
        <section id="more-coverage" className="bg-gtp-bg-1 border-b border-gtp-border">
          <div className="container-custom">
            {/* Section label */}
            <div className="flex items-center gap-3 py-3 border-b border-gtp-border">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-muted">
                More Coverage
              </span>
              <div className="flex-1 h-px bg-gtp-border" />
              <span className="text-[10px] text-secondary-muted/60">{gridStories.length + listStories.length} stories</span>
            </div>

            {/* 3-column image grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gtp-border border-b border-gtp-border">
              {gridStories.slice(0, 3).map((a) => (
                <article key={a.id}>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-0"
                  >
                    <div className="story-image-frame aspect-[16/9]">
                      <Img article={a} />
                    </div>
                    <div className="p-4">
                      <SourceDot source={a.source} />
                      <h3 className="mt-1.5 text-sm font-bold text-primary-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                        {a.title}
                      </h3>
                      <span className="mt-1.5 block text-[10px] text-secondary-muted/60">{timeAgo(a.publishedAt)}</span>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Second row — 3 more */}
            {gridStories.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gtp-border border-b border-gtp-border">
                {gridStories.slice(3).map((a) => (
                  <article key={a.id}>
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-3 p-4 hover:bg-gtp-bg-2 transition-colors"
                    >
                      <div className="story-image-frame h-16 w-24 shrink-0 rounded">
                        <Img article={a} />
                      </div>
                      <div className="min-w-0">
                        <SourceDot source={a.source} />
                        <h3 className="mt-1 text-sm font-bold text-primary-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                          {a.title}
                        </h3>
                        <span className="mt-1 block text-[10px] text-secondary-muted/60">{timeAgo(a.publishedAt)}</span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Compact text list ─────────────────────────────────────────── */}
      {listStories.length > 0 && (
        <section className="bg-gtp-bg-0">
          <div className="container-custom">
            <div className="flex items-center gap-3 py-3 border-b border-gtp-border">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-muted">
                Full Feed
              </span>
              <div className="flex-1 h-px bg-gtp-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-gtp-border border-b border-gtp-border">
              {listStories.map((a) => (
                <a
                  key={a.id}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 px-4 py-3 border-b sm:border-b sm:border-r border-gtp-border hover:bg-gtp-bg-2 transition-colors last:border-b-0"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gtp-border mt-0.5 group-hover:text-gtp-blue/60 transition-colors" />
                  <div className="min-w-0">
                    <SourceDot source={a.source} />
                    <h3 className="mt-1 text-[13px] font-semibold text-primary-white leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                      {a.title}
                    </h3>
                    <span className="mt-0.5 block text-[10px] text-secondary-muted/60">{timeAgo(a.publishedAt)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── About (anchor target + SEO content) ─────────────────────────── */}
      <section id="about" className="bg-gtp-bg-1 border-t border-gtp-border">
        <div className="container-custom py-10 md:py-12">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-3">
              About AASSociety
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-white leading-snug mb-4">
              Black news, incident reporting, and community safety tools
            </h2>
            <p className="text-sm md:text-base text-secondary-muted leading-relaxed mb-4">
              The African American Safety Society (AASS) curates timely reporting on politics, business,
              culture, and community affairs affecting Black America. We also provide tools to report racial
              incidents and view community submissions on a public map.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary text-sm">
                Learn more
              </Link>
              <Link href="/report" className="btn-secondary text-sm">
                Report an incident
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Slim footer strip ─────────────────────────────────────────── */}
      <div className="bg-gtp-bg-0 border-t border-gtp-border">
        <div className="container-custom py-4 flex items-center justify-between gap-4 text-[10px] text-secondary-muted/60">
          <span>African American Safety Society · Curated headlines from public RSS</span>
          <Link href="/about" className="hover:text-primary-white transition-colors">About</Link>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const articles = await fetchNewsArticles(24)
  return {
    props: { articles, fetchedAt: new Date().toISOString() },
    revalidate: 600,
  }
}
