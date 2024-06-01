import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined
    height: number | undefined
    scaleDirection: 'stable' | 'up' | 'down'
  }>({
    width: undefined,
    height: undefined,
    scaleDirection: 'stable',
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize((prevSize) => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        let scaleDirection: 'stable' | 'up' | 'down' = 'stable'

        if (
          newWidth > (prevSize.width ?? 0) ||
          newHeight > (prevSize.height ?? 0)
        ) {
          scaleDirection = 'up'
        } else if (
          newWidth < (prevSize.width ?? 0) ||
          newHeight < (prevSize.height ?? 0)
        ) {
          scaleDirection = 'down'
        }

        return {
          width: newWidth,
          height: newHeight,
          scaleDirection,
        }
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
