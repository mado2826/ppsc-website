import { useContributors } from '../hooks/useConfig'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'

export default function Contributors() {
  const contributors = useContributors()

  return (
    <div className="py-8">
      <Section
        title="Contributors"
        subtitle="Meet the team behind the competition"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((contributor) => (
            <Card
              key={contributor.id}
              title={contributor.name}
              subtitle={contributor.role}
              variant="elevated"
            >
              <div className="space-y-2">
                {contributor.affiliation && (
                  <p className="text-sm text-gray-400">{contributor.affiliation}</p>
                )}
                {contributor.email && (
                  <a
                    href={`mailto:${contributor.email}`}
                    className="text-sm text-primary-400 hover:text-primary-300"
                  >
                    {contributor.email}
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}

