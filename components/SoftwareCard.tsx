import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Software {
  id: string
  name: string
  description: string
  features: string[]
  image: string
  status: 'live' | 'beta' | 'development'
  cta: {
    label: string
    href: string
  }
}

interface SoftwareCardProps {
  software: Software
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const statusColors = {
    live: 'bg-green-100 text-green-800',
    beta: 'bg-yellow-100 text-yellow-800',
    development: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="card card-hover h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={software.image}
          alt={software.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[software.status]}`}>
            {software.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-3 text-primary-black">
          {software.name}
        </h3>
        
        <p className="text-secondary-muted mb-4 leading-relaxed">
          {software.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary-black mb-2">Key Features:</h4>
          <ul className="text-sm text-secondary-muted space-y-1">
            {software.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-primary-gold rounded-full mt-2 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <Link
        href={software.cta.href}
        className="btn-primary w-full text-center inline-flex items-center justify-center space-x-2"
      >
        <span>{software.cta.label}</span>
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  )
}
