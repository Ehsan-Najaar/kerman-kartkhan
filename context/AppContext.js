'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// مقدار اولیه کانتکس (می‌تونی متغیرهای دیگه هم اضافه کنی)
const AppContext = createContext({
  user: null,
  setUser: () => {},
  // هر state یا فانکشن دیگه که لازم داری
})

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ user = null, children }) {
  const [currentUser, setCurrentUser] = useState(user)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  return (
    <AppContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
      {children}
    </AppContext.Provider>
  )
}
