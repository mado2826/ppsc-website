import { useState, useMemo } from 'react'
import { useLeaderboard, useAvailableCompetitions } from '../../hooks/useLeaderboard'
import { getCurrentCompetition } from '../../config/competitionConfig'
import { CompetitionLeaderboard } from './CompetitionLeaderboard'
import { LeaderboardFilters } from './LeaderboardFilters'
import { Section } from '../ui/Section'

export const Leaderboard = () => {
  const { loading, error } = useLeaderboard()
  const availableCompetitions = useAvailableCompetitions()
  const currentCompetition = getCurrentCompetition()

  // Default to current competition, or first available
  const defaultCompetition =
    currentCompetition?.id || availableCompetitions[0] || ''

  const [selectedCompetition, setSelectedCompetition] = useState(defaultCompetition)

  // Update selected competition when current competition changes
  useMemo(() => {
    if (currentCompetition?.id && availableCompetitions.includes(currentCompetition.id)) {
      setSelectedCompetition(currentCompetition.id)
    } else if (availableCompetitions.length > 0 && !availableCompetitions.includes(selectedCompetition)) {
      setSelectedCompetition(availableCompetitions[0])
    }
  }, [currentCompetition, availableCompetitions, selectedCompetition])

  if (loading) {
    return (
      <div className="py-8">
        <Section title="Leaderboard">
          <div className="text-center py-12">
            <p className="text-gray-400">Loading leaderboard data...</p>
          </div>
        </Section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <Section title="Leaderboard">
          <div className="text-center py-12">
            <p className="text-red-400 mb-2">Error loading leaderboard</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </Section>
      </div>
    )
  }

  if (availableCompetitions.length === 0) {
    return (
      <div className="py-8">
        <Section title="Leaderboard">
          <div className="text-center py-12">
            <p className="text-gray-400">No published results available</p>
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div className="py-8">
      <Section title="Leaderboard" subtitle="View results from past competitions">
        <LeaderboardFilters
          availableCompetitions={availableCompetitions}
          selectedCompetition={selectedCompetition}
          onCompetitionChange={setSelectedCompetition}
        />

        {selectedCompetition && (
          <CompetitionLeaderboard competitionId={selectedCompetition} />
        )}
      </Section>
    </div>
  )
}

