import { GetServerSideProps } from 'next'
import { getBlogPosts } from '../lib/blog'
import { SITE_URL, STATIC_ROUTES, absoluteUrl } from '../lib/seo'

function generateSiteMap() {
  const staticEntries = STATIC_ROUTES.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )

  const blogPosts = getBlogPosts()
  const blogEntries = blogPosts.map(
    (post) => `  <url>
    <loc>${absoluteUrl(`/blog/${post.slug}`)}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join('\n')}
</urlset>`
}

export default function SiteMap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}
