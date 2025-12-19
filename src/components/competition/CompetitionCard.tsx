import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDateRange } from '../../utils/dateUtils'
import { formatCompetitionDate } from '../../config/competitionConfig'
import { Competition } from '../../types'

interface CompetitionCardProps {
  competition: Competition
  onClick?: () => void
}

export const CompetitionCard = ({ competition, onClick }: CompetitionCardProps) => {
  const statusColors = {
    upcoming: 'accent',
    current: 'primary',
    past: 'default',
  } as const

  return (
    <Card
      title={competition.name}
      subtitle={formatDateRange(competition.startDate, competition.endDate)}
      variant="elevated"
      onClick={onClick}
      className="h-full"
    >
      <div className="space-y-4">
        <p className="text-gray-300">{competition.description}</p>
        
        <div className="flex items-center justify-between">
          <Badge variant={statusColors[competition.status]}>
            {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
          </Badge>
          
          {competition.registrationDeadline && (
            <span className="text-sm text-gray-400">
              Registration Deadline: {formatCompetitionDate(competition.registrationDeadline)}
            </span>
          )}
        </div>

        {onClick && (
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

