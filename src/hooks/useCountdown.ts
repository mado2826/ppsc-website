import { useState, useEffect } from 'react'
import { getTimeDifference } from '../utils/dateUtils'

interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

/**
 * Hook to calculate countdown to a target date
 * Updates every second
 */
export const useCountdown = (targetDate: Date | null): CountdownResult => {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      })
      return
    }

    const updateCountdown = () => {
      const diff = getTimeDifference(targetDate)
      setTimeLeft({
        ...diff,
        isExpired: diff.totalSeconds <= 0,
      })
    }

    // Update immediately
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

