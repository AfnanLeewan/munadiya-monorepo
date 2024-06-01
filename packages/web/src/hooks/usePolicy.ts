import { PolicyProviderContext } from '@/providers/PolicyProvider'
import { useContext } from 'react'

export const usePolicy = () => {
  const context = useContext(PolicyProviderContext)
  if (context === undefined) {
    throw new Error('usePolicy must be used within a PolicyProvider')
  }
  return context
}
