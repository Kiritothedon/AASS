import Head from 'next/head'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  absoluteUrl,
  pageTitle,
  type SEOProps,
} from '../lib/seo'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
}: SEOProps) {
  const resolvedTitle = pageTitle(title)
  const canonical = absoluteUrl(path)
  const keywords = [
    'African American news',
    'Black news',
    'Black community safety',
    'AASSociety',
    'racial incidents',
    ...tags,
  ].join(', ')

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_FULL_NAME} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${SITE_FULL_NAME}`} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <meta name="theme-color" content="#060910" />
    </Head>
  )
}
