export const SITE_URL = 'https://www.aassociety.org'
export const SITE_NAME = 'AASS'
export const SITE_FULL_NAME = 'African American Safety Society'
export const SITE_TAGLINE = 'Document Incidents. Prove Patterns. Win Demands.'
export const DEFAULT_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`
export const DEFAULT_DESCRIPTION =
  'Report racial incidents in your community, view submissions on a public map, and read policy analysis on what Black America should demand next. AASSociety is a civic safety and advocacy platform.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`
export const TWITTER_HANDLE = '@aassociety'
export const FOUNDER_NAME = "De'Mondre Zimmerman"
export const FOUNDER_URL = 'https://demondre.com'

export interface SEOProps {
  title?: string
  description?: string
  path?: string
  ogType?: 'website' | 'article'
  ogImage?: string
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
}

export const STATIC_ROUTES: Array<{
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}> = [
  { path: '/', changefreq: 'daily', priority: 1 },
  { path: '/winnable-demand', changefreq: 'monthly', priority: 0.9 },
  { path: '/report', changefreq: 'weekly', priority: 0.8 },
  { path: '/incident-map', changefreq: 'weekly', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog', changefreq: 'weekly', priority: 0.7 },
  { path: '/software', changefreq: 'monthly', priority: 0.6 },
  { path: '/initiatives', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', changefreq: 'yearly', priority: 0.3 },
]
