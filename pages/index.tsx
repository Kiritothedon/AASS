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

export default function HomePage({ articles, fetchedAt }: HomePageProps) {
  const [featured, ...rest] = articles
  const sidebar = rest.slice(0, 8)
  const grid = rest.slice(8, 20)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gtp-border bg-gtp-gradient">
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-gtp-glow rounded-full blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-gold/40 bg-primary-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-gold">
              <Newspaper className="h-3.5 w-3.5" />
              African American News &amp; Affairs
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold text-primary-white font-serif leading-tight">
              Stories that shape our communities
            </h1>
            <p className="mt-5 text-lg text-secondary-muted max-w-2xl leading-relaxed">
              AASS is a curated one-page news hub for headlines, culture, and public affairs
              affecting Black America. Updated automatically so you can stay informed without
              managing feeds yourself.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-secondary-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gtp-blue" />
                Refreshed {formatDate(fetchedAt)}
              </span>
              <a href="#latest" className="inline-flex items-center gap-1 text-gtp-blue hover:text-gtp-blue-light font-medium">
                Jump to headlines
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* News layout: Yahoo-style featured + sidebar */}
      <section id="latest" className="section-padding bg-gtp-bg-1">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="rounded-xl border border-gtp-border bg-gtp-bg-2 p-10 text-center text-secondary-muted">
              Headlines are loading slowly. Please refresh in a moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured story */}
              <article className="lg:col-span-8">
                {featured && (
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/50 transition-colors"
                  >
                    <div className="grid md:grid-cols-2">
                      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-gtp-bg-3">
                        {featured.imageUrl ? (
                          <Image
                            src={featured.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gtp-bg-3 to-gtp-bg-0">
                            <Newspaper className="h-16 w-16 text-gtp-blue/40" />
                          </div>
                        )}
                        <span className="absolute top-4 left-4 rounded-md bg-primary-gold px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-black">
                          Top Story
                        </span>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gtp-blue mb-3">
                          {featured.source}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-white font-serif leading-snug group-hover:text-gtp-blue-light transition-colors">
                          {featured.title}
                        </h2>
                        <p className="mt-4 text-secondary-muted leading-relaxed line-clamp-4">
                          {featured.excerpt}
                        </p>
                        <p className="mt-5 text-sm text-secondary-muted">{formatDate(featured.publishedAt)}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gtp-blue group-hover:gap-3 transition-all">
                          Read full article
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                )}
              </article>

              {/* Sidebar headlines */}
              <aside className="lg:col-span-4">
                <div className="rounded-2xl border border-gtp-border bg-gtp-bg-2 overflow-hidden h-full">
                  <div className="px-5 py-4 border-b border-gtp-border bg-gtp-bg-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary-white">
                      Latest Headlines
                    </h3>
                  </div>
                  <ul className="divide-y divide-gtp-border max-h-[520px] overflow-y-auto">
                    {sidebar.map((article) => (
                      <li key={article.id}>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-5 py-4 hover:bg-gtp-bg-3 transition-colors group"
                        >
                          <p className="text-xs font-medium text-gtp-blue mb-1">{article.source}</p>
                          <p className="text-sm font-semibold text-primary-white leading-snug group-hover:text-gtp-blue-light line-clamp-3">
                            {article.title}
                          </p>
                          <p className="mt-2 text-xs text-secondary-muted">{formatDate(article.publishedAt)}</p>
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

      {/* Story grid */}
      {grid.length > 0 && (
        <section className="section-padding bg-gtp-bg-0 border-t border-gtp-border">
          <div className="container-custom">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-primary-white font-serif">More coverage</h2>
                <p className="mt-2 text-secondary-muted">Handpicked from trusted RSS sources</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {grid.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-gtp-border bg-gtp-bg-2 hover:border-gtp-blue/40 transition-colors"
                >
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group flex-1 flex flex-col"
                  >
                    <div className="relative aspect-[16/9] bg-gtp-bg-3">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gtp-bg-3 to-gtp-bg-0" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-xs font-semibold text-gtp-blue uppercase tracking-wide">
                        {article.source}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-primary-white font-serif leading-snug group-hover:text-gtp-blue-light line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm text-secondary-muted line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                      <p className="mt-4 text-xs text-secondary-muted">{formatDate(article.publishedAt)}</p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About strip */}
      <section id="about" className="section-padding bg-gtp-bg-1 border-t border-gtp-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-white font-serif">About AASS</h2>
            <p className="mt-5 text-lg text-secondary-muted leading-relaxed">
              The African American Safety Society news hub surfaces timely reporting on politics,
              business, culture, and community affairs. Built for readers who want a focused,
              low-maintenance starting point each day.
            </p>
            <Link
              href="https://demondre.com"
              className="mt-8 inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all"
            >
              Built by De&apos;Mondre Zimmerman
              <ArrowRight className="h-4 w-4" />
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
