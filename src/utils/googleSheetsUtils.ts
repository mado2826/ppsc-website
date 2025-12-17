import { LeaderboardEntry } from '../types'

/**
 * Fetches data from Google Sheets using Google Apps Script Web App
 * This is the recommended method as it's more secure
 */
export const fetchSheetDataFromWebApp = async (webAppUrl: string): Promise<any[][]> => {
  try {
    const response = await fetch(webAppUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // Web app should return data as 2D array or JSON array
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data
    }
    // If web app returns object with data property
    if (data.data && Array.isArray(data.data)) {
      return data.data
    }
    throw new Error('Unexpected data format from web app')
  } catch (error) {
    console.error('Error fetching from Google Apps Script Web App:', error)
    throw error
  }
}

/**
 * Fetches data from Google Sheets using the Google Sheets API
 * Requires API key and public sheet
 */
export const fetchSheetDataFromAPI = async (
  sheetId: string,
  range: string,
  apiKey?: string
): Promise<any[][]> => {
  if (!apiKey) {
    throw new Error('API key is required for direct API access')
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
    const response = await fetch(url)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Google Sheets API error: ${error.error?.message || response.statusText}`)
    }
    
    const data = await response.json()
    return data.values || []
  } catch (error) {
    console.error('Error fetching from Google Sheets API:', error)
    throw error
  }
}

/**
 * Main function to fetch sheet data
 * Supports both Web App URL and direct API methods
 */
export const fetchSheetData = async (
  sheetId: string,
  range: string,
  webAppUrl?: string,
  apiKey?: string
): Promise<any[][]> => {
  if (webAppUrl) {
    return fetchSheetDataFromWebApp(webAppUrl)
  } else if (apiKey) {
    return fetchSheetDataFromAPI(sheetId, range, apiKey)
  } else {
    throw new Error('Either webAppUrl or apiKey must be provided')
  }
}

/**
 * Validates a leaderboard entry
 */
export const validateEntry = (entry: Partial<LeaderboardEntry>): boolean => {
  return (
    typeof entry.competition_id === 'string' &&
    typeof entry.participant_name === 'string' &&
    typeof entry.score === 'number' &&
    typeof entry.time_seconds === 'number' &&
    typeof entry.results_published === 'boolean' &&
    entry.competition_id.match(/^\d{4}-\d{2}$/) !== null // YYYY-MM format
  )
}

/**
 * Transforms raw Google Sheets data to LeaderboardEntry array
 * Assumes first row contains headers
 */
export const transformSheetData = (rawData: any[][]): LeaderboardEntry[] => {
  if (!rawData || rawData.length < 2) {
    return []
  }

  // First row is headers - find column indices
  const headers = rawData[0].map((h: string) => String(h).toLowerCase().trim())
  
  const getColumnIndex = (name: string): number => {
    const index = headers.findIndex(h => 
      h.includes(name.toLowerCase()) || 
      h === name.toLowerCase() ||
      h.replace(/_/g, '') === name.toLowerCase().replace(/_/g, '')
    )
    return index >= 0 ? index : -1
  }

  const competitionIdIdx = getColumnIndex('competition_id')
  const participantNameIdx = getColumnIndex('participant_name')
  const scoreIdx = getColumnIndex('score')
  const timeSecondsIdx = getColumnIndex('time_seconds')
  const timeFormattedIdx = getColumnIndex('time_formatted')
  const resultsPublishedIdx = getColumnIndex('results_published')
  const submittedAtIdx = getColumnIndex('submitted_at')
  const notesIdx = getColumnIndex('notes')

  // Validate that required columns exist
  if (
    competitionIdIdx === -1 ||
    participantNameIdx === -1 ||
    scoreIdx === -1 ||
    timeSecondsIdx === -1 ||
    resultsPublishedIdx === -1
  ) {
    throw new Error('Missing required columns in Google Sheet. Required: competition_id, participant_name, score, time_seconds, results_published')
  }

  // Transform rows to entries
  const entries: LeaderboardEntry[] = []
  
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i]
    if (!row || row.length === 0) continue

    // Parse values
    const competitionId = String(row[competitionIdIdx] || '').trim()
    const participantName = String(row[participantNameIdx] || '').trim()
    const score = parseFloat(row[scoreIdx]) || 0
    const timeSeconds = parseFloat(row[timeSecondsIdx]) || 0
    const timeFormatted = timeFormattedIdx >= 0 ? String(row[timeFormattedIdx] || '').trim() : undefined
    const resultsPublished = String(row[resultsPublishedIdx] || '').toLowerCase() === 'true'
    const submittedAt = submittedAtIdx >= 0 ? String(row[submittedAtIdx] || '').trim() : undefined
    const notes = notesIdx >= 0 ? String(row[notesIdx] || '').trim() : undefined

    // Skip empty rows
    if (!competitionId || !participantName) continue

    const entry: LeaderboardEntry = {
      competition_id: competitionId,
      participant_name: participantName,
      score,
      time_seconds: timeSeconds,
      time_formatted: timeFormatted,
      results_published: resultsPublished,
      submitted_at: submittedAt || undefined,
      notes: notes || undefined,
    }

    // Validate entry
    if (validateEntry(entry)) {
      entries.push(entry)
    } else {
      console.warn('Invalid entry skipped:', entry)
    }
  }

  return entries
}

