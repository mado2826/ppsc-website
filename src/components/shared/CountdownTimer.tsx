import { useConfig } from '../../hooks/useConfig'
import { getNextCompetitionDate } from '../../config/competitionConfig'
import { Timer } from '../ui/Timer'

export const CountdownTimer = () => {
  const config = useConfig()
  const nextDate = getNextCompetitionDate()

  if (!nextDate) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No upcoming competitions scheduled</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Next Competition
        </h3>
        <p className="text-gray-400">
          {nextDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <Timer targetDate={nextDate} format="full" />
    </div>
  )
}

