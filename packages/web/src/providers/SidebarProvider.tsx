import { createContext } from 'react'

type SidebarContextType = {
  open: boolean
  setOpen: (o: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarContextProvider(props: {
  children: React.ReactNode
  open: boolean
  setOpen: (o: boolean) => void
}) {
  return (
    <SidebarContext.Provider
      value={{ open: props.open, setOpen: props.setOpen }}
    >
      {props.children}
    </SidebarContext.Provider>
  )
}
