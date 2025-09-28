import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle: string
  primaryCTA?: {
    label: string
    href: string
  }
  secondaryCTA?: {
    label: string
    href: string
  }
  backgroundImage?: string
  children?: ReactNode
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage = '/images/hero-community.jpg',
  children,
}: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>{primaryCTA.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <span>{secondaryCTA.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}

          {/* Additional content */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
