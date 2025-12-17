import { useLeaderboard } from '../hooks/useLeaderboard'
import { useConfig } from '../hooks/useConfig'
import { Section } from '../components/ui/Section'
import { CompetitionLeaderboard } from '../components/leaderboard/CompetitionLeaderboard'
import { CompetitionList } from '../components/competition/CompetitionList'
import { formatCompetitionId, formatDateRange } from '../utils/dateUtils'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useState } from 'react'

export default function Archive() {
  const { groupedData, loading, error } = useLeaderboard()
  const config = useConfig()
  const competitions = config.competitionDates
  const pastCompetitions = competitions.filter(c => c.status === 'past')
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="py-8">
        <Section title="Archive">
          <div className="text-center py-12">
            <p className="text-gray-400">Loading archive data...</p>
          </div>
        </Section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <Section title="Archive">
          <div className="text-center py-12">
            <p className="text-red-400 mb-2">Error loading archive</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </Section>
      </div>
    )
  }

  // Get competitions with published results
  const competitionsWithResults = groupedData
    .filter(group => group.published)
    .map(group => {
      const competition = competitions.find(c => c.id === group.competition_id)
      return { ...group, competition }
    })
    .filter(item => item.competition)

  return (
    <div className="py-8">
      <Section
        title="Archive"
        subtitle="View past competitions and their results"
      >
        <div className="space-y-8">
          {selectedCompetition ? (
            <div>
              <button
                onClick={() => setSelectedCompetition(null)}
                className="text-primary-400 hover:text-primary-300 mb-4"
              >
                ← Back to Archive
              </button>
              <CompetitionLeaderboard competitionId={selectedCompetition} />
            </div>
          ) : (
            <>
              {competitionsWithResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competitionsWithResults.map((group) => (
                    <Card
                      key={group.competition_id}
                      title={group.competition?.name || formatCompetitionId(group.competition_id)}
                      subtitle={group.competition ? formatDateRange(group.competition.startDate, group.competition.endDate) : undefined}
                      onClick={() => setSelectedCompetition(group.competition_id)}
                      variant="elevated"
                      className="cursor-pointer"
                    >
                      <div className="space-y-2">
                        <p className="text-gray-300">
                          {group.entries.length} participant{group.entries.length !== 1 ? 's' : ''}
                        </p>
                        <Badge variant="primary">Results Published</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No archived competitions with published results</p>
                </div>
              )}

              {pastCompetitions.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-white mb-6">All Past Competitions</h3>
                  <CompetitionList
                    competitions={pastCompetitions}
                    onCompetitionClick={(comp) => {
                      if (competitionsWithResults.some(g => g.competition_id === comp.id)) {
                        setSelectedCompetition(comp.id)
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Section>
    </div>
  )
}

