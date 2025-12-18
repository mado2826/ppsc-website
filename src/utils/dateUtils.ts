import { format, parseISO, differenceInSeconds, isAfter, isBefore, startOfToday } from 'date-fns'

/**
 * Converts a UTC date to EST/EDT
 * EST is UTC-5, EDT is UTC-4 (daylight saving time)
 * This function properly handles date boundaries when converting timezones
 */
const convertToEST = (utcDate: Date): Date => {
  // EST is UTC-5, so subtract 5 hours from UTC time
  const estOffsetMs = -5 * 60 * 60 * 1000 // -5 hours in milliseconds
  const estTimestamp = utcDate.getTime() + estOffsetMs
  
  // Create a new date from the adjusted timestamp
  // This ensures the date component is correct after timezone conversion
  return new Date(estTimestamp)
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
    
    // Get UTC components
    const startYear = startUTC.getUTCFullYear()
    const startMonth = startUTC.getUTCMonth()
    const startDay = startUTC.getUTCDate()
    const startHours = startUTC.getUTCHours()
    const startMinutes = startUTC.getUTCMinutes()
    
    const endYear = endUTC.getUTCFullYear()
    const endMonth = endUTC.getUTCMonth()
    const endDay = endUTC.getUTCDate()
    const endHours = endUTC.getUTCHours()
    const endMinutes = endUTC.getUTCMinutes()
    
    // Convert to EST (UTC-5)
    let startESTHours = startHours - 5
    let startESTDay = startDay
    let startESTMonth = startMonth
    let startESTYear = startYear
    
    let endESTHours = endHours - 5
    let endESTDay = endDay
    let endESTMonth = endMonth
    let endESTYear = endYear
    
    // Handle day rollover for start date
    if (startESTHours < 0) {
      startESTHours += 24
      startESTDay -= 1
      if (startESTDay < 1) {
        startESTMonth -= 1
        if (startESTMonth < 0) {
          startESTMonth = 11
          startESTYear -= 1
        }
        startESTDay = new Date(startESTYear, startESTMonth + 1, 0).getDate()
      }
    }
    
    // Handle day rollover for end date
    if (endESTHours < 0) {
      endESTHours += 24
      endESTDay -= 1
      if (endESTDay < 1) {
        endESTMonth -= 1
        if (endESTMonth < 0) {
          endESTMonth = 11
          endESTYear -= 1
        }
        endESTDay = new Date(endESTYear, endESTMonth + 1, 0).getDate()
      }
    }
    
    // Create date objects for formatting (using local timezone but with EST values)
    const startEST = new Date(startESTYear, startESTMonth, startESTDay, startESTHours, startMinutes)
    const endEST = new Date(endESTYear, endESTMonth, endESTDay, endESTHours, endMinutes)
    
    // If same day, show single date with time range
    if (startESTYear === endESTYear && startESTMonth === endESTMonth && startESTDay === endESTDay) {
      const timeFormat = (hours: number, minutes: number) => {
        const period = hours >= 12 ? 'PM' : 'AM'
        const displayHours = hours % 12 || 12
        const displayMinutes = minutes.toString().padStart(2, '0')
        return `${displayHours}:${displayMinutes} ${period}`
      }
      return `${format(startEST, 'MMMM d, yyyy')} ${timeFormat(startESTHours, startMinutes)} - ${timeFormat(endESTHours, endMinutes)} EST`
    }
    
    // Different days, show date range
    return `${format(startEST, 'MMMM d, yyyy')} - ${format(endEST, 'MMMM d, yyyy')}`
  } catch {
    return `${startDate} - ${endDate}`
  }
}