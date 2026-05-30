import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Newspaper, Radio, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchNewsArticles, type NewsArticle } from '../lib/news'

interface HomePageProps {
  articles: NewsArticle[]
  fetchedAt: string
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

function timeAgo(iso: string) {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return formatDate(iso)
  } catch {
    return ''
  }
}

// Color-code articles by source for instant visual scanning
function sourceStyle(source: string): { dot: string; text: string; bg: string } {
  const s = source.toLowerCase()
  if (s.includes('black enterprise')) return { dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/25' }
  if (s.includes('grio') || s.includes('the grio')) return { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/25' }
  if (s.includes('google')) return { dot: 'bg-gtp-blue-light', text: 'text-gtp-blue-light', bg: 'bg-gtp-blue/10 border-gtp-blue/25' }
  return { dot: 'bg-secondary-muted', text: 'text-secondary-muted', bg: 'bg-gtp-bg-3 border-gtp-border' }
}

function SourceBadge({ source }: { source: string }) {
  const s = sourceStyle(source)
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
      {source}
    </span>
  )
}

function StoryImage({ article, iconClass = 'h-10 w-10' }: { article: NewsArticle; iconClass?: string }) {
  if (article.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={article.imageUrl} alt="" className="story-image" loading="lazy" decoding="async" />
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gtp-bg-3 to-gtp-bg-0">
      <Newspaper className={`${iconClass} text-gtp-blue/25`} />
    </div>
  )
}

function SecondaryCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/40 hover:bg-gtp-bg-3/40 transition-all"
    >
      <div className="story-image-frame w-[36%] shrink-0 self-stretch min-h-[140px]">
        <StoryImage article={article} iconClass="h-7 w-7" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between px-4 py-4">
        <div>
          <SourceBadge source={article.source} />
          <h3 className="mt-2 text-sm font-bold text-primary-white font-serif leading-snug line-clamp-3 group-hover:text-gtp-blue-light transition-colors">
            {article.title}
          </h3>
        </div>
        <p className="mt-2 text-[11px] text-secondary-muted">{timeAgo(article.publishedAt)}</p>
      </div>
    </a>
  )
}

