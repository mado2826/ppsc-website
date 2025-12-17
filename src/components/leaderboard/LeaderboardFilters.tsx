import { FilterDropdown } from '../ui/FilterDropdown'
import { formatCompetitionId } from '../../utils/dateUtils'

interface LeaderboardFiltersProps {
  availableCompetitions: string[]
  selectedCompetition: string
  onCompetitionChange: (competitionId: string) => void
}

export const LeaderboardFilters = ({
  availableCompetitions,
  selectedCompetition,
  onCompetitionChange,
}: LeaderboardFiltersProps) => {
  const competitionOptions = availableCompetitions.map((id) => ({
    value: id,
    label: formatCompetitionId(id),
  }))

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Competition
        </label>
        <FilterDropdown
          options={competitionOptions}
          value={selectedCompetition}
          onChange={onCompetitionChange}
          placeholder="Select a competition..."
        />
      </div>
    </div>
  )
}

