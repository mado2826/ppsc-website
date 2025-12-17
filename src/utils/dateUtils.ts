import { format, parseISO, differenceInSeconds, isAfter, isBefore, startOfToday } from 'date-fns'

/**
 * Converts a UTC date to EST/EDT
 * EST is UTC-5, EDT is UTC-4 (daylight saving time)
 */
const convertToEST = (utcDate: Date): Date => {
  // Create a date in EST timezone
  // EST is UTC-5, but we need to account for DST (EDT is UTC-4)
  // For simplicity, we'll use a fixed offset of -5 hours for EST
  // You can enhance this to detect DST if needed
  const estOffset = -5 * 60 * 60 * 1000 // -5 hours in milliseconds
  return new Date(utcDate.getTime() + estOffset)
}

/**
 * Formats a date string to a readable format (converted to EST)
 */
export const formatDate = (dateString: string, formatStr: string = 'MMMM d, yyyy'): string => {
  try {
    const utcDate = parseISO(dateString)
    const estDate = convertToEST(utcDate)
    return format(estDate, formatStr)
  } catch {
    return dateString
  }
}

/**
 * Calculates the time difference between now and a target date
 * Returns an object with days, hours, minutes, seconds
 */
export const getTimeDifference = (targetDate: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
} => {
  const now = new Date()
  const totalSeconds = differenceInSeconds(targetDate, now)

  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 }
  }

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalSeconds }
}

/**
 * Checks if a date is in the past
 */
export const isPast = (dateString: string): boolean => {
  try {
    return isBefore(parseISO(dateString), startOfToday())
  } catch {
    return false
  }
}

/**
 * Checks if a date is in the future
 */
export const isFuture = (dateString: string): boolean => {
  try {
    return isAfter(parseISO(dateString), startOfToday())
  } catch {
    return false
  }
}

/**
 * Formats competition ID (YYYY-MM) to a readable month/year
 */
export const formatCompetitionId = (competitionId: string): string => {
  try {
    const [year, month] = competitionId.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return format(date, 'MMMM yyyy')
  } catch {
    return competitionId
  }
}

/**
 * Formats a date range (start and end dates) converted to EST
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  try {
    const startUTC = parseISO(startDate)
    const endUTC = parseISO(endDate)
    
    const start = convertToEST(startUTC)
    const end = convertToEST(endUTC)
    
    // If same day, show single date with time range
    if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
      return `${format(start, 'MMMM d, yyyy')} ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')} EST`
    }
    
    // Different days, show date range
    return `${format(start, 'MMMM d, yyyy')} - ${format(end, 'MMMM d, yyyy')}`
  } catch {
    return `${startDate} - ${endDate}`
  }
}