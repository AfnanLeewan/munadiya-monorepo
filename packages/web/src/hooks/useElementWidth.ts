import { useCallback, useEffect, useState, useRef } from 'react'

// Custom hook to get, track, and set the width of a DOM element
function useElementWidth<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T>,
  number,
  (newWidth: number | string) => void,
  (newWidth: number | string) => void,
] {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth)
      }
    }

    updateWidth()

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Function to programmatically set the width of the element
  const setElementWidth = useCallback((newWidth: number | string) => {
    if (ref.current) {
      ref.current.style.width =
        typeof newWidth === 'number' ? `${newWidth}px` : newWidth
      setWidth(ref.current.clientWidth)
    }
  }, [])

  // Function to programmatically set the max width of the element
  const setElementMaxWidth = useCallback((newWidth: number | string) => {
    if (ref.current) {
      ref.current.style.maxWidth =
        typeof newWidth === 'number' ? `${newWidth}px` : newWidth
    }
  }, [])

  return [ref, width, setElementWidth, setElementMaxWidth]
}

export default useElementWidth
