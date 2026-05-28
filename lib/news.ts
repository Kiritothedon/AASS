import Parser from 'rss-parser'

export interface NewsArticle {
  id: string
  title: string
  link: string
  source: string
  publishedAt: string
  excerpt: string
  imageUrl: string | null
}

const parser = new Parser({
  timeout: 12000,
  headers: {
    'User-Agent': 'AASS-NewsHub/1.0',
  },
})

const FEED_URLS = [
  'https://news.google.com/rss/search?q=African+American+OR+Black+community+OR+civil+rights&hl=en-US&gl=US&ceid=US:en',
  'https://www.blackenterprise.com/feed/',
  'https://thegrio.com/feed/',
]

function stripHtml(value?: string): string {
  if (!value) return ''
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractImage(item: Parser.Item): string | undefined {
  const enclosure = item.enclosure?.url
  if (enclosure && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosure)) {
    return enclosure
  }

  const media = (item as { 'media:content'?: { $?: { url?: string } } })['media:content']?.$
    ?.url
  if (media) return media

  const extra = item as Parser.Item & { 'content:encoded'?: string }
  const content = item.content || extra['content:encoded'] || ''
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1]
}

function sourceFromItem(item: Parser.Item, feedTitle?: string): string {
  if (item.creator) return item.creator
  const link = item.link || ''
  try {
    return new URL(link).hostname.replace(/^www\./, '')
  } catch {
    return feedTitle || 'News'
  }
}

export async function fetchNewsArticles(limit = 24): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = []
  const seen = new Set<string>()

  await Promise.all(
    FEED_URLS.map(async (url) => {
      try {
        const feed = await parser.parseURL(url)
        for (const item of feed.items) {
          if (!item.title || !item.link) continue
          const key = item.link.trim()
          if (seen.has(key)) continue
          seen.add(key)

          const excerpt = stripHtml(item.contentSnippet || item.summary).slice(0, 220)
          articles.push({
            id: key,
            title: stripHtml(item.title),
            link: key,
            source: sourceFromItem(item, feed.title),
            publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
            excerpt: excerpt || 'Read the full story at the source.',
            imageUrl: extractImage(item) ?? null,
          })
        }
      } catch (error) {
        console.error(`AASS feed error (${url}):`, error)
      }
    })
  )

  return articles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
}
