import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  FOUNDER_NAME,
  FOUNDER_URL,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '../lib/seo'

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_FULL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    founder: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      url: FOUNDER_URL,
    },
    sameAs: [FOUNDER_URL],
    description: DEFAULT_DESCRIPTION,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_FULL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_FULL_NAME,
      logo: DEFAULT_OG_IMAGE,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/#context`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  author = FOUNDER_NAME,
}: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: FOUNDER_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_FULL_NAME,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
  }
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_FULL_NAME,
      url: SITE_URL,
    },
  }
}
