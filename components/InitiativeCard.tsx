import { useState } from 'react'
import Link from 'next/link'
import { LucideIcon, ArrowRight, X } from 'lucide-react'

interface Initiative {
  id: string
  title: string
  summary: string
  details: string
  icon: string
  stats?: {
    [key: string]: string
  }
  cta: {
    label: string
    href: string
  }
}

interface InitiativeCardProps {
  initiative: Initiative
  iconComponent: LucideIcon
}

export default function InitiativeCard({ initiative, iconComponent: Icon }: InitiativeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="card card-hover h-full flex flex-col">
        <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6">
          <Icon className="h-8 w-8 text-primary-black" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4 text-primary-black">
          {initiative.title}
        </h3>
        
        <p className="text-secondary-muted mb-6 flex-1">
          {initiative.summary}
        </p>

        {/* Stats */}
        {initiative.stats && (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary-gray rounded-lg">
            {Object.entries(initiative.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-primary-black">{value}</div>
                <div className="text-xs text-secondary-muted capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href={initiative.cta.href}
            className="btn-primary flex-1 text-center"
          >
            {initiative.cta.label}
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary px-4"
            aria-label="Learn more"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-black" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-black">
                      {initiative.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-secondary-muted hover:text-primary-black transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <p className="text-secondary-muted leading-relaxed mb-6">
                  {initiative.details}
                </p>

                {/* Stats in modal */}
                {initiative.stats && (
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary-gray rounded-lg">
                    {Object.entries(initiative.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold text-primary-black">{value}</div>
                        <div className="text-sm text-secondary-muted capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={initiative.cta.href}
                  className="btn-primary w-full text-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  {initiative.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
