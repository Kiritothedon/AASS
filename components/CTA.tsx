import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAProps {
  title: string
  description: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  children?: ReactNode
  variant?: 'default' | 'alt'
}

export default function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  variant = 'default'
}: CTAProps) {
  const bgClass = variant === 'alt' 
    ? 'bg-primary-green' 
    : 'bg-primary-black'
  
  const textClass = variant === 'alt' 
    ? 'text-white' 
    : 'text-white'

  return (
    <section className={`${bgClass} ${textClass} section-padding`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            {title}
          </h2>
          <p className="text-xl mb-8 text-gray-200 leading-relaxed">
            {description}
          </p>

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>{primaryAction.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <span>{secondaryAction.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}

          {/* Additional content */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
