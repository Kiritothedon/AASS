import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  FOUNDER_NAME,
  FOUNDER_URL,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
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
    // NGO is a subtype of Organization; declaring both helps Google understand
    // AASS as a nonprofit advocacy entity rather than a generic company.
    '@type': ['Organization', 'NGO'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_FULL_NAME,
    alternateName: [SITE_NAME, 'AASSociety'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
    },
    image: DEFAULT_OG_IMAGE,
    slogan: SITE_TAGLINE,
    description: DEFAULT_DESCRIPTION,
    founder: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      url: FOUNDER_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    knowsAbout: [
      'Racial incident reporting',
      'Hate crime documentation',
      'Civil rights advocacy',
      'Reparations policy',
      'Black community safety',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'support',
      url: absoluteUrl('/contact'),
    },
    sameAs: [FOUNDER_URL],
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
      '@type': 'ReportAction',
      name: 'Report a racial incident',
      target: absoluteUrl('/report'),
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

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function itemListSchema({
  name,
  description,
  items,
}: {
  name: string
  description: string
  items: Array<{ name: string; path: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
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
