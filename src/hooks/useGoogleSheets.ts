import { useState, useEffect, useCallback } from 'react'
import { fetchSheetData, transformSheetData } from '../utils/googleSheetsUtils'
import { LeaderboardEntry } from '../types'

interface UseGoogleSheetsResult {
  data: LeaderboardEntry[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch and transform data from Google Sheets
 * Supports both Web App URL and direct API methods
 */
export const useGoogleSheets = (
  sheetId: string,
  range: string,
  webAppUrl?: string,
  apiKey?: string
): UseGoogleSheetsResult => {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch raw data from Google Sheets
      const rawData = await fetchSheetData(sheetId, range, webAppUrl, apiKey)
      
      // Transform to LeaderboardEntry array
      const entries = transformSheetData(rawData)
      
      setData(entries)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leaderboard data'
      setError(errorMessage)
      console.error('Error fetching Google Sheets data:', err)
      setData([]) // Reset data on error
    } finally {
      setLoading(false)
    }
  }, [sheetId, range, webAppUrl, apiKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

