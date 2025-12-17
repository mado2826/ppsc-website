import { LeaderboardEntry, GroupedLeaderboard, SortedLeaderboardEntry } from '../types'

/**
 * Filters entries to only include published results
 */
export const filterPublishedResults = (
  entries: LeaderboardEntry[]
): LeaderboardEntry[] => {
  return entries.filter(entry => entry.results_published === true)
}

/**
 * Groups entries by competition_id
 */
export const groupByCompetition = (
  entries: LeaderboardEntry[]
): GroupedLeaderboard[] => {
  const grouped = new Map<string, LeaderboardEntry[]>()

  entries.forEach(entry => {
    if (!grouped.has(entry.competition_id)) {
      grouped.set(entry.competition_id, [])
    }
    grouped.get(entry.competition_id)!.push(entry)
  })

  return Array.from(grouped.entries()).map(([competition_id, entries]) => ({
    competition_id,
    entries,
    published: entries.some(e => e.results_published === true),
  }))
}

/**
 * Sorts entries: score (descending), then time (ascending)
 * Assigns rank based on sorted position
 */
export const sortLeaderboardEntries = (
  entries: LeaderboardEntry[]
): SortedLeaderboardEntry[] => {
  // Sort: score descending, then time_seconds ascending
  const sorted = [...entries].sort((a, b) => {
    // Primary sort: score (descending)
    if (b.score !== a.score) {
      return b.score - a.score
    }
    // Secondary sort: time_seconds (ascending)
    return a.time_seconds - b.time_seconds
  })

  // Assign ranks
  return sorted.map((entry, index) => {
    // Handle ties: same rank if score and time are equal
    let rank = index + 1
    if (index > 0) {
      const prev = sorted[index - 1]
      if (prev.score === entry.score && prev.time_seconds === entry.time_seconds) {
        rank = (sorted[index - 1] as SortedLeaderboardEntry).rank
      }
    }

    return {
      ...entry,
      rank,
    }
  })
}

/**
 * Gets leaderboard for a specific competition
 * Filters by competition_id and results_published, then sorts
 */
export const getCompetitionLeaderboard = (
  entries: LeaderboardEntry[],
  competitionId: string
): SortedLeaderboardEntry[] => {
  // Filter by competition_id
  const competitionEntries = entries.filter(
    entry => entry.competition_id === competitionId
  )

  // Filter by results_published
  const publishedEntries = filterPublishedResults(competitionEntries)

  // Sort and assign ranks
  return sortLeaderboardEntries(publishedEntries)
}

/**
 * Gets all unique competition IDs from entries
 */
export const getAvailableCompetitionIds = (
  entries: LeaderboardEntry[]
): string[] => {
  const ids = new Set<string>()
  entries.forEach(entry => {
    if (entry.results_published) {
      ids.add(entry.competition_id)
    }
  })
  return Array.from(ids).sort().reverse() // Most recent first
}

/**
 * Formats time in seconds to MM:SS or HH:MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

