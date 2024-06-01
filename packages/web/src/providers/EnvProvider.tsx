import { createContext } from 'react'
import { EnvConfig } from '../services/EnvService'

type EnvContextType = {
  data: EnvConfig
}

export const EnvContext = createContext<EnvContextType | null>(null)

export function EnvContextProvider(props: {
  children: React.ReactNode
  data: EnvConfig
}) {
  return (
    <EnvContext.Provider value={{ data: props.data }}>
      {props.children}
    </EnvContext.Provider>
  )
}
