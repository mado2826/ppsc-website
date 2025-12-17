import { SortedLeaderboardEntry } from '../../types'
import { Table } from '../ui/Table'
import { Badge } from '../ui/Badge'
import { formatTime } from '../../utils/leaderboardUtils'

interface LeaderboardTableProps {
  entries: SortedLeaderboardEntry[]
  topPerformersCount?: number
}

export const LeaderboardTable = ({
  entries,
  topPerformersCount = 3,
}: LeaderboardTableProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No results available</p>
      </div>
    )
  }

  const columns = [
    {
      key: 'rank',
      header: 'Rank',
      render: (entry: SortedLeaderboardEntry) => {
        const isTop = entry.rank <= topPerformersCount
        return (
          <div className="flex items-center gap-2">
            <span className={isTop ? 'font-bold text-primary-400' : ''}>
              {entry.rank}
            </span>
            {isTop && <Badge variant="primary" size="sm">Top {entry.rank}</Badge>}
          </div>
        )
      },
    },
    {
      key: 'participant_name',
      header: 'Participant',
      render: (entry: SortedLeaderboardEntry) => {
        const isTop = entry.rank <= topPerformersCount
        return (
          <span className={isTop ? 'font-semibold text-white' : 'text-gray-300'}>
            {entry.participant_name}
          </span>
        )
      },
    },
    {
      key: 'score',
      header: 'Score',
      render: (entry: SortedLeaderboardEntry) => {
        const isTop = entry.rank <= topPerformersCount
        return (
          <span className={isTop ? 'font-bold text-primary-400' : 'text-gray-300'}>
            {entry.score}
          </span>
        )
      },
      sortable: true,
    },
    {
      key: 'time',
      header: 'Time',
      render: (entry: SortedLeaderboardEntry) => {
        const timeDisplay = entry.time_formatted || formatTime(entry.time_seconds)
        return <span className="text-gray-300">{timeDisplay}</span>
      },
      sortable: true,
    },
  ]

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <Table
        columns={columns}
        data={entries}
        className="w-full"
      />
    </div>
  )
}

