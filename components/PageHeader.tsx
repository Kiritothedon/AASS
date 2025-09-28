interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-secondary-gray border-b border-secondary-dark">
      <div className="container-custom py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-white font-serif mb-4 tracking-wide uppercase">
            {title}
          </h1>
          {subtitle && (
            <>
              <div className="w-24 h-1 bg-primary-gold mx-auto mb-6"></div>
              <p className="text-xl text-secondary-muted max-w-3xl mx-auto">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
