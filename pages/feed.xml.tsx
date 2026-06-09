import { GetServerSideProps } from 'next'
import { getBlogPosts } from '../lib/blog'
import { SITE_FULL_NAME, SITE_URL, absoluteUrl } from '../lib/seo'

function generateRssFeed() {
  const posts = getBlogPosts()

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`)
      const pubDate = new Date(post.date).toUTCString()
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author}</author>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_FULL_NAME} — Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Research and analysis on Black community safety, racial incident reporting, and advocacy from AASSociety.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`
}

export default function RssFeed() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = generateRssFeed()
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(feed)
  res.end()
  return { props: {} }
}
