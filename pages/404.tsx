import Link from 'next/link'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you requested is not on AASSociety. Explore incident reporting, the public map, policy essays, and community safety resources."
        path="/404"
        noindex
      />
      <div className="min-h-[60vh] bg-gtp-bg-0 flex items-center">
        <div className="container-custom py-16 max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-gold mb-3">
            404
          </p>
          <h1 className="font-serif text-3xl font-bold text-primary-white mb-4">
            Page not found
          </h1>
          <p className="text-secondary-muted leading-relaxed mb-8">
            That URL does not exist. Try one of these pages instead:
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/report" className="text-primary-gold hover:underline">
                Report a racial incident
              </Link>
            </li>
            <li>
              <Link href="/incident-map" className="text-primary-gold hover:underline">
                View the incident map
              </Link>
            </li>
            <li>
              <Link href="/winnable-demand" className="text-primary-gold hover:underline">
                Read The Winnable Demand essay
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-primary-gold hover:underline">
                Browse insights &amp; analysis
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gtp-blue-light hover:underline">
                Return home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
