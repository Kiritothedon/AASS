import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'

interface Initiative {
  id: string
  title: string
  summary: string
  details: string
  icon: string
  stats?: { [key: string]: string | number | undefined }
  cta: { label: string; href: string }
}

interface InitiativeCardProps {
  initiative: Initiative
  iconComponent: React.ComponentType<{ className?: string }>
}

export default function InitiativeCard({ initiative, iconComponent: Icon }: InitiativeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col rounded-2xl border border-gtp-border bg-gtp-bg-2 p-6 md:p-8 hover:border-gtp-blue/30 transition-colors h-full">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary-gold/20 bg-primary-gold/10">
          <Icon className="h-6 w-6 text-primary-gold" />
        </div>

        <h3 className="text-lg font-bold text-primary-white mb-3">{initiative.title}</h3>
        <p className="text-sm text-secondary-muted leading-relaxed mb-6 flex-1">{initiative.summary}</p>

        {initiative.stats && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-gtp-bg-3 border border-gtp-border">
            {Object.entries(initiative.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-base font-bold text-primary-white">{value}</div>
                <div className="text-[10px] text-secondary-muted capitalize mt-0.5">{key}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Link href={initiative.cta.href} className="btn-primary flex-1 text-center">
            {initiative.cta.label}
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary px-3"
            aria-label="View details"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative rounded-2xl border border-gtp-border bg-gtp-bg-2 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-gold/20 bg-primary-gold/10">
                      <Icon className="h-5 w-5 text-primary-gold" />
                    </div>
                    <h2 className="text-xl font-bold text-primary-white font-serif">
                      {initiative.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-secondary-muted hover:text-primary-white transition-colors ml-4"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-secondary-muted leading-relaxed mb-6">
                  {initiative.details}
                </p>

                {initiative.stats && (
                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-gtp-bg-3 border border-gtp-border">
                    {Object.entries(initiative.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-primary-white">{value}</div>
                        <div className="text-xs text-secondary-muted capitalize mt-0.5">{key}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={initiative.cta.href}
                  className="btn-primary w-full"
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
