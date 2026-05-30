interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-gtp-border bg-gtp-gradient">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-14 md:py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-primary-gold/25 bg-primary-gold/8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-gold" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold">
              {badge ?? 'AASS'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-white font-serif tracking-tight leading-[1.08]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-secondary-muted max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
