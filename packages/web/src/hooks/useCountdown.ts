import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

/**
 * Custom hook that calculates the time left in a countdown based on the total time and start time provided.
 * @param totalTime - The total time in seconds for the countdown.
 * @param startTime - The start time in milliseconds for the countdown.
 * @returns The time left in seconds until the countdown reaches 0.
 */
export const useCountdown = (totalTime: number, startTime: number): number => {
  const calculateTimeLeft = (): number => {
    const currentTime = dayjs().valueOf()
    const timeLeft = totalTime - (currentTime - startTime) / 1000
    return timeLeft > 0 ? Math.floor(timeLeft) : 0
  }

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime, startTime])

  return timeLeft
}
