'use client'

import { createContext, ReactNode, useState } from 'react'

//@ts-ignore
const SidebarContext = createContext()

const SideBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState('my-habits')

  return (
    <SidebarContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SideBarContextProvider
