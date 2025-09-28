import { GetStaticProps } from 'next'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import InitiativeCard from '../components/InitiativeCard'

interface Initiative {
  id: string
  title: string
  summary: string
  details: string
  icon: string
  stats?: {
    [key: string]: string | number | undefined
  }
  cta: {
    label: string
    href: string
  }
}

interface InitiativesPageProps {
  initiatives: Initiative[]
}

const initiatives = [
  {
    id: 'business-technology',
    title: 'Business & Technology',
    summary: 'Supporting projects that grow Black enterprise.',
    details: 'We provide funding, mentorship, and resources to Black entrepreneurs building safety-focused businesses.',
    icon: 'Building2',
    cta: {
      label: 'Learn More',
      href: '#contact'
    }
  },
  {
    id: 'software-safety',
    title: 'Software for Safety',
    summary: 'Building tools like Watchtower to enhance security.',
    details: 'Our flagship community safety platform and other software solutions designed for neighborhood protection.',
    icon: 'Shield',
    cta: {
      label: 'View Software',
      href: '/software'
    }
  },
  {
    id: 'research-policy',
    title: 'Research & Policy',
    summary: 'Exploring data-driven approaches for resilience.',
    details: 'We conduct research and develop policy recommendations to improve community safety outcomes.',
    icon: 'BarChart3',
    cta: {
      label: 'Read Research',
      href: '/blog'
    }
  }
]

export default function InitiativesPage({ initiatives }: InitiativesPageProps) {
  return (
    <div className="min-h-screen bg-primary-black">
      <PageHeader 
        title="Initiatives" 
        subtitle="Our programs designed to build economic opportunity and community safety."
      />
      
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative) => {
              const lucideReact = require('lucide-react')
              const IconComponent = lucideReact[initiative.icon] as any
              return (
                <InitiativeCard
                  key={initiative.id}
                  initiative={initiative}
                  iconComponent={IconComponent}
                />
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      initiatives,
    },
    revalidate: 3600,
  }
}