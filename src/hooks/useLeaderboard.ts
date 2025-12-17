import { useMemo } from 'react'
import { useGoogleSheets } from './useGoogleSheets'
import { useConfig } from './useConfig'
import { filterPublishedResults, getCompetitionLeaderboard, getAvailableCompetitionIds, groupByCompetition } from '../utils/leaderboardUtils'
import { LeaderboardEntry, SortedLeaderboardEntry, GroupedLeaderboard } from '../types'

interface UseLeaderboardResult {
  data: LeaderboardEntry[]
  publishedData: LeaderboardEntry[]
  groupedData: GroupedLeaderboard[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Main hook for leaderboard data
 * Fetches from Google Sheets, filters by results_published, and groups by competition
 */
export const useLeaderboard = (): UseLeaderboardResult => {
  const config = useConfig()
  const { googleSheets } = config

  const {
    data: rawData,
    loading,
    error,
    refetch,
  } = useGoogleSheets(
    googleSheets.leaderboardSheetId,
    googleSheets.range,
    googleSheets.webAppUrl,
    googleSheets.apiKey
  )

  // Filter by results_published if showUnpublished is false
  const publishedData = useMemo(() => {
    if (config.leaderboard.showUnpublished) {
      return rawData
    }
    return filterPublishedResults(rawData)
  }, [rawData, config.leaderboard.showUnpublished])

  // Group by competition_id
  const groupedData = useMemo(() => {
    return groupByCompetition(publishedData)
  }, [publishedData])

  return {
    data: rawData,
    publishedData,
    groupedData,
    loading,
    error,
    refetch,
  }
}

/**
 * Hook to get leaderboard for a specific competition
 */
export const useCompetitionLeaderboard = (
  competitionId: string
): {
  entries: SortedLeaderboardEntry[]
  loading: boolean
  error: string | null
  hasPublishedResults: boolean
} => {
  const { publishedData, loading, error } = useLeaderboard()

  const entries = useMemo(() => {
    return getCompetitionLeaderboard(publishedData, competitionId)
  }, [publishedData, competitionId])

  const hasPublishedResults = entries.length > 0

  return {
    entries,
    loading,
    error,
    hasPublishedResults,
  }
}

/**
 * Hook to get available competition IDs (with published results)
 */
export const useAvailableCompetitions = (): string[] => {
  const { publishedData } = useLeaderboard()

  return useMemo(() => {
    return getAvailableCompetitionIds(publishedData)
  }, [publishedData])
}

