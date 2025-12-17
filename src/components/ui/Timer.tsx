import { useEffect, useState } from 'react'
import { getTimeDifference } from '../../utils/dateUtils'

interface TimerProps {
  targetDate: Date | null
  format?: 'full' | 'compact'
  onComplete?: () => void
  className?: string
}

export const Timer = ({
  targetDate,
  format = 'full',
  onComplete,
  className = '',
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
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

    const updateTimer = () => {
      const diff = getTimeDifference(targetDate)
      const isExpired = diff.totalSeconds <= 0

      setTimeLeft({
        days: diff.days,
        hours: diff.hours,
        minutes: diff.minutes,
        seconds: diff.seconds,
        isExpired,
      })

      if (isExpired && onComplete) {
        onComplete()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [targetDate, onComplete])

  if (timeLeft.isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-gray-400">Competition has started or ended</p>
      </div>
    )
  }

  if (format === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-2xl font-bold text-primary-400">
          {String(timeLeft.days).padStart(2, '0')}:
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-primary-400">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400 mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-primary-400">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400 mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-primary-400">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400 mt-1">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-primary-400">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400 mt-1">Seconds</div>
      </div>
    </div>
  )
}

