import { Competition } from '../../types'
import { CompetitionCard } from './CompetitionCard'

interface CompetitionListProps {
  competitions: Competition[]
  onCompetitionClick?: (competition: Competition) => void
  className?: string
}

export const CompetitionList = ({
  competitions,
  onCompetitionClick,
  className = '',
}: CompetitionListProps) => {
  if (competitions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No competitions found</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          onClick={onCompetitionClick ? () => onCompetitionClick(competition) : undefined}
        />
      ))}
    </div>
  )
}

