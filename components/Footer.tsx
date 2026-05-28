export default function Footer() {
  return (
    <footer className="border-t border-gtp-border bg-gtp-bg-0 py-10">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-muted">
        <p>
          &copy; {new Date().getFullYear()} African American Safety Society. Headlines via public RSS feeds.
        </p>
        <p className="text-xs">
          Stories open on original publisher sites. AASS does not host full articles.
        </p>
      </div>
    </footer>
  )
}
