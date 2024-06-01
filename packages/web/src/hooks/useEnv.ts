import { useContext } from 'react'
import { EnvConfig, envService } from '@/services/EnvService'
import { EnvContext } from '@/providers/EnvProvider'
import { useGetAPI } from './useAPI'

export function useEnv() {
  const backendUrl = envService.getBackendUrl()

  const { data, error, isLoading } = useGetAPI<EnvConfig>(`${backendUrl}`)

  if (data) {
    envService.setEnv(data)
  }

  return {
    data,
    loading: isLoading,
    error,
  }
}

export function useEnvContext() {
  const envContext = useContext(EnvContext)
  if (!envContext) {
    throw new Error('useEnvContext must be used within a EnvContextProvider')
  }

  return envContext
}
