import { useCompetitionLeaderboard } from '../../hooks/useLeaderboard'
import { LeaderboardTable } from './LeaderboardTable'
import { useConfig } from '../../hooks/useConfig'
import { formatCompetitionId } from '../../utils/dateUtils'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

interface CompetitionLeaderboardProps {
  competitionId: string
}

export const CompetitionLeaderboard = ({
  competitionId,
}: CompetitionLeaderboardProps) => {
  const { entries, loading, error, hasPublishedResults } =
    useCompetitionLeaderboard(competitionId)
  const config = useConfig()

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading leaderboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card variant="bordered" className="border-red-600">
        <div className="text-center py-8">
          <p className="text-red-400 mb-2">Error loading leaderboard</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </Card>
    )
  }

  if (!hasPublishedResults) {
    return (
      <Card variant="bordered" className="border-yellow-600">
        <div className="text-center py-8">
          <p className="text-yellow-400 font-semibold mb-2">
            Results Not Yet Published
          </p>
          <p className="text-gray-400 text-sm">
            The results for {formatCompetitionId(competitionId)} are not yet available.
            Please check back later.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Section
      title={`Leaderboard - ${formatCompetitionId(competitionId)}`}
      subtitle="Sorted by score (descending), then by time (ascending)"
    >
      <LeaderboardTable
        entries={entries}
        topPerformersCount={config.leaderboard.topPerformersCount}
      />
    </Section>
  )
}

