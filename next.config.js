/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    unoptimized: true,
  },
  // Canonicalize host: 301 the apex to www so ranking signals consolidate on the
  // canonical host used by <link rel="canonical">, the sitemap, and lib/seo SITE_URL.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aassociety.org' }],
        destination: 'https://www.aassociety.org/:path*',
        permanent: true,
      },
    ]
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX(nextConfig)
