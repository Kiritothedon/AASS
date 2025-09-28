import Image from 'next/image'
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  github?: string
  scholar?: string
}

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const socialLinks = [
    { name: 'LinkedIn', href: member.linkedin, icon: Linkedin },
    { name: 'Twitter', href: member.twitter, icon: Twitter },
    { name: 'GitHub', href: member.github, icon: Github },
    { name: 'Scholar', href: member.scholar, icon: ExternalLink },
  ].filter(link => link.href)

  return (
    <div className="card card-hover text-center">
      {/* Image */}
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-primary-black mb-2">
        {member.name}
      </h3>
      
      <p className="text-primary-gold font-medium mb-4">
        {member.title}
      </p>
      
      <p className="text-secondary-muted leading-relaxed mb-6">
        {member.bio}
      </p>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.href}
                className="text-secondary-muted hover:text-primary-gold transition-colors duration-200"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
