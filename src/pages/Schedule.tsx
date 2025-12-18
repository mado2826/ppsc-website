import { useConfig } from '../hooks/useConfig'
import { Section } from '../components/ui/Section'
import { CompetitionList } from '../components/competition/CompetitionList'

export default function Schedule() {
  const config = useConfig()
  const competitions = config.competitionDates

  const upcoming = competitions.filter(c => c.status === 'upcoming')
  const current = competitions.filter(c => c.status === 'current')
  const past = competitions.filter(c => c.status === 'past')

  return (
    <div className="py-8">
      <Section
        title="Dates & Schedule"
        subtitle="View upcoming, current, and past competition dates"
      >
        <div className="space-y-12">
          {current.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Current Competition</h3>
              <CompetitionList competitions={current} />
            </div>
          )}

          {upcoming.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Upcoming Competitions</h3>
              <CompetitionList competitions={upcoming} />
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Past Competitions</h3>
              <CompetitionList competitions={past} />
            </div>
          )}

          {competitions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No competitions scheduled</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}

