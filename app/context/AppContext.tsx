'use client'

import { createContext, useContext, useState } from 'react'

type AppContextType = {
  userId: number | null
  name: string | null
  setUser: (userId: number, name: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null)
  const [name, setName] = useState<string | null>(null)

  const setUser = (id: number, name: string) => {
    setUserId(id)
    setName(name)
  }

  return (
    <AppContext.Provider value={{ userId, name, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext 누락됨')
  return ctx
}
