import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function Layout({ 
  children, 
  title = 'African American Safety Society',
  description = 'AASS empowers Black communities with training, tech, and tools that increase economic opportunity and public safety.',
  image = '/images/og-image.jpg',
  url = 'https://aass.org'
}: LayoutProps) {
  const fullTitle = title === 'African American Safety Society' 
    ? title 
    : `${title} | African American Safety Society`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Canonical */}
        <link rel="canonical" href={url} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
