import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gtp-border bg-gtp-bg-0">
      <div className="container-custom py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary-white">
              &copy; {new Date().getFullYear()} African American Safety Society
            </p>
            <p className="max-w-md text-xs leading-relaxed text-secondary-muted">
              Curated headlines via public RSS. Full articles open on original publisher sites.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-muted">
              A property of
            </p>
            <Link
              href="https://www.globalticketpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-semibold text-gtp-blue-light hover:text-primary-white transition-colors"
            >
              Global Ticket Pay (GTP)
            </Link>
            <p className="mt-0.5 text-xs text-secondary-muted">
              GTP Systems Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
