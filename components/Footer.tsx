export default function Footer() {
  return (
    <footer className="bg-primary-black text-primary-white border-t border-secondary-dark">
      <div className="container-custom py-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary-gold font-serif tracking-wider">
              AASS
            </span>
          </div>
          <p className="text-secondary-muted text-sm mb-4 max-w-md mx-auto">
            Building safety through Black business & technology.
          </p>
          <p className="text-secondary-muted text-xs">
            © {new Date().getFullYear()} African American Safety Society. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
