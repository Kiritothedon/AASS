import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  title?: string
  description?: string
  children?: ReactNode
}

export default function FeatureGrid({
  features,
  title,
  description,
  children
}: FeatureGridProps) {
  return (
    <section className="section-padding bg-secondary-gray">
      <div className="container-custom">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-primary-black">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card card-hover text-center"
              >
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-primary-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary-black">
                  {feature.title}
                </h3>
                <p className="text-secondary-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {children && (
          <div className="mt-12">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
