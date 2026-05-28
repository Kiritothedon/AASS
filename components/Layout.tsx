import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = 'AASS | African American News & Affairs',
  description = 'Curated African American news, culture, and community affairs in one low-maintenance page.',
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gtp-bg-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
