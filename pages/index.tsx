import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, ExternalLink, Newspaper } from 'lucide-react'
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

function StoryImage({
  article,
  className = '',
  iconClass = 'h-10 w-10',
}: {
  article: NewsArticle
  className?: string
  iconClass?: string
}) {
  if (article.imageUrl) {
    return (
      <Image
        src={article.imageUrl}
        alt=""
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
    )
  }

  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-gtp-bg-3 to-gtp-bg-0 flex items-center justify-center ${className}`}>
      <Newspaper className={`${iconClass} text-gtp-blue/35`} />
    </div>
  )
}

export default function HomePage({ articles, fetchedAt }: HomePageProps) {
  const [featured, ...rest] = articles
  const sidebar = rest.slice(0, 8)
  const moreCoverage = rest.slice(8)
  const spotlight = moreCoverage.slice(0, 2)
  const listStories = moreCoverage.slice(2)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gtp-border bg-gtp-gradient">
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gtp-glow rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="container-custom relative z-10 py-10 md:py-14">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-[3.25rem] font-bold text-primary-white font-serif leading-[1.1] tracking-tight">
              Stories that shape our communities
            </h1>
            <p className="mt-4 text-base md:text-lg text-secondary-muted max-w-2xl leading-relaxed">
              A curated one-page news hub for headlines, culture, and public affairs affecting
              Black America. Updated automatically so you can stay informed without managing feeds
              yourself.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-secondary-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gtp-blue" />
                Refreshed {formatDate(fetchedAt)}
              </span>
              <a
                href="#latest"
                className="inline-flex items-center gap-1 font-medium text-gtp-blue hover:text-gtp-blue-light"
              >
                Jump to headlines
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured + sidebar */}
      <section id="latest" className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="rounded-xl border border-gtp-border bg-gtp-bg-2 p-10 text-center text-secondary-muted">
              Headlines are loading slowly. Please refresh in a moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <article className="lg:col-span-8">
                {featured && (
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/50 transition-colors"
                  >
                    <div className="grid md:grid-cols-2">
                      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px] bg-gtp-bg-3">
                        <StoryImage article={featured} iconClass="h-16 w-16" />
                        <span className="absolute top-4 left-4 rounded-md bg-primary-gold px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-black">
                          Top Story
                        </span>
                      </div>
                      <div className="p-6 md:p-7 flex flex-col justify-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gtp-blue mb-2">
                          {featured.source}
                        </p>
                        <h2 className="text-2xl md:text-[1.65rem] font-bold text-primary-white font-serif leading-snug group-hover:text-gtp-blue-light transition-colors">
                          {featured.title}
                        </h2>
                        <p className="mt-3 text-sm text-secondary-muted leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <p className="mt-4 text-xs text-secondary-muted">{formatDate(featured.publishedAt)}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gtp-blue group-hover:gap-3 transition-all">
                          Read full article
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                )}
              </article>

              <aside className="lg:col-span-4">
                <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 overflow-hidden h-full">
                  <div className="px-5 py-3.5 border-b border-gtp-border bg-gtp-bg-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary-white">
                      Latest Headlines
                    </h3>
                  </div>
                  <ul className="divide-y divide-gtp-border max-h-[500px] overflow-y-auto">
                    {sidebar.map((article) => (
                      <li key={article.id}>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-5 py-3.5 hover:bg-gtp-bg-3 transition-colors group"
                        >
                          <p className="text-[11px] font-medium text-gtp-blue mb-0.5">{article.source}</p>
                          <p className="text-sm font-semibold text-primary-white leading-snug group-hover:text-gtp-blue-light line-clamp-2">
                            {article.title}
                          </p>
                          <p className="mt-1.5 text-[11px] text-secondary-muted">{formatDate(article.publishedAt)}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* More coverage: 2 spotlight + horizontal list */}
      {moreCoverage.length > 0 && (
        <section id="more-coverage" className="section-padding-compact bg-gtp-bg-0 border-t border-gtp-border">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif">More coverage</h2>
              <p className="mt-1.5 text-sm text-secondary-muted">Spotlight stories and additional headlines</p>
            </div>

            {spotlight.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {spotlight.map((article) => (
                  <article key={article.id}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/40 transition-colors"
                    >
                      <div className="relative aspect-[16/9] max-h-[220px] bg-gtp-bg-3">
                        <StoryImage article={article} />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gtp-bg-0 via-gtp-bg-0/90 to-transparent p-4 pt-12">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-gtp-blue">
                            {article.source}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-primary-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="px-4 py-3 border-t border-gtp-border">
                        <p className="text-xs text-secondary-muted line-clamp-2">{article.excerpt}</p>
                        <p className="mt-2 text-[11px] text-secondary-muted">{formatDate(article.publishedAt)}</p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}

            {listStories.length > 0 && (
              <div className="flex flex-col gap-3">
                {listStories.map((article) => (
                  <article key={article.id}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-4 overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 p-3 hover:border-gtp-blue/40 hover:bg-gtp-bg-3/50 transition-colors sm:p-4"
                    >
                      <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-lg bg-gtp-bg-3 sm:h-20 sm:w-32">
                        <StoryImage article={article} iconClass="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gtp-blue">
                          {article.source}
                        </p>
                        <h3 className="mt-1 text-sm sm:text-base font-bold text-primary-white font-serif leading-snug line-clamp-2 group-hover:text-gtp-blue-light transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-1.5 hidden sm:block text-xs text-secondary-muted line-clamp-2">
                          {article.excerpt}
                        </p>
                        <p className="mt-2 text-[11px] text-secondary-muted">{formatDate(article.publishedAt)}</p>
                      </div>
                      <ExternalLink className="hidden sm:block h-4 w-4 shrink-0 text-gtp-blue opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className="py-10 md:py-12 bg-gtp-bg-1 border-t border-gtp-border">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-primary-white font-serif">About AASS</h2>
            <p className="mt-3 text-sm md:text-base text-secondary-muted leading-relaxed">
              The African American Safety Society news hub surfaces timely reporting on politics,
              business, culture, and community affairs. A focused starting point each day.
            </p>
            <Link
              href="https://demondre.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-gold hover:gap-3 transition-all"
            >
              Built by De&apos;Mondre Zimmerman
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const articles = await fetchNewsArticles(24)

  return {
    props: {
      articles,
      fetchedAt: new Date().toISOString(),
    },
    revalidate: 1800,
  }
}
