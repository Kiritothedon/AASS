import Link from 'next/link'
import { Mail, Twitter, Linkedin, Github } from 'lucide-react'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Initiatives', href: '/initiatives' },
    { name: 'Software', href: '/software' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      name: 'Email',
      href: 'mailto:contact@aass.org',
      icon: Mail,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary-gold font-serif">
                AASS
              </span>
            </div>
            <p className="text-secondary-gray mb-6 max-w-md">
              The African American Safety Society advances safety for Black people by creating economic power and technological tools. We believe that stronger businesses, better digital infrastructure, and targeted safety software reduce harm and improve community resilience.
            </p>
            
            {/* Newsletter */}
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
              <p className="text-sm text-secondary-gray mb-4">
                Join our newsletter for program updates, funding opportunities, and safety tech launches.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-gold"
                />
                <button className="btn-primary rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-gray hover:text-primary-gold transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <p className="text-secondary-gray">
                1234 Community Way<br />
                Suite 100<br />
                Atlanta, GA 30309
              </p>
              <p className="text-secondary-gray">
                Phone: (555) 123-4567<br />
                Email: contact@aass.org
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-secondary-gray hover:text-primary-gold transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-secondary-gray text-sm">
                © 2025 African American Safety Society. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-secondary-gray hover:text-primary-gold transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-secondary-gray text-sm mt-4 md:mt-0">
              Building safety through Black business & technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
