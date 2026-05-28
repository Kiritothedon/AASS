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
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/blog', destination: '/#latest', permanent: false },
      { source: '/blog/:path*', destination: '/#latest', permanent: false },
      { source: '/contact', destination: '/#about', permanent: false },
      { source: '/initiatives', destination: '/', permanent: false },
      { source: '/software', destination: '/', permanent: false },
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