export default function HomePage({ articles, fetchedAt }: HomePageProps) {
  const [featured, ...rest] = articles
  const secondaryRow = rest.slice(0, 2)
  const sidebar = rest.slice(2, 10)
  const moreCoverage = rest.slice(10)
  const spotlight = moreCoverage.slice(0, 2)
  const listStories = moreCoverage.slice(2)

  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gtp-border bg-gtp-gradient">
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gtp-glow rounded-full blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10 py-14 md:py-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Live badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary-gold/30 bg-primary-gold/8 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-gold opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-gold" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-gold">
                African American Safety Society · News Hub
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-primary-white font-serif leading-[1.06] tracking-tight">
              Stories that shape<br className="hidden sm:block" /> our communities
            </h1>

            <p className="mt-5 text-base md:text-lg text-secondary-muted max-w-2xl leading-relaxed">
              Curated headlines on politics, culture, and community affairs affecting Black America.
              Aggregated from trusted sources and refreshed continuously — no feeds to manage.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#latest"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-gold px-5 py-2.5 text-sm font-bold text-primary-black hover:bg-primary-gold/90 active:scale-[0.98] transition-all"
              >
                Read headlines
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/report" className="inline-flex items-center gap-2 rounded-lg border border-gtp-border bg-gtp-bg-2/60 px-5 py-2.5 text-sm font-medium text-secondary-muted hover:text-primary-white hover:border-gtp-border/80 transition-all">
                <Shield className="h-4 w-4 text-primary-gold" />
                Report an incident
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-secondary-muted border-t border-gtp-border/50 pt-6">
              <span className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-primary-gold" />
                <span className="font-semibold text-primary-white">{articles.length}</span> stories loaded
              </span>
              <span className="hidden sm:block w-px h-3 bg-gtp-border" />
              <span>Refreshed {timeAgo(fetchedAt)}</span>
              <span className="hidden sm:block w-px h-3 bg-gtp-border" />
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Black Enterprise
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  The Grio
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gtp-blue-light" />
                  Google News
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured + sidebar ─────────────────────────────────── */}
      <section id="latest" className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 p-12 text-center">
              <Newspaper className="h-10 w-10 text-gtp-blue/30 mx-auto mb-3" />
              <p className="text-secondary-muted">Headlines loading — refresh in a moment.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Main column */}
              <div className="lg:col-span-8 flex flex-col gap-5">
                {/* Section label */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-muted">Top Story</span>
                  <div className="flex-1 h-px bg-gtp-border" />
                </div>

                {/* Featured */}
                {featured && (
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-gtp-border bg-gtp-bg-2 hover:border-primary-gold/40 transition-all shadow-lg"
                  >
                    <div className="grid md:grid-cols-2 md:min-h-[380px]">
                      <div className="story-image-frame aspect-[16/10] md:aspect-auto md:h-full md:min-h-[380px]">
                        <StoryImage article={featured} iconClass="h-16 w-16" />
                        {/* Gold left accent on desktop */}
                        <div className="hidden md:block absolute top-0 left-0 w-1 h-full bg-primary-gold" />
                        <div className="absolute top-4 left-5 md:left-6">
                          <SourceBadge source={featured.source} />
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl md:text-[1.7rem] font-bold text-primary-white font-serif leading-snug group-hover:text-gtp-blue-light transition-colors">
                            {featured.title}
                          </h2>
                          <p className="mt-4 text-sm text-secondary-muted leading-relaxed line-clamp-4">
                            {featured.excerpt}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-xs text-secondary-muted">{formatDate(featured.publishedAt)}</p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-gold group-hover:gap-2.5 transition-all">
                            Read article <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                )}

                {/* Secondary row */}
                {secondaryRow.length > 0 && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-muted">More Top Stories</span>
                      <div className="flex-1 h-px bg-gtp-border" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {secondaryRow.map((article) => (
                        <SecondaryCard key={article.id} article={article} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-muted">Latest</span>
                  <div className="flex-1 h-px bg-gtp-border" />
                </div>
                <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 overflow-hidden">
                  <ul className="divide-y divide-gtp-border">
                    {sidebar.map((article) => {
                      const ss = sourceStyle(article.source)
                      return (
                        <li key={article.id}>
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3 items-start px-4 py-4 hover:bg-gtp-bg-3 transition-colors group"
                          >
                            <span className={`mt-1.5 w-2 h-2 rounded-full ${ss.dot} shrink-0`} />
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-muted mb-1">{article.source}</p>
                              <p className="text-sm font-semibold text-primary-white leading-snug group-hover:text-gtp-blue-light transition-colors line-clamp-2">
                                {article.title}
                              </p>
                              <p className="mt-1.5 text-[11px] text-secondary-muted">{timeAgo(article.publishedAt)}</p>
                            </div>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </aside>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── More Coverage ──────────────────────────────────────── */}
      {moreCoverage.length > 0 && (
        <section id="more-coverage" className="section-padding bg-gtp-bg-0 border-t border-gtp-border">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif">More coverage</h2>
                <p className="mt-1 text-sm text-secondary-muted">Additional stories from today&apos;s feed</p>
              </div>
              <div className="flex-1 h-px bg-gtp-border hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-secondary-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                {moreCoverage.length} stories
              </span>
            </div>

            {/* Spotlight cards */}
            {spotlight.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {spotlight.map((article) => (
                  <article key={article.id}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/40 transition-all"
                    >
                      <div className="story-image-frame aspect-[16/9] w-full">
                        <StoryImage article={article} />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-14">
                          <SourceBadge source={article.source} />
                          <h3 className="mt-2 text-base font-bold text-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      {article.excerpt && (
                        <div className="px-4 py-3 border-t border-gtp-border">
                          <p className="text-xs text-secondary-muted line-clamp-2 leading-relaxed">{article.excerpt}</p>
                          <p className="mt-1.5 text-[11px] text-secondary-muted">{timeAgo(article.publishedAt)}</p>
                        </div>
                      )}
                    </a>
                  </article>
                ))}
              </div>
            )}

            {/* List stories */}
            {listStories.length > 0 && (
              <div className="flex flex-col gap-2">
                {listStories.map((article) => (
                  <article key={article.id}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-4 overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 p-3 sm:p-4 hover:border-gtp-blue/40 hover:bg-gtp-bg-3/40 transition-all"
                    >
                      <div className="story-image-frame h-[68px] w-[100px] sm:h-20 sm:w-32 shrink-0 rounded-lg">
                        <StoryImage article={article} iconClass="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5 flex flex-col justify-between">
                        <div>
                          <SourceBadge source={article.source} />
                          <h3 className="mt-1.5 text-sm sm:text-[15px] font-bold text-primary-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                            {article.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 text-[11px] text-secondary-muted">{timeAgo(article.publishedAt)}</p>
                      </div>
                      <ExternalLink className="hidden sm:block h-4 w-4 shrink-0 text-secondary-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── Mission strip ──────────────────────────────────────── */}
      <section id="about" className="border-t border-gtp-border bg-gtp-gradient">
        <div className="container-custom py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">About AASS</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif leading-snug">
                Furthering Black progress through business, technology, and safety
              </h2>
              <p className="mt-4 text-sm md:text-base text-secondary-muted leading-relaxed">
                The African American Safety Society surfaces timely reporting on politics, business, culture, and community affairs — one focused starting point each day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-gold hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/software" className="inline-flex items-center gap-1.5 text-sm text-secondary-muted hover:text-primary-white transition-colors">
                  Our software →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '24', label: 'Stories per refresh' },
                { val: '3', label: 'Trusted sources' },
                { val: '10m', label: 'Refresh interval' },
                { val: 'Free', label: 'Always' },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-xl border border-gtp-border bg-gtp-bg-2/60 p-4">
                  <p className="text-2xl font-bold text-primary-white font-serif">{val}</p>
                  <p className="mt-0.5 text-xs text-secondary-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
